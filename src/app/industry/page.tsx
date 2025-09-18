"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Plus,
  Search,
  Eye,
  Download,
  Star,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Calendar,
  MessageSquare,
  Edit,
  AlertTriangle,
} from "lucide-react"

const companyProfile = {
  name: "TechCorp Solutions",
  industry: "Information Technology",
  location: "Bangalore, India",
  size: "500-1000 employees",
  website: "www.techcorp.com",
  rating: 4.8,
  totalInterns: 156,
  activeInterns: 23,
}

const dashboardStats = [
  {
    title: "Active Internships",
    value: "12",
    change: "+3",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Applications Received",
    value: "89",
    change: "+15",
    icon: FileText,
    color: "text-green-600",
  },
  {
    title: "Interviews Scheduled",
    value: "24",
    change: "+8",
    icon: Calendar,
    color: "text-orange-600",
  },
  {
    title: "Completion Rate",
    value: "96%",
    change: "+2%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

const internshipPostings = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    department: "Engineering",
    location: "Bangalore",
    type: "Remote",
    duration: "3 months",
    stipend: "₹25,000/month",
    skills: ["React", "JavaScript", "CSS", "Git"],
    applications: 45,
    status: "active",
    posted: "2024-01-15",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    title: "Data Science Intern",
    department: "Analytics",
    location: "Mumbai",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹30,000/month",
    skills: ["Python", "Machine Learning", "SQL", "Pandas"],
    applications: 67,
    status: "active",
    posted: "2024-01-10",
    deadline: "2024-02-10",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    department: "Design",
    location: "Delhi",
    type: "On-site",
    duration: "3 months",
    stipend: "₹20,000/month",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    applications: 32,
    status: "closed",
    posted: "2024-01-05",
    deadline: "2024-01-25",
  },
]

const applications = [
  {
    id: 1,
    student: "Alex Johnson",
    position: "Frontend Developer Intern",
    college: "IIT Delhi",
    cgpa: "8.7",
    skills: ["React", "Node.js", "JavaScript"],
    resumeScore: 92,
    status: "shortlisted",
    appliedDate: "2024-01-18",
    experience: "2 projects",
  },
  {
    id: 2,
    student: "Priya Patel",
    position: "Data Science Intern",
    college: "NIT Trichy",
    cgpa: "9.1",
    skills: ["Python", "Machine Learning", "SQL"],
    resumeScore: 88,
    status: "interview",
    appliedDate: "2024-01-17",
    experience: "3 projects",
  },
  {
    id: 3,
    student: "Rahul Singh",
    position: "UI/UX Design Intern",
    college: "BITS Pilani",
    cgpa: "8.5",
    skills: ["Figma", "Adobe XD", "User Research"],
    resumeScore: 85,
    status: "pending",
    appliedDate: "2024-01-16",
    experience: "1 project",
  },
  {
    id: 4,
    student: "Sneha Gupta",
    position: "Frontend Developer Intern",
    college: "VIT Vellore",
    cgpa: "8.9",
    skills: ["React", "Vue.js", "TypeScript"],
    resumeScore: 90,
    status: "accepted",
    appliedDate: "2024-01-15",
    experience: "4 projects",
  },
]

const currentInterns = [
  {
    id: 1,
    name: "Arjun Kumar",
    position: "Frontend Developer Intern",
    startDate: "2024-01-01",
    endDate: "2024-04-01",
    progress: 75,
    mentor: "Sarah Chen",
    performance: "excellent",
    college: "IIT Bombay",
  },
  {
    id: 2,
    name: "Kavya Sharma",
    position: "Data Science Intern",
    startDate: "2023-12-15",
    endDate: "2024-04-15",
    progress: 60,
    mentor: "Raj Patel",
    performance: "good",
    college: "NIT Karnataka",
  },
  {
    id: 3,
    name: "Vikram Reddy",
    position: "UI/UX Design Intern",
    startDate: "2024-01-10",
    endDate: "2024-04-10",
    progress: 45,
    mentor: "Emily Rodriguez",
    performance: "satisfactory",
    college: "IIIT Hyderabad",
  },
]

const performanceData = [
  { month: "Jan", applications: 45, hired: 8, completed: 6 },
  { month: "Feb", applications: 52, hired: 10, completed: 8 },
  { month: "Mar", applications: 38, hired: 7, completed: 9 },
  { month: "Apr", applications: 61, hired: 12, completed: 7 },
  { month: "May", applications: 49, hired: 9, completed: 11 },
  { month: "Jun", applications: 55, hired: 11, completed: 10 },
]

const skillDemand = [
  { name: "Frontend", value: 35, color: "#8884d8" },
  { name: "Backend", value: 25, color: "#82ca9d" },
  { name: "Data Science", value: 20, color: "#ffc658" },
  { name: "Design", value: 12, color: "#ff7300" },
  { name: "Others", value: 8, color: "#00ff88" },
]

