import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Dining", path: "/dining" },
  { name: "Amenities", path: "/amenities" },
  { name: "Activities", path: "/activities" },
  { name: "Gallery", path: "/gallery" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-background"
      }`}
    >
      {/* Top bar with contact info */}
      <div className="hidden md:block border-b border-border/50">
        <div className="container-resort py-2 flex justify-end items-center gap-6 text-sm text-muted-foreground">
          <a href="tel:+919087884841" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-3 w-3" />
            +91 90878-84841
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-resort py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Greece In Blue Resort" className="h-10 md:h-12" />
            <span className="font-heading text-lg md:text-xl text-primary font-semibold tracking-wide">
              GREECE IN BLUE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-sm tracking-wide-custom transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Book Now CTA */}
          <div className="hidden lg:block">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-body text-base transition-colors ${
                    location.pathname === item.path
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="gold" className="mt-4 w-full" asChild>
                <Link to="/contact">Book Now</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}