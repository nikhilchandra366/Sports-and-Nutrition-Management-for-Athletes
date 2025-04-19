import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Coffee, Salad, UtensilsCrossed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SportDietPlanProps {
  sportId: string;
  sportName: string;
}

interface DietPlan {
  id: string;
  sport_category_id: string;
  general_guidance: string;
  before_workout: string;
  during_workout: string;
  after_workout: string;
  rest_day: string;
  competition_day: string;
  recommended_foods: string[];
  sample_meal_plan: string;
  created_at: string;
}

export function SportDietPlan({ sportId, sportName }: SportDietPlanProps) {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("sport_diet_plans")
          .select("*")
          .eq("sport_category_id", sportId)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setDietPlan(data as DietPlan);
        } else {
          const genericPlan: DietPlan = {
            id: "generic",
            sport_category_id: sportId,
            general_guidance: `${sportName} athletes should focus on a balanced diet rich in complex carbohydrates, lean proteins, and healthy fats.`,
            before_workout: "2-3 hours before: A balanced meal with complex carbs and protein.",
            during_workout: "Stay hydrated and maintain energy levels with appropriate nutrition.",
            after_workout: "Within 30 minutes: Protein and carbohydrates for recovery.",
            rest_day: "Focus on nutrient-dense foods and maintain good hydration.",
            competition_day: "Pre-event: Familiar, easily digestible foods.\nDuring: Stay hydrated.\nPost: Recovery nutrition.",
            recommended_foods: [
              "Complex carbohydrates",
              "Lean proteins",
              "Fruits and vegetables",
              "Healthy fats",
              "Hydration"
            ],
            sample_meal_plan: "Breakfast: Balanced meal\nSnack: Light energy\nLunch: Protein with carbs\nPre-workout: Light snack\nPost-workout: Recovery\nDinner: Complete meal",
            created_at: new Date().toISOString()
          };
          setDietPlan(genericPlan);
        }
      } catch (err) {
        console.error("Error handling diet plan:", err);
        setError(err instanceof Error ? err.message : "Failed to load diet plan");
      } finally {
        setLoading(false);
      }
    };

    if (sportId && sportName) {
      fetchDietPlan();
    }
  }, [sportId, sportName]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-60" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!dietPlan) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No diet plan information available for this sport yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Nutrition Guide for {sportName}</CardTitle>
        <CardDescription>
          Optimize your performance with sport-specific nutrition recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="timing" className="flex items-center gap-2">
              <Coffee className="h-4 w-4" />
              <span>Meal Timing</span>
            </TabsTrigger>
            <TabsTrigger value="foods" className="flex items-center gap-2">
              <Salad className="h-4 w-4" />
              <span>Recommended Foods</span>
            </TabsTrigger>
            <TabsTrigger value="sample" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span>Sample Plan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="prose max-w-none text-foreground">
              <p>{dietPlan?.general_guidance}</p>
            </div>
          </TabsContent>

          <TabsContent value="timing" className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Before Workout/Training</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan?.before_workout}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">During Workout/Training</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan?.during_workout}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">After Workout/Training</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan?.after_workout}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Rest Days</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan?.rest_day}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Competition/Game Day</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan?.competition_day}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="foods" className="space-y-4">
            <div className="prose max-w-none">
              <ul className="space-y-2">
                {dietPlan?.recommended_foods.map((food, index) => (
                  <li key={index} className="text-foreground">{food}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="sample" className="space-y-4">
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-foreground">{dietPlan?.sample_meal_plan}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
