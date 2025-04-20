
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TennisCourt() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tennis Court Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/63958166-842e-4113-aeb7-28ca2631586b.png"
              alt="Tennis Court Dimensions"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Court Length</h3>
              <p className="text-muted-foreground">
                - Total Length: 23.77 meters
                <br />
                - Service Line: 6.4 meters
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Court Width</h3>
              <p className="text-muted-foreground">
                - Singles: 8.23 meters
                <br />
                - Doubles: 10.97 meters
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
