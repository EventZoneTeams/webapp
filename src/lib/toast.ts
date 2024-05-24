import { toast } from '@/components/ui/use-toast';

export const myToast = {
  default: (message: string, title: string) => {
    toast({
      title: title,
      description: message,
      variant: 'default',
      duration: 5000,
    });
  },
  success: (message: string, title: string) => {
    toast({
      title: title,
      description: message,
      variant: 'success',
      duration: 5000,
    });
  },
  error: (message: string, title: string) => {
    toast({
      title: title,
      description: message,
      variant: 'destructive',
      duration: 5000,
    });
  },
  warning: (message: string, title: string) => {
    toast({
      title: title,
      description: message,
      variant: 'warning',
      duration: 5000,
    });
  },
  info: (message: string, title: string) => {
    toast({
      title: title,
      description: message,
      variant: 'info',
      duration: 5000,
    });
  },
};
