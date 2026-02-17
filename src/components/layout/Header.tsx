import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import defaultAvatar from '@/assets/default-image.png';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { APP_VERSION } from '@/lib/version';

const rupeeSetuLogo = '/Rupee-setu-logo.png';

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
  const avatarUrl = user?.user_metadata?.avatar_url || defaultAvatar;

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
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-md">
            <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-base sm:text-lg leading-tight">Rupee-Setu</h1>
            <p className="text-xs text-muted-foreground hidden xs:block">Your Money, Your Control</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <InstallPrompt />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-1 sm:px-2 h-auto py-1 hover:bg-transparent">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20 transition-all hover:border-primary">
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:inline text-sm font-medium whitespace-nowrap px-1">
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
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <p className="text-xs text-muted-foreground text-center">v{APP_VERSION}</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
