
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SportVideo } from "./SportVideo";

export function BadmintonCourt() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Badminton Court Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src="/lovable-uploads/38cb25bf-3620-4c62-ad78-d44bd8304edc.png"
                alt="Badminton Court Dimensions"
                className="w-full max-w-2xl rounded-lg shadow-md"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold">Court Length</h3>
                <p className="text-muted-foreground">
                  - Full Court: 13.40 meters
                  <br />
                  - Playing Area: 13.40m × 6.10m
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Court Width</h3>
                <p className="text-muted-foreground">
                  - Singles: 5.18 meters
                  <br />
                  - Doubles: 6.10 meters
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SportVideo
        videoId="tAS7rOKtpgQ"
        title="Badminton Training"
      />
    </div>
  );
}
