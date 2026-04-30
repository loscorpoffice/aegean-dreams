import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <PageHero
        title="Privacy Policy"
        subtitle="How Greece In Blue collects, uses, and protects your information"
        titleClassName="text-white"
      />
      <section className="container-resort py-16">
        <div className="prose prose-lg max-w-4xl mx-auto text-foreground space-y-8">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div>
            <h2 className="font-heading text-2xl mb-3">1. Introduction</h2>
            <p>
              Welcome to Greece In Blue ("we," "our," or "us"), a resort located in Anakkatti, Coimbatore, Tamil Nadu, India.
              We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains
              what information we collect, how we use it, and what rights you have in relation to it.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information when you interact with our website or services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, postal address, and government-issued ID details (for booking).</li>
              <li><strong>Booking Information:</strong> Check-in/check-out dates, room preferences, number of guests, and special requests.</li>
              <li><strong>Payment Information:</strong> Processed securely through third-party payment gateways. We do not store your card details.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information, and pages visited via cookies and analytics.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process reservations and provide hospitality services.</li>
              <li>To communicate with you regarding your booking, inquiries, or feedback.</li>
              <li>To send promotional offers and updates (only if you opt in).</li>
              <li>To improve our website, services, and guest experience.</li>
              <li>To comply with legal obligations and resort policies.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell or rent your personal information. We may share your data with trusted third parties such as
              payment processors, booking platforms, and government authorities when required by law.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">5. Cookies</h2>
            <p>
              Our website uses cookies to enhance browsing experience and analyze traffic. You can control cookies through
              your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">7. Your Rights</h2>
            <p>
              You have the right to access, update, or request deletion of your personal information. To exercise these
              rights, please contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">8. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not responsible for the privacy practices or content
              of those websites.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last
              updated" date.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <ul className="list-none pl-0 mt-2 space-y-1">
              <li><strong>Greece In Blue</strong></li>
              <li>Anakkatti, Coimbatore, Tamil Nadu, India</li>
              <li>Email: <a href="mailto:greeceinblue@gmail.com" className="text-primary hover:underline">greeceinblue@gmail.com</a></li>
              <li>Phone: <a href="tel:+919087884841" className="text-primary hover:underline">+91 90878-84841</a> / <a href="tel:+919087884842" className="text-primary hover:underline">+91 90878-84842</a></li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
