"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from "recharts"
import { TrendingUp, Users, Building2, GraduationCap, Award, Download, Filter } from "lucide-react"

// Sample data for various charts
const monthlyData = [
  { month: "Jan", students: 145, internships: 89, completed: 82, applications: 234 },
  { month: "Feb", students: 162, internships: 95, completed: 88, applications: 267 },
  { month: "Mar", students: 138, internships: 78, completed: 75, applications: 198 },
  { month: "Apr", students: 189, internships: 112, completed: 105, applications: 312 },
  { month: "May", students: 156, internships: 98, completed: 92, applications: 245 },
  { month: "Jun", students: 178, internships: 108, completed: 101, applications: 289 },
]

const skillDistribution = [
  { name: "Frontend Development", value: 35, color: "#3b82f6", students: 156 },
  { name: "Backend Development", value: 25, color: "#10b981", students: 112 },
  { name: "Data Science", value: 20, color: "#f59e0b", students: 89 },
  { name: "UI/UX Design", value: 12, color: "#ef4444", students: 54 },
  { name: "DevOps", value: 8, color: "#8b5cf6", students: 36 },
]

const industryPartners = [
  { name: "Technology", companies: 45, interns: 234, satisfaction: 4.8 },
  { name: "Finance", companies: 23, interns: 156, satisfaction: 4.6 },
  { name: "Healthcare", companies: 18, interns: 98, satisfaction: 4.7 },
  { name: "E-commerce", companies: 32, interns: 187, satisfaction: 4.9 },
  { name: "Consulting", companies: 15, interns: 76, satisfaction: 4.5 },
]

const performanceMetrics = [
  { metric: "Technical Skills", student: 85, industry: 78, faculty: 82 },
  { metric: "Communication", student: 78, industry: 85, faculty: 80 },
  { metric: "Problem Solving", student: 82, industry: 80, faculty: 85 },
  { metric: "Teamwork", student: 88, industry: 82, faculty: 86 },
  { metric: "Leadership", student: 75, industry: 88, faculty: 79 },
  { metric: "Adaptability", student: 80, industry: 85, faculty: 83 },
]

const completionTrends = [
  { week: "Week 1", onTime: 95, delayed: 5, dropped: 0 },
  { week: "Week 2", onTime: 92, delayed: 7, dropped: 1 },
  { week: "Week 3", onTime: 88, delayed: 10, dropped: 2 },
  { week: "Week 4", onTime: 90, delayed: 8, dropped: 2 },
  { week: "Week 5", onTime: 87, delayed: 11, dropped: 2 },
  { week: "Week 6", onTime: 89, delayed: 9, dropped: 2 },
]

const geographicData = [
  { state: "Karnataka", students: 234, companies: 45 },
  { state: "Maharashtra", students: 198, companies: 38 },
  { state: "Tamil Nadu", students: 167, companies: 32 },
  { state: "Delhi", students: 145, companies: 28 },
  { state: "Telangana", students: 123, companies: 24 },
  { state: "Gujarat", students: 98, companies: 19 },
]

interface AnalyticsDashboardProps {
  userType?: "admin" | "faculty" | "industry"
  timeRange?: "week" | "month" | "quarter" | "year"
}

export function AnalyticsDashboard({ userType = "admin", timeRange = "month" }: AnalyticsDashboardProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue={timeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Student enrollment and internship completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="students" fill="#3b82f6" />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
            <CardDescription>Popular internship categories and student preferences</CardDescription>
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
                                                                                {skillDistribution.map((entry, index) => (
                                                                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                                                                ))}
                                                                              </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Comparative analysis across different stakeholders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceMetrics}>
                  <PolarGrid stroke="hsl(var(--muted-foreground))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))" }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--foreground))" }} />
                  <Radar
                    name="Students"
                    dataKey="student"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Industry"
                    dataKey="industry"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Faculty"
                    dataKey="faculty"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Completion Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Completion Trends</CardTitle>
            <CardDescription>Weekly internship completion status tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <XAxis dataKey="week" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="onTime"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="delayed"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="dropped"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Partner Analysis</CardTitle>
          <CardDescription>Performance metrics across different industry sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryPartners} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                <XAxis type="number" stroke="hsl(var(--foreground))" />
                <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="interns" fill="#3b82f6" />
                <Bar dataKey="companies" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>State-wise student and company distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {geographicData.map((item, index) => (
              <div key={item.state} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.state}</h4>
                    <p className="text-sm text-muted-foreground">{item.companies} companies</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{item.students}</div>
                  <p className="text-sm text-muted-foreground">students</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {skillDistribution.slice(0, 3).map((skill, index) => (
              <div key={skill.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }} />
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
                <Badge variant="secondary">{skill.students} students</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Placement Rate</span>
              <span className="font-semibold text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Completion Time</span>
              <span className="font-semibold">3.2 months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Student Satisfaction</span>
              <span className="font-semibold text-blue-600">4.7/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Industry Rating</span>
              <span className="font-semibold text-purple-600">4.8/5</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Growth Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">New Partnerships</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="font-semibold text-green-600">+15%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Student Enrollment</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="font-semibold text-green-600">+12%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Skill Diversity</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="font-semibold text-green-600">+8%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Completion Rate</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="font-semibold text-green-600">+3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
