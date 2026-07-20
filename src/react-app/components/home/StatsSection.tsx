import { Award, Calendar, Heart, Users } from "lucide-react";
import { STATS } from "../../data/constants";

const iconMap = {
  users: Users,
  calendar: Calendar,
  award: Award,
  heart: Heart,
};

export default function StatsSection() {
  return (
    <section
      className="bg-white py-10 border-y border-border"
      data-testid="stats-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <div key={i} className="text-center" data-testid={`stat-${i}`}>
                <div className="flex justify-center mb-2">
                  {Icon && <Icon size={24} className="text-brand-green" />}
                </div>
                <p className="stat-number">{stat.number}</p>
                <p className="text-brand-muted text-sm font-semibold mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
