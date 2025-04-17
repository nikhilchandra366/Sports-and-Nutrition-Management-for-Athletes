
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddFoodDialogProps {
  onFoodAdded: () => void;
}

export function AddFoodDialog({ onFoodAdded }: AddFoodDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mealType, setMealType] = useState("breakfast");
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const { toast } = useToast();

  const fetchFoods = async () => {
    if (foodItems.length > 0) return;
    
    setLoadingFoods(true);
    try {
      const { data, error } = await supabase
        .from("food_items")
        .select("*")
        .order("name", { ascending: true });
      
      if (error) throw error;
      setFoodItems(data || []);
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load food items",
      });
    } finally {
      setLoadingFoods(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchFoods();
    }
  };

  const handleAddFood = async () => {
    if (!selectedFoodId || !mealType) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a food item and meal type",
      });
      return;
    }

    setLoading(true);
    try {
      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to add food to your meals",
        });
        return;
      }

      const userId = session.user.id;
      const today = new Date().toISOString().split('T')[0];

      // Check if meal exists for today
      const { data: existingMeals, error: mealsError } = await supabase
        .from("user_meals")
        .select("id")
        .eq("user_id", userId)
        .eq("meal_type", mealType)
        .eq("meal_date", today);

      if (mealsError) throw mealsError;

      let mealId;
      
      if (existingMeals && existingMeals.length > 0) {
        // Use existing meal
        mealId = existingMeals[0].id;
      } else {
        // Create new meal
        const { data: newMeal, error: createMealError } = await supabase
          .from("user_meals")
          .insert({
            user_id: userId,
            meal_type: mealType,
            meal_date: today
          })
          .select();

        if (createMealError) throw createMealError;
        mealId = newMeal[0].id;
      }

      // Add food item to meal
      const { error: addFoodError } = await supabase
        .from("meal_items")
        .insert({
          meal_id: mealId,
          food_item_id: selectedFoodId,
          quantity: parseFloat(quantity)
        });

      if (addFoodError) throw addFoodError;

      toast({
        title: "Food added",
        description: "Successfully added food to your meal",
      });

      // Reset form and close dialog
      setSelectedFoodId("");
      setQuantity("1");
      setIsOpen(false);
      
      // Trigger refresh
      onFoodAdded();
    } catch (error) {
      console.error("Error adding food:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add food to meal",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Food to Meal</DialogTitle>
          <DialogDescription>
            Select a food item and add it to your daily meal plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="meal-type">Meal Type</Label>
            <Select 
              value={mealType} 
              onValueChange={setMealType}
            >
              <SelectTrigger id="meal-type">
                <SelectValue placeholder="Select a meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="food-item">Food Item</Label>
            <Select 
              value={selectedFoodId} 
              onValueChange={setSelectedFoodId}
            >
              <SelectTrigger id="food-item">
                <SelectValue placeholder="Select a food item" />
              </SelectTrigger>
              <SelectContent>
                {loadingFoods ? (
                  <div className="flex items-center justify-center p-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Loading foods...</span>
                  </div>
                ) : (
                  foodItems.map(food => (
                    <SelectItem key={food.id} value={food.id}>
                      {food.name} ({food.serving_size})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0.25"
              step="0.25"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddFood} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add to Meal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
