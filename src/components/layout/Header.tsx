import { LogOut } from 'lucide-react';
import paisaVaultLogo from '@/assets/paisa-vault-logo.png';
import defaultAvatar from '@/assets/default-image.png';
import { Button } from '@/components/ui/button';
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
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={paisaVaultLogo} alt="Paisa Vault" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-base sm:text-lg leading-tight">Paisa Vault</h1>
            <p className="text-xs text-muted-foreground hidden xs:block">Your Money, Your Control</p>
          </div>
        </div>

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
            <DropdownMenuItem onClick={signOut} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
