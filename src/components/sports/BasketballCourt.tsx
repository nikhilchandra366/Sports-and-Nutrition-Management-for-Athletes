
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BasketballCourt() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basketball Court Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/b653516e-a380-4086-9cce-2a4d4c63fad4.png"
              alt="Basketball Court Dimensions"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Court Length</h3>
              <p className="text-muted-foreground">
                - Full Court: 28 meters
                <br />
                - Center Line: 5.80 meters
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Court Width</h3>
              <p className="text-muted-foreground">
                - Width: 15 meters
                <br />
                - Three-point Line: 6.75 meters from basket
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
