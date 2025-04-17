import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus, Users, Clock, Eye } from "lucide-react";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface ForumTopic {
  id: string;
  category_id: string;
  user_id: string;
  title: string;
  content: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  posts_count?: number;
  user_profile?: {
    username: string;
    avatar_url: string;
  };
}

const mockTopics: ForumTopic[] = [
  {
    id: "1",
    category_id: "1",
    user_id: "1",
    title: "Best training program for beginners",
    content: "I'm new to fitness and looking for advice on how to start a training routine.",
    view_count: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    posts_count: 5,
    user_profile: {
      username: "FitnessNewbie",
      avatar_url: ""
    }
  },
  {
    id: "2",
    category_id: "2",
    user_id: "2",
    title: "Nutrition tips for marathon training",
    content: "I'm training for my first marathon. What should I be eating before, during, and after long runs?",
    view_count: 85,
    created_at: new Date(Date.now() - 86400000).toISOString(), // yesterday
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    posts_count: 3,
    user_profile: {
      username: "RunnerGuy",
      avatar_url: ""
    }
  }
];

const mockCategories: ForumCategory[] = [
  {
    id: "1",
    name: "Training Programs",
    description: "Discuss training programs, exercises, and workout routines",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Nutrition & Diet",
    description: "Share nutrition tips, diet plans, and healthy recipes",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Recovery & Injury Prevention",
    description: "Discuss techniques for recovery and preventing injuries",
    created_at: new Date().toISOString()
  }
];

const Community = () => {
  const [categories, setCategories] = useState<ForumCategory[]>(mockCategories);
  const [popularTopics, setPopularTopics] = useState<ForumTopic[]>(mockTopics);
  const [recentTopics, setRecentTopics] = useState<ForumTopic[]>(mockTopics);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Fetch forum categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("forum_categories")
          .select("*");

        if (categoriesError) throw categoriesError;
        
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
        }

        // Since the profiles table may not be set up yet, we'll keep using mock data for topics
        // In a real implementation, we would fetch forum_topics and join with profiles
        
        // Uncomment the following when the forum_topics and profiles tables are set up:
        /*
        // Fetch popular topics
        const { data: popularData, error: popularError } = await supabase
          .from("forum_topics")
          .select(`
            *,
            user_profile:profiles(username, avatar_url)
          `)
          .order('view_count', { ascending: false })
          .limit(5);

        if (popularError) throw popularError;
        if (popularData && popularData.length > 0) {
          setPopularTopics(popularData);
        }

        // Fetch recent topics
        const { data: recentData, error: recentError } = await supabase
          .from("forum_topics")
          .select(`
            *,
            user_profile:profiles(username, avatar_url)
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentError) throw recentError;
        if (recentData && recentData.length > 0) {
          setRecentTopics(recentData);
        }
        */
      } catch (error) {
        console.error("Error fetching community data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load community data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getUserInitials = (username: string) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Community Forum</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with other athletes, share tips, and get advice from the community
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Search forum topics..."
                className="max-w-md"
              />
              <Button variant="outline">Search</Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            <a href={`/community/category/${category.id}`} className="hover:underline">{category.name}</a>
                          </h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Recent Discussions</CardTitle>
                    <a href="/community/topics" className="text-sm text-primary hover:underline">View All</a>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTopics.map((topic) => (
                      <div key={topic.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={topic.user_profile?.avatar_url || ''} />
                            <AvatarFallback>{getUserInitials(topic.user_profile?.username || '')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{topic.user_profile?.username || 'Unknown'}</span>
                          <div className="mx-2 w-1 h-1 rounded-full bg-muted-foreground"></div>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(topic.created_at)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          <a href={`/community/topic/${topic.id}`} className="hover:underline">{topic.title}</a>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{topic.content}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="flex items-center mr-3">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {topic.posts_count || 0} replies
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {topic.view_count} views
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {popularTopics.map((topic) => (
                      <a 
                        key={topic.id} 
                        href={`/community/topic/${topic.id}`}
                        className="block p-2 hover:bg-muted/50 rounded-md transition-colors"
                      >
                        <h4 className="font-medium line-clamp-1">{topic.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span className="flex items-center mr-2">
                            <Eye className="h-3 w-3 mr-1" />
                            {topic.view_count}
                          </span>
                          <span>{formatDate(topic.created_at)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <a href="/community/topics/popular">View All Popular Topics</a>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">254</div>
                        <div className="text-xs text-muted-foreground">Members</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">1,240</div>
                        <div className="text-xs text-muted-foreground">Topics</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">8,756</div>
                        <div className="text-xs text-muted-foreground">Replies</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Forum Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm list-disc pl-5">
                    <li>Be respectful and supportive of other members</li>
                    <li>No spam, advertising, or self-promotion</li>
                    <li>Don't share personal information</li>
                    <li>Provide sources for health/nutrition claims</li>
                    <li>Focus on constructive discussions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;
