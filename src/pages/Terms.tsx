import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

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
                By accessing or using SheetSage.ai ("Service"), operated by <strong>Murtaza Mahboob / SheetSage</strong>, 
                you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, 
                you do not have permission to access the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                SheetSage.ai is an AI-powered cloud SaaS platform that analyzes spreadsheets, generates automated 
                summaries, insights, and calculations for Excel, CSV, and similar files. Our service helps users 
                extract valuable insights from their data quickly and accurately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. Eligibility</h2>
              <p>
                You must be at least <strong>18 years of age</strong> to use this Service. By using the Service, 
                you represent and warrant that you are at least 18 years old and have the legal capacity to enter 
                into this agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Subscription and Payments</h2>
              <p>
                Some features of the Service require a paid subscription. <strong>All payments are processed by 
                Lemon Squeezy, the Merchant of Record for all our orders.</strong> Lemon Squeezy handles all customer service 
                inquiries and returns for payments.
              </p>
              <p>By subscribing to a paid plan, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pay the applicable fees for your chosen subscription plan</li>
                <li>Provide accurate and complete billing information</li>
                <li>Authorize Lemon Squeezy to charge your payment method on a recurring basis</li>
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
              </ul>
              <p>
                Our pricing is transparent and available on our <Link to="/#pricing" className="text-primary hover:underline">Pricing page</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. Free Trial</h2>
              <p>
                We offer a 14-day free trial for Pro subscriptions. During the trial:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have full access to Pro features</li>
                <li>You will not be charged until the trial ends</li>
                <li>You can cancel at any time before the trial ends without being charged</li>
                <li>If you do not cancel, your subscription will automatically begin</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Refund Policy</h2>
              <p>
                Please refer to our detailed <Link to="/refund" className="text-primary hover:underline">Refund Policy</Link> for 
                information about refunds. In summary:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds may be issued for duplicate payments or technical issues</li>
                <li>Refund requests must be made within 14 days of the charge</li>
                <li>Change of mind or partial usage does not qualify for refunds</li>
                <li>All refunds are processed by Lemon Squeezy</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. Account Responsibilities</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring your contact information remains accurate and up-to-date</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service only for lawful purposes</li>
                <li>Not upload malicious files, viruses, or harmful content</li>
                <li>Not attempt to reverse engineer, hack, or exploit the Service</li>
                <li>Not use the Service to infringe on the rights of others</li>
                <li>Not resell or redistribute the Service without authorization</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. Intellectual Property Rights</h2>
              <p>
                The Service and its original content, features, and functionality are owned by SheetSage / Murtaza Mahboob 
                and are protected by international copyright, trademark, patent, trade secret, and other intellectual 
                property laws.
              </p>
              <p>
                You retain ownership of any data you upload. By using the Service, you grant us a limited license to 
                process your data solely for the purpose of providing the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHEETSAGE AND ITS OPERATORS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Any loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from your use or inability to use the Service</li>
                <li>Damages resulting from unauthorized access to your data</li>
                <li>Decisions made based on AI-generated insights and recommendations</li>
              </ul>
              <p>
                The AI-generated insights and recommendations are for informational purposes only and should not be 
                considered professional financial, legal, or business advice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">11. Disclaimer of Warranties</h2>
              <p>
                The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express 
                or implied, including but not limited to implied warranties of merchantability, fitness for a 
                particular purpose, and non-infringement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">12. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                for conduct that we believe:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violates these Terms</li>
                <li>Is harmful to other users, us, or third parties</li>
                <li>Involves fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">13. Governing Law and Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in 
                which SheetSage operates. Any disputes arising from these Terms or the Service shall be resolved 
                through binding arbitration or in the courts of the applicable jurisdiction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the 
                Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">15. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <p className="mt-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:murtazamahboob7@gmail.com" className="text-primary hover:underline">
                  murtazamahboob7@gmail.com
                </a>
              </p>
              <p className="mt-2">
                <strong>Business:</strong> Murtaza Mahboob / SheetSage
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm">
                Related policies:{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                {" • "}
                <Link to="/refund" className="text-primary hover:underline">Refund Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
