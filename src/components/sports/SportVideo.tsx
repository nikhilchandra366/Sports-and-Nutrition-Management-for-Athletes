
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface SportVideoProps {
  videoId: string;
  title: string;
}

export function SportVideo({ videoId, title }: SportVideoProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div 
            className="relative cursor-pointer group"
            onClick={handleClick}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full rounded-lg transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded-full p-4">
                <Play className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