export default function IndustryPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shortlisted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "satisfactory":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "needs-improvement":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getResumeScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || application.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AuthGuard allowedRoles={["industry"]}>
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
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Industry Partner Dashboard</h1>
                <p className="text-sm md:text-base text-muted-foreground text-pretty">
                  Manage internship programs, review candidates, and track intern performance
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
                <div className="text-xs md:text-sm">
                  <p className="font-medium">{companyProfile.name}</p>
                  <p className="text-muted-foreground hidden md:block">{companyProfile.industry}</p>
                </div>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-7 mb-6 md:mb-8 min-w-max md:min-w-0">
                  <TabsTrigger value="dashboard" className="text-xs md:text-sm">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="postings" className="text-xs md:text-sm">
                    Postings
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="text-xs md:text-sm">
                    Applications
                  </TabsTrigger>
                  <TabsTrigger value="interns" className="text-xs md:text-sm">
                    Interns
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="text-xs md:text-sm">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="text-xs md:text-sm">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="ai-assistant" className="text-xs md:text-sm">
                    AI Assistant
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="dashboard" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-orange-800 dark:text-orange-200">Security Alert:</h3>
                          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                            Your company profile has been verified as authentic. 3 fake companies using similar names
                            were blocked this week.
                          </p>
                          <Button variant="link" className="p-0 h-auto text-orange-600 hover:text-orange-800 text-sm">
                            View security report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                              <span className="text-green-600">{stat.change}</span> from last month
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        AI Resume Screening
                      </CardTitle>
                      <CardDescription>Automated candidate evaluation and skill matching</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-sm">Alex Johnson</h4>
                            <p className="text-sm text-muted-foreground">Frontend Developer Position</p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                React ✓
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                JavaScript ✓
                              </Badge>
                              <Badge variant="outline" className="text-xs text-red-600">
                                TypeScript ✗
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">92% Match</div>
                            <div className="text-xs text-muted-foreground">Recommended</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-sm">Priya Patel</h4>
                            <p className="text-sm text-muted-foreground">Data Science Position</p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                Python ✓
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                ML ✓
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                SQL ✓
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">88% Match</div>
                            <div className="text-xs text-muted-foreground">Strong candidate</div>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        View All Screenings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Current Interns
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentInterns.slice(0, 3).map((intern) => (
                        <div key={intern.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm">{intern.name}</h4>
                            <Badge className={getPerformanceColor(intern.performance)}>{intern.performance}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{intern.position}</p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress: {intern.progress}%</span>
                            <span>Mentor: {intern.mentor}</span>
                          </div>
                          <Progress value={intern.progress} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recruitment Performance</CardTitle>
                    <CardDescription>Monthly applications, hiring, and completion trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-muted-foreground" />
                          <YAxis className="text-muted-foreground" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "6px",
                            }}
                          />
                          <Bar dataKey="applications" fill="hsl(var(--muted-foreground))" />
                          <Bar dataKey="hired" fill="hsl(var(--primary))" />
                          <Bar dataKey="completed" fill="hsl(var(--chart-1))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="postings" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search postings..." className="pl-10" />
                    </div>
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Posting
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create New Internship Posting</DialogTitle>
                        <DialogDescription>Fill in the details for your new internship opportunity</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Position Title</Label>
                            <Input id="title" placeholder="e.g., Frontend Developer Intern" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input id="department" placeholder="e.g., Engineering" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="e.g., Bangalore" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="on-site">On-site</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input id="duration" placeholder="e.g., 3 months" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stipend">Stipend</Label>
                          <Input id="stipend" placeholder="e.g., ₹25,000/month" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                          <Input id="skills" placeholder="e.g., React, JavaScript, CSS" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Job Description</Label>
                          <Textarea id="description" placeholder="Describe the role and responsibilities..." rows={4} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="deadline">Application Deadline</Label>
                            <Input id="deadline" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="positions">Number of Positions</Label>
                            <Input id="positions" type="number" placeholder="1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateDialogOpen(false)}
                          className="bg-transparent"
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Posting</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {internshipPostings.map((posting) => (
                    <motion.div
                      key={posting.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-lg text-balance">{posting.title}</CardTitle>
                            <Badge variant={posting.status === "active" ? "default" : "secondary"}>
                              {posting.status}
                            </Badge>
                          </div>
                          <CardDescription>{posting.department}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {posting.location} • {posting.type}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {posting.duration}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <Star className="h-4 w-4" />
                              {posting.stipend}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium">Required Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {posting.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{posting.applications} applications</span>
                            <span>Deadline: {posting.deadline}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredApplications.map((application) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                <AvatarFallback>
                                  {application.student
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{application.student}</h3>
                                <p className="text-sm text-muted-foreground">{application.college}</p>
                                <p className="text-sm text-muted-foreground">{application.position}</p>
                              </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">CGPA:</span> {application.cgpa}
                                </p>
                                <p>
                                  <span className="font-medium">Experience:</span> {application.experience}
                                </p>
                                <p>
                                  <span className="font-medium">Resume Score:</span>{" "}
                                  <span className={getResumeScoreColor(application.resumeScore)}>
                                    {application.resumeScore}%
                                  </span>
                                </p>
                              </div>

                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-1">
                                  {application.skills.slice(0, 3).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                                <p className="text-xs text-muted-foreground">Applied: {application.appliedDate}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                                <Button size="sm" variant="outline" className="bg-transparent">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button size="sm">Review</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="interns" className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {currentInterns.map((intern) => (
                    <motion.div
                      key={intern.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                <AvatarFallback>
                                  {intern.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{intern.name}</h3>
                                <p className="text-sm text-muted-foreground">{intern.college}</p>
                                <p className="text-sm text-muted-foreground">{intern.position}</p>
                              </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Progress:</span>
                                  <span className="text-sm">{intern.progress}%</span>
                                </div>
                                <Progress value={intern.progress} className="w-32" />
                              </div>

                              <div className="text-sm space-y-1">
                                <p>
                                  <span className="font-medium">Mentor:</span> {intern.mentor}
                                </p>
                                <p>
                                  <span className="font-medium">Start Date:</span> {intern.startDate}
                                </p>
                                <p>
                                  <span className="font-medium">End Date:</span> {intern.endDate}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge className={getPerformanceColor(intern.performance)}>{intern.performance}</Badge>
                                <Button size="sm" variant="outline" className="bg-transparent">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Contact
                                </Button>
                                <Button size="sm" variant="outline" className="bg-transparent">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Trends</CardTitle>
                      <CardDescription>Monthly application and hiring patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" strokeWidth={2} />
                            <Line type="monotone" dataKey="hired" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Demand</CardTitle>
                      <CardDescription>Most requested skills in internship postings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                                                              data={skillDemand}
                                                              cx="50%"
                                                              cy="50%"
                                                              labelLine={false}
                                                              // Destructure the props passed by Recharts
                                                              label={({ name, percent, x, y, textAnchor, dominantBaseline }: any) => (
                                                                <text
                                                                  x={x}
                                                                  y={y}
                                                                  fill="#333"
                                                                  textAnchor={textAnchor}
                                                                  dominantBaseline={dominantBaseline}
                                                                  fontSize={12}
                                                                >
                                                                  {`${name} ${(percent * 100).toFixed(0)}%`}
                                                                </text>
                                                              )}
                                                              outerRadius={80}
                                                              fill="#8884d8"
                                                              dataKey="value"
                                                            >
                                                              {skillDemand.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                              ))}
                                                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Average Resume Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">87.5%</div>
                      <p className="text-sm text-muted-foreground">+2.3% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Interview Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">68%</div>
                      <p className="text-sm text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Intern Retention</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">94%</div>
                      <p className="text-sm text-muted-foreground">+1% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Manage your company information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="text-lg">TC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{companyProfile.name}</h3>
                        <p className="text-muted-foreground">{companyProfile.industry}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{companyProfile.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({companyProfile.totalInterns} total interns)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Company Size</label>
                          <p className="text-sm text-muted-foreground">{companyProfile.size}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Location</label>
                          <p className="text-sm text-muted-foreground">{companyProfile.location}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Website</label>
                          <p className="text-sm text-muted-foreground">{companyProfile.website}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Active Interns</label>
                          <p className="text-sm text-muted-foreground">{companyProfile.activeInterns}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Total Interns Hired</label>
                          <p className="text-sm text-muted-foreground">{companyProfile.totalInterns}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Company Rating</label>
                          <p className="text-sm text-muted-foreground">{companyProfile.rating}/5.0</p>
                        </div>
                      </div>
                    </div>

                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-assistant" className="space-y-6">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      AI Assistant - Industry Partner Support
                    </CardTitle>
                    <CardDescription>
                      Get instant help with recruitment, intern management, and compliance requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 border rounded-lg p-4 mb-4 overflow-y-auto bg-muted/20">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-background p-3 rounded-lg border">
                            <p className="text-sm">
                              Hello! I'm your AI assistant for industry partnerships. I can help you with:
                              <br />• Candidate screening and resume analysis
                              <br />• Internship program optimization
                              <br />• Compliance with educational standards
                              <br />• Performance tracking and reporting
                              <br />• Best practices for intern management
                              <br />
                              <br />
                              What would you like assistance with today?
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                            <p className="text-sm">How can I improve our intern retention rate?</p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>TC</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-background p-3 rounded-lg border">
                            <p className="text-sm">
                              Based on industry best practices, here are key strategies to improve intern retention:
                              <br />• <strong>Clear expectations:</strong> Set specific goals and milestones
                              <br />• <strong>Regular feedback:</strong> Weekly check-ins and progress reviews
                              <br />• <strong>Meaningful projects:</strong> Assign real-world, impactful work
                              <br />• <strong>Mentorship:</strong> Pair interns with experienced team members
                              <br />• <strong>Growth opportunities:</strong> Provide learning and development paths
                              <br />
                              <br />
                              Your current retention rate is 94% - would you like specific recommendations for your
                              program?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me about recruitment, intern management, or compliance..."
                        className="flex-1"
                      />
                      <Button>Send</Button>
                    </div>
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
