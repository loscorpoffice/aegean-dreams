import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import coastalView from "@/assets/coastal-view.jpg";

const TermsOfService = () => {
  return (
    <Layout>
      <PageHero
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        backgroundImage={coastalView}
        showBookButton={false}
        titleClassName="text-white"
      />
      <section className="container-resort py-16">
        <div className="prose prose-lg max-w-4xl mx-auto text-foreground space-y-8">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div>
            <h2 className="font-heading text-2xl mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Greece In Blue website, making a booking, or staying at our resort located in
              Anakkatti, Coimbatore, Tamil Nadu, India, you agree to be bound by these Terms of Service. If you do not
              agree, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">2. Bookings & Reservations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All bookings are subject to availability and confirmation by Greece In Blue.</li>
              <li>Guests must be at least 18 years old to make a reservation.</li>
              <li>A valid government-issued photo ID is required at check-in for all guests.</li>
              <li>Rates are subject to change without prior notice and applicable taxes will be added.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">3. Check-In & Check-Out</h2>
            <p>
              Standard check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to
              availability and may incur additional charges.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">4. Payments</h2>
            <p>
              Payment may be required at the time of booking or check-in, depending on the rate plan selected. We accept
              major credit/debit cards, UPI, and bank transfers. All payments are processed securely through trusted
              third-party gateways.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">5. Cancellation & Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations made 7+ days before check-in: full refund (minus processing fees).</li>
              <li>Cancellations made 3–7 days before check-in: 50% refund.</li>
              <li>Cancellations made within 72 hours of check-in or no-shows: no refund.</li>
              <li>Refunds will be processed to the original payment method within 7–14 business days.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">6. Guest Conduct</h2>
            <p>
              Guests are expected to behave respectfully toward staff, other guests, and resort property. Greece In Blue
              reserves the right to refuse service or evict any guest engaging in unlawful, disruptive, or unsafe behavior
              without refund.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">7. Damages & Liability</h2>
            <p>
              Guests are responsible for any damage caused to resort property during their stay and may be charged
              accordingly. Greece In Blue is not liable for loss, theft, or damage to personal belongings.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">8. Use of Facilities</h2>
            <p>
              Use of pools, dining areas, activity zones, and other facilities is at the guest's own risk. Children must
              be supervised by an adult at all times. Specific facility rules and timings must be followed.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">9. Intellectual Property</h2>
            <p>
              All content on this website—including text, images, logos, and design—is the property of Greece In Blue and
              may not be copied, reproduced, or distributed without written permission.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">10. Privacy</h2>
            <p>
              Your use of our services is also governed by our{" "}
              <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">11. Force Majeure</h2>
            <p>
              Greece In Blue shall not be liable for any failure to perform its obligations due to events beyond its
              reasonable control, including natural disasters, government actions, pandemics, or strikes.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction
              of the courts in Coimbatore, Tamil Nadu.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon
              posting on this page.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl mb-3">14. Contact Us</h2>
            <p>For questions about these Terms of Service, please contact us at:</p>
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

export default TermsOfService;
