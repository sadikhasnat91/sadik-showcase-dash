import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Education {
  id: string;
  degree: string;
  institution: string;
  institution_logo_url: string | null;
  passing_year: number;
  description: string | null;
  display_order: number;
  is_visible: boolean;
}

const emptyEducation = {
  degree: "",
  institution: "",
  institution_logo_url: "",
  passing_year: new Date().getFullYear(),
  description: "",
  display_order: 0,
  is_visible: true,
};

const EducationManager = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [formData, setFormData] = useState(emptyEducation);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const fetchEducation = async () => {
    try {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("passing_year", { ascending: false });

      if (error) throw error;
      setEducation(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      institution_logo_url: edu.institution_logo_url || "",
      passing_year: edu.passing_year,
      description: edu.description || "",
      display_order: edu.display_order,
      is_visible: edu.is_visible,
    });
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingEducation(null);
    setFormData(emptyEducation);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to manage education.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const educationData = {
        degree: formData.degree,
        institution: formData.institution,
        institution_logo_url: formData.institution_logo_url || null,
        passing_year: formData.passing_year,
        description: formData.description || null,
        display_order: formData.display_order,
        is_visible: formData.is_visible,
      };

      if (editingEducation) {
        const { error } = await supabase
          .from("education")
          .update(educationData)
          .eq("id", editingEducation.id);

        if (error) throw error;
        toast({ title: "Success", description: "Education updated successfully" });
      } else {
        const { error } = await supabase.from("education").insert(educationData);
        if (error) throw error;
        toast({ title: "Success", description: "Education created successfully" });
      }

      setDialogOpen(false);
      fetchEducation();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to delete education.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("education").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Education deleted successfully" });
      fetchEducation();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = async (edu: Education) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to modify education.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("education")
        .update({ is_visible: !edu.is_visible })
        .eq("id", edu.id);

      if (error) throw error;
      fetchEducation();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground mt-1">Manage your educational background</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} disabled={!isAdmin}>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEducation ? "Edit Education" : "Add New Education"}</DialogTitle>
              <DialogDescription>
                Fill in the details for your education
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree / Level</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g., BSc in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g., University Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution_logo_url">Institution Logo URL</Label>
                <Input
                  id="institution_logo_url"
                  value={formData.institution_logo_url}
                  onChange={(e) => setFormData({ ...formData, institution_logo_url: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passing_year">Passing Year</Label>
                <Input
                  id="passing_year"
                  type="number"
                  value={formData.passing_year}
                  onChange={(e) => setFormData({ ...formData, passing_year: parseInt(e.target.value) || new Date().getFullYear() })}
                  min={1900}
                  max={2100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about your education"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <Label htmlFor="is_visible">Visible on site</Label>
                  <Switch
                    id="is_visible"
                    checked={formData.is_visible}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={saving || !formData.degree || !formData.institution}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Education"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {education.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No education entries yet. Add your first one!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={!edu.is_visible ? "opacity-60" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {edu.institution_logo_url ? (
                      <img
                        src={edu.institution_logo_url}
                        alt={edu.institution}
                        className="w-16 h-16 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-border">
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg flex items-center gap-2">
                            {edu.degree}
                            {!edu.is_visible && (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            )}
                          </h3>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-primary font-medium mt-1">
                            Passing Year: {edu.passing_year}
                          </p>
                          {edu.description && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {edu.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleVisibility(edu)}
                            disabled={!isAdmin}
                          >
                            {edu.is_visible ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(edu)}
                            disabled={!isAdmin}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" disabled={!isAdmin}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Education</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{edu.degree} - {edu.institution}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(edu.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationManager;
