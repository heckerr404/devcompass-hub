import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredCourses = courses?.filter(course => 
    selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()
  );

  const handlePurchase = async (courseId: string, courseTitle: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase courses",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const { error } = await supabase
      .from("user_purchases")
      .insert({ user_id: user.id, course_id: courseId });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already Purchased",
          description: "You already own this course",
        });
      } else {
        toast({
          title: "Purchase Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Purchase Successful! 🎉",
        description: `You now have access to ${courseTitle}`,
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Premium Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn from industry experts with our comprehensive course catalog
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
                className="capitalize transition-smooth"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses?.map((course, index) => (
              <div key={course.id} style={{ animationDelay: `${index * 100}ms` }}>
                <CourseCard
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  price={parseFloat(course.price.toString())}
                  instructor={course.instructor}
                  duration={course.duration}
                  level={course.level}
                  thumbnail={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}
                  onPurchase={() => handlePurchase(course.id, course.title)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
