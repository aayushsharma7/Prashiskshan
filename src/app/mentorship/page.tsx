"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Star,
  Calendar,
  Clock,
  MessageSquare,
  Video,
  Users,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
} from "lucide-react"

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Google",
    avatar: "/placeholder.svg?height=64&width=64",
    expertise: ["React", "System Design", "Career Growth", "Frontend Architecture"],
    rating: 4.9,
    totalSessions: 156,
    experience: "8+ years",
    location: "San Francisco, USA",
    languages: ["English", "Mandarin"],
    price: "Free",
    availability: "Available",
    bio: "Passionate about mentoring the next generation of developers. Specialized in frontend technologies and system design.",
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "Data Science Manager",
    company: "Microsoft",
    avatar: "/placeholder.svg?height=64&width=64",
    expertise: ["Machine Learning", "Python", "Data Analysis", "Team Leadership"],
    rating: 4.8,
    totalSessions: 89,
    experience: "10+ years",
    location: "Seattle, USA",
    languages: ["English", "Hindi"],
    price: "Free",
    availability: "Available",
    bio: "Helping students transition into data science careers. Expert in ML algorithms and data engineering.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Design Lead",
    company: "Adobe",
    avatar: "/placeholder.svg?height=64&width=64",
    expertise: ["UI/UX Design", "Design Systems", "User Research", "Product Strategy"],
    rating: 4.9,
    totalSessions: 134,
    experience: "7+ years",
    location: "Austin, USA",
    languages: ["English", "Spanish"],
    price: "Free",
    availability: "Busy",
    bio: "Design leader passionate about creating user-centered experiences. Mentor for aspiring designers.",
  },
  {
    id: 4,
    name: "Arjun Kumar",
    role: "DevOps Engineer",
    company: "Amazon",
    avatar: "/placeholder.svg?height=64&width=64",
    expertise: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure"],
    rating: 4.7,
    totalSessions: 67,
    experience: "6+ years",
    location: "Bangalore, India",
    languages: ["English", "Hindi", "Kannada"],
    price: "Free",
    availability: "Available",
    bio: "Cloud infrastructure expert helping students learn modern DevOps practices and cloud technologies.",
  },
]

const upcomingSessions = [
  {
    id: 1,
    mentor: "Sarah Chen",
    topic: "React Best Practices",
    date: "2024-01-25",
    time: "3:00 PM",
    duration: "60 min",
    type: "1-on-1",
    status: "confirmed",
  },
  {
    id: 2,
    mentor: "Emily Rodriguez",
    topic: "Portfolio Review",
    date: "2024-01-26",
    time: "2:00 PM",
    duration: "45 min",
    type: "1-on-1",
    status: "confirmed",
  },
  {
    id: 3,
    mentor: "Raj Patel",
    topic: "Data Science Career Path",
    date: "2024-01-28",
    time: "4:00 PM",
    duration: "60 min",
    type: "Group",
    status: "pending",
  },
]

const pastSessions = [
  {
    id: 1,
    mentor: "Sarah Chen",
    topic: "JavaScript Fundamentals",
    date: "2024-01-15",
    duration: "60 min",
    rating: 5,
    feedback: "Excellent session! Sarah explained complex concepts very clearly.",
  },
  {
    id: 2,
    mentor: "Arjun Kumar",
    topic: "AWS Basics",
    date: "2024-01-12",
    duration: "45 min",
    rating: 4,
    feedback: "Great introduction to cloud computing. Very helpful for beginners.",
  },
]

const mentorshipPrograms = [
  {
    id: 1,
    title: "Frontend Development Bootcamp",
    mentor: "Sarah Chen",
    duration: "8 weeks",
    sessions: 16,
    participants: 25,
    startDate: "2024-02-01",
    description: "Comprehensive frontend development program covering React, TypeScript, and modern web technologies.",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    mentor: "Raj Patel",
    duration: "10 weeks",
    sessions: 20,
    participants: 30,
    startDate: "2024-02-15",
    description: "Learn data science from scratch with hands-on projects and real-world applications.",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
  },
  {
    id: 3,
    title: "UX Design Masterclass",
    mentor: "Emily Rodriguez",
    duration: "6 weeks",
    sessions: 12,
    participants: 20,
    startDate: "2024-03-01",
    description: "Master the art of user experience design with practical projects and industry insights.",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
  },
]

