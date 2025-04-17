
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
import { Book, Award, Dumbbell, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SportDetailsProps {
  sportId: string;
}

interface SportDetail {
  id: string;
  sport_category_id: string;
  rules: string | null;
  regulations: string | null;
  training_drills: string | null;
  strategies: string | null;
  image_urls: string[] | null;
  created_at: string;
}

export function SportDetails({ sportId }: SportDetailsProps) {
  const [details, setDetails] = useState<SportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSportDetails = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("sport_details")
          .select("*")
          .eq("sport_category_id", sportId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setDetails(data as SportDetail);
      } catch (err) {
        console.error("Error fetching sport details:", err);
        setError("Failed to load sport details");
      } finally {
        setLoading(false);
      }
    };

    if (sportId) {
      fetchSportDetails();
    }
  }, [sportId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-60" />
      </div>
    );
  }

  if (error || !details) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No detailed information available for this sport yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sport Information</CardTitle>
        <CardDescription>
          Learn about rules, regulations, training methods, and strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Rules</span>
            </TabsTrigger>
            <TabsTrigger value="regulations" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Regulations</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              <span>Training</span>
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Strategies</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="space-y-4">
            <div className="prose max-w-none text-foreground">
              <p>{details.rules || "No rules information available."}</p>
            </div>
          </TabsContent>

          <TabsContent value="regulations" className="space-y-4">
            <div className="prose max-w-none text-foreground">
              <p>{details.regulations || "No regulations information available."}</p>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <div className="prose max-w-none text-foreground">
              <p>{details.training_drills || "No training information available."}</p>
            </div>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <div className="prose max-w-none text-foreground">
              <p>{details.strategies || "No strategies information available."}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
