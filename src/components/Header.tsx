import { Link, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      await supabase.auth.signOut();
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Backlink Bazaar
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/category/keyword-rank" className="text-slate-600 hover:text-primary">
              Keyword Rank
            </Link>
            <Link to="/category/blog-comments" className="text-slate-600 hover:text-primary">
              Blog Comments
            </Link>
            <Link to="/category/da-50-plus" className="text-slate-600 hover:text-primary">
              DA 50+
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button onClick={handleAuthClick}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;