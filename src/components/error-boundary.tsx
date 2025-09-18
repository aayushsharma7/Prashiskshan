"use client"

import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryProps {
  error?: Error
  reset?: () => void
  title?: string
  description?: string
}

export function ErrorBoundary({
  error,
  reset,
  title = "Something went wrong",
  description = "An error occurred while loading this content. Please try again.",
}: ErrorBoundaryProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
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
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </motion.div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-pretty">{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <details className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                <code className="block whitespace-pre-wrap break-all">{error.message}</code>
              </details>
            )}
            {reset && (
              <Button onClick={reset} className="w-full bg-transparent" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
