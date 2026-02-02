import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: February 1, 2026</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Overview</h2>
              <p>
                This Refund Policy outlines the circumstances under which SheetSage (operated by Murtaza Mahboob) 
                may issue refunds for subscription payments. All payments are processed by Lemon Squeezy, our Merchant of Record.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. Refund Eligibility</h2>
              <p>You may be eligible for a refund in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Duplicate Payment:</strong> If you were accidentally charged twice for the same subscription period</li>
                <li><strong>Technical Issues:</strong> If a significant technical issue on our end prevented you from using the service during your subscription period</li>
                <li><strong>Unauthorized Charges:</strong> If your payment method was charged without your authorization</li>
                <li><strong>Service Not Delivered:</strong> If you paid for a service that was not delivered as described</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. Non-Refundable Cases</h2>
              <p>Refunds will NOT be issued in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Change of Mind:</strong> You simply changed your mind about the subscription</li>
                <li><strong>Partial Usage:</strong> You used part of your subscription period and now want a refund</li>
                <li><strong>General Dissatisfaction:</strong> The service didn't meet your expectations but works as described</li>
                <li><strong>Failure to Cancel:</strong> You forgot to cancel before the renewal date</li>
                <li><strong>Exceeded Trial Period:</strong> Request made after the 14-day trial period for Pro plans</li>
                <li><strong>Terms Violation:</strong> Your account was terminated due to violation of our Terms of Service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Time Limit for Refund Requests</h2>
              <p>
                Refund requests must be submitted within <strong>14 days</strong> of the original charge date. 
                Requests submitted after this period will not be considered unless exceptional circumstances apply.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. 14-Day Pro Trial</h2>
              <p>
                We offer a 14-day free trial for our Pro plan. During this trial period:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have full access to Pro features</li>
                <li>You will not be charged until the trial ends</li>
                <li>You can cancel at any time before the trial ends without being charged</li>
                <li>If you do not cancel, your subscription will automatically begin, and you will be charged</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. How to Request a Refund</h2>
              <p>To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email us at <a href="mailto:murtazamahboob7@gmail.com" className="text-primary hover:underline">murtazamahboob7@gmail.com</a></li>
                <li>Include your account email address</li>
                <li>Provide the date and amount of the charge</li>
                <li>Explain the reason for your refund request</li>
                <li>Include any relevant screenshots or documentation</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. Refund Processing</h2>
              <p>
                If your refund is approved:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are processed by Lemon Squeezy, our payment processor</li>
                <li>The refund will be credited to your original payment method</li>
                <li>Processing time is typically 5-10 business days, depending on your bank</li>
                <li>You will receive an email confirmation when the refund is processed</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. Subscription Cancellation</h2>
              <p>
                Cancelling your subscription is different from requesting a refund:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can cancel your subscription at any time from your account settings</li>
                <li>Cancellation takes effect at the end of your current billing period</li>
                <li>You will continue to have access until the end of your paid period</li>
                <li>Cancellation does not automatically entitle you to a refund</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. Payment Processor</h2>
              <p>
                All payments and refunds are processed by <strong>Lemon Squeezy</strong>, our Merchant of Record. 
                Lemon Squeezy handles all payment processing, invoicing, and refund distribution on our behalf.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
              <p>
                If you have questions about this Refund Policy or need assistance with a refund request, 
                please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:murtazamahboob7@gmail.com" className="text-primary hover:underline">
                  murtazamahboob7@gmail.com
                </a>
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm">
                Related policies:{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                {" • "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
