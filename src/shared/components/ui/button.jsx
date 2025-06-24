import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden isolate",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:ring-blue-500",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:ring-red-500",
        outline:
          "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 active:bg-blue-100 focus-visible:ring-blue-500",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow active:bg-gray-300 focus-visible:ring-gray-500",
        ghost: 
          "bg-transparent hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus-visible:ring-gray-500",
        link: 
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 focus-visible:ring-blue-500",
        success:
          "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:ring-green-500",
        warning:
          "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-md hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:ring-amber-500",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-4 py-2 text-sm rounded-lg",
        lg: "h-12 px-6 text-base rounded-lg",
        xl: "h-14 px-8 text-lg rounded-xl",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ripple = true, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const [ripples, setRipples] = React.useState([]);
  
  const handleClick = (e) => {
    if (ripple && !props.disabled) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        x,
        y,
        size,
        id: Date.now()
      };
      
      setRipples([...ripples, newRipple]);
      
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter(r => r.id !== newRipple.id));
      }, 600);
    }
    
    if (props.onClick) {
      props.onClick(e);
    }
  };
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
      onClick={handleClick}
    >
      {props.children}
      {ripple && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-current opacity-30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </Comp>
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
