"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AuthGuard } from "@/components/auth-guard";
import { Navigation } from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "recharts";
import {
  TrendingUp,
  FileText,
  AlertTriangle,
  Star,
  Building2,
  GraduationCap,
  BarChart3,
  Download,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  Award,
  Target,
  Search,
} from "lucide-react";

const facultyProfile = {
  name: "Dr. Priya Sharma",
  designation: "Faculty Coordinator",
  department: "Computer Science Engineering",
  email: "priya.sharma@college.edu",
  studentsSupervised: 45,
  activeInternships: 32,
};

const dashboardStats = [
  {
    title: "Total Students",
    value: "156",
    change: "+12%",
    icon: GraduationCap,
    color: "text-blue-600",
  },
  {
    title: "Active Internships",
    value: "89",
    change: "+8%",
    icon: Building2,
    color: "text-green-600",
  },
  {
    title: "Pending Reviews",
    value: "23",
    change: "-5%",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    title: "Completion Rate",
    value: "94%",
    change: "+3%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
];

const studentsList = [
  {
    id: 1,
    name: "Alex Johnson",
    rollNo: "CS2021001",
    company: "TechCorp Solutions",
    position: "Frontend Developer Intern",
    status: "active",
    progress: 75,
    mentor: "Sarah Chen",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    lastUpdate: "2 days ago",
    skillScore: 85,
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNo: "CS2021002",
    company: "DataFlow Analytics",
    position: "Data Science Intern",
    status: "active",
    progress: 60,
    mentor: "Raj Kumar",
    startDate: "2024-01-10",
    endDate: "2024-05-10",
    lastUpdate: "1 day ago",
    skillScore: 78,
  },
  {
    id: 3,
    name: "Rahul Singh",
    rollNo: "CS2021003",
    company: "Creative Studios",
    position: "UI/UX Design Intern",
    status: "completed",
    progress: 100,
    mentor: "Emily Rodriguez",
    startDate: "2023-12-01",
    endDate: "2024-03-01",
    lastUpdate: "1 week ago",
    skillScore: 92,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    rollNo: "CS2021004",
    company: "StartupXYZ",
    position: "Full Stack Developer Intern",
    status: "pending-review",
    progress: 45,
    mentor: "Michael Brown",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    lastUpdate: "3 days ago",
    skillScore: 71,
  },
];

const performanceData = [
  { month: "Jan", students: 45, completed: 42, pending: 3 },
  { month: "Feb", students: 52, completed: 48, pending: 4 },
  { month: "Mar", students: 38, completed: 36, pending: 2 },
  { month: "Apr", students: 61, completed: 58, pending: 3 },
  { month: "May", students: 49, completed: 46, pending: 3 },
  { month: "Jun", students: 55, completed: 52, pending: 3 },
];

const skillDistribution = [
  { name: "Frontend Development", value: 35, color: "#3b82f6", students: 156 },
  { name: "Backend Development", value: 25, color: "#10b981", students: 112 },
  { name: "Data Science", value: 20, color: "#f59e0b", students: 89 },
  { name: "UI/UX Design", value: 12, color: "#ef4444", students: 54 },
  { name: "DevOps", value: 8, color: "#8b5cf6", students: 36 },
]

const pendingReviews = [
  {
    id: 1,
    student: "Alex Johnson",
    type: "Weekly Report",
    submitted: "2024-01-20",
    deadline: "2024-01-22",
    priority: "high",
  },
  {
    id: 2,
    student: "Priya Patel",
    type: "Mid-term Evaluation",
    submitted: "2024-01-19",
    deadline: "2024-01-25",
    priority: "medium",
  },
  {
    id: 3,
    student: "Sneha Gupta",
    type: "Project Submission",
    submitted: "2024-01-18",
    deadline: "2024-01-24",
    priority: "high",
  },
];

const industryPartners = [
  {
    id: 1,
    name: "TechCorp Solutions",
    activeInterns: 8,
    totalInterns: 25,
    rating: 4.8,
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "DataFlow Analytics",
    activeInterns: 5,
    totalInterns: 18,
    rating: 4.6,
    lastContact: "1 week ago",
  },
  {
    id: 3,
    name: "Creative Studios",
    activeInterns: 3,
    totalInterns: 12,
    rating: 4.9,
    lastContact: "3 days ago",
  },
];

export default function FacultyPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending-review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AuthGuard allowedRoles={["faculty"]}>
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
                <h1 className="text-2xl md:text-3xl font-bold text-balance">
                  Faculty Coordinator Dashboard
                </h1>
                <p className="text-sm md:text-base text-muted-foreground text-pretty">
                  Monitor student progress, evaluate performance, and manage
                  internship programs
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src="/user.jpg" />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="text-xs md:text-sm">
                  <p className="font-medium">{facultyProfile.name}</p>
                  <p className="text-muted-foreground hidden md:block">
                    {facultyProfile.designation}
                  </p>
                </div>
              </div>
            </div>

            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-7 mb-6 md:mb-8 min-w-max md:min-w-0">
                  <TabsTrigger value="dashboard" className="text-xs md:text-sm">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="students" className="text-xs md:text-sm">
                    Students
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-xs md:text-sm">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="text-xs md:text-sm">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="partners" className="text-xs md:text-sm">
                    Partners
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="text-xs md:text-sm">
                    Reports
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-assistant"
                    className="text-xs md:text-sm"
                  >
                    AI Assistant
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="dashboard" className="space-y-6">
                {/* Security Alert for Phishing Detection */}
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
                          <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                            Security Alert:
                          </h3>
                          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                            2 suspicious internship postings detected and
                            blocked from reaching students.
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-orange-600 hover:text-orange-800 text-sm"
                          >
                            View details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {stat.title}
                            </CardTitle>
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {stat.value}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              <span
                                className={
                                  stat.change.startsWith("+")
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {stat.change}
                              </span>{" "}
                              from last month
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* AI Resume Analysis and Skill Gap Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        AI Resume Analysis
                      </CardTitle>
                      <CardDescription>
                        Real-time skill extraction and gap analysis for students
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-sm">
                              Alex Johnson
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Frontend Developer Track
                            </p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                React
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                JavaScript
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs text-orange-600"
                              >
                                Missing: TypeScript
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">
                              85% Match
                            </div>
                            <div className="text-xs text-muted-foreground">
                              2 skill gaps
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-sm">
                              Priya Patel
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Data Science Track
                            </p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                Python
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                SQL
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs text-orange-600"
                              >
                                Missing: ML Ops
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">
                              78% Match
                            </div>
                            <div className="text-xs text-muted-foreground">
                              3 skill gaps
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        View All Analyses
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Pending Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {pendingReviews.slice(0, 3).map((review) => (
                        <div
                          key={review.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-sm">
                              {review.student}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {review.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Due: {review.deadline}
                            </p>
                          </div>
                          <Badge className={getPriorityColor(review.priority)}>
                            {review.priority}
                          </Badge>
                        </div>
                      ))}
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        View All Reviews
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Performance Overview</CardTitle>
                    <CardDescription>
                      Monthly internship completion trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
  <XAxis dataKey="month" stroke="#6b7280" />
  <YAxis stroke="#6b7280" />
  <Tooltip
    contentStyle={{
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      color: "#111827",
    }}
  />
  <Bar dataKey="completed" fill="#3b82f6" />
  <Bar dataKey="pending" fill="#ef4444" />
</BarChart>

                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending-review">
                        Pending Review
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredStudents.map((student) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="/user.jpg" />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {student.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {student.rollNo}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {student.position} at {student.company}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">
                                    Progress:
                                  </span>
                                  <span className="text-sm">
                                    {student.progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={student.progress}
                                  className="w-32"
                                />
                              </div>

                              <div className="text-sm space-y-1">
                                <p>
                                  <span className="font-medium">Mentor:</span>{" "}
                                  {student.mentor}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Skill Score:
                                  </span>{" "}
                                  {student.skillScore}%
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Last Update:
                                  </span>{" "}
                                  {student.lastUpdate}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getStatusColor(student.status)}
                                >
                                  {student.status.replace("-", " ")}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
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

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Reviews</CardTitle>
                    <CardDescription>
                      Student submissions awaiting your review
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingReviews.map((review) => (
                        <div
                          key={review.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="space-y-1 mb-3 md:mb-0">
                            <h4 className="font-semibold">{review.student}</h4>
                            <p className="text-sm text-muted-foreground">
                              {review.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Submitted: {review.submitted} | Due:{" "}
                              {review.deadline}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getPriorityColor(review.priority)}
                            >
                              {review.priority}
                            </Badge>
                            <Button size="sm">Review</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trends</CardTitle>
                      <CardDescription>
                        Student completion rates over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
  <CartesianGrid
    strokeDasharray="3 3"
    stroke="#e5e7eb"  // light gray grid
  />
  <XAxis
    dataKey="month"
    stroke="#6b7280"  // muted text
  />
  <YAxis stroke="#6b7280" />
  <Tooltip
    contentStyle={{
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      color: "#111827",
    }}
  />
  <Line
    type="monotone"
    dataKey="completed"
    stroke="#3b82f6"  // primary blue line
    strokeWidth={3}
  />
</LineChart>

                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Distribution</CardTitle>
                      <CardDescription>
                        Focus areas of current internships
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={skillDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              // Destructure the props passed by Recharts
                              label={({
                                name,
                                percent,
                                x,
                                y,
                                textAnchor,
                                dominantBaseline,
                              }: any) => (
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
                              {skillDistribution.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
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
                      <CardTitle className="text-lg">
                        Average Completion Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        3.2 months
                      </div>
                      <p className="text-sm text-muted-foreground">
                        -0.3 from last semester
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        Student Satisfaction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        4.6/5
                      </div>
                      <p className="text-sm text-muted-foreground">
                        +0.2 from last semester
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Industry Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        4.8/5
                      </div>
                      <p className="text-sm text-muted-foreground">
                        +0.1 from last semester
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="partners" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {industryPartners.map((partner) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-balance">
                            {partner.name}
                          </CardTitle>
                          <CardDescription>Industry Partner</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Active Interns</span>
                              <span className="font-semibold">
                                {partner.activeInterns}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Total Interns</span>
                              <span className="font-semibold">
                                {partner.totalInterns}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Rating</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="font-semibold">
                                  {partner.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Last Contact</span>
                              <span className="text-muted-foreground">
                                {partner.lastContact}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Student Progress Report
                      </CardTitle>
                      <CardDescription>
                        Comprehensive progress tracking for all students
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Performance Analytics
                      </CardTitle>
                      <CardDescription>
                        Detailed analytics and performance metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Industry Partnership
                      </CardTitle>
                      <CardDescription>
                        Partnership status and collaboration metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Completion Certificates
                      </CardTitle>
                      <CardDescription>
                        NEP-compliant completion certificates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Certificates
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Skill Gap Analysis
                      </CardTitle>
                      <CardDescription>
                        Identify areas for curriculum improvement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Analysis
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Semester Summary
                      </CardTitle>
                      <CardDescription>
                        Complete semester performance summary
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Summary
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* AI Assistant tab content */}
              <TabsContent value="ai-assistant" className="space-y-6">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      AI Assistant - Faculty Support
                    </CardTitle>
                    <CardDescription>
                      Get instant help with student management, NEP policies,
                      and internship coordination
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 border rounded-lg p-4 mb-4 overflow-y-auto bg-muted/20">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              AI
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-background p-3 rounded-lg border">
                            <p className="text-sm">
                              Hello! I'm your AI assistant for faculty
                              coordination. I can help you with:
                              <br />• Student progress tracking and evaluation
                              <br />• NEP 2020 compliance guidelines
                              <br />• Industry partnership management
                              <br />• Report generation and analytics
                              <br />
                              <br />
                              How can I assist you today?
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                            <p className="text-sm">
                              How do I evaluate student performance according to
                              NEP guidelines?
                            </p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>PS</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              AI
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-background p-3 rounded-lg border">
                            <p className="text-sm">
                              According to NEP 2020 guidelines, student
                              evaluation should be:
                              <br />• <strong>Competency-based:</strong> Focus
                              on skills and learning outcomes
                              <br />• <strong>Continuous:</strong> Regular
                              assessments throughout the internship
                              <br />• <strong>Holistic:</strong> Include
                              technical skills, soft skills, and industry
                              readiness
                              <br />• <strong>Documented:</strong> Maintain
                              detailed progress reports
                              <br />
                              <br />
                              Would you like me to generate a NEP-compliant
                              evaluation template?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me anything about student management, NEP policies, or internships..."
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
  );
}
