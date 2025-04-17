import { toast } from "sonner"

export const errorMsg = (msg) => {
    return toast.error(msg);
}
export const successMsg = (msg) => {
    return toast.success(msg);
}