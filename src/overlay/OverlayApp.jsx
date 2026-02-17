import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SettingsIcon = () => (
  <svg className="size-5 text-[#9e9e9e] flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.2499 2.5H8.74988C7.83988 4.9275 6.68655 5.5925 4.12988 5.1675L2.87988 7.3325C4.52655 9.33417 4.52655 10.6658 2.87988 12.6675L4.12988 14.8325C6.68655 14.4075 7.83988 15.0725 8.74988 17.5H11.2499C12.1599 15.0725 13.3132 14.4075 15.8699 14.8333L17.1199 12.6675C15.4732 10.6658 15.4732 9.33417 17.1199 7.3325L15.8699 5.1675C13.3132 5.5925 12.1599 4.9275 11.2499 2.5Z" stroke="currentColor" strokeWidth="1.66667" />
    <path d="M10.0001 12.0833C11.1507 12.0833 12.0834 11.1506 12.0834 9.99996C12.0834 8.84937 11.1507 7.91663 10.0001 7.91663C8.84949 7.91663 7.91675 8.84937 7.91675 9.99996C7.91675 11.1506 8.84949 12.0833 10.0001 12.0833Z" fill="currentColor" />
  </svg>
)

const PaperclipIcon = () => (
  <svg className="size-[18px] text-muted-foreground flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 6.75V11.25C7.5 12.0784 8.17155 12.75 9 12.75C9.82845 12.75 10.5 12.0784 10.5 11.25V5.25C10.5 3.59314 9.15683 2.25 7.5 2.25C5.84314 2.25 4.5 3.59314 4.5 5.25V11.25C4.5 13.7353 6.51472 15.75 9 15.75C11.4853 15.75 13.5 13.7353 13.5 11.25V6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const ChevronIcon = ({ className }) => (
  <svg className={cn("size-4 text-muted-foreground flex-shrink-0", className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="square" />
  </svg>
)

const AutoIcon = ({ className }) => (
  <svg className={cn("size-[18px] text-white flex-shrink-0", className)} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#auto-clip)">
      <path d="M4.875 9.375L8.625 13.125M4.875 9.375L8.87617 5.12379C10.1517 3.76848 11.9303 3 13.7915 3H15V4.20851C15 6.06969 14.2316 7.8483 12.8762 9.12383L8.625 13.125M4.875 9.375L1.5 8.25L3.84099 5.90901C4.26295 5.48705 4.83524 5.25 5.43198 5.25H8.25M8.625 13.125L9.75 16.5L12.091 14.159C12.5129 13.7371 12.75 13.1648 12.75 12.5681V9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M3.375 12.375C3.375 12.375 3 13.5 3 15C4.5 15 5.625 14.625 5.625 14.625" stroke="currentColor" strokeWidth="1.5"/>
    </g>
    <defs>
      <clipPath id="auto-clip">
        <rect width="18" height="18" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

const EqualizerIcon = () => (
  <svg className="size-5 flex flex-wrap items-center justify-center shrink-0" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 7.39C0 6.83771 0.447715 6.39 1 6.39C1.55228 6.39 2 6.83771 2 7.39V11.78C2 12.3323 1.55228 12.78 1 12.78C0.447715 12.78 0 12.3323 0 11.78V7.39Z" fill="currentColor"/>
    <path d="M4 4.18C4 3.62772 4.44772 3.18 5 3.18C5.55228 3.18 6 3.62772 6 4.18V14.98C6 15.5323 5.55228 15.98 5 15.98C4.44772 15.98 4 15.5323 4 14.98V4.18Z" fill="currentColor"/>
    <path d="M8 1C8 0.447716 8.44772 0 9 0C9.55228 0 10 0.447715 10 1V18.19C10 18.7423 9.55228 19.19 9 19.19C8.44772 19.19 8 18.7423 8 18.19V1Z" fill="currentColor"/>
    <path d="M12 5C12 4.44771 12.4477 4 13 4C13.5523 4 14 4.44772 14 5V14.19C14 14.7423 13.5523 15.19 13 15.19C12.4477 15.19 12 14.7423 12 14.19V5Z" fill="currentColor"/>
    <path d="M16 2.59C16 2.03772 16.4477 1.59 17 1.59C17.5523 1.59 18 2.03772 18 2.59V16.59C18 17.1423 17.5523 17.59 17 17.59C16.4477 17.59 16 17.1423 16 16.59V2.59Z" fill="currentColor"/>
    <path d="M20 7.39C20 6.83771 20.4477 6.39 21 6.39C21.5523 6.39 22 6.83771 22 7.39V11.78C22 12.3323 21.5523 12.78 21 12.78C20.4477 12.78 20 12.3323 20 11.78V7.39Z" fill="currentColor"/>
  </svg>
)

export function OverlayApp() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col pt-14 dark",
        "pointer-events-none"
      )}
      style={{ background: "rgba(0, 0, 0, 0.15)" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-[1001] flex items-center justify-between h-14 px-6 bg-black/80 pointer-events-auto rounded-full mx-4 mt-2">
        <div className="flex items-center">
          <img src="/logomark.svg" alt="Grok" className="size-8 w-auto object-contain flex-shrink-0" />
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button type="button" className="p-2 border-0 bg-transparent cursor-pointer text-white hover:opacity-80 rounded-full" aria-label="Settings">
            <SettingsIcon />
          </button>
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            Sign in
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 rounded-full">
            Sign up
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 pointer-events-none">
      <header className="flex items-center justify-center gap-2.5 mb-2 pointer-events-auto">
        <img src="/grok-logo.png" alt="Grok" className="h-16 w-auto object-contain" />
      </header>

      <div className="flex items-center justify-between w-full max-w-[600px] min-h-[52px] gap-3 px-2.5 bg-zinc-900/90 border border-zinc-700 rounded-full focus-within:border-zinc-500 transition-colors pointer-events-auto">
        <div className="flex items-center gap-0 flex-1 min-w-0">
          <PaperclipIcon />
          <Input
            placeholder="What do you want to know?"
            className="flex-1 min-w-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <AutoIcon />
          <span className="text-sm font-medium text-white">Auto</span>
          <ChevronIcon />
          <Button size="icon" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-200 h-10 w-10">
            <EqualizerIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-nowrap justify-center gap-2 pointer-events-auto">
        <Button variant="outline" className="gap-2 text-white hover:bg-white/10 hover:text-white hover:opacity-100" style={{ borderColor: 'rgba(252, 252, 252, 0.14)' }}>
          <img src="/deepsearch.svg" alt="" className="size-[18px] w-auto object-contain" aria-hidden />
          DeepSearch
        </Button>
        <Button variant="outline" className="gap-2 text-white hover:bg-white/10 hover:text-white hover:opacity-100" style={{ borderColor: 'rgba(252, 252, 252, 0.14)' }}>
          <img src="/imagine.svg" alt="" className="size-[18px] w-auto object-contain" aria-hidden />
          Imagine
        </Button>
        <Button variant="outline" className="gap-2 text-white hover:bg-white/10 hover:text-white hover:opacity-100" style={{ borderColor: 'rgba(252, 252, 252, 0.14)' }}>
          <img src="/pickpersonas.svg" alt="" className="size-[18px] w-auto object-contain" aria-hidden />
          Pick Personas
          <ChevronIcon className="ml-0.5" />
        </Button>
        <Button variant="outline" className="gap-2 text-white hover:bg-white/10 hover:text-white hover:opacity-100" style={{ borderColor: 'rgba(252, 252, 252, 0.14)' }}>
          <EqualizerIcon />
          Voice Chat
        </Button>
      </div>

      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-400 pointer-events-auto">
        By messaging Grok, you agree to our{" "}
        <a href="#" className="text-white hover:underline">Terms</a>
        {" "}and{" "}
        <a href="#" className="text-white hover:underline">Privacy Policy</a>
      </footer>
      </div>
    </div>
  )
}
