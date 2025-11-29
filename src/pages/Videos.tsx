import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  youtubeUrl: string;
  description: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Load videos from localStorage
    const storedVideos = localStorage.getItem("igbo-heritage-videos");
    if (storedVideos) {
      try {
        setVideos(JSON.parse(storedVideos));
      } catch (error) {
        console.error("Error loading videos:", error);
      }
    }
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Videos
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore our collection of videos celebrating Asụsụ Igbo culture, language, and heritage
              </p>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {videos.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center">
                <Card className="border-primary/20">
                  <CardContent className="pt-12 pb-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">
                      No Videos Yet
                    </h3>
                    <p className="text-muted-foreground">
                      Videos will appear here once they are added through the admin dashboard.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => {
                  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
                  return (
                    <Card 
                      key={video.id} 
                      className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-warm overflow-hidden"
                    >
                      <CardContent className="p-0">
                        {embedUrl ? (
                          <div className="aspect-video w-full">
                            <iframe
                              src={embedUrl}
                              title={video.description || "Video"}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="aspect-video w-full bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">Invalid YouTube URL</p>
                          </div>
                        )}
                        {video.description && (
                          <div className="p-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {video.description}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Videos;

