const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-secondary-foreground py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent">Asusuigboamaka</h3>
            <p className="text-secondary-foreground/90 text-lg leading-relaxed">
              Preserving and celebrating the beauty of Asụsụ Igbo for generations to come.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Our Mission</h4>
            <p className="text-secondary-foreground/90 text-lg leading-relaxed">
              Reconnecting the Igbo diaspora with their linguistic heritage through education and community.
            </p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Asusuigboamaka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
