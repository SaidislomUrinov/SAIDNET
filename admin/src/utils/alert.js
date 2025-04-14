import { toast } from "sonner"

export const successMsg = (msg = 'success') => {
    return toast.success(msg);
}
export const errorMsg = (msg = 'error') => {
    return toast.error(msg);
}