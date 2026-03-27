import { motion } from "framer-motion";
import {
  BookOpen, TrendingUp, Clock, Cpu, FileText,
  BarChart3, Sparkles, ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const courses = [
  { title: "Introduction to Algebra", progress: 72, lessons: 12, completed: 8 },
  { title: "World History: Ancient Civilizations", progress: 45, lessons: 10, completed: 4 },
  { title: "Biology: Cell Structure", progress: 90, lessons: 8, completed: 7 },
];

const recommended = [
  { title: "Physics: Laws of Motion", reason: "Based on your math progress" },
  { title: "English Literature: Poetry", reason: "Matches your reading level" },
  { title: "Chemistry: Periodic Table", reason: "Complements Biology course" },
];

const recentConversions = [
  { file: "algebra_ch3.pdf", type: "Text → Speech", time: "2 min ago" },
  { file: "history_notes.docx", type: "Summarize", time: "1 hour ago" },
  { file: "biology_video.mp4", type: "Sign Translation", time: "3 hours ago" },
];

const stats = [
  { icon: BookOpen, label: "Active Courses", value: "3" },
  { icon: TrendingUp, label: "Completion Rate", value: "69%" },
  { icon: Clock, label: "Hours Learned", value: "24" },
  { icon: Cpu, label: "AI Conversions", value: "50" },
];

export default function AdaptiveLearningPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Adaptive Learning</h1>
            <p className="text-muted-foreground text-sm mt-1">AI tracks your progress and personalizes your learning experience.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold font-heading text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Course Progress */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-5 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Course Progress
              </h2>
              <div className="space-y-5">
                {courses.map((course) => (
                  <div key={course.title} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{course.title}</p>
                      <span className="text-xs text-muted-foreground">{course.completed}/{course.lessons} lessons</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-5 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> AI Recommended
              </h2>
              <div className="space-y-3">
                {recommended.map((item) => (
                  <button key={item.title} className="w-full text-left p-3 rounded-xl border border-border hover:border-primary/30 transition-colors group">
                    <p className="text-sm font-medium text-foreground flex items-center gap-1">
                      {item.title}
                      <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Recommendations powered by AI — backend API will personalize these.</p>
            </div>
          </div>

          {/* AI Summaries & Recent */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-4 uppercase tracking-wider">AI Generated Summaries</h2>
              <div className="py-8 text-center">
                <FileText className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Summaries will appear here once backend API is connected.</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-4 uppercase tracking-wider">Recent Conversions</h2>
              <div className="space-y-3">
                {recentConversions.map((item) => (
                  <div key={item.file} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.file}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
