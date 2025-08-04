import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-purple-700 text-white",
    secondary: "bg-gradient-to-r from-secondary to-pink-600 text-white",
    accent: "bg-gradient-to-r from-accent to-orange-500 text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-orange-500 text-white",
    error: "bg-gradient-to-r from-error to-red-600 text-white",
    high: "bg-gradient-to-r from-error to-red-600 text-white animate-pulse",
    medium: "bg-gradient-to-r from-warning to-orange-500 text-white",
    low: "bg-gradient-to-r from-success to-green-600 text-white"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;