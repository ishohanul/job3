import * as React from "react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-[#6B3AC2] focus:ring-[#6B3AC2] focus:ring-2",
        className
      )}
      ref={ref}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox } 