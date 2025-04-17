
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Utensils, Download, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MealProps {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  items: string[];
}

const Meal = ({ title, calories, protein, carbs, fat, time, items }: MealProps) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {time}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between text-sm mb-4">
        <div>
          <span className="font-medium">{calories}</span> kcal
        </div>
        <div>
          <span className="font-medium">{protein}g</span> protein
        </div>
        <div>
          <span className="font-medium">{carbs}g</span> carbs
        </div>
        <div>
          <span className="font-medium">{fat}g</span> fat
        </div>
      </div>
      <ul className="text-sm space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <Utensils className="h-3.5 w-3.5 mr-2 mt-0.5 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export function DietPlans() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sport-Specific Nutrition Plans</CardTitle>
        <CardDescription>Customized diet plans to optimize your performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strength">
          <TabsList>
            <TabsTrigger value="strength">Strength Training</TabsTrigger>
            <TabsTrigger value="endurance">Endurance</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
          </TabsList>
          
          <Alert className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Nutrition Plan</AlertTitle>
            <AlertDescription>
              This diet plan is designed to support your specific training goals. Always consult with a nutritionist for personalized advice.
            </AlertDescription>
          </Alert>
          
          <TabsContent value="strength" className="mt-4">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Daily Nutrition Overview</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Calories", value: "2800" },
                  { label: "Protein", value: "180g" },
                  { label: "Carbs", value: "320g" },
                  { label: "Fat", value: "75g" },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary rounded-lg px-4 py-3 flex-1 min-w-[120px]">
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-xl font-semibold mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="font-semibold mb-3">Meal Plan</h3>
            
            <Meal
              title="Breakfast"
              time="7:00 AM"
              calories={650}
              protein={40}
              carbs={70}
              fat={20}
              items={[
                "Protein oatmeal with banana and almond butter",
                "Greek yogurt with berries",
                "2 whole eggs"
              ]}
            />
            
            <Meal
              title="Mid-Morning Snack"
              time="10:00 AM"
              calories={300}
              protein={25}
              carbs={30}
              fat={5}
              items={[
                "Protein shake with banana",
                "Handful of mixed nuts"
              ]}
            />
            
            <Meal
              title="Lunch"
              time="1:00 PM"
              calories={750}
              protein={45}
              carbs={80}
              fat={20}
              items={[
                "6oz grilled chicken breast",
                "1 cup brown rice",
                "Roasted vegetables",
                "1 tbsp olive oil"
              ]}
            />
            
            <Meal
              title="Pre-Workout"
              time="4:00 PM"
              calories={350}
              protein={20}
              carbs={50}
              fat={5}
              items={[
                "1 large banana",
                "Whole grain toast with honey",
                "Protein bar"
              ]}
            />
            
            <Meal
              title="Dinner"
              time="7:00 PM"
              calories={750}
              protein={50}
              carbs={70}
              fat={25}
              items={[
                "8oz salmon fillet",
                "Sweet potato",
                "Steamed broccoli",
                "Quinoa salad"
              ]}
            />
          </TabsContent>
          
          <TabsContent value="endurance" className="mt-4">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Daily Nutrition Overview</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Calories", value: "3000" },
                  { label: "Protein", value: "150g" },
                  { label: "Carbs", value: "450g" },
                  { label: "Fat", value: "65g" },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary rounded-lg px-4 py-3 flex-1 min-w-[120px]">
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-xl font-semibold mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="font-semibold mb-3">Meal Plan</h3>
            
            <Meal
              title="Breakfast"
              time="6:00 AM"
              calories={700}
              protein={30}
              carbs={100}
              fat={15}
              items={[
                "Whole grain pancakes with maple syrup",
                "Scrambled eggs with spinach",
                "Fresh fruit bowl",
                "Low-fat milk"
              ]}
            />
            
            <Meal
              title="Mid-Morning Snack"
              time="9:00 AM"
              calories={300}
              protein={10}
              carbs={50}
              fat={5}
              items={[
                "Energy bar",
                "Banana",
                "Trail mix"
              ]}
            />
            
            <Meal
              title="Lunch"
              time="12:00 PM"
              calories={750}
              protein={40}
              carbs={100}
              fat={15}
              items={[
                "Whole wheat pasta with lean ground turkey",
                "Mixed vegetable salad",
                "Whole grain bread"
              ]}
            />
            
            <Meal
              title="Pre-Workout"
              time="3:00 PM"
              calories={400}
              protein={15}
              carbs={70}
              fat={5}
              items={[
                "Sports drink",
                "Rice cakes with honey",
                "Apple"
              ]}
            />
            
            <Meal
              title="Post-Workout"
              time="6:00 PM"
              calories={850}
              protein={55}
              carbs={100}
              fat={25}
              items={[
                "Grilled chicken breast",
                "Baked potato with Greek yogurt",
                "Steamed vegetables",
                "Quinoa"
              ]}
            />
          </TabsContent>
          
          <TabsContent value="recovery" className="mt-4">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Daily Nutrition Overview</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Calories", value: "2500" },
                  { label: "Protein", value: "160g" },
                  { label: "Carbs", value: "280g" },
                  { label: "Fat", value: "80g" },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary rounded-lg px-4 py-3 flex-1 min-w-[120px]">
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-xl font-semibold mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="font-semibold mb-3">Recovery Meal Plan</h3>
            
            <Meal
              title="Breakfast"
              time="8:00 AM"
              calories={600}
              protein={35}
              carbs={60}
              fat={20}
              items={[
                "Vegetable omelet with avocado",
                "Whole grain toast",
                "Berries and Greek yogurt"
              ]}
            />
            
            <Meal
              title="Mid-Morning"
              time="11:00 AM"
              calories={300}
              protein={20}
              carbs={30}
              fat={10}
              items={[
                "Protein shake with almond milk",
                "Apple with almond butter"
              ]}
            />
            
            <Meal
              title="Lunch"
              time="1:30 PM"
              calories={650}
              protein={40}
              carbs={70}
              fat={20}
              items={[
                "Grilled salmon",
                "Sweet potato",
                "Green leafy salad with olive oil dressing",
                "Quinoa"
              ]}
            />
            
            <Meal
              title="Afternoon Snack"
              time="4:00 PM"
              calories={300}
              protein={15}
              carbs={40}
              fat={10}
              items={[
                "Tart cherry juice",
                "Mixed nuts",
                "Whole grain crackers"
              ]}
            />
            
            <Meal
              title="Dinner"
              time="7:00 PM"
              calories={650}
              protein={50}
              carbs={60}
              fat={20}
              items={[
                "Lean beef or tofu stir-fry",
                "Brown rice",
                "Steamed vegetables",
                "Turmeric tea"
              ]}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Updated as of April 2025</p>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
