"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  MapPin,
  Building2,
  Star,
  TrendingUp,
  MessageSquare,
  Award,
  Target,
  Users,
  Play,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Upload,
  Brain,
  Shield,
  Bot,
  FileText,
  Zap,
  AlertTriangle,
  MessageCircle,
  Send,
  Lightbulb,
  GraduationCap,
  Briefcase,
} from "lucide-react"

const studentProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@college.edu",
  course: "Computer Science Engineering",
  semester: "5th Semester",
  cgpa: "8.7",
  skills: ["React", "Node.js", "Python", "Machine Learning", "UI/UX Design"],
  completedInternships: 2,
  skillScore: 85,
}

const internshipOpportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    duration: "3 months",
    stipend: "₹25,000/month",
    skills: ["React", "JavaScript", "CSS"],
    matchScore: 95,
    posted: "2 days ago",
    applicants: 45,
    type: "Remote",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataFlow Analytics",
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹30,000/month",
    skills: ["Python", "Machine Learning", "SQL"],
    matchScore: 88,
    posted: "1 week ago",
    applicants: 67,
    type: "Hybrid",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Studios",
    location: "Delhi, India",
    duration: "3 months",
    stipend: "₹20,000/month",
    skills: ["Figma", "Adobe XD", "User Research"],
    matchScore: 78,
    posted: "3 days ago",
    applicants: 32,
    type: "On-site",
  },
]

const skillDevelopmentModules = [
  {
    id: 1,
    title: "Advanced React Development",
    description: "Master modern React patterns and hooks",
    duration: "4 weeks",
    level: "Intermediate",
    progress: 75,
    status: "in-progress",
    lessons: 12,
    completedLessons: 9,
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Introduction to ML algorithms and applications",
    duration: "6 weeks",
    level: "Beginner",
    progress: 0,
    status: "not-started",
    lessons: 18,
    completedLessons: 0,
  },
  {
    id: 3,
    title: "Professional Communication",
    description: "Enhance workplace communication skills",
    duration: "2 weeks",
    level: "Beginner",
    progress: 100,
    status: "completed",
    lessons: 8,
    completedLessons: 8,
  },
  {
    id: 4,
    title: "Industry Readiness Program",
    description: "Prepare for professional work environment",
    duration: "3 weeks",
    level: "Intermediate",
    progress: 40,
    status: "in-progress",
    lessons: 10,
    completedLessons: 4,
  },
]

const mentorshipSessions = [
  {
    id: 1,
    mentor: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Google",
    expertise: ["React", "System Design", "Career Growth"],
    rating: 4.9,
    sessions: 15,
    nextSession: "Tomorrow, 3:00 PM",
    status: "scheduled",
  },
  {
    id: 2,
    mentor: "Raj Patel",
    role: "Data Science Manager",
    company: "Microsoft",
    expertise: ["Machine Learning", "Python", "Data Analysis"],
    rating: 4.8,
    sessions: 8,
    nextSession: "Available",
    status: "available",
  },
  {
    id: 3,
    mentor: "Emily Rodriguez",
    role: "UX Design Lead",
    company: "Adobe",
    expertise: ["UI/UX Design", "Design Systems", "User Research"],
    rating: 4.9,
    sessions: 12,
    nextSession: "Friday, 2:00 PM",
    status: "scheduled",
  },
]

const applications = [
  {
    id: 1,
    company: "TechCorp Solutions",
    position: "Frontend Developer Intern",
    status: "interview",
    appliedDate: "2024-01-15",
    nextStep: "Technical Interview - Jan 25",
  },
  {
    id: 2,
    company: "DataFlow Analytics",
    position: "Data Science Intern",
    status: "under-review",
    appliedDate: "2024-01-12",
    nextStep: "Waiting for response",
  },
  {
    id: 3,
    company: "Creative Studios",
    position: "UI/UX Design Intern",
    status: "accepted",
    appliedDate: "2024-01-10",
    nextStep: "Onboarding scheduled",
  },
]

