import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import defaultAvatar from '@/assets/default-image.png';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const rupeeSetuLogo = '/Ruppe-setu-logo.png';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-base sm:text-lg leading-tight">Rupee-Setu</h1>
            <p className="text-xs text-muted-foreground hidden xs:block">Your Money, Your Control</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <InstallPrompt />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 sm:px-4">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src={defaultAvatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:inline text-sm whitespace-nowrap">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 sm:w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">My Account</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {displayName}
                </span>
                <span className="text-xs font-normal text-muted-foreground break-all">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
