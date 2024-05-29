import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FC, memo, ReactNode } from 'react';

export const ModalDialog: FC<{
  children: ReactNode;
  openButtonTitle: string;
  modalTitle: string;
}> = memo(function ModalDialog({ children, openButtonTitle, modalTitle }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{openButtonTitle}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
});
