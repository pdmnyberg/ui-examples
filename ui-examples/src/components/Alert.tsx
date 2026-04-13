import { PropsWithChildren } from "react"

type AlertTypes = (
    "primary" |
    "secondary" |
    "success" |
    "danger" |
    "warning" |
    "info" |
    "light" |
    "dark"
  )

export default function Alert({
  children,
  type,
}: PropsWithChildren<{type: AlertTypes}>) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  )
}
