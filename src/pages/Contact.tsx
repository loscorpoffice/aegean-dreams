import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { toast } from "sonner";
import coastalView from "@/assets/coastal-view.jpg";
import aboutTerrace from "@/assets/about-terrace.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <PageHero
        title="Contact & Book"
        subtitle="Get in Touch"
        backgroundImage={coastalView}
        showBookButton={false}
      >
        <p className="text-white/80 max-w-2xl mx-auto mt-4 text-center animate-slide-up animation-delay-300">
          Get in touch with us to book your dream getaway at Greece in Blue. We're here to assist you with any inquiries or reservations.
        </p>
      </PageHero>

      {/* Contact Info Cards */}
      <section className="container-resort py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card rounded-lg p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a href="tel:+919087884841" className="font-medium hover:text-primary block">
                +91 90878-84841
              </a>
            </div>
          </div>

          <div className="glass-card rounded-lg p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:info@greeceinblue.com" className="font-medium hover:text-primary">
                info@greeceinblue.com
              </a>
            </div>
          </div>

          <div className="glass-card rounded-lg p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">Anaikatti Hills, Coimbatore</p>
              <p className="text-sm text-muted-foreground">Tamil Nadu, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container-resort pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Form */}
          <div>
            <h2 className="font-heading text-2xl text-foreground mb-8">
              Send us a Message or Book Your Stay
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message or booking details"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2"
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <img
              src={aboutTerrace}
              alt="Greece in Blue Resort"
              className="w-full h-auto rounded-lg shadow-soft-lg"
            />
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="bg-wave-pattern py-12">
        <div className="container-resort text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Prefer to call? Reach us directly to book your stay.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-primary-foreground" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-primary-foreground" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-primary-foreground" />
            </a>
          </div>

          <Button variant="gold" size="xl" asChild>
            <a href="tel:+919087884841" className="flex items-center gap-2">
              Call: 90878-84841
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Button>
        </div>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default Contact;