const resumeAnalysis = {
  extractedSkills: ["React", "JavaScript", "Python", "Git", "HTML/CSS"],
  missingSkills: ["Docker", "AWS", "TypeScript", "System Design"],
  skillGaps: [
    {
      skill: "Docker",
      importance: "High",
      description: "Containerization is essential for modern development",
      learningPath: "Complete Docker fundamentals course",
      estimatedTime: "2 weeks",
    },
    {
      skill: "AWS",
      importance: "High",
      description: "Cloud services knowledge required for most roles",
      learningPath: "AWS Cloud Practitioner certification",
      estimatedTime: "4 weeks",
    },
    {
      skill: "TypeScript",
      importance: "Medium",
      description: "Type safety improves code quality",
      learningPath: "TypeScript for React developers",
      estimatedTime: "1 week",
    },
  ],
  overallScore: 75,
  recommendations: [
    "Focus on cloud technologies to increase marketability",
    "Add containerization skills for DevOps roles",
    "Consider system design courses for senior positions",
  ],
}

const chatMessages = [
  {
    id: 1,
    type: "bot",
    message: "Hi Alex! I'm your AI assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "user",
    message: "I need help with my internship application",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    type: "bot",
    message:
      "I'd be happy to help! What specific aspect of your application do you need assistance with? I can help with resume optimization, cover letters, interview preparation, or application tracking.",
    timestamp: "10:31 AM",
  },
]

