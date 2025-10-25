import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RoadmapCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const RoadmapCard = ({ id, title, description, icon, category }: RoadmapCardProps) => {
  return (
    <Link to={`/roadmap/${id}`}>
      <Card className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-smooth hover:border-primary/50 hover:glow-cyan cursor-pointer animate-fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-smooth" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">{icon}</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-smooth">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
            {category}
          </div>
        </div>
      </Card>
    </Link>
  );
};
