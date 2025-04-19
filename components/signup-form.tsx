"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Loader2, Mail, User, Phone, Lock } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function SignUpForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  })

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name")
      return
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!formData.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number")
      return
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              full_name: formData.fullName,
              phone: formData.phone,
              role: 'user'
            }
          ])

        if (profileError) {
          throw profileError
        }

        toast.success("Account created successfully! Please check your email to verify your account.")
        setIsOpen(false)
        setFormData({ fullName: "", email: "", phone: "", password: "" })
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(error.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button 
        size="sm"
        className="h-9 sm:h-10 px-4 sm:px-6 bg-gradient-to-r from-primary via-[#8B5CF6] to-[#EC4899] hover:opacity-90 rounded-full"
        onClick={() => setIsOpen(true)}
        data-signup-trigger
      >
        Start Free Trial
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white border shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text">Get Started Free</DialogTitle>
            <DialogDescription>
              No credit card required • Free 30-day trial
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSignUp} className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10 h-11"
                  required
                />
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-11"
                  required
                />
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 h-11"
                  required
                />
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  type="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 h-11"
                  required
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary via-[#8B5CF6] to-[#EC4899]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Free Account"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">Terms</a>
              {" "}and{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}