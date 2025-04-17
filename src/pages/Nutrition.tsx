
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PieChart, Coffee, Utensils, Clock } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  serving_size: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
}

interface UserMeal {
  id: string;
  user_id: string;
  meal_type: string;
  meal_date: string;
  items?: MealItem[];
}

interface MealItem {
  id: string;
  meal_id: string;
  food_item_id: string;
  quantity: number;
  food_item?: FoodItem;
}

const Nutrition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [todayMeals, setTodayMeals] = useState<UserMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock nutrition data for demonstration
  const nutritionSummary = {
    calories: { consumed: 1450, target: 2000 },
    protein: { consumed: 85, target: 140 },
    carbs: { consumed: 160, target: 200 },
    fat: { consumed: 45, target: 65 },
  };

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch food database items
        const { data: foodData, error: foodError } = await supabase
          .from("food_items")
          .select("*")
          .limit(20);
        
        if (foodError) throw foodError;
        setFoodItems(foodData || []);

        // Fetch user's meals for today
        const { data: session } = await supabase.auth.getSession();
        if (session.session?.user?.id) {
          const { data: mealsData, error: mealsError } = await supabase
            .from("user_meals")
            .select(`*, items:meal_items(*, food_item:food_items(*))`)
            .eq("user_id", session.session.user.id)
            .eq("meal_date", today);
          
          if (mealsError) throw mealsError;
          setTodayMeals(mealsData || []);
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load nutrition data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [toast]);

  const filteredFoodItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculatePercentage = (consumed: number, target: number) => {
    return Math.min(Math.round((consumed / target) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Nutrition Tracker</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your daily nutrition, plan meals, and reach your dietary goals
            </p>
          </div>

          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="tracker">Daily Tracker</TabsTrigger>
              <TabsTrigger value="foods">Food Database</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracker">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Nutrition</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Calories</div>
                          <div>{nutritionSummary.calories.consumed} / {nutritionSummary.calories.target} kcal</div>
                        </div>
                        <Progress value={calculatePercentage(nutritionSummary.calories.consumed, nutritionSummary.calories.target)} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div>Protein</div>
                            <div>{nutritionSummary.protein.consumed}g</div>
                          </div>
                          <Progress value={calculatePercentage(nutritionSummary.protein.consumed, nutritionSummary.protein.target)} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div>Carbs</div>
                            <div>{nutritionSummary.carbs.consumed}g</div>
                          </div>
                          <Progress value={calculatePercentage(nutritionSummary.carbs.consumed, nutritionSummary.carbs.target)} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div>Fat</div>
                            <div>{nutritionSummary.fat.consumed}g</div>
                          </div>
                          <Progress value={calculatePercentage(nutritionSummary.fat.consumed, nutritionSummary.fat.target)} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
                      <Card key={mealType}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            {mealType === 'Breakfast' && <Coffee className="h-4 w-4 mr-2" />}
                            {mealType === 'Lunch' && <Utensils className="h-4 w-4 mr-2" />}
                            {mealType === 'Dinner' && <Clock className="h-4 w-4 mr-2" />}
                            <CardTitle className="text-lg">{mealType}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          {todayMeals.find(meal => meal.meal_type === mealType.toLowerCase())?.items?.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <span>{item.food_item?.name}</span>
                              <span>{item.food_item?.calories && Math.round(item.food_item.calories * item.quantity)} kcal</span>
                            </div>
                          )) || <p className="text-muted-foreground">No items logged</p>}
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="w-full">
                            Add Food
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Nutrient Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div className="w-48 h-48 flex items-center justify-center">
                        <PieChart className="h-32 w-32 opacity-70" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                        <span>Protein: {Math.round((nutritionSummary.protein.consumed * 4) / nutritionSummary.calories.consumed * 100)}%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                        <span>Carbs: {Math.round((nutritionSummary.carbs.consumed * 4) / nutritionSummary.calories.consumed * 100)}%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                        <span>Fat: {Math.round((nutritionSummary.fat.consumed * 9) / nutritionSummary.calories.consumed * 100)}%</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="foods">
              <div className="mb-6">
                <Input
                  placeholder="Search for foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFoodItems.map((food) => (
                  <Card key={food.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{food.name}</CardTitle>
                      <CardDescription>{food.serving_size}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Calories:</span>
                          <span className="font-medium">{food.calories} kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-medium">{food.protein_g}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs:</span>
                          <span className="font-medium">{food.carbs_g}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat:</span>
                          <span className="font-medium">{food.fat_g}g</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        Add to Meal
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Nutrition;
