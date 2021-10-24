import { useRef } from "react";
import { useClickAway } from "react-use";
import Exit from "../svg/exit";

interface ModalProps {
    children?: any;
    onExit: () => void;
    className?: string;
}
export default function Modal({ children, className, onExit }: ModalProps) {
    const ref = useRef(null);
    useClickAway(ref, () => {
        onExit();
    });
    return (
        <div
            className={`flex items-center justify-center fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-90`}
        >
            <button className="absolute top-5 left-0 p-4" onClick={onExit}>
                <Exit />
            </button>
            <div
                className={`${className} flex  w-2/3  justify-center items-center`}
                ref={ref}
            >
                {children}
            </div>
        </div>
    );
}
