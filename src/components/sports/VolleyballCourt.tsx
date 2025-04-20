
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VolleyballCourt() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volleyball Court Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/9e2e74a7-f9e2-4cdb-be2d-ab6d38fc280d.png"
              alt="Volleyball Court Dimensions"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Court Length</h3>
              <p className="text-muted-foreground">
                - Length: 18 meters
                <br />
                - Attack Line: 3 meters from center
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Court Width</h3>
              <p className="text-muted-foreground">
                - Width: 9 meters
                <br />
                - Net Height: 2.43 meters (men) / 2.24 meters (women)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
