"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup-form"
import { useRouter } from "next/navigation"

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative z-50 rounded-full hover:bg-black/5"
      >
        {isMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-24 left-4 right-4 rounded-2xl bg-white/80 backdrop-blur-lg border shadow-lg md:hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="ghost"
                  className="text-lg font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
                  onClick={() => {
                    router.push('/instagram')
                    setIsMenuOpen(false)
                  }}
                >
                  Instagram
                </Button>
                <Button 
                  variant="ghost"
                  className="text-lg font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
                  onClick={() => {
                    router.push('/features')
                    setIsMenuOpen(false)
                  }}
                >
                  Features
                </Button>
                <Button 
                  variant="ghost"
                  className="text-lg font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
                  onClick={() => {
                    router.push('/about')
                    setIsMenuOpen(false)
                  }}
                >
                  About
                </Button>
                <Button 
                  variant="ghost"
                  className="text-lg font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
                  onClick={() => {
                    router.push('/contact')
                    setIsMenuOpen(false)
                  }}
                >
                  Contact
                </Button>
              </div>
              
              <div className="space-y-2 pt-4 border-t flex flex-col items-center">
                <Button 
                  variant="ghost" 
                  className="w-full rounded-full"
                  onClick={() => {
                    router.push('/login')
                    setIsMenuOpen(false)
                  }}
                >
                  Log in
                </Button>
                <div className="w-full flex justify-center" onClick={() => setIsMenuOpen(false)}>
                  <SignUpForm />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}