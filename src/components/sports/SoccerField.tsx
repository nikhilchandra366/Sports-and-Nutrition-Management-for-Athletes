
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SoccerField() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Soccer Field Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/b97de688-0cce-4bb9-a25c-80a9efbf512b.png"
              alt="Soccer Field Dimensions"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Field Length</h3>
              <p className="text-muted-foreground">
                - Length: 90-120 meters
                <br />
                - Penalty Area: 16.5 meters
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Field Width</h3>
              <p className="text-muted-foreground">
                - Width: 45-90 meters
                <br />
                - Goal Area: 5.5 meters
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
