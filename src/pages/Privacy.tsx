import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
                SheetSage.ai ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address when you create an account</li>
                <li>Billing information when you subscribe to a paid plan</li>
                <li>Profile information you choose to provide</li>
              </ul>
              <h3 className="text-lg font-medium text-foreground mt-4">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Files you upload for analysis (processed securely and deleted after analysis)</li>
                <li>Analysis history and preferences</li>
                <li>Device and browser information</li>
                <li>IP address and usage patterns</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our Service</li>
                <li>Process your spreadsheet analyses</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send you important updates and notifications</li>
                <li>Improve and personalize your experience</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Payment Processing</h2>
              <p>
                We use Paddle as our payment processor. When you make a purchase, your payment information is 
                processed directly by Paddle. We do not store your full credit card details. Paddle's privacy 
                policy governs how they handle your payment information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information, 
                including encryption in transit and at rest, secure authentication, and regular security audits. 
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide 
                you services. Uploaded files are processed and deleted within 24 hours. Analysis results are 
                retained according to your subscription plan.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain 
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                being sent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. Third-Party Services</h2>
              <p>
                Our Service may contain links to third-party websites or services. We are not responsible for the 
                privacy practices of these third parties. We encourage you to read their privacy policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">10. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 16. We do not knowingly collect personal information 
                from children under 16. If we learn we have collected such information, we will delete it promptly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at privacy@sheetsage.ai.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