const phishingAlerts = [
  {
    id: 1,
    company: "TechScam Solutions",
    position: "High-Paying Remote Intern",
    riskLevel: "High",
    reasons: ["Suspicious domain", "Unrealistic salary", "No company verification"],
    status: "blocked",
  },
  {
    id: 2,
    company: "QuickCert Institute",
    position: "Certified Developer Program",
    riskLevel: "Medium",
    reasons: ["Certificate mill indicators", "Pay-to-work model"],
    status: "flagged",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [chatInput, setChatInput] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [showResumeAnalysis, setShowResumeAnalysis] = useState(false)

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // In real implementation, this would send to AI service
      console.log("Sending message:", chatInput)
      setChatInput("")
    }
  }

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeFile(file)
      setShowResumeAnalysis(true)
      // In real implementation, this would process the resume
      console.log("Processing resume:", file.name)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "under-review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getModuleStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <AuthGuard allowedRoles={["student"]}>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8 max-w-7xl pb-20 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Student Portal</h1>
                <p className="text-sm md:text-base text-muted-foreground text-pretty">
                  Manage your internships, develop skills, and connect with mentors
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="text-xs md:text-sm">
                  <p className="font-medium">{studentProfile.name}</p>
                  <p className="text-muted-foreground hidden md:block">{studentProfile.course}</p>
                </div>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <div className="overflow-x-auto scrollbar-thin">
                <TabsList className="grid w-full grid-cols-8 mb-6 md:mb-8 min-w-max md:min-w-0">
                  <TabsTrigger value="dashboard" className="text-xs md:text-sm">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="internships" className="text-xs md:text-sm">
                    Internships
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="text-xs md:text-sm">
                    Applications
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs md:text-sm">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="mentorship" className="text-xs md:text-sm">
                    Mentorship
                  </TabsTrigger>
                  <TabsTrigger value="learning" className="text-xs md:text-sm">
                    Learning
                  </TabsTrigger>
                  <TabsTrigger value="ai-assistant" className="text-xs md:text-sm">
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="text-xs md:text-sm">
                    Profile
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="dashboard" className="space-y-6">
                {phishingAlerts.length > 0 && (
                  <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                    <Shield className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800 dark:text-orange-200">
                      <strong>Security Alert:</strong> {phishingAlerts.length} suspicious internship postings detected
                      and blocked.
                      <Button variant="link" className="p-0 h-auto text-orange-600 underline ml-1">
                        View details
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Profile Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Academic Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CGPA</span>
                        <span className="font-semibold">{studentProfile.cgpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Semester</span>
                        <span className="font-semibold">{studentProfile.semester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Internships</span>
                        <span className="font-semibold">{studentProfile.completedInternships}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Skill Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl font-bold text-primary">{studentProfile.skillScore}%</div>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <Progress value={studentProfile.skillScore} className="mb-2" />
                      <p className="text-xs text-muted-foreground">Industry readiness score</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Find Internships
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Start Learning
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Book Mentorship
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      AI Resume Analysis & Skill Gap Detection
                    </CardTitle>
                    <CardDescription>
                      Upload your resume for AI-powered skill analysis and personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!showResumeAnalysis ? (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Get instant AI analysis of your skills and personalized improvement suggestions
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label htmlFor="resume-upload">
                          <Button className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Resume File
                          </Button>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Resume analyzed successfully!</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Zap className="h-4 w-4 text-green-600" />
                              Extracted Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {resumeAnalysis.extractedSkills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              Missing Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {resumeAnalysis.missingSkills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            Skill Gap Analysis & Learning Path
                          </h4>
                          <div className="space-y-3">
                            {resumeAnalysis.skillGaps.map((gap, index) => (
                              <div key={index} className="p-4 border rounded-lg bg-muted/30">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium">{gap.skill}</h5>
                                  <Badge variant={gap.importance === "High" ? "destructive" : "secondary"}>
                                    {gap.importance} Priority
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{gap.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-primary font-medium">{gap.learningPath}</span>
                                  <span className="text-muted-foreground">{gap.estimatedTime}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            AI Recommendations
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {resumeAnalysis.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Recommended Internships
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {internshipOpportunities.slice(0, 3).map((internship) => (
                        <div key={internship.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-sm">{internship.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {internship.matchScore}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{internship.company}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {internship.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {internship.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Learning Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skillDevelopmentModules.slice(0, 3).map((module) => (
                        <div key={module.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm">{module.title}</h4>
                            {getModuleStatusIcon(module.status)}
                          </div>
                          <Progress value={module.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              {module.completedLessons}/{module.lessons} lessons
                            </span>
                            <span>{module.progress}% complete</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="internships" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search internships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {internshipOpportunities.map((internship) => (
                    <motion.div
                      key={internship.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-lg text-balance">{internship.title}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {internship.matchScore}% match
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            {internship.company}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {internship.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {internship.duration}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <Star className="h-4 w-4" />
                              {internship.stipend}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium">Required Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {internship.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{internship.applicants} applicants</span>
                            <span>{internship.posted}</span>
                          </div>

                          <Button className="w-full">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>Track your internship application status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div
                          key={application.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="space-y-1 mb-3 md:mb-0">
                            <h4 className="font-semibold">{application.position}</h4>
                            <p className="text-sm text-muted-foreground">{application.company}</p>
                            <p className="text-xs text-muted-foreground">Applied: {application.appliedDate}</p>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            <p className="text-xs text-muted-foreground">{application.nextStep}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {skillDevelopmentModules.map((module) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-lg text-balance">{module.title}</CardTitle>
                            {getModuleStatusIcon(module.status)}
                          </div>
                          <CardDescription>{module.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} />
                          </div>

                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              {module.completedLessons}/{module.lessons} lessons
                            </span>
                            <span>{module.duration}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {module.level}
                            </Badge>
                          </div>

                          <Button
                            className="w-full"
                            variant={module.status === "completed" ? "outline" : "default"}
                            disabled={module.status === "completed"}
                          >
                            {module.status === "completed"
                              ? "Completed"
                              : module.status === "in-progress"
                                ? "Continue Learning"
                                : "Start Module"}
                            {module.status !== "completed" && <ArrowRight className="ml-2 h-4 w-4" />}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mentorship" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mentorshipSessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/placeholder.svg?height=48&width=48" />
                              <AvatarFallback>
                                {session.mentor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{session.mentor}</CardTitle>
                              <CardDescription>{session.role}</CardDescription>
                              <p className="text-xs text-muted-foreground">{session.company}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{session.rating}</span>
                            <span className="text-sm text-muted-foreground">({session.sessions} sessions)</span>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium">Expertise:</p>
                            <div className="flex flex-wrap gap-1">
                              {session.expertise.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium">Next Session:</p>
                            <p className="text-sm text-muted-foreground">{session.nextSession}</p>
                          </div>

                          <Button className="w-full" variant={session.status === "scheduled" ? "outline" : "default"}>
                            {session.status === "scheduled" ? "View Session" : "Book Session"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Free Mentorship Program</CardTitle>
                    <CardDescription>
                      Connect with industry experts for career guidance and skill development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 border rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">500+ Mentors</h4>
                        <p className="text-sm text-muted-foreground">Industry professionals</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">1-on-1 Sessions</h4>
                        <p className="text-sm text-muted-foreground">Personalized guidance</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">100% Free</h4>
                        <p className="text-sm text-muted-foreground">No cost for students</p>
                      </div>
                    </div>
                    <Button className="w-full md:w-auto">
                      Browse All Mentors
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal and academic details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="text-lg">AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{studentProfile.name}</h3>
                        <p className="text-muted-foreground">{studentProfile.email}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Course</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.course}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Current Semester</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.semester}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">CGPA</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.cgpa}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Skills</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {studentProfile.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Completed Internships</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.completedInternships}</p>
                        </div>
                      </div>
                    </div>

                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="learning" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {skillDevelopmentModules.map((module) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-lg text-balance">{module.title}</CardTitle>
                            {getModuleStatusIcon(module.status)}
                          </div>
                          <CardDescription>{module.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} />
                          </div>

                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              {module.completedLessons}/{module.lessons} lessons
                            </span>
                            <span>{module.duration}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {module.level}
                            </Badge>
                          </div>

                          <Button
                            className="w-full"
                            variant={module.status === "completed" ? "outline" : "default"}
                            disabled={module.status === "completed"}
                          >
                            {module.status === "completed"
                              ? "Completed"
                              : module.status === "in-progress"
                                ? "Continue Learning"
                                : "Start Module"}
                            {module.status !== "completed" && <ArrowRight className="ml-2 h-4 w-4" />}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Additional Learning Resources
                    </CardTitle>
                    <CardDescription>Curated resources to enhance your skills and career prospects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <FileText className="h-8 w-8 mb-3 text-primary" />
                        <h4 className="font-semibold mb-2">Industry Reports</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Latest trends and insights from top companies
                        </p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Browse Reports
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <Briefcase className="h-8 w-8 mb-3 text-primary" />
                        <h4 className="font-semibold mb-2">Career Guides</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Step-by-step guides for different career paths
                        </p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Guides
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <Users className="h-8 w-8 mb-3 text-primary" />
                        <h4 className="font-semibold mb-2">Peer Learning</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Connect with peers for collaborative learning
                        </p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Join Groups
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-assistant" className="space-y-6">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      Smart Assistant - 24/7 Support
                    </CardTitle>
                    <CardDescription>
                      Get instant help with internships, applications, NEP policies, and career guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 border rounded-lg bg-muted/20">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me anything about internships, applications, or career guidance..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!chatInput.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold mb-1">24/7 Availability</h4>
                      <p className="text-sm text-muted-foreground">Always here to help</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold mb-1">Smart Responses</h4>
                      <p className="text-sm text-muted-foreground">AI-powered assistance</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold mb-1">NEP 2020 Expert</h4>
                      <p className="text-sm text-muted-foreground">Policy compliance help</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal and academic details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="text-lg">AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{studentProfile.name}</h3>
                        <p className="text-muted-foreground">{studentProfile.email}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Course</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.course}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Current Semester</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.semester}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">CGPA</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.cgpa}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Skills</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {studentProfile.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Completed Internships</label>
                          <p className="text-sm text-muted-foreground">{studentProfile.completedInternships}</p>
                        </div>
                      </div>
                    </div>

                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </AuthGuard>
  )
}
