"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import { SignUpForm } from "@/components/signup-form"

const features = [
  "Unlimited post scheduling",
  "AI caption generation",
  "Smart analytics dashboard",
  "Hashtag optimization",
  "Priority support",
  "Advanced analytics",
  "Custom posting schedule",
  "Engagement tracking"
]

export function TrialSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-24"
    >
      <Card className="p-12 relative overflow-hidden glass-card">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
        
        <div className="relative space-y-8 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border shadow-sm"
          >
            <span className="text-sm font-medium">✨ Limited Time Offer</span>
          </motion.div>

          <h2 className="text-4xl font-bold">
            Start Your 30-Day Free Trial
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Experience the full power of our AI-driven Instagram scheduling platform.
            No credit card required.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-[#8B5CF6] flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <SignUpForm />
            
            <p className="text-sm text-muted-foreground">
              No credit card required • Cancel anytime • 24/7 support
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}