import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Lightbulb, GraduationCap, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Stats {
  projects: { total: number; visible: number };
  skills: { total: number; visible: number };
  education: { total: number; visible: number };
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: { total: 0, visible: 0 },
    skills: { total: 0, visible: 0 },
    education: { total: 0, visible: 0 },
  });
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, skillsRes, educationRes] = await Promise.all([
          supabase.from("projects").select("id, is_visible"),
          supabase.from("skills").select("id, is_visible"),
          supabase.from("education").select("id, is_visible"),
        ]);

        setStats({
          projects: {
            total: projectsRes.data?.length || 0,
            visible: projectsRes.data?.filter((p) => p.is_visible).length || 0,
          },
          skills: {
            total: skillsRes.data?.length || 0,
            visible: skillsRes.data?.filter((s) => s.is_visible).length || 0,
          },
          education: {
            total: educationRes.data?.length || 0,
            visible: educationRes.data?.filter((e) => e.is_visible).length || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Projects",
      icon: FolderKanban,
      stats: stats.projects,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      href: "/admin/projects",
    },
    {
      title: "Skills",
      icon: Lightbulb,
      stats: stats.skills,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      href: "/admin/skills",
    },
    {
      title: "Education",
      icon: GraduationCap,
      stats: stats.education,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      href: "/admin/education",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your portfolio admin panel
        </p>
      </div>

      {!isAdmin && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Limited Access</AlertTitle>
          <AlertDescription>
            You don't have admin privileges. Contact the administrator to get access to manage content.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <a href={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">{card.stats.total}</div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <Eye className="w-4 h-4" />
                          {card.stats.visible} visible
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <EyeOff className="w-4 h-4" />
                          {card.stats.total - card.stats.visible} hidden
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
          <CardDescription>Get started with managing your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium">Add Your Projects</h4>
              <p className="text-sm text-muted-foreground">
                Showcase your best work by adding projects with images, descriptions, and links.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium">Update Your Skills</h4>
              <p className="text-sm text-muted-foreground">
                Keep your skills section up to date with your current expertise and proficiency levels.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium">Manage Education</h4>
              <p className="text-sm text-muted-foreground">
                Add your educational background with institution details and achievements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
