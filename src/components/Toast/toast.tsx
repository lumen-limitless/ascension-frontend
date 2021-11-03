import { Fragment } from "react";
import { Dispatch } from "react";
import { useToastDispatchContext } from "../../context/ToastContext";
import { Transition } from "@headlessui/react";
import {
    BanIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    XIcon,
} from "@heroicons/react/outline";
export interface ToastProps {
    type: string;
    message: string;
    id: string;
}
export default function Toast({ type, message, id }: ToastProps) {
    const dispatch: Dispatch<any> = useToastDispatchContext();
    type === "error" ? console.error(message) : console.log(message);
    return (
        <>
            {type == "success" && (
                <Transition
                    show={true}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-sm w-full bg-gray-100 dark:bg-dark-700 dark:text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon
                                        className="h-6 w-6 text-green"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        Success
                                    </p>
                                    <p className="mt-1 text-sm text-gray-400 ">
                                        {message}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className=" rounded-md inline-flex text-gray-400  hover:text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            dispatch({
                                                type: "DELETE_TOAST",
                                                id,
                                            });
                                        }}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            )}
            {type == "info" && (
                <Transition
                    show={true}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-sm w-full bg-gray-100 dark:bg-dark-700 dark:text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon
                                        className="h-6 w-6 text-blue"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        Info
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                        {message}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className=" rounded-md inline-flex text-gray-400  hover:text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            dispatch({
                                                type: "DELETE_TOAST",
                                                id,
                                            });
                                        }}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            )}
            {type == "error" && (
                <Transition
                    show={true}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-sm w-full bg-gray-100 dark:bg-dark-700 dark:text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <BanIcon
                                        className="h-6 w-6 text-red"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        Error
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                        {message}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className="rounded-md inline-flex text-gray-400   hover:text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            dispatch({
                                                type: "DELETE_TOAST",
                                                id,
                                            });
                                        }}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            )}
        </>
    );
}
