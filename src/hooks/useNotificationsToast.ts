import { useEthers, useNotifications } from "@usedapp/core";
import { useEffect } from "react";
import { useToast } from "./useToast";

export default function useNotificationsToast() {
    const { chainId } = useEthers();
    const toast = useToast(4000);
    const { notifications, removeNotification } = useNotifications();
    useEffect(() => {
        notifications.forEach((n) => {
            if (n.type === "walletConnected") {
                toast("info", "Wallet Connected");
                removeNotification({ notificationId: n.id, chainId });
            }
            if (n.type === "transactionStarted") {
                toast("info", `${n.transactionName} transaction submitted`);
                removeNotification({ notificationId: n.id, chainId });
            }
            if (n.type === "transactionSucceed") {
                toast("success", `${n.transactionName} transaction confirmed`);
                removeNotification({ notificationId: n.id, chainId });
            }
            if (n.type === "transactionFailed") {
                toast("error", `${n.transactionName} transaction failed`);
                removeNotification({ notificationId: n.id, chainId });
            }
        });
    }, [notifications]);
}
