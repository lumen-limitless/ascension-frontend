import { createContext, useReducer, useContext } from "react";
import { ToastProps } from "../components/Toast/toast";

const ToastStateContext = createContext<{ toasts: ToastProps[] }>({
    toasts: [],
});
const ToastDispatchContext = createContext<any>(undefined);

enum ActionType {
    ADD_TOAST = "ADD_TOAST",
    DELETE_TOAST = "DELETE_TOAST",
}

type ToastState = { toasts: ToastProps[] };

type Action =
    | { type: ActionType.ADD_TOAST; toast: Required<ToastProps> }
    | { type: ActionType.DELETE_TOAST; id: Required<string> };

function ToastReducer(state: ToastState, action: Action) {
    switch (action.type) {
        case "ADD_TOAST": {
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
            };
        }
        case "DELETE_TOAST": {
            const updatedToasts = state.toasts.filter(
                (e: any) => e.id != action.id
            );
            return {
                ...state,
                toasts: updatedToasts,
            };
        }
        default: {
            throw new Error("unhandled action");
        }
    }
}

export interface ToastProviderProps {
    children?: any;
}
export function ToastProvider({ children }: ToastProviderProps) {
    const [state, dispatch] = useReducer(ToastReducer, {
        toasts: [],
    });

    return (
        <ToastStateContext.Provider value={state}>
            <ToastDispatchContext.Provider value={dispatch}>
                {children}
            </ToastDispatchContext.Provider>
        </ToastStateContext.Provider>
    );
}

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
