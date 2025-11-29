import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, X, Video, Shield } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Video {
  id: string;
  youtubeUrl: string;
  description: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    youtubeUrl: "",
    description: "",
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = () => {
    const storedVideos = localStorage.getItem("igbo-heritage-videos");
    if (storedVideos) {
      try {
        setVideos(JSON.parse(storedVideos));
      } catch (error) {
        console.error("Error loading videos:", error);
        toast({
          title: "Error",
          description: "Failed to load videos.",
          variant: "destructive",
        });
      }
    }
  };

  const saveVideos = (newVideos: Video[]) => {
    localStorage.setItem("igbo-heritage-videos", JSON.stringify(newVideos));
    setVideos(newVideos);
  };

  const validateYouTubeUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    return regExp.test(url);
  };

  const handleAdd = () => {
    if (!formData.youtubeUrl.trim()) {
      toast({
        title: "YouTube URL required",
        description: "Please enter a YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateYouTubeUrl(formData.youtubeUrl)) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      youtubeUrl: formData.youtubeUrl.trim(),
      description: formData.description.trim(),
    };

    const newVideos = [...videos, newVideo];
    saveVideos(newVideos);
    setFormData({ youtubeUrl: "", description: "" });
    setIsAdding(false);
    toast({
      title: "Success",
      description: "Video added successfully!",
    });
  };

  const handleEdit = (video: Video) => {
    setEditingId(video.id);
    setFormData({
      youtubeUrl: video.youtubeUrl,
      description: video.description,
    });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    if (!formData.youtubeUrl.trim()) {
      toast({
        title: "YouTube URL required",
        description: "Please enter a YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateYouTubeUrl(formData.youtubeUrl)) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    const newVideos = videos.map((video) =>
      video.id === editingId
        ? {
            ...video,
            youtubeUrl: formData.youtubeUrl.trim(),
            description: formData.description.trim(),
          }
        : video
    );

    saveVideos(newVideos);
    setEditingId(null);
    setFormData({ youtubeUrl: "", description: "" });
    toast({
      title: "Success",
      description: "Video updated successfully!",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ youtubeUrl: "", description: "" });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    const newVideos = videos.filter((video) => video.id !== deleteId);
    saveVideos(newVideos);
    setDeleteId(null);
    toast({
      title: "Success",
      description: "Video deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Manage Videos</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.href = "/"}
              className="border-primary/20 hover:border-primary/40"
            >
              Back to Site
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Video Management
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Add, edit, or remove YouTube videos from the Videos page. Changes will be reflected immediately.
              </p>
            </div>
          </section>

          {/* Add Video Form */}
          {isAdding && (
            <Card className="mb-8 border-primary/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <span>Add New Video</span>
                </CardTitle>
                <CardDescription>
                  Enter a YouTube URL and optional description for the video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-youtube-url">YouTube URL *</Label>
                    <Input
                      id="add-youtube-url"
                      value={formData.youtubeUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, youtubeUrl: e.target.value })
                      }
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-description">Description</Label>
                    <Textarea
                      id="add-description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Enter a description for this video..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
                      <Save className="h-4 w-4 mr-2" />
                      Save Video
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Button */}
          {!isAdding && editingId === null && (
            <div className="mb-8">
              <Button
                onClick={() => setIsAdding(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 shadow-warm"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Video
              </Button>
            </div>
          )}

          {/* Videos List */}
          <div className="space-y-4">
            {videos.length === 0 ? (
              <Card className="border-primary/20">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    No Videos Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get started by adding your first video.
                  </p>
                  <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Video
                  </Button>
                </CardContent>
              </Card>
            ) : (
              videos.map((video) => {
                if (editingId === video.id) {
                  return (
                    <Card key={video.id} className="border-accent/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Edit className="h-5 w-5 text-accent" />
                          <span>Edit Video</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-youtube-url">YouTube URL *</Label>
                            <Input
                              id="edit-youtube-url"
                              value={formData.youtubeUrl}
                              onChange={(e) =>
                                setFormData({ ...formData, youtubeUrl: e.target.value })
                              }
                              placeholder="https://www.youtube.com/watch?v=..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                              placeholder="Enter a description for this video..."
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSaveEdit} className="bg-accent hover:bg-accent/90">
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={video.id}
                    className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-warm"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2">
                            <a
                              href={video.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-medium break-all"
                            >
                              {video.youtubeUrl}
                            </a>
                          </div>
                          {video.description && (
                            <p className="text-muted-foreground leading-relaxed">
                              {video.description}
                            </p>
                          )}
                          {!video.description && (
                            <p className="text-muted-foreground italic text-sm">
                              No description provided
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(video)}
                            className="border-accent/20 hover:border-accent/40"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(video.id)}
                            className="border-destructive/20 hover:border-destructive/40 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the video from the Videos page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;

