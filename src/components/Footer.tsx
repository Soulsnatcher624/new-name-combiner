import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="text-lg font-semibold text-foreground">NameCombiner</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Create meaningful names by combining multiple names with our intelligent name generator tools.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tools</h3>
            <div className="space-y-2 text-sm">
              <Link to="/tools/couple" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Couple Name Generator
              </Link>
              <Link to="/tools/baby" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Baby Name Generator
              </Link>
              <Link to="/tools/brand" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Brand Name Generator
              </Link>
              <Link to="/tools/social" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Social Media Name Generator
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Disclaimer
              </Link>
              <Link to="/cookies" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Cookies
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Usage
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-smooth">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-smooth">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 NameCombiner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;