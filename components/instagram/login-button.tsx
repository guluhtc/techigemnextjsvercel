"use client"

import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import { toast } from "sonner"

export function InstagramLoginButton() {
  const handleInstagramLogin = () => {
    toast.info("Instagram integration coming soon!")
  }

  return (
    <Button
      variant="outline"
      className="w-full h-11 relative hover:bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:text-white group transition-colors"
      onClick={handleInstagramLogin}
    >
      <Instagram className="absolute left-4 h-4 w-4 group-hover:text-white" />
      <span className="text-sm">Connect Instagram Business Account</span>
    </Button>
  )
}