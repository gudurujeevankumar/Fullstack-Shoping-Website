
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {getInitials(user.email || '')}
          </AvatarFallback>
        </Avatar>
        <span className="hidden sm:block text-sm font-medium">
          {user.email}
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={signOut}
        className="h-8 w-8"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserMenu;
