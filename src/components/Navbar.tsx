
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckSquare, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CheckSquare size={24} />
          <span className="font-bold text-xl">TodoApp</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              <div className="text-sm">Welcome, {user.username}</div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 py-2 px-4 bg-primary">
          {user && (
            <div className="flex flex-col space-y-2">
              <div className="text-sm">Welcome, {user.username}</div>
              <Button variant="outline" onClick={logout} className="w-full">
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
