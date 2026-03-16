"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info:    <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error:   <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg":       "#1a1a1a",
          "--normal-text":     "#f4f4f5",
          "--normal-border":   "rgba(255,255,255,0.08)",
          "--success-bg":      "#1a1a1a",
          "--success-text":    "#f4f4f5",
          "--success-border":  "rgba(255,255,255,0.08)",
          "--error-bg":        "#1a1a1a",
          "--error-text":      "#f4f4f5",
          "--error-border":    "rgba(255,255,255,0.08)",
          "--border-radius":   "12px",
          "--font":            "inherit",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
