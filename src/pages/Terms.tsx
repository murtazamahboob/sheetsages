import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: February 1, 2026</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Agreement to Terms</h2>
              <p>
                By accessing or using SheetSage.ai ("Service"), you agree to be bound by these Terms and Conditions. 
                If you disagree with any part of these terms, you do not have permission to access the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                SheetSage.ai provides AI-powered spreadsheet analysis services, including data insights, 
                risk detection, opportunity analysis, and actionable recommendations based on uploaded files.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. Subscription and Payments</h2>
              <p>
                Some features of the Service require a paid subscription. By subscribing to a paid plan, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pay the applicable fees for your chosen subscription plan</li>
                <li>Provide accurate and complete billing information</li>
                <li>Authorize us to charge your payment method on a recurring basis</li>
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Refund Policy</h2>
              <p>
                We offer a 14-day free trial for Pro subscriptions. After the trial period, payments are non-refundable 
                except where required by law. You may cancel your subscription at any time, and cancellation will take 
                effect at the end of the current billing period.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service only for lawful purposes</li>
                <li>Not upload malicious files or content</li>
                <li>Not attempt to reverse engineer or exploit the Service</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by SheetSage.ai and are 
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
              <p>
                SheetSage.ai shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use of or inability to use the Service. The AI-generated insights and 
                recommendations are for informational purposes only and should not be considered professional advice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                by posting the new Terms on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at support@sheetsage.ai.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
