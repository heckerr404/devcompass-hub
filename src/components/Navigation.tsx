import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapIcon, BookOpen, User } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan">
              <MapIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">DevRoadmap</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                className="transition-smooth"
              >
                <MapIcon className="mr-2 h-4 w-4" />
                Roadmaps
              </Button>
            </Link>
            <Link to="/courses">
              <Button 
                variant={isActive("/courses") ? "default" : "ghost"}
                className="transition-smooth"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="transition-smooth glow-purple hover:glow-cyan">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
