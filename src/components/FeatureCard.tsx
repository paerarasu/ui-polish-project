import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/30">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
      <div className="relative p-8">
        <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-4 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};
