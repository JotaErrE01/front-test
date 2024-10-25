import { Loader2 } from "lucide-react"

export default function Spinner({ size = "default", className = "" }: { size?: "default" | "sm" | "lg", className?: string }) {
  const sizeClasses = {
    default: "h-6 w-6",
    sm: "h-4 w-4",
    lg: "h-8 w-8"
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
    </div>
  )
}