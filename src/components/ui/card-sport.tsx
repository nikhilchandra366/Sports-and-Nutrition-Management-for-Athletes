
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SportCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
}

export function SportCard({ title, description, icon, to }: SportCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
            <img src={`/icons/${icon}`} alt={title} className="w-6 h-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[60px] text-foreground/80">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="ml-auto group">
          <Link to={to}>
            Explore
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
