
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface ExerciseVideoProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export function ExerciseVideo({ title, description, videoUrl, thumbnailUrl }: ExerciseVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById(title.replace(/\s+/g, '-').toLowerCase()) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card">
      <div className="relative aspect-video overflow-hidden">
        <video 
          id={title.replace(/\s+/g, '-').toLowerCase()}
          src={videoUrl}
          poster={thumbnailUrl}
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute inset-0 m-auto bg-background/30 backdrop-blur-sm text-primary-foreground hover:bg-background/40 rounded-full w-12 h-12"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
