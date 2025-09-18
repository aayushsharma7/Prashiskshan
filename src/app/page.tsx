"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponsiveGrid } from "@/components/responsive-grid"
import { MobileCard } from "@/components/mobile-card"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  Building2,
  GraduationCap,
  TrendingUp,
  BookOpen,
  MessageSquare,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react"

const stats = [
  {
    title: "Active Students",
    value: "2,847",
    change: "+12%",
    icon: GraduationCap,
    color: "text-blue-600",
  },
  {
    title: "Industry Partners",
    value: "156",
    change: "+8%",
    icon: Building2,
    color: "text-green-600",
  },
  {
    title: "Faculty Coordinators",
    value: "89",
    change: "+5%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Placement Rate",
    value: "94%",
    change: "+3%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const features = [
  {
    title: "Student Portal",
    description: "Complete internship management with AI-powered matching",
    icon: GraduationCap,
    href: "/students",
  },
  {
    title: "Faculty Dashboard",
    description: "Monitor progress, evaluate students, and manage programs",
    icon: Users,
    href: "/faculty",
  },
  {
    title: "Industry Partners",
    description: "Post opportunities, review candidates, and track interns",
    icon: Building2,
    href: "/industry",
  },
  {
    title: "Mentorship Hub",
    description: "Connect students with industry mentors for guidance",
    icon: MessageSquare,
    href: "/mentorship",
  },
  {
    title: "Skill Development",
    description: "Pre-internship training modules and readiness assessment",
    icon: BookOpen,
    href: "/learning",
  },
]

const recentActivities = [
  {
    title: "New internship posted by TechCorp",
    time: "2 hours ago",
    type: "opportunity",
  },
  {
    title: "25 students completed skill assessment",
    time: "4 hours ago",
    type: "achievement",
  },
  {
    title: "Faculty review meeting scheduled",
    time: "6 hours ago",
    type: "meeting",
  },
  {
    title: "Resume analyzer updated with new features",
    time: "1 day ago",
    type: "update",
  },
]

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const userRole = localStorage.getItem("userRole")

    if (isAuthenticated && userRole) {
      const roleRoutes = {
        student: "/students",
        faculty: "/faculty",
        industry: "/industry",
        admin: "/admin",
      }

      const route = roleRoutes[userRole as keyof typeof roleRoutes]
      if (route) {
        router.push(route)
        return
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl pb-20 md:pb-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 text-balance leading-tight">
              The complete platform for <span className="text-primary">Academia-Industry</span> interface
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto text-pretty px-2">
              Streamline internship management, enhance skill development, and foster real-time collaboration between
              students, faculty, and industry partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 h-12 md:h-auto"
                onClick={() => router.push("/login")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 h-12 md:h-auto bg-transparent"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 4 }} gap={4} className="md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <MobileCard
                  key={stat.title}
                  title={stat.title}
                  delay={index * 0.1}
                  className="relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    <span className="text-green-600 font-medium">{stat.change}</span> from last month
                  </p>
                </MobileCard>
              )
            })}
          </ResponsiveGrid>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-balance">Platform Features</h2>
          <ResponsiveGrid cols={{ default: 1, md: 2, lg: 3 }} gap={4} className="md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-2 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                          whileHover={{ rotate: 5 }}
                        >
                          <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-lg md:text-xl text-balance">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm md:text-base mb-4 text-pretty">
                        {feature.description}
                      </CardDescription>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-semibold text-primary group-hover:translate-x-1 transition-transform"
                      >
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </ResponsiveGrid>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="p-1 rounded-full bg-primary/10 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-pretty">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        {activity.type}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Star className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: GraduationCap, label: "View Student Portal", href: "/students" },
                  { icon: Building2, label: "Industry Dashboard", href: "/industry" },
                  { icon: MessageSquare, label: "Mentorship Hub", href: "/mentorship" },
                  { icon: BookOpen, label: "Skill Development", href: "/learning" },
                ].map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full justify-start bg-transparent hover:bg-accent" variant="outline">
                        <Icon className="mr-2 h-4 w-4" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
