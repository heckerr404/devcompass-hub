import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: string;
  thumbnail: string;
  onPurchase: () => void;
}

export const CourseCard = ({
  title,
  description,
  price,
  instructor,
  duration,
  level,
  thumbnail,
  onPurchase
}: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 transition-smooth hover:border-secondary/50 hover:glow-purple animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold group-hover:gradient-text transition-smooth">
            {title}
          </h3>
          <span className="text-2xl font-bold text-primary">${price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded-full bg-muted">{level}</span>
          <span>{duration}</span>
          <span>by {instructor}</span>
        </div>
        
        <Button 
          onClick={onPurchase}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-smooth glow-cyan"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Purchase Course
        </Button>
      </div>
    </Card>
  );
};
