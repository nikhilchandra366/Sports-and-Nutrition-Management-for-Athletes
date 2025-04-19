
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SportCard } from "@/components/ui/card-sport";
import { Skeleton } from "@/components/ui/skeleton";

export function SportGrid() {
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const { data, error } = await supabase
          .from("sport_categories")
          .select("*")
          .order("name");

        if (error) throw error;
        setSports(data || []);
      } catch (error) {
        console.error("Error fetching sports:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load sports",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sports.map((sport) => (
        <SportCard
          key={sport.id}
          title={sport.name}
          description={sport.description || ""}
          icon={sport.icon_url || "placeholder.svg"}
          to={`/sport/${sport.id}`}
        />
      ))}
    </div>
  );
}
