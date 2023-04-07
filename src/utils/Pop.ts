import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { logger } from './Logger';

export default class Pop {
    static async confirm(
        title = 'Are you sure?',
        text = "You won't be able to revert this!",
        confirmButtonText = 'Yes',
        icon: SweetAlertIcon = 'warning'
    ): Promise<boolean> {
        try {
            const res = await Swal.fire({
                title,
                text,
                icon,
                confirmButtonText,
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: 'var(--bs-primary)',
                cancelButtonColor: 'var(--bs-secondary)',
            });

            return res.isConfirmed;
        } catch (error) {
            return false;
        }
    }

    static toast(
        title = 'Warning!',
        icon: SweetAlertIcon = 'warning',
        position: SweetAlertPosition = 'top-end',
        timer = 3000,
        progressBar = true
    ): void {
        Swal.fire({
            title,
            icon,
            position,
            timer,
            timerProgressBar: progressBar,
            toast: true,
            showConfirmButton: false,
        });
    }

    static error(error: Error | string, eventTrigger = ''): void {
        if (error instanceof Error && 'isAxiosError' in error && error.isAxiosError) {
            logger.error(eventTrigger, error);
            const { response } = error as any;
            const errorObj = (response.data?.error || response.data) || { message: 'Invalid Request ' + response.status };

            this.toast(errorObj.message || errorObj.error || 'error');
        } else {
            const errorMessage = error instanceof Error ? error.message : error;
            logger.error(eventTrigger, errorMessage);
            this.toast(errorMessage, 'error');
        }
    }


    static success(message = 'Success!'): void {
        this.toast(message, 'success');
    }
}
