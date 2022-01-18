import { useEffect } from "react";
import { useBoolean } from "react-use";
import { LoaderTargetPlugin } from "webpack";

export default function useLoading([items]: any[]) {
    const [loaded, toggleLoaded] = useBoolean(false);

    useEffect(() => {
        for (const item in items) {
            if (!item) {
                toggleLoaded(false);
                return;
            }

            toggleLoaded(true);
        }
    }, [items, toggleLoaded]);

    return {
        loaded,
    };
}
