
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SportGrid } from "@/components/sports/SportGrid";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Your Complete Sports & Fitness Companion
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover training programs, nutrition plans, and techniques tailored to your favorite sports.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/auth">Get Started</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/community">Join Community</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Sports Section */}
        <section className="py-12">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Explore Sports</h2>
            <p className="text-muted-foreground">
              Find detailed information, training resources, and nutrition guides for your favorite sports
            </p>
          </div>
          
          <SportGrid />
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Athlete Aligned</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Programs</CardTitle>
                <CardDescription>
                  Training routines tailored to your sport, skill level, and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our adaptive training systems adjust to your progress, ensuring you're always challenged and improving.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sport-Specific Nutrition</CardTitle>
                <CardDescription>
                  Dietary plans optimized for your sport's unique demands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Fuel your performance with nutrition guidance tailored to support training, recovery, and competition.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your improvements with comprehensive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Visualize your journey with detailed metrics and insights that help identify strengths and areas for growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-primary/5 rounded-lg my-12">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to elevate your performance?</h2>
            <p className="text-lg mb-8">
              Join thousands of athletes who've transformed their training with personalized guidance.
            </p>
            <Button size="lg" asChild>
              <a href="/auth">Create Free Account</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
