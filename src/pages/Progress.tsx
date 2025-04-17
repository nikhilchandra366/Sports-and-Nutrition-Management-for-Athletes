
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarDays, Target, TrendingUp, Weight } from "lucide-react";

interface ProgressMeasurement {
  id: string;
  user_id: string;
  measurement_date: string;
  weight: number;
  body_fat_percentage: number;
  chest_cm: number;
  waist_cm: number;
  hips_cm: number;
  biceps_cm: number;
  thighs_cm: number;
  notes: string;
}

interface UserGoal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  target_date: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  is_completed: boolean;
}

interface CompletedWorkout {
  id: string;
  completed_at: string;
  workout_title: string;
  duration_minutes: number;
  calories_burned: number;
}

const Progress = () => {
  const [measurements, setMeasurements] = useState<ProgressMeasurement[]>([]);
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<CompletedWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock progress data for demonstration
  const mockWeightData = [
    { date: "Jan", weight: 82 },
    { date: "Feb", weight: 80 },
    { date: "Mar", weight: 79 },
    { date: "Apr", weight: 77 },
    { date: "May", weight: 75 },
    { date: "Jun", weight: 74 },
  ];

  const mockBodyFatData = [
    { date: "Jan", bodyFat: 22 },
    { date: "Feb", bodyFat: 21 },
    { date: "Mar", bodyFat: 20 },
    { date: "Apr", bodyFat: 19 },
    { date: "May", bodyFat: 18 },
    { date: "Jun", bodyFat: 17 },
  ];

  const mockGoals = [
    { 
      id: "1", 
      title: "Lose 5kg", 
      target_value: 75, 
      current_value: 78, 
      is_completed: false,
      goal_type: "weight",
      target_date: "2023-12-31"
    },
    { 
      id: "2", 
      title: "Run 5K under 25 minutes", 
      target_value: 25, 
      current_value: 28, 
      is_completed: false,
      goal_type: "performance",
      target_date: "2023-11-30"
    },
    { 
      id: "3", 
      title: "Complete 3 workouts per week", 
      target_value: 12, 
      current_value: 12, 
      is_completed: true,
      goal_type: "habit",
      target_date: "2023-10-31"
    },
  ];

  const mockCompletedWorkouts = [
    { id: "1", completed_at: "2023-06-12", workout_title: "Full Body Strength", duration_minutes: 45, calories_burned: 320 },
    { id: "2", completed_at: "2023-06-10", workout_title: "HIIT Cardio", duration_minutes: 30, calories_burned: 280 },
    { id: "3", completed_at: "2023-06-08", workout_title: "Yoga Flow", duration_minutes: 60, calories_burned: 180 },
  ];

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // In a real implementation, this would fetch from the database
        // For now, we'll use the mock data
        setGoals(mockGoals as UserGoal[]);
        setRecentWorkouts(mockCompletedWorkouts as CompletedWorkout[]);
      } catch (error) {
        console.error("Error fetching progress data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load progress data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [toast]);

  const calculateGoalProgress = (current: number, target: number) => {
    // If goal is to decrease (e.g., weight loss), invert the calculation
    const isDecreaseGoal = current > target;
    
    if (isDecreaseGoal) {
      // Starting point is likely higher than current
      // Assuming starting point is about 10% higher than target
      const estimatedStart = target * 1.1;
      return Math.min(Math.round(((estimatedStart - current) / (estimatedStart - target)) * 100), 100);
    } else {
      // Goal is to increase (e.g., strength gain)
      return Math.min(Math.round((current / target) * 100), 100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Progress Tracking</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor your fitness journey, track measurements, and visualize your achievements
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Weight Progress</CardTitle>
                      <Weight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockWeightData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Add Measurement</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Workouts</CardTitle>
                      <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentWorkouts.map((workout) => (
                        <div key={workout.id} className="flex items-center gap-3 border-b pb-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{workout.workout_title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(workout.completed_at).toLocaleDateString()} • {workout.duration_minutes} min • {workout.calories_burned} kcal
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Workouts</Button>
                  </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Goals</CardTitle>
                      <Target className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {goals.map((goal) => (
                        <Card key={goal.id} className={`border ${goal.is_completed ? 'border-green-500' : 'border-gray-200'}`}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            <CardDescription>
                              Target: {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'Ongoing'}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex flex-col space-y-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{goal.current_value}</span>
                                <span>{goal.target_value}</span>
                              </div>
                              <div className="w-full bg-primary/20 rounded-full h-2 mb-3">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${calculateGoalProgress(goal.current_value, goal.target_value)}%` }}
                                />
                              </div>
                              <span className={`text-xs ${goal.is_completed ? 'text-green-500' : 'text-muted-foreground'}`}>
                                {goal.is_completed 
                                  ? 'Goal Completed!' 
                                  : `${calculateGoalProgress(goal.current_value, goal.target_value)}% complete`}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full">Add New Goal</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="measurements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockWeightData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Body Fat Percentage</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockBodyFatData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Body Measurements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Date</th>
                            <th className="text-right py-3 px-2">Weight (kg)</th>
                            <th className="text-right py-3 px-2">Body Fat (%)</th>
                            <th className="text-right py-3 px-2">Chest (cm)</th>
                            <th className="text-right py-3 px-2">Waist (cm)</th>
                            <th className="text-right py-3 px-2">Hips (cm)</th>
                            <th className="text-right py-3 px-2">Arms (cm)</th>
                            <th className="text-right py-3 px-2">Thighs (cm)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">Jun 10, 2023</td>
                            <td className="text-right py-3 px-2">74</td>
                            <td className="text-right py-3 px-2">17</td>
                            <td className="text-right py-3 px-2">92</td>
                            <td className="text-right py-3 px-2">80</td>
                            <td className="text-right py-3 px-2">95</td>
                            <td className="text-right py-3 px-2">35</td>
                            <td className="text-right py-3 px-2">55</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">May 10, 2023</td>
                            <td className="text-right py-3 px-2">75</td>
                            <td className="text-right py-3 px-2">18</td>
                            <td className="text-right py-3 px-2">93</td>
                            <td className="text-right py-3 px-2">81</td>
                            <td className="text-right py-3 px-2">96</td>
                            <td className="text-right py-3 px-2">34.5</td>
                            <td className="text-right py-3 px-2">56</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">Apr 10, 2023</td>
                            <td className="text-right py-3 px-2">77</td>
                            <td className="text-right py-3 px-2">19</td>
                            <td className="text-right py-3 px-2">94</td>
                            <td className="text-right py-3 px-2">83</td>
                            <td className="text-right py-3 px-2">97</td>
                            <td className="text-right py-3 px-2">34</td>
                            <td className="text-right py-3 px-2">56.5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add New Measurement</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="goals">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Your Fitness Goals</CardTitle>
                      <Button>Add New Goal</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockGoals.map((goal, index) => (
                        <Card key={index} className={`border ${goal.is_completed ? 'border-green-500' : 'border-gray-200'}`}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{goal.title}</CardTitle>
                                <CardDescription>
                                  Target date: {new Date(goal.target_date).toLocaleDateString()}
                                </CardDescription>
                              </div>
                              <div className={`px-2 py-1 rounded text-xs ${
                                goal.is_completed 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {goal.is_completed ? 'Completed' : 'In Progress'}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex flex-col space-y-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Current: {goal.current_value}</span>
                                <span>Target: {goal.target_value}</span>
                              </div>
                              <div className="w-full bg-primary/20 rounded-full h-2 mb-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${calculateGoalProgress(goal.current_value, goal.target_value)}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {goal.is_completed 
                                  ? 'Goal Completed!' 
                                  : `${calculateGoalProgress(goal.current_value, goal.target_value)}% complete`}
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Update Progress</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goal Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                            <Weight className="h-8 w-8 text-blue-500" />
                          </div>
                          <span className="text-sm font-medium">Weight</span>
                          <span className="text-xs text-muted-foreground">1 Goal</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                          </div>
                          <span className="text-sm font-medium">Performance</span>
                          <span className="text-xs text-muted-foreground">1 Goal</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                            <CalendarDays className="h-8 w-8 text-green-500" />
                          </div>
                          <span className="text-sm font-medium">Habit</span>
                          <span className="text-xs text-muted-foreground">1 Goal</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goal Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Total Goals</span>
                          <span className="text-2xl font-bold">3</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium">Completion Rate</span>
                          <span className="text-2xl font-bold">33%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed</span>
                          <span>1/3</span>
                        </div>
                        <div className="w-full bg-primary/20 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Progress;
