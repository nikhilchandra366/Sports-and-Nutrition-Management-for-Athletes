
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRound, Save } from 'lucide-react';

// Profile form schema
const profileSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  bio: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  activity_level: z.string().optional(),
  fitness_goal: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

// Type for the profile data from Supabase
interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  weight: number | null;
  height: number | null;
  age: number | null;
  gender: string | null;
  activity_level: string | null;
  fitness_goal: string | null;
}

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      full_name: '',
      bio: '',
      weight: '',
      height: '',
      age: '',
      gender: '',
      activity_level: '',
      fitness_goal: '',
    },
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: 'destructive',
          title: 'Authentication required',
          description: 'Please log in to view this page',
        });
        navigate('/auth');
        return;
      }
      
      setUserId(session.user.id);
      
      // Fetch profile data
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching profile',
          description: error.message,
        });
      } else if (data) {
        // Populate form with existing data
        form.reset({
          username: data.username || '',
          full_name: data.full_name || '',
          bio: data.bio || '',
          weight: data.weight ? String(data.weight) : '',
          height: data.height ? String(data.height) : '',
          age: data.age ? String(data.age) : '',
          gender: data.gender || '',
          activity_level: data.activity_level || '',
          fitness_goal: data.fitness_goal || '',
        });
      }
      
      setIsLoading(false);
    };
    
    fetchProfile();
  }, [navigate, toast, form]);

  const onSubmit = async (data: ProfileValues) => {
    if (!userId) return;
    
    setIsSaving(true);
    
    try {
      // Convert numeric strings to numbers
      const numericData = {
        username: data.username,
        full_name: data.full_name,
        bio: data.bio,
        weight: data.weight ? parseFloat(data.weight) : null,
        height: data.height ? parseFloat(data.height) : null,
        age: data.age ? parseInt(data.age, 10) : null,
        gender: data.gender,
        activity_level: data.activity_level,
        fitness_goal: data.fitness_goal,
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(numericData)
        .eq('id', userId);
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error updating profile',
          description: error.message,
        });
      } else {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been successfully updated.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'There was an error updating your profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <UserRound className="h-10 w-10 mr-4 text-primary" />
            <h1 className="text-3xl font-bold">Your Profile</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your profile information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="non-binary">Non-binary</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="activity_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Level</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                              <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                              <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                              <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                              <SelectItem value="very-active">Very Active (twice/day)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fitness_goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fitness Goal</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fitness goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="lose-weight">Lose Weight</SelectItem>
                              <SelectItem value="maintain">Maintain Weight</SelectItem>
                              <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                              <SelectItem value="improve-performance">Improve Performance</SelectItem>
                              <SelectItem value="increase-endurance">Increase Endurance</SelectItem>
                              <SelectItem value="general-fitness">General Fitness</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself and your fitness journey..." 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This will be visible to other users in the community.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
