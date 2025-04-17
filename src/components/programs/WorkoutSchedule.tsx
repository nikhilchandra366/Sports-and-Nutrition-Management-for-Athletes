
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarPlus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WorkoutSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [workouts, setWorkouts] = useState<Record<string, string[]>>({});
  const [newWorkout, setNewWorkout] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const dateString = date ? date.toISOString().split('T')[0] : '';
  const workoutsForDate = workouts[dateString] || [];

  const addWorkout = () => {
    if (!date || !newWorkout.trim()) return;
    
    const dateStr = date.toISOString().split('T')[0];
    const updatedWorkouts = {
      ...workouts,
      [dateStr]: [...(workouts[dateStr] || []), newWorkout]
    };
    
    setWorkouts(updatedWorkouts);
    setNewWorkout("");
    setWorkoutNotes("");
    setOpen(false);
    
    toast({
      title: "Workout scheduled",
      description: `${newWorkout} added for ${date.toLocaleDateString()}`,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Workout Calendar</CardTitle>
          <CardDescription>Schedule and track your workouts</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {workoutsForDate.length 
              ? `${workoutsForDate.length} workout${workoutsForDate.length > 1 ? 's' : ''} scheduled` 
              : 'No workouts scheduled'}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add Workout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Workout</DialogTitle>
                <DialogDescription>
                  Add a new workout for {date?.toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="workout">Workout Name</Label>
                  <Input
                    id="workout"
                    value={newWorkout}
                    onChange={(e) => setNewWorkout(e.target.value)}
                    placeholder="e.g., Upper Body Strength"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={workoutNotes}
                    onChange={(e) => setWorkoutNotes(e.target.value)}
                    placeholder="Add details about your workout..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={addWorkout}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Workouts</CardTitle>
          <CardDescription>
            {date 
              ? `Workouts for ${date.toLocaleDateString()}`
              : 'Select a date to view workouts'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {workoutsForDate.length > 0 ? (
            <div className="space-y-4">
              {workoutsForDate.map((workout, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-md">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{workout}</h4>
                    <p className="text-sm text-muted-foreground">
                      {date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-4">No workouts scheduled for this day</p>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Add Workout
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
