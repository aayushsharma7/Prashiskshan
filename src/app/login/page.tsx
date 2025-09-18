"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { GraduationCap, Users, Building2, Shield, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Access internship opportunities, skill development, and mentorship",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    route: "/students",
  },
  {
    id: "faculty",
    title: "Faculty Coordinator",
    description: "Monitor student progress, evaluate performance, and manage programs",
    icon: Users,
    color: "bg-green-500/10 text-green-600 border-green-200",
    route: "/faculty",
  },
  {
    id: "industry",
    title: "Industry Partner",
    description: "Post opportunities, review candidates, and manage internships",
    icon: Building2,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    route: "/industry",
  },
  // {
  //   id: "admin",
  //   title: "Administrator",
  //   description: "System administration and platform management",
  //   icon: Shield,
  //   color: "bg-orange-500/10 text-orange-600 border-orange-200",
  //   route: "/admin",
  // },
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user session (in real app, this would be handled by auth provider)
    localStorage.setItem("userRole", selectedRole)
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("isAuthenticated", "true")

    // Redirect to appropriate dashboard
    const role = roles.find((r) => r.id === selectedRole)
    if (role) {
      router.push(role.route)
    }

    setIsLoading(false)
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      
      <div className="absolute md:top-9 md:right-20 md:mt-5 top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl  font-bold mb-2 text-balance"
          >
            Welcome to <span className="text-primary">Prashiskshan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-xl text-pretty"
          >
            Academia-Industry Interface Platform
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Role Selection */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Select Your Role</CardTitle>
                <CardDescription>Choose your role to access the appropriate dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((role, index) => {
                  const Icon = role.icon
                  return (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedRole === role.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${role.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{role.title}</h3>
                              {selectedRole === role.id && <CheckCircle className="h-4 w-4 text-primary" />}
                            </div>
                            <p className="text-sm text-muted-foreground text-pretty">{role.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Login Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {selectedRole && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 bg-primary/5 rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Selected Role
                        </Badge>
                        <span className="text-sm font-medium">{roles.find((r) => r.id === selectedRole)?.title}</span>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={!selectedRole || !formData.email || !formData.password || isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">Demo credentials: Use any email and password</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">Need help? Contact your system administrator</p>
        </motion.div>
      </motion.div>
      
    </div>
    
  )
}
