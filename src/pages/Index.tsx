
import { useState, useEffect } from 'react';
import { SportCard } from '@/components/ui/card-sport';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

// Types for our data
interface SportCategory {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string | null;
}

const Index = () => {
  const [sports, setSports] = useState<SportCategory[]>([]);
  const [forumCategories, setForumCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // Fetch sport categories
      const { data: sportsData, error: sportsError } = await supabase
        .from('sport_categories')
        .select('*');
      
      if (sportsError) {
        console.error('Error fetching sports:', sportsError);
      } else {
        setSports(sportsData || []);
      }
      
      // Fetch forum categories
      const { data: forumData, error: forumError } = await supabase
        .from('forum_categories')
        .select('*');
      
      if (forumError) {
        console.error('Error fetching forum categories:', forumError);
      } else {
        setForumCategories(forumData || []);
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Your Complete Sports & Nutrition Platform
              </h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Track your training, manage your nutrition, and connect with like-minded athletes on your fitness journey.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="font-semibold" asChild>
                  <a href="/programs">Explore Training Programs</a>
                </Button>
                <Button size="lg" variant="outline" className="font-semibold" asChild>
                  <a href="/nutrition">Track Nutrition</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sports Categories Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground">Sport Categories</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Find training programs specific to your preferred sport
              </p>
            </div>
            
            {loading ? (
              <div className="text-center py-10">Loading sports categories...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sports.map((sport) => (
                  <SportCard
                    key={sport.id}
                    title={sport.name}
                    description={sport.description || ''}
                    icon={sport.icon_url || ''}
                    to={`/sports/${sport.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Everything you need to achieve your fitness goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Training Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80">
                    Access personalized workout plans tailored to your specific sport, skill level, and goals.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80">
                    Log your meals, track macros, and get insights to optimize your nutrition for performance.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Progress Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80">
                    Track your improvements with visual analytics and stay motivated on your fitness journey.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground">Join Our Community</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Connect with athletes, share experiences, and learn from others
              </p>
            </div>
            
            {loading ? (
              <div className="text-center py-10">Loading community topics...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forumCategories.map((category) => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-foreground/80">
                        {category.description || ''}
                      </CardDescription>
                      <div className="mt-4">
                        <Button variant="outline" asChild>
                          <a href={`/community/${category.id}`}>Join Discussion</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} AthleteAligned. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
