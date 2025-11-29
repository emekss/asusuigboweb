import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-igbo.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80" />
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom duration-700">
                Nnọọ! Welcome to Asusuigboamaka
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
                Preserving the beauty and richness of Asụsụ Igbo for our children and future generations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                <Button 
                  size="lg" 
                  className="bg-white text-primary shadow-warm border-2 border-white hover:bg-transparent hover:text-red-600 transition-all"
                  asChild
                >
                  <Link to="/learn-our-story">Learn Our Story</Link>
                </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-red-600 hover:bg-transparent transition-all"
                asChild
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Why Preserve Asụsụ Igbo?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our language is more than words—it's our identity, our heritage, and the bridge connecting us to our roots.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-warm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Cultural Identity</h3>
                  <p className="text-muted-foreground">
                    Language is the soul of culture. By speaking Igbo, we maintain our unique identity and pass it to the next generation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-warm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Ancestral Wisdom</h3>
                  <p className="text-muted-foreground">
                    Proverbs, stories, and traditions are best understood in their original language. Don't lose access to centuries of wisdom.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-warm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Community Connection</h3>
                  <p className="text-muted-foreground">
                    Speaking Igbo strengthens bonds with family back home and builds community among the diaspora.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in This Important Mission
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Whether you're fluent or just beginning, every effort to speak, learn, and teach Asụsụ Igbo matters. Let's preserve our heritage together.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-warm"
              asChild
            >
              <Link to="/contact">Connect With Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