export default function MentorshipPage() {
  const [selectedTab, setSelectedTab] = useState("browse")
  const [searchTerm, setSearchTerm] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentors)[0] | null>(null)

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesExpertise =
      expertiseFilter === "all" ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(expertiseFilter.toLowerCase()))

    const matchesAvailability = availabilityFilter === "all" || mentor.availability === availabilityFilter

    return matchesSearch && matchesExpertise && matchesAvailability
  })

  const handleBookSession = (mentor: (typeof mentors)[0]) => {
    setSelectedMentor(mentor)
    setIsBookingDialogOpen(true)
  }

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
            <h1 className="text-4xl font-bold mb-4 text-balance">Free Mentorship Hub</h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto text-pretty">
              Connect with industry experts for personalized career guidance, skill development, and professional growth
              - completely free for students
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
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
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
              <TabsTrigger value="sessions">My Sessions</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search mentors by name, company, or expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expertise</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Availability</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mentors Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMentors.map((mentor) => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{mentor.name}</CardTitle>
                            <CardDescription>{mentor.role}</CardDescription>
                            <p className="text-sm text-muted-foreground">{mentor.company}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                              <span className="text-sm text-muted-foreground">({mentor.totalSessions} sessions)</span>
                            </div>
                          </div>
                          <Badge
                            variant={mentor.availability === "Available" ? "default" : "secondary"}
                            className="self-start"
                          >
                            {mentor.availability}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{mentor.bio}</p>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Experience:</span> {mentor.experience}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {mentor.location}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => handleBookSession(mentor)}
                            disabled={mentor.availability === "Busy"}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Book Session
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{session.topic}</h4>
                          <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">with {session.mentor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.time}
                          </span>
                          <span>{session.duration}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="flex-1">
                            <Video className="h-4 w-4 mr-1" />
                            Join Session
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Session Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">12</div>
                        <p className="text-sm text-muted-foreground">Total Sessions</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">4.8</div>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">18h</div>
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">5</div>
                        <p className="text-sm text-muted-foreground">Mentors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mentorshipPrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-balance">{program.title}</CardTitle>
                        <CardDescription>by {program.mentor}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{program.description}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Duration:</span>
                            <span className="font-medium">{program.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Sessions:</span>
                            <span className="font-medium">{program.sessions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Participants:</span>
                            <span className="font-medium">{program.participants}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Start Date:</span>
                            <span className="font-medium">{program.startDate}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Skills Covered:</p>
                          <div className="flex flex-wrap gap-1">
                            {program.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">
                          Enroll Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Past Sessions</CardTitle>
                  <CardDescription>Review your completed mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastSessions.map((session) => (
                      <div key={session.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{session.topic}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < session.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">with {session.mentor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{session.date}</span>
                          <span>{session.duration}</span>
                        </div>
                        <p className="text-sm">{session.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Total Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">12</div>
                    <p className="text-sm text-muted-foreground">+3 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Hours Mentored</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">18</div>
                    <p className="text-sm text-muted-foreground">+4.5 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Skills Learned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">8</div>
                    <p className="text-sm text-muted-foreground">+2 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Avg Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">4.8</div>
                    <p className="text-sm text-muted-foreground">Excellent feedback</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Master React Development</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn advanced React patterns and best practices
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Progress: 75%</span>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Build Professional Portfolio</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Create an impressive portfolio to showcase projects
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Progress: 40%</span>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Booking Dialog */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book Session with {selectedMentor?.name}</DialogTitle>
              <DialogDescription>Schedule a free mentorship session</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Session Topic</Label>
                <Input id="topic" placeholder="e.g., React best practices, Career guidance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Additional Message (Optional)</Label>
                <Textarea id="message" placeholder="Any specific questions or topics you'd like to discuss..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={() => setIsBookingDialogOpen(false)}>Book Session</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
