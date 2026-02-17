import { createRoot } from "react-dom/client"
import { OverlayApp } from "./OverlayApp.jsx"

const container = document.getElementById("grok-overlay")
if (container) {
  const root = createRoot(container)
  root.render(<OverlayApp />)
}
