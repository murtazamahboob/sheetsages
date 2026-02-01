import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: February 1, 2026</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                SheetSage.ai, operated by <strong>Murtaza Mahboob</strong> ("we", "our", or "us"), is committed to 
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
              <p>We collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Name:</strong> Your full name when you create an account</li>
                <li><strong>Email Address:</strong> Used for account creation, verification, and communication</li>
                <li><strong>Profile Information:</strong> Optional information you choose to provide</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-4">Files and Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Uploaded Files:</strong> Spreadsheets (CSV, Excel) you upload for analysis</li>
                <li><strong>Analysis Results:</strong> The insights and summaries generated from your files</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-4">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device and browser information</li>
                <li>IP address and approximate location</li>
                <li>Usage patterns and feature interactions</li>
                <li>Error logs for troubleshooting</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Provide the Service:</strong> Process your spreadsheet analyses and deliver insights</li>
                <li><strong>Improve the Platform:</strong> Analyze usage patterns to enhance features and performance</li>
                <li><strong>Communicate:</strong> Send you important updates, security alerts, and support messages</li>
                <li><strong>Billing:</strong> Process payments and manage subscriptions (via Paddle)</li>
                <li><strong>Security:</strong> Detect and prevent fraud, abuse, and unauthorized access</li>
                <li><strong>Legal Compliance:</strong> Meet our legal obligations and respond to lawful requests</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Payment Processing</h2>
              <p>
                <strong>All payments are handled by Paddle</strong>, our Merchant of Record. When you make a purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment information is processed directly by Paddle</li>
                <li>We do not store your full credit card details</li>
                <li>Paddle may collect billing address, payment method details, and transaction history</li>
                <li>Paddle's privacy policy governs how they handle your payment information</li>
              </ul>
              <p className="mt-2">
                For more information, visit{" "}
                <a href="https://paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Paddle's Privacy Policy
                </a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
              <p>We implement robust security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption in Transit:</strong> All data is encrypted using TLS/SSL</li>
                <li><strong>Encryption at Rest:</strong> Stored data is encrypted using industry-standard encryption</li>
                <li><strong>Secure Authentication:</strong> Multi-factor authentication and secure password hashing</li>
                <li><strong>Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
                <li><strong>Regular Audits:</strong> Periodic security reviews and vulnerability assessments</li>
              </ul>
              <p>
                However, no method of transmission over the Internet or electronic storage is 100% secure. 
                We cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Data:</strong> Retained for as long as your account is active</li>
                <li><strong>Uploaded Files:</strong> Processed and deleted within 24 hours of analysis</li>
                <li><strong>Analysis Results:</strong> Retained according to your subscription plan (Pro: 90 days, Business: unlimited)</li>
                <li><strong>After Deletion:</strong> We will delete your data within 30 days of account deletion request</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. International Data Transfer</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                These countries may have different data protection laws. By using our Service, you consent to 
                the transfer of your information to these countries.
              </p>
              <p>
                We ensure appropriate safeguards are in place to protect your information in accordance with 
                this Privacy Policy and applicable data protection laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, contact us at{" "}
                <a href="mailto:murtazamahboob7@gmail.com" className="text-primary hover:underline">
                  murtazamahboob7@gmail.com
                </a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain your session and authentication state</li>
                <li>Remember your preferences</li>
                <li>Analyze usage patterns to improve the Service</li>
                <li>Provide security features</li>
              </ul>
              <p>
                You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. 
                However, some features may not function properly without cookies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">10. Third-Party Services</h2>
              <p>We may share information with the following third parties:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Paddle:</strong> Payment processing</li>
                <li><strong>Cloud Infrastructure:</strong> Data storage and processing</li>
                <li><strong>AI Services:</strong> Spreadsheet analysis (data is processed securely)</li>
                <li><strong>Analytics:</strong> Usage analysis and improvement</li>
              </ul>
              <p>
                These third parties are bound by contractual obligations to keep personal information confidential 
                and use it only for the purposes for which we disclose it to them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">11. Children's Privacy</h2>
              <p>
                Our Service is not intended for anyone under 18 years of age. We do not knowingly collect personal 
                information from children under 18. If we learn we have collected such information, we will delete 
                it promptly. If you believe we have collected information from a child under 18, please contact us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to 
                review this page periodically.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">13. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or your personal data, please contact us:
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
                <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
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

export default Privacy;
