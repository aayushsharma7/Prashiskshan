"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldX, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  const handleGoBack = () => {
    const userRole = localStorage.getItem("userRole")

    switch (userRole) {
      case "student":
        router.push("/students")
        break
      case "faculty":
        router.push("/faculty")
        break
      case "industry":
        router.push("/industry")
        break
      case "admin":
        router.push("/admin")
        break
      default:
        router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10"
            >
              <ShieldX className="h-6 w-6 text-destructive" />
            </motion.div>
            <CardTitle className="text-xl">Access Denied</CardTitle>
            <CardDescription className="text-pretty">
              You don't have permission to access this page. Please contact your administrator if you believe this is an
              error.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
