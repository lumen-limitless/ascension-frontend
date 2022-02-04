import Toast from "./toast";
import { useToastStateContext } from "../../context/ToastContext";

export default function ToastContainer() {
    const { toasts } = useToastStateContext();

    return (
        <div className="absolute top-10 w-full">
            <div className="flex flex-col-reverse gap-2 max-w-md ml-auto">
                {toasts &&
                    toasts.map((toast) => (
                        <Toast
                            id={toast.id}
                            key={toast.id}
                            type={toast.type}
                            message={toast.message}
                        />
                    ))}
            </div>
        </div>
    );
}
