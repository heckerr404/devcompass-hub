import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { RoadmapCard } from "@/components/RoadmapCard";
import { Loader2 } from "lucide-react";

const Roadmaps = () => {
  const { data: roadmaps, isLoading } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmaps")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive roadmaps to guide your journey in tech. Select a path and start learning today.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps?.map((roadmap, index) => (
              <div key={roadmap.id} style={{ animationDelay: `${index * 100}ms` }}>
                <RoadmapCard
                  id={roadmap.id}
                  title={roadmap.title}
                  description={roadmap.description}
                  icon={roadmap.icon || "📚"}
                  category={roadmap.category}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Roadmaps;
