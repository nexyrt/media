import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes"
import { type BreadcrumbItem } from "@/types"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/heading"
import HeadingSmall from "@/components/heading-small"
import MultiSelect from "@/components/ui/multi-select"
import { Code, Lightbulb, Zap, Book, PlayCircle, CheckCircle2, ChevronRight } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboard().url,
  },
]

export default function Dashboard() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("lessons")
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])

  const toggleLesson = (id: number) => {
    setCompletedLessons(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    )
  }

  const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
    { value: "next", label: "Next.js" },
    { value: "nuxt", label: "Nuxt" },
  ]

  const concepts = [
    {
      id: 1,
      icon: <Code className="w-6 h-6" />,
      title: 'Components',
      desc: 'Building blocks of React apps - reusable UI pieces',
      example: '<Button>Click Me</Button>',
    },
    {
      id: 2,
      icon: <Zap className="w-6 h-6" />,
      title: 'State',
      desc: 'Data that changes over time in your component',
      example: 'const [count, setCount] = useState(0)',
    },
    {
      id: 3,
      icon: <PlayCircle className="w-6 h-6" />,
      title: 'Props',
      desc: 'Pass data from parent to child components',
      example: '<Card title="Hello" />',
    },
  ]

  const lessons = [
    { id: 1, title: 'What is React?', duration: '5 min', difficulty: 'Beginner' },
    { id: 2, title: 'Your First Component', duration: '10 min', difficulty: 'Beginner' },
    { id: 3, title: 'Understanding State', duration: '15 min', difficulty: 'Intermediate' },
    { id: 4, title: 'Props & Data Flow', duration: '12 min', difficulty: 'Intermediate' },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="space-y-8 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
            <Book className="w-8 h-8" />
          </div>
          <Heading title="Welcome to React Learning Hub" />
          <p className="text-xl text-muted-foreground">
            Master React step by step with interactive examples
          </p>
          <div className="flex gap-2 justify-center">
            <Badge variant="default">Beginner Friendly</Badge>
            <Badge variant="secondary">Interactive</Badge>
            <Badge variant="secondary">Project Based</Badge>
          </div>
        </div>

        {/* Alert Banner */}
        <Alert className="bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
            <div className="text-blue-900">
              <strong className="font-semibold">Pro Tip:</strong> Practice by building real components.
              This dashboard itself is built with React components you'll learn!
            </div>
          </div>
        </Alert>

        {/* Multi-Select Demo */}
        <Card className="p-6">
          <HeadingSmall title="Multi-Select Component Demo" />
          <p className="text-sm text-muted-foreground mb-4 mt-2">
            Try selecting multiple frameworks below. This is a custom multi-select built with shadcn/ui components.
          </p>
          <MultiSelect
            options={frameworkOptions}
            selected={selectedFrameworks}
            onChange={setSelectedFrameworks}
            placeholder="Select frameworks to learn..."
            emptyText="No framework found."
          />
          {selectedFrameworks.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">You selected {selectedFrameworks.length} framework(s):</p>
              <div className="flex flex-wrap gap-2">
                {selectedFrameworks.map(value => {
                  const framework = frameworkOptions.find(f => f.value === value)
                  return (
                    <Badge key={value} variant="default">
                      {framework?.label}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}
        </Card>

        {/* Core Concepts Cards */}
        <div>
          <HeadingSmall title="Core Concepts" />
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {concepts.map((concept) => (
              <Card key={concept.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    {concept.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {concept.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{concept.desc}</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                      {concept.example}
                    </code>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Interactive Tabs */}
        <div>
          <HeadingSmall title="Learning Path" />
          <Card className="p-6 mt-4">
            {/* Tabs Header */}
            <div className="flex space-x-1 border-b mb-4">
              {['lessons', 'practice', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors capitalize ${activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLesson(lesson.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completedLessons.includes(lesson.id)
                            ? 'bg-green-500 border-green-500'
                            : 'border-muted-foreground'
                          }`}
                      >
                        {completedLessons.includes(lesson.id) && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <Badge variant="secondary">{lesson.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === 'practice' && (
              <div className="text-center py-12">
                <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Practice Exercises
                </h3>
                <p className="text-muted-foreground mb-4">
                  Build interactive components and test your knowledge
                </p>
                <Button>Start Practicing</Button>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-l-blue-600">
                  <h3 className="font-semibold mb-1">Todo App</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Build a full CRUD application with state management
                  </p>
                  <Badge variant="default">Beginner</Badge>
                </Card>
                <Card className="p-4 border-l-4 border-l-purple-600">
                  <h3 className="font-semibold mb-1">Weather Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Fetch data from APIs and display dynamically
                  </p>
                  <Badge variant="secondary">Intermediate</Badge>
                </Card>
              </div>
            )}
          </Card>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {completedLessons.length}/{lessons.length}
            </div>
            <div className="text-sm text-muted-foreground">Lessons Completed</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">12</div>
            <div className="text-sm text-muted-foreground">Components Learned</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-sm text-muted-foreground">Projects Built</div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Building?</h2>
          <p className="mb-6 text-blue-100">
            Join thousands of developers learning React the practical way
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-50">
              View Curriculum
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">
              Start Learning
            </Button>
          </div>
        </Card>

      </div>
    </AppLayout>
  )
}