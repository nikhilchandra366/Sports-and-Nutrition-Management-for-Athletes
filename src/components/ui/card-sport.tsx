
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SportCardProps {
  className?: string;
  title: string;
  description: string;
  icon: string;
  to: string;
}

export function SportCard({
  className,
  title,
  description,
  icon,
  to,
}: SportCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <a href={to} className="block h-full">
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <img
                src={`/icons/${icon}`}
                alt={title}
                className="h-6 w-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
      </a>
    </Card>
  );
}
