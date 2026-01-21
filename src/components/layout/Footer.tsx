import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-resort py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Greece In Blue Resort" className="h-10 brightness-0 invert" />
              <span className="font-heading text-xl font-semibold">
                GREECE IN BLUE
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              A Santorini-inspired luxury getaway nestled in the calm, breezy hills of Anaikatti. Experience the iconic blue-white charm right here in Tamil Nadu.
            </p>
          </div>

          {/* Resort Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Resort</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/rooms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Santorini Pool Rooms
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Barbie Themed Rooms
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Classic Santorini
                </Link>
              </li>
              <li>
                <Link to="/dining" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Events & Dining
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gallery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Amenities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p>Anaikatti Hills</p>
                  <p>Coimbatore, Tamil Nadu, India</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919087884841" className="text-sm hover:underline">
                  +91 90878-84841
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:info@greeceinblue.com"
                  className="text-sm hover:underline"
                >
                  info@greeceinblue.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Greece in Blue Resort, Coimbatore. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}