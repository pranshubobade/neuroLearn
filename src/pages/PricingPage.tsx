import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with essential accessibility tools at no cost.",
    features: [
      "5 AI conversions per day",
      "Basic text-to-speech",
      "Screen reader optimization",
      "Dyslexia-friendly reading mode",
      "Community support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "₹299",
    period: "/month",
    description: "Unlock the full power of AI-driven accessible learning.",
    features: [
      "Unlimited AI conversions",
      "Advanced neural text-to-speech",
      "Speech-to-text transcription",
      "Sign language avatar overlay",
      "Voice navigation",
      "AI study assistant",
      "Multi-language translation",
      "Accessibility dashboard",
      "Priority email support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Institution",
    price: "Custom",
    period: "pricing",
    description: "Enterprise-grade accessibility for schools and universities.",
    features: [
      "Everything in Starter",
      "Bulk student onboarding",
      "Admin dashboard & analytics",
      "Custom accessibility profiles",
      "Dedicated account manager",
      "API access for integration",
      "SLA & uptime guarantee",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        badge="Pricing"
        title="Simple, Transparent"
        highlight="Pricing"
        description="Start for free, upgrade when you're ready. Every plan includes our core accessibility features."
      />

      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8" ref={ref}>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className={`rounded-2xl p-6 border transition-colors card-hover relative ${
                  plan.highlighted
                    ? "bg-background border-primary glow-sm"
                    : "bg-background border-border hover:border-primary/30"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-primary text-primary-foreground px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold font-heading text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold font-heading text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="block">
                  <Button
                    variant={plan.highlighted ? "hero" : "hero-outline"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5">
            Need a Custom <span className="text-primary">Solution?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            We work with institutions to create tailored accessibility solutions. Contact us for a custom quote.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Contact Our Team <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default PricingPage;
