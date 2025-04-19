
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
}

export function SportDietPlan({ sportId, sportName }: SportDietPlanProps) {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        // Generate generic diet plan if no custom one exists
        const generateGenericDietPlan = (sportName: string) => {
          return {
            id: "generic",
            sport_category_id: sportId,
            general_guidance: `${sportName} athletes should focus on a balanced diet rich in complex carbohydrates, lean proteins, and healthy fats. Carbohydrates should make up about 45-65% of daily caloric intake to fuel training, while protein should be 15-25% to support muscle recovery. Stay well-hydrated throughout the day, especially before, during, and after training sessions.`,
            before_workout: `2-3 hours before: A balanced meal with complex carbs, some protein, and a little healthy fat (e.g., whole grain pasta with lean meat and vegetables).\n1 hour before: A light carbohydrate-rich snack (e.g., banana, toast with honey, or a small smoothie).`,
            during_workout: `For sessions longer than 60 minutes: Water mixed with electrolytes, sports drinks, or easily digestible carbohydrates like energy gels or chews (30-60g carbs per hour for high-intensity ${sportName.toLowerCase()}).`,
            after_workout: `Within 30 minutes: Protein and carbohydrates to aid recovery (20-25g protein, 50-100g carbohydrates). Examples include chocolate milk, a protein shake with fruit, or a balanced meal.`,
            rest_day: `Focus on nutrient-dense foods and possibly slightly reduce carbohydrate intake depending on activity level. This is a good time to ensure adequate intake of vegetables, fruits, and foods rich in micronutrients.`,
            competition_day: `Pre-competition: Familiar, easily digestible meal 3-4 hours before (rich in carbs, moderate protein, low fat and fiber).\nDuring: Hydration and quick energy as needed.\nPost-competition: Recovery nutrition with carbs and protein.`,
            recommended_foods: [
              "Whole grains (brown rice, quinoa, oats)",
              "Lean proteins (chicken, fish, tofu, eggs)",
              "Fruits and vegetables",
              "Healthy fats (avocados, nuts, olive oil)",
              "Dairy or alternatives (milk, yogurt)",
              "Hydration (water, sports drinks)"
            ],
            sample_meal_plan: `Breakfast: Oatmeal with fruit, nuts, and Greek yogurt\nSnack: Apple with almond butter\nLunch: Brown rice bowl with grilled chicken and mixed vegetables\nPre-workout: Banana and whole grain toast with honey\nPost-workout: Protein shake with banana and berries\nDinner: Salmon, sweet potato, and steamed vegetables\nEvening snack: Greek yogurt with berries`
          };
        };

        // Check if custom diet plans exist in database
        const { data, error } = await supabase
          .from("sport_diet_plans")
          .select("*")
          .eq("sport_category_id", sportId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching diet plan:", error);
          throw error;
        }

        // Use custom plan if exists, otherwise generate generic one
        if (data) {
          setDietPlan(data as DietPlan);
        } else {
          setDietPlan(generateGenericDietPlan(sportName));
        }
      } catch (err) {
        console.error("Error handling diet plan:", err);
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
              <p>{dietPlan.general_guidance}</p>
            </div>
          </TabsContent>

          <TabsContent value="timing" className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Before Workout/Training</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan.before_workout}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">During Workout/Training</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan.during_workout}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">After Workout/Training</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan.after_workout}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Rest Days</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan.rest_day}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Competition/Game Day</h3>
                <p className="whitespace-pre-line text-muted-foreground">{dietPlan.competition_day}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="foods" className="space-y-4">
            <div className="prose max-w-none">
              <ul className="space-y-2">
                {dietPlan.recommended_foods.map((food, index) => (
                  <li key={index} className="text-foreground">{food}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="sample" className="space-y-4">
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-foreground">{dietPlan.sample_meal_plan}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
