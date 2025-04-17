
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart2, 
  Calendar, 
  Users, 
  MessageSquare, 
  Utensils, 
  Menu, 
  X,
  LogIn,
  User,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out."
      });
      navigate("/");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Programs", path: "/programs", icon: <Calendar className="h-5 w-5" /> },
    { name: "Nutrition", path: "/nutrition", icon: <Utensils className="h-5 w-5" /> },
    { name: "Progress", path: "/progress", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Community", path: "/community", icon: <MessageSquare className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">AthleteAligned</span>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <div className="ml-4 flex items-center">
              {session ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/profile">
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleSignOut}>
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </Button>
                </div>
              ) : (
                <Button asChild>
                  <Link to="/auth">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile nav toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                onClick={closeMenu}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {session ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                    onClick={closeMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMenu();
                    }}
                    className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={closeMenu}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
