import { toast } from 'sonner';

export const showToast = (message: string, isSuccess: boolean) => {
  const toastType = isSuccess ? 'success' : 'error';
  toast[toastType](message);
};