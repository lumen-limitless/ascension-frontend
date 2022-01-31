import { useToastDispatchContext } from "../context/ToastContext";

export function useToast(delay: number) {
    const dispatch = useToastDispatchContext();

    function toast(type: any, message: string) {
        const id = Math.random().toString(36);

        dispatch({
            type: "ADD_TOAST",
            toast: {
                type,
                message,
                id,
            },
        });

        setTimeout(() => {
            dispatch({ type: "DELETE_TOAST", id });
        }, delay);
    }

    return toast;
}
