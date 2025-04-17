
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AddFoodDialog } from "./AddFoodDialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoodItem {
  id: string;
  name: string;
  serving_size: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

interface MealItem {
  id: string;
  food_item: FoodItem;
  quantity: number;
}

interface Meal {
  id: string;
  meal_type: string;
  items: MealItem[];
}

export function TodaysMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  const refreshMeals = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from("user_meals")
          .select(`
            id,
            meal_type,
            meal_items:meal_items(
              id,
              quantity,
              food_item:food_items(*)
            )
          `)
          .eq("user_id", session.user.id)
          .eq("meal_date", today);

        if (error) throw error;

        // Transform the data to the expected format
        const formattedMeals = data?.map(meal => ({
          id: meal.id,
          meal_type: meal.meal_type,
          items: meal.meal_items || []
        })) || [];

        setMeals(formattedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load today's meals",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [refreshTrigger, toast]);

  const handleRemoveItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("meal_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      
      toast({
        title: "Item removed",
        description: "Food item removed from meal",
      });
      
      refreshMeals();
    } catch (error) {
      console.error("Error removing food item:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove food item",
      });
    }
  };

  const formatMealType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return "☕";
      case 'lunch':
        return "🍽️";
      case 'dinner':
        return "🍴";
      case 'snack':
        return "🥨";
      default:
        return "🍕";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {['breakfast', 'lunch', 'dinner'].map((mealType) => {
          const meal = meals.find(m => m.meal_type === mealType);
          
          return (
            <Card key={mealType}>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <span className="mr-2">{getMealIcon(mealType)}</span>
                  <CardTitle className="text-lg">{formatMealType(mealType)}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                {meal && meal.items && meal.items.length > 0 ? (
                  meal.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <div>
                        <span>{item.food_item.name} (x{item.quantity})</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{Math.round(item.food_item.calories * item.quantity)} kcal</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground py-2">No items logged</p>
                )}
              </CardContent>
              <CardFooter>
                <AddFoodDialog onFoodAdded={refreshMeals} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
