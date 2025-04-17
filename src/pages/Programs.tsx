
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Calendar, ArrowRight, TrendingUp, Video, Activity } from "lucide-react";
import { ExerciseVideo } from "@/components/programs/ExerciseVideo";
import { WorkoutSchedule } from "@/components/programs/WorkoutSchedule";
import { PerformanceAnalytics } from "@/components/programs/PerformanceAnalytics";
import { DietPlans } from "@/components/programs/DietPlans";

interface SportCategory {
  id: string;
  name: string;
  description: string;
  icon_url: string;
}

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  sport_category_id: string;
  difficulty_level: string;
  duration_weeks: number;
  created_by: string;
  sport_category?: SportCategory;
}

const Programs = () => {
  const [sportCategories, setSportCategories] = useState<SportCategory[]>([]);
  const [featuredPrograms, setFeaturedPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sport categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("sport_categories")
          .select("*");

        if (categoriesError) throw categoriesError;
        setSportCategories(categoriesData || []);

        // Fetch featured programs
        const { data: programsData, error: programsError } = await supabase
          .from("training_programs")
          .select(`*, sport_category:sport_categories(*)`)
          .eq("is_public", true)
          .limit(6);

        if (programsError) throw programsError;
        setFeaturedPrograms(programsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load programs data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Sample exercise videos - would come from backend in a real app
  const exerciseVideos = [
    {
      title: "Proper Squat Form",
      description: "Learn the correct technique for barbell squats",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Deadlift Demonstration",
      description: "Master the deadlift with proper form",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Bench Press Tutorial",
      description: "Detailed guide to bench press technique",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2 gradient-text">Training Programs</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover training programs tailored to your fitness goals and sport preferences
            </p>
          </div>

          <Tabs defaultValue="programs" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-4">
              <TabsTrigger value="programs" className="flex items-center gap-1.5">
                <Dumbbell className="h-4 w-4" />
                <span className="hidden sm:inline">Programs</span>
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-1.5">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Exercises</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1.5">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sportCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden transition-all hover:shadow-lg bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                          <img src={`/icons/${category.icon_url}`} alt={category.name} className="w-6 h-6" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="min-h-[60px] text-foreground/80">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" className="group">
                        <a href={`/sport/${category.id}`}>
                          Sport Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                      <Button asChild variant="ghost" className="group">
                        <a href={`/programs/${category.id}`}>
                          Explore Programs
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Featured Programs</h2>
                  <Button variant="outline" asChild>
                    <a href="/programs/all">View All</a>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPrograms.map((program) => (
                    <Card key={program.id} className="overflow-hidden bg-card hover:shadow-md transition-all">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <div className="flex items-center">
                            <Dumbbell className="h-4 w-4 mr-1" />
                            <span>{program.sport_category?.name}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>{program.difficulty_level}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{program.duration_weeks} weeks</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{program.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-foreground/80">
                          {program.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <a href={`/programs/details/${program.id}`}>
                            View Program
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Exercise Demonstrations</h2>
                <p className="text-muted-foreground mb-6">
                  Watch professional demonstrations of key exercises to ensure proper form and technique
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exerciseVideos.map((video, index) => (
                    <ExerciseVideo
                      key={index}
                      title={video.title}
                      description={video.description}
                      videoUrl={video.videoUrl}
                      thumbnailUrl={video.thumbnailUrl}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Workout Scheduling</h2>
                <p className="text-muted-foreground mb-6">
                  Plan and track your workouts to stay consistent with your training program
                </p>
                
                <WorkoutSchedule />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Performance Analytics</h2>
                <p className="text-muted-foreground mb-6">
                  Track your progress and analyze your performance over time
                </p>
                
                <div className="space-y-8">
                  <PerformanceAnalytics />
                  
                  <div className="pt-4">
                    <h2 className="text-2xl font-semibold mb-4">Personalized Diet Plans</h2>
                    <p className="text-muted-foreground mb-6">
                      Nutrition plans tailored to your specific training goals and sport
                    </p>
                    
                    <DietPlans />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Programs;
