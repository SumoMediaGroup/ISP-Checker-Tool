import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Button = forwardRef(({ className, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? "a" : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  )
})
Button.displayName = "Button"

export { Button }
