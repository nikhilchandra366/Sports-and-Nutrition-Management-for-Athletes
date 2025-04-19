
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface SportGalleryProps {
  sportId: string;
}

export function SportGallery({ sportId }: SportGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportImages = async () => {
      try {
        // Using the correct table name that exists in our database
        const { data, error } = await supabase
          .from("sport_details")
          .select("image_urls")
          .eq("sport_category_id", sportId)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.image_urls) {
          // Handle the array of image URLs
          setImages(data.image_urls);
        }
      } catch (err) {
        console.error("Error fetching sport images:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sportId) {
      fetchSportImages();
    }
  }, [sportId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-video rounded-lg" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No images available for this sport yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg bg-muted aspect-video">
          <img
            src={`/images/${image}`}
            alt={`Sport image ${index + 1}`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              // Fallback to a placeholder if image doesn't exist
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60";
            }}
          />
        </div>
      ))}
    </div>
  );
}
