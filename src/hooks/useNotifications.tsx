
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: "Notifications enabled!",
          description: "You'll now receive updates about new products and offers.",
        });
      }
      
      return result;
    }
    return 'denied';
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body: options?.body || 'Check out our latest updates!',
          icon: '/placeholder.svg',
          badge: '/placeholder.svg',
          ...options
        });
      });
    }
  };

  return { permission, requestPermission, sendNotification };
};
