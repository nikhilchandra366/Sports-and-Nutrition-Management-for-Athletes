import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SportDetails } from "@/components/sports/SportDetails";
import { SportGallery } from "@/components/sports/SportGallery";
import { SportDietPlan } from "@/components/sports/SportDietPlan";
import { BadmintonCourt } from "@/components/sports/BadmintonCourt";

interface SportCategory {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
}

const SportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [sport, setSport] = useState<SportCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSportData = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from("sport_categories")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setSport(data);
      } catch (error) {
        console.error("Error fetching sport data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load sport data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSportData();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Sport Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  The sport you're looking for doesn't exist or has been removed.
                </p>
                <Button asChild>
                  <a href="/">Return Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <a href="/" className="text-primary hover:underline">
            ← Back to Home
          </a>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
            <img src={`/icons/${sport.icon_url}`} alt={sport.name} className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{sport.name}</h1>
            <p className="text-muted-foreground">{sport.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <SportDetails sportId={id || ''} />
          
          {sport.name.toLowerCase() === "badminton" && (
            <BadmintonCourt />
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Image Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <SportGallery sportId={id || ''} />
            </CardContent>
          </Card>
          
          <SportDietPlan sportId={id || ''} sportName={sport.name} />
          
          <Card>
            <CardHeader>
              <CardTitle>Training Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Discover training programs specific to {sport.name}:</p>
              <Button asChild>
                <a href={`/programs/${id}`}>View Training Programs</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SportDetail;
