import { Truck, Shield, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 400EGP",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated support",
  },
  {
    icon: CreditCard,
    title: "Easy Returns",
    description: "30-day guarantee!",
  },
];

const Badges = () => {
  return (
    <section className="py-12 bg-[#a8dadc]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="flex-shrink-0 p-3 rounded-full bg-[#457b9d]">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-[#1d3557]">{feature.title}</h4>
                <p className="text-[#457b9d]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Badges