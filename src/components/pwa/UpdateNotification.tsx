import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    // Check for updates periodically (every 5 minutes)
    const checkForUpdates = () => {
      // In a real app, you could check a version endpoint
      // For now, we'll use service worker update events
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setShowUpdate(true);
                }
              });
            }
          });
        });
      }
    };

    checkForUpdates();
  }, []);

  const handleUpdate = () => {
    window.location.reload();
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-5">
      <Alert className="bg-primary text-primary-foreground border-primary shadow-lg">
        <RefreshCw className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between gap-3">
          <span className="text-sm">A new version is available!</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleUpdate}
              className="h-7 text-xs"
            >
              Update Now
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowUpdate(false)}
              className="h-7 w-7 p-0 hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
