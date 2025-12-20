import { UserPlus, Package, ShoppingBag, Truck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account as a buyer or seller",
    forRole: "both",
  },
  {
    icon: Package,
    title: "List Your Items",
    description: "Sellers add products with photos and descriptions",
    forRole: "seller",
  },
  {
    icon: ShoppingBag,
    title: "Browse & Order",
    description: "Buyers find items and place orders directly with sellers",
    forRole: "buyer",
  },
  {
    icon: Truck,
    title: "Complete Delivery",
    description: "Sellers handle delivery and buyers confirm receipt",
    forRole: "both",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1d3557]">How It Works</h2>
          <p className="text-[#457b9d] mt-2">Simple steps to start buying and selling</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="p-6 relative text-center border border-[#a8dadc]/30 rounded-xl bg-white "
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#e63946] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>

                <div className="mt-6 mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-[#457b9d]/10">
                    <Icon className="h-8 w-8 text-[#457b9d]" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#1d3557] mb-2">{step.title}</h3>
                <p className="text-[#457b9d] text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
