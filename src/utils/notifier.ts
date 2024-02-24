import Swal from 'sweetalert2';

export const notify = (message: string) => {
   Swal.fire(message);
};
