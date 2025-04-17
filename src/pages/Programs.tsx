
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar, ArrowRight, TrendingUp } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Training Programs</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover training programs tailored to your fitness goals and sport preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden transition-all hover:shadow-lg">
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
                <CardFooter>
                  <Button asChild variant="ghost" className="ml-auto group">
                    <a href={`/programs/${category.id}`}>
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Featured Programs</h2>
            <Button variant="outline" asChild>
              <a href="/programs/all">View All</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden">
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
        </section>
      </main>
    </div>
  );
};

export default Programs;
