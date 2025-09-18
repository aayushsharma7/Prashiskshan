"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Upload,
  Brain,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Star,
  Target,
  BookOpen,
  MessageSquare,
} from "lucide-react"

interface ResumeAnalysis {
  overallScore: number
  sections: {
    name: string
    score: number
    feedback: string
    suggestions: string[]
    status: "excellent" | "good" | "needs-improvement" | "missing"
  }[]
  skills: {
    technical: string[]
    soft: string[]
    missing: string[]
  }
  experience: {
    projects: number
    internships: number
    workExperience: number
  }
  recommendations: string[]
  matchScore?: number
  jobProfile?: string
}

const sampleAnalysis: ResumeAnalysis = {
  overallScore: 87,
  sections: [
    {
      name: "Contact Information",
      score: 95,
      feedback: "Complete and professional contact details",
      suggestions: ["Consider adding LinkedIn profile"],
      status: "excellent",
    },
    {
      name: "Professional Summary",
      score: 82,
      feedback: "Good summary but could be more specific",
      suggestions: ["Add quantifiable achievements", "Include specific technologies"],
      status: "good",
    },
    {
      name: "Technical Skills",
      score: 90,
      feedback: "Strong technical skill set",
      suggestions: ["Add proficiency levels", "Include recent technologies"],
      status: "excellent",
    },
    {
      name: "Experience",
      score: 75,
      feedback: "Limited professional experience",
      suggestions: ["Add more project details", "Include internship experiences"],
      status: "good",
    },
    {
      name: "Education",
      score: 88,
      feedback: "Strong educational background",
      suggestions: ["Add relevant coursework", "Include academic projects"],
      status: "good",
    },
    {
      name: "Projects",
      score: 85,
      feedback: "Good project showcase",
      suggestions: ["Add live demo links", "Include technology stack details"],
      status: "good",
    },
  ],
  skills: {
    technical: ["React", "JavaScript", "Python", "Node.js", "SQL", "Git"],
    soft: ["Communication", "Problem Solving", "Team Work", "Leadership"],
    missing: ["Machine Learning", "Cloud Computing", "DevOps", "Testing"],
  },
  experience: {
    projects: 4,
    internships: 1,
    workExperience: 0,
  },
  recommendations: [
    "Add more quantifiable achievements in project descriptions",
    "Include metrics and impact of your work",
    "Consider adding certifications in emerging technologies",
    "Improve formatting and visual hierarchy",
    "Add a portfolio website link",
  ],
  matchScore: 78,
  jobProfile: "Frontend Developer Intern",
}

interface ResumeAnalyzerProps {
  userType?: "faculty" | "industry"
  jobProfile?: string
}

export function ResumeAnalyzer({ userType = "faculty", jobProfile }: ResumeAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [selectedTab, setSelectedTab] = useState("upload")

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setAnalysis(sampleAnalysis)
    setIsAnalyzing(false)
    setSelectedTab("results")
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "needs-improvement":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "missing":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Resume Analyzer
          </CardTitle>
          <CardDescription>
            {userType === "industry"
              ? "Automatically analyze and score candidate resumes for better hiring decisions"
              : "Help students improve their resumes with AI-powered analysis and recommendations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Resume</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysis}>
                Analysis Results
              </TabsTrigger>
              <TabsTrigger value="recommendations" disabled={!analysis}>
                Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Upload Resume for Analysis</h3>
                <p className="text-muted-foreground mb-4">Support for PDF, DOC, and DOCX files up to 10MB</p>
                <Button className="mb-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground">
                  Your resume will be analyzed using advanced AI algorithms
                </p>
              </div>

              {jobProfile && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Job Profile Match</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">{jobProfile}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Resume will be analyzed specifically for this position
                    </p>
                  </CardContent>
                </Card>
              )}

              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {analysis && (
                <>
                  {/* Overall Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Overall Resume Score</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                            {analysis.overallScore}%
                          </span>
                          {analysis.matchScore && (
                            <Badge variant="outline" className="ml-2">
                              {analysis.matchScore}% job match
                            </Badge>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={analysis.overallScore} className="mb-4" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">{analysis.experience.projects}</div>
                          <p className="text-sm text-muted-foreground">Projects</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{analysis.experience.internships}</div>
                          <p className="text-sm text-muted-foreground">Internships</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{analysis.skills.technical.length}</div>
                          <p className="text-sm text-muted-foreground">Technical Skills</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Section-wise Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.sections.map((section, index) => (
                        <motion.div
                          key={section.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{section.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${getScoreColor(section.score)}`}>{section.score}%</span>
                              <Badge className={getStatusColor(section.status)}>{section.status}</Badge>
                            </div>
                          </div>
                          <Progress value={section.score} className="mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">{section.feedback}</p>
                          {section.suggestions.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Suggestions:</p>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {section.suggestions.map((suggestion, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Skills Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Identified Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Technical Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {analysis.skills.technical.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Soft Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {analysis.skills.soft.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          Missing Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          Consider adding these skills to improve your profile:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.skills.missing.map((skill) => (
                            <Badge key={skill} variant="destructive" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              {analysis && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Improvement Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysis.recommendations.map((recommendation, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className="flex items-start gap-3 p-3 border rounded-lg"
                          >
                            <Star className="h-4 w-4 text-primary mt-0.5" />
                            <p className="text-sm">{recommendation}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {userType === "faculty" && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Learning Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium mb-1">Resume Writing Workshop</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Learn professional resume formatting and content optimization
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Enroll Now
                          </Button>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium mb-1">Technical Skills Assessment</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Identify skill gaps and get personalized learning paths
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Take Assessment
                          </Button>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium mb-1">Portfolio Development</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Create an impressive online portfolio to showcase your work
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Start Building
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Generate Detailed Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea placeholder="Add additional comments or feedback..." rows={3} className="resize-none" />
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <FileText className="mr-2 h-4 w-4" />
                          Generate PDF Report
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Share with Student
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
