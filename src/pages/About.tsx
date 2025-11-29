import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/about-culture.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(10,65,53,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Our Story & Mission
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Understanding the urgency of language preservation in the diaspora </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Image */}
              <div className="mb-12 rounded-xl overflow-hidden shadow-warm">
                <img 
                  src={aboutImage} 
                  alt="Igbo cultural heritage and community"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Founder Section */}
              <Card className="border-accent/30 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 shadow-xl">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                      <span className="text-accent font-semibold text-sm uppercase tracking-wide">Founder & Visionary</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Njideka Austin-Okafor</h2>
                    <p className="text-lg text-accent font-medium">From Anambra State, Nigeria</p>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      Njideka's journey embodies the bridge between tradition and modernity, between homeland and diaspora. Her path began at the prestigious Queens College in Enugu, where the seeds of her passion for education and cultural preservation were first planted. She pursued Political Science at the University of Nigeria, Nsukka, deepening her understanding of identity, community, and the forces that shape societies.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      Her academic journey continued with a Master's degree in Managerial Psychology from the University of Lagos, equipping her with insights into human behavior and the psychological dimensions of cultural identity. Following her marriage, Njideka relocated to the United States, where she experienced firsthand the challenges and opportunities of maintaining cultural heritage in the diaspora.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      It was in the diaspora that Njideka's mission crystallized. Witnessing the gradual erosion of Asụsụ Igbo among younger generations—including within her own community—she recognized an urgent need for action. She understood that language is not merely a tool for communication, but the very essence of cultural identity, the vessel that carries our proverbs, our wisdom, and our unique worldview.
                    </p>
                    <p className="text-lg font-semibold text-primary leading-relaxed">
                      Asusuigboamaka was born from this profound conviction: that whether in the heart of Igboland or in cities across the world, every Igbo person deserves the opportunity to connect with their linguistic heritage. Through this platform, Njideka is building a movement—a global community committed to ensuring that the beautiful language of our ancestors continues to thrive for generations to come.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Content Blocks */}
              <div className="space-y-8 mt-12">
                <Card className="border-primary/30 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-primary">The Challenge We Face</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      For many Igbo families living in the diaspora, particularly in the United States, maintaining our mother tongue has become increasingly difficult. Our children grow up surrounded by English, and with each generation, the connection to Asụsụ Igbo weakens.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      This isn't just about losing words—it's about losing our ability to fully connect with our elders, understand our proverbs, and appreciate the nuances of our culture that can only be expressed in our native language.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/30 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Why Language Matters</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      <strong>Identity and Belonging:</strong> Speaking Igbo reinforces who we are and where we come from. It gives our children a sense of belonging to something larger than themselves.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      <strong>Cultural Transmission:</strong> Many of our traditions, values, and wisdom are embedded in our language. Proverbs like "Onye aghana nwanne ya" (One should not leave their sibling behind) carry meanings that transcend direct translation.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <strong>Family Connection:</strong> Speaking Igbo allows deeper connections with relatives back home and maintains family bonds across continents.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-accent/30 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-accent">Our Vision</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      Asusuigboamaka exists to reverse this trend. We envision a future where:
                    </p>
                    <ul className="list-disc list-inside space-y-3 text-lg text-muted-foreground ml-4">
                      <li>Igbo children in the diaspora grow up bilingual, proud of their heritage</li>
                      <li>Families have resources and support to speak Igbo at home</li>
                      <li>Our community stays connected through our shared language</li>
                      <li>The beauty and complexity of Asụsụ Igbo is celebrated and preserved</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">A Personal Commitment</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      As an Igbo woman living in the diaspora, I've witnessed firsthand the gradual erosion of our language among younger generations. I've seen the disconnection, the missed opportunities for deeper family bonds, and the loss of cultural understanding.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      This platform is born from a deep commitment to ensure that our children and grandchildren can experience the fullness of their Igbo heritage. Every language saved is a culture preserved, a community strengthened, and a heritage honored.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
