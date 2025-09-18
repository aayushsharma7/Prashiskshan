"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { GraduationCap, Users, Building2, BarChart3, LogOut, User, MessageCircle, Brain, BookIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"

const getNavigationForRole = (role: string) => {
  const baseNavigation = [{ name: "Dashboard", href: "/", icon: BarChart3 }]

  switch (role) {
    case "student":
      return [ { name: "My Dashboard", href: "/students", icon: GraduationCap },{name: "Mentorship", href: "/mentorship", icon: MessageCircle}, {name: "Learning", href: "/learning", icon: BookIcon}]
    case "faculty":
      return [ { name: "Faculty Dashboard", href: "/faculty", icon: Users }]
    case "industry":
      return [ { name: "Industry Dashboard", href: "/industry", icon: Building2 }]
    case "admin":
      return [
        ...baseNavigation,
        { name: "Students", href: "/students", icon: GraduationCap },
        { name: "Faculty", href: "/faculty", icon: Users },
        { name: "Industry", href: "/industry", icon: Building2 },
      ]
    default:
      return baseNavigation
  }
}

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)
  const [navigation, setNavigation] = useState<any[]>([])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const userEmail = localStorage.getItem("userEmail")
    const userRole = localStorage.getItem("userRole")

    if (isAuthenticated && userEmail && userRole) {
      setUser({ email: userEmail, role: userRole })
      setNavigation(getNavigationForRole(userRole))
    } else {
      setNavigation([])
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")
    setUser(null)
    setNavigation([])
    router.push("/login")
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "student":
        return "Student"
      case "faculty":
        return "Faculty Coordinator"
      case "industry":
        return "Industry Partner"
      case "admin":
        return "Administrator"
      default:
        return "User"
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container flex h-16 max-w-screen-2xl items-center px-4">
    <Link href="/" className="mr-6 flex items-center space-x-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <GraduationCap className="h-5 w-5" />
        </motion.div>
        <span className="hidden font-bold sm:inline-block text-balance">Prashiskshan</span>
      </Link>
    {/* This div will now take up all available space to allow for centering */}
    <div className="flex-1 mr-10 hidden md:flex items-center justify-center">
      
      {navigation.length > 0 && (
        <nav className="flex items-center gap-4 text-sm">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-foreground/80 px-3 py-2 rounded-md whitespace-nowrap",
                    pathname === item.href
                      ? "text-foreground bg-accent"
                      : "text-foreground/60 hover:bg-accent/50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </motion.div>
            )
          })}
        </nav>
      )}
    </div>

    <div className="flex items-center justify-between md:justify-end">
      <Link href="/" className="flex items-center space-x-2 md:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <GraduationCap className="h-6 w-6" />
        </motion.div>
        <span className="font-bold text-lg">Prashiskshan</span>
      </Link>
      <nav className="hidden md:flex items-center gap-3">
        <ThemeToggle />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="relative h-14 mr-3 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" />
                        <AvatarFallback className="text-xs">{user.email.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm truncate">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{getRoleDisplayName(user.role)}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </nav>
      

      <MobileNav />
    </>
  )
}
