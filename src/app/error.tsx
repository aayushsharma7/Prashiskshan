"use client"

import { useEffect } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Application Error"
      description="The application encountered an unexpected error. Please try refreshing the page."
    />
  )
}
