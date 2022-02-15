import React from "react";
import { classNames } from "../../functions";

function Header({ className, children }) {
  return (
    <div className={classNames("flex items-center rounded-t px-4 py-4 sm:px-8 sm:py-6", className)}>
      {children}
    </div>
  );
}

type CardProps = {
  header?: React.ReactChild;
  footer?: React.ReactChild;
  backgroundImage?: string;
  title?: string;
  description?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Card({
  header = undefined,
  footer = undefined,
  backgroundImage = "",
  title = "",
  description = "",
  children,
  className,
}: CardProps) {
  return (
    <div
      className={classNames(
        className,
        "dark:bg-dark-800 dark:shadow-pink-glow dark:hover:shadow-pink-glow-hovered relative bg-gray-100 text-black shadow-lg transition-all dark:text-white"
      )}
      style={{
        borderRadius: "10px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center bottom",
      }}
    >
      {header && <>{header}</>}

      <div className="h-full px-2 py-4 sm:p-8">
        {title && <div className="mb-4 text-2xl ">{title}</div>}
        {description && <div className="text-base ">{description}</div>}
        {children}
      </div>

      {footer && <>{footer}</>}
    </div>
  );
}

Card.Header = Header;

export default Card;
