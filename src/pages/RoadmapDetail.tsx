import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BookOpen, Video, FileText, Code } from "lucide-react";
import { Loader2 } from "lucide-react";

const RoadmapDetail = () => {
  const { id } = useParams();

  const { data: roadmap, isLoading: roadmapLoading } = useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: nodes, isLoading: nodesLoading } = useQuery({
    queryKey: ["roadmap-nodes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmap_nodes")
        .select("*")
        .eq("roadmap_id", id)
        .order("position_y", { ascending: true })
        .order("position_x", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: courses } = useQuery({
    queryKey: ["roadmap-courses", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("roadmap_id", id);
      
      if (error) throw error;
      return data;
    },
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
      case "docs":
        return <FileText className="h-4 w-4" />;
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "practice":
      case "tutorial":
        return <Code className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const groupedNodes = nodes?.reduce((acc, node) => {
    if (!acc[node.level]) {
      acc[node.level] = [];
    }
    acc[node.level].push(node);
    return acc;
  }, {} as Record<string, typeof nodes>);

  if (roadmapLoading || nodesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Roadmap not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-smooth" />
            Back to Roadmaps
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">{roadmap.icon}</div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            {roadmap.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {roadmap.description}
          </p>
          <Badge className={getLevelColor(roadmap.category)} variant="outline">
            {roadmap.category}
          </Badge>
        </div>

        {/* Learning Path */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Learning Path</h2>
          
          {groupedNodes && Object.entries(groupedNodes).map(([level, levelNodes], levelIndex) => (
            <div key={level} className="mb-12" style={{ animationDelay: `${levelIndex * 100}ms` }}>
              <div className="flex items-center mb-6">
                <Badge className={`${getLevelColor(level)} text-lg px-4 py-2`} variant="outline">
                  {level.charAt(0).toUpperCase() + level.slice(1)} Level
                </Badge>
                <div className="flex-1 h-px bg-border ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelNodes.map((node, nodeIndex) => (
                  <Card 
                    key={node.id} 
                    className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-smooth hover:border-primary/50 hover:glow-cyan animate-fade-in"
                    style={{ animationDelay: `${(levelIndex * 100) + (nodeIndex * 50)}ms` }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-smooth" />
                    
                    <div className="relative">
                      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-smooth">
                        {node.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {node.description}
                      </p>

                      {node.resources && Array.isArray(node.resources) && node.resources.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-primary mb-2">Resources:</p>
                          {node.resources.map((resource: any, idx: number) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth group/link"
                            >
                              {getResourceIcon(resource.type)}
                              <span className="group-hover/link:underline">{resource.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Courses */}
        {courses && courses.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h2 className="text-3xl font-bold mb-8 text-center">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card 
                  key={course.id} 
                  className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 transition-smooth hover:border-primary/50 hover:glow-cyan animate-fade-in"
                  style={{ animationDelay: `${400 + (index * 50)}ms` }}
                >
                  {course.thumbnail_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.thumbnail_url} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <Badge className={getLevelColor(course.level)} variant="outline">
                      {course.level}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 mt-3 group-hover:gradient-text transition-smooth">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold gradient-text">
                        ${course.price}
                      </span>
                      <Link to="/courses">
                        <Button size="sm" className="group/btn">
                          View Course
                          <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover/btn:translate-x-1 transition-smooth" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RoadmapDetail;
