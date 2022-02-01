import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { capitalize, classNames } from "../../functions";

type NavItemProps = {
    path?: string;
};
const NavItem = ({ path }: NavItemProps) => {
    const { pathname } = useRouter();
    return (
        <div
            className={classNames(
                "w-full h-full flex justify-center items-center  cursor-pointer p-2 md:p-0  hover:opacity-80",
                pathname === path ? " text-ascend-yellow  " : null
            )}
        >
            <Link href={path} passHref={true}>
                <div className="w-full h-full flex items-center justify-center text-xl">
                    {path === "/" ? "Dashboard" : capitalize(path.substring(1))}
                </div>
            </Link>
        </div>
    );
};
export interface NavProps {
    className?: string;
}
export default function Nav({ className }: NavProps) {
    return (
        <nav
            id="nav"
            className={classNames(
                className,
                "flex flex-col md:flex-row h-full items-center justify-center mx-8 z-50 gap-8 "
            )}
        >
            <NavItem path="/" />
            <NavItem path="/stake" />
            {/* <NavItem path="/tools" /> */}
        </nav>
    );
}
