
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CricketGround() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cricket Ground Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/1673a9b0-fc12-4bf0-9218-a09d338ce82e.png"
              alt="Cricket Ground Dimensions"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Ground Dimensions</h3>
              <p className="text-muted-foreground">
                - Boundary (Long): 85-90 meters
                <br />
                - Boundary (Square): 70-75 meters
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Pitch Details</h3>
              <p className="text-muted-foreground">
                - Length: 20.12 meters
                <br />
                - Width: 3.05 meters
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
