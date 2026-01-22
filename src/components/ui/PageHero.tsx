import { ReactNode } from "react";
import { WaveDivider } from "./WaveDivider";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  showBookButton?: boolean;
  children?: ReactNode;
  titleClassName?: string;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  showBookButton = true,
  children,
  titleClassName,
}: PageHeroProps) {
  return (
    <section className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className={`font-heading text-4xl md:text-5xl lg:text-6xl italic mb-4 animate-slide-up ${titleClassName || 'text-foreground'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up animation-delay-200">
            {subtitle}
          </p>
        )}
        {showBookButton && (
          <Button variant="gold" size="lg" className="mt-8 animate-slide-up animation-delay-400" asChild>
            <Link to="/contact">Book Now</Link>
          </Button>
        )}
        {children}
      </div>

      {/* Wave Divider */}
      <WaveDivider variant="bottom" className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}
