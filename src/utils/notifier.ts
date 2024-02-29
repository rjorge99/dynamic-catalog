import { toast } from 'react-toastify';

export enum MessageType {
   Error = 'error',
   Info = 'info',
   Success = 'success',
   Warning = 'warning'
}

export const notify = (message: string, type: MessageType) => {
   toast(message, { type });
   //alert(message);
};
