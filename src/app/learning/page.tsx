"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { BookOpen, Play, CheckCircle, Clock, Star, Users, Target, TrendingUp, Search, ArrowRight } from "lucide-react"

const learningModules = [
  {
    id: 1,
    title: "Frontend Development Mastery",
    description: "Complete guide to modern frontend development with React, TypeScript, and best practices",
    instructor: "Sarah Chen",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.9,
    students: 1247,
    lessons: 48,
    projects: 8,
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Testing"],
    progress: 0,
    status: "not-started",
    thumbnail: "/frontend-development-course.png",
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Learn data science from scratch with Python, machine learning, and statistical analysis",
    instructor: "Raj Patel",
    duration: "16 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 892,
    lessons: 64,
    projects: 12,
    skills: ["Python", "Machine Learning", "Statistics", "Pandas", "Visualization"],
    progress: 25,
    status: "in-progress",
    thumbnail: "/data-science-course.png",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Master user interface and experience design with industry-standard tools and methodologies",
    instructor: "Emily Rodriguez",
    duration: "10 weeks",
    level: "Beginner",
    rating: 4.9,
    students: 634,
    lessons: 40,
    projects: 6,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability"],
    progress: 100,
    status: "completed",
    thumbnail: "/ui-ux-design-course.png",
  },
  {
    id: 4,
    title: "Cloud Computing with AWS",
    description: "Comprehensive AWS training covering core services, architecture, and best practices",
    instructor: "Arjun Kumar",
    duration: "14 weeks",
    level: "Intermediate",
    rating: 4.7,
    students: 456,
    lessons: 56,
    projects: 10,
    skills: ["AWS", "Docker", "Kubernetes", "DevOps", "Infrastructure"],
    progress: 60,
    status: "in-progress",
    thumbnail: "/aws-cloud-computing-course.png",
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native and modern development practices",
    instructor: "Lisa Wang",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.6,
    students: 723,
    lessons: 48,
    projects: 8,
    skills: ["React Native", "Mobile UI", "API Integration", "Testing", "Deployment"],
    progress: 0,
    status: "not-started",
    thumbnail: "/mobile-app-development.png",
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    description: "Learn fundamental cybersecurity concepts, threat analysis, and security implementation",
    instructor: "David Kim",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 389,
    lessons: 32,
    projects: 4,
    skills: ["Security", "Networking", "Ethical Hacking", "Risk Assessment", "Compliance"],
    progress: 0,
    status: "not-started",
    thumbnail: "/cybersecurity-course.png",
  },
]

const skillPaths = [
  {
    id: 1,
    title: "Full Stack Developer",
    description: "Complete path from frontend to backend development",
    modules: 6,
    duration: "24 weeks",
    difficulty: "Intermediate",
    students: 2341,
    skills: ["React", "Node.js", "Database", "API Design", "DevOps"],
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Comprehensive data science and machine learning track",
    modules: 8,
    duration: "32 weeks",
    difficulty: "Advanced",
    students: 1876,
    skills: ["Python", "ML", "Statistics", "Deep Learning", "Big Data"],
  },
  {
    id: 3,
    title: "Product Designer",
    description: "End-to-end product design and user experience",
    modules: 5,
    duration: "20 weeks",
    difficulty: "Beginner",
    students: 1234,
    skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design", "Strategy"],
  },
]

const achievements = [
  {
    id: 1,
    title: "First Course Completed",
    description: "Completed your first learning module",
    icon: "🎓",
    earned: true,
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Skill Master",
    description: "Mastered 5 different skills",
    icon: "⭐",
    earned: true,
    date: "2024-01-20",
  },
  {
    id: 3,
    title: "Project Builder",
    description: "Completed 10 hands-on projects",
    icon: "🔨",
    earned: false,
    progress: 70,
  },
  {
    id: 4,
    title: "Learning Streak",
    description: "30 days of continuous learning",
    icon: "🔥",
    earned: false,
    progress: 23,
  },
]

export default function LearningPage() {
  const [selectedTab, setSelectedTab] = useState("courses")
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-400" />
    }
  }

  const filteredModules = learningModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLevel = levelFilter === "all" || module.level.toLowerCase() === levelFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || module.status === statusFilter

    return matchesSearch && matchesLevel && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-balance">Skill Development & Learning Hub</h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto text-pretty">
              Enhance your skills with industry-relevant courses, hands-on projects, and personalized learning paths
              designed for career success
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="paths">Learning Paths</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses by title, skills, or instructor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredModules.map((module) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={module.thumbnail || "/placeholder.svg"}
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg text-balance">{module.title}</CardTitle>
                          {getStatusIcon(module.status)}
                        </div>
                        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                        <p className="text-sm text-muted-foreground">by {module.instructor}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {module.progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {module.lessons} lessons
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {module.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {module.students}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {module.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {module.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{module.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(module.status)} variant="outline">
                            {module.status.replace("-", " ")}
                          </Badge>
                          <Badge variant="outline">{module.level}</Badge>
                        </div>

                        <Button className="w-full">
                          {module.status === "completed"
                            ? "Review Course"
                            : module.status === "in-progress"
                              ? "Continue Learning"
                              : "Start Course"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="paths" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {skillPaths.map((path) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl text-balance">{path.title}</CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Modules:</span> {path.modules}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {path.duration}
                          </div>
                          <div>
                            <span className="font-medium">Level:</span> {path.difficulty}
                          </div>
                          <div>
                            <span className="font-medium">Students:</span> {path.students}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {path.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">
                          Start Learning Path
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {learningModules
                      .filter((module) => module.progress > 0)
                      .map((module) => (
                        <div key={module.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm">{module.title}</h4>
                            <span className="text-sm text-muted-foreground">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} />
                          <p className="text-xs text-muted-foreground">
                            {Math.floor((module.lessons * module.progress) / 100)} of {module.lessons} lessons completed
                          </p>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Learning Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Complete Frontend Mastery</h4>
                      <p className="text-sm text-muted-foreground mb-2">Master React and modern frontend development</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress: 0%</span>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Data Science Certification</h4>
                      <p className="text-sm text-muted-foreground mb-2">Complete data science fundamentals course</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress: 25%</span>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Learning Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">{day}</p>
                        <div className="h-8 bg-primary/20 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You've been learning consistently this week! Keep up the great work.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`${achievement.earned ? "border-primary" : "border-muted"} hover:shadow-lg transition-shadow`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`text-4xl ${achievement.earned ? "grayscale-0" : "grayscale"}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            {achievement.earned ? (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Earned on {achievement.date}
                              </Badge>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsDashboard userType="faculty" />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}
