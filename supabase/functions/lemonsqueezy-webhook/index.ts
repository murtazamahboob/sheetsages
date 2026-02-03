import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-signature",
};

// Map Lemon Squeezy variant names to our subscription plans
const planMapping: Record<string, "free" | "pro" | "business"> = {
  free: "free",
  pro: "pro",
  advanced: "business", // Advanced plan maps to business in our DB
  enterprise: "business",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const webhookSecret = Deno.env.get("LEMONSQUEEZY_WEBHOOK_SECRET");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      const hmac = createHmac("sha256", webhookSecret);
      hmac.update(rawBody);
      const expectedSignature = hmac.digest("hex");

      if (signature !== expectedSignature) {
        console.error("Invalid webhook signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const data = payload.data;

    console.log(`Received Lemon Squeezy webhook: ${eventName}`);

    // Handle different webhook events
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated": {
        const userEmail = customData.email || data.attributes?.user_email;
        const userId = customData.user_id;
        const variantName = data.attributes?.variant_name?.toLowerCase() || "";
        const subscriptionId = data.id;
        const status = data.attributes?.status;

        // Determine the plan from variant name
        let plan: "free" | "pro" | "business" = "free";
        for (const [key, value] of Object.entries(planMapping)) {
          if (variantName.includes(key)) {
            plan = value;
            break;
          }
        }

        // If subscription is cancelled or expired, revert to free
        if (status === "cancelled" || status === "expired" || status === "unpaid") {
          plan = "free";
        }

        console.log(`Updating user subscription: ${userEmail || userId} -> ${plan}`);

        // Update user profile
        const query = userId
          ? supabase
              .from("profiles")
              .update({
                subscription_plan: plan,
                stripe_subscription_id: subscriptionId, // Reusing this field for Lemon Squeezy
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", userId)
          : supabase
              .from("profiles")
              .update({
                subscription_plan: plan,
                stripe_subscription_id: subscriptionId,
                updated_at: new Date().toISOString(),
              })
              .eq("email", userEmail);

        const { error } = await query;

        if (error) {
          console.error("Error updating profile:", error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        const userEmail = customData.email || data.attributes?.user_email;
        const userId = customData.user_id;

        console.log(`Cancelling subscription for: ${userEmail || userId}`);

        const query = userId
          ? supabase
              .from("profiles")
              .update({
                subscription_plan: "free",
                stripe_subscription_id: null,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", userId)
          : supabase
              .from("profiles")
              .update({
                subscription_plan: "free",
                stripe_subscription_id: null,
                updated_at: new Date().toISOString(),
              })
              .eq("email", userEmail);

        const { error } = await query;

        if (error) {
          console.error("Error updating profile:", error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        break;
      }

      case "order_created": {
        // Handle one-time purchases if needed
        console.log("Order created:", data.id);
        break;
      }

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
