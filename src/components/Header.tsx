import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import AdSlot from "@/components/AdSlot";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tools = [
    { name: "Couple Name Generator", href: "/tools/couple" },
    { name: "Baby Name Generator", href: "/tools/baby" },
    { name: "Brand Name Generator", href: "/tools/brand" },
    { name: "Social Media Generator", href: "/tools/social" },
    { name: "Username Generator", href: "/tools/username" },
    { name: "Pet Name Generator", href: "/tools/pet" },
    { name: "Fantasy Name Generator", href: "/tools/fantasy" },
    { name: "Gamertag Generator", href: "/tools/gamertag" },
    { name: "Character Name Generator", href: "/tools/character" },
    { name: "Celebrity Name Generator", href: "/tools/celebrity" }
  ];
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="NameMixer Logo" 
              className="w-8 h-8 rounded-lg"
              onError={(e) => {
                // Fallback to default if custom logo fails
                e.currentTarget.style.display = 'none';
                const next = e.currentTarget.nextElementSibling as HTMLElement;
                if (next) next.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 gradient-primary rounded-lg items-center justify-center hidden">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            <span className="text-xl font-bold text-foreground">NameMixer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-smooth ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth group">
                <span>Tools</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-background border border-border rounded-2xl shadow-elegant p-2">
                <div className="grid gap-2">
                  {tools.map((tool) => (
                    <DropdownMenuItem key={tool.href} asChild>
                      <Link 
                        to={tool.href} 
                        className="w-full p-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors group"
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {tool.name.includes("Couple") && "Create romantic name combinations"}
                            {tool.name.includes("Baby") && "Generate beautiful baby names"}
                            {tool.name.includes("Brand") && "Professional business names"}
                            {tool.name.includes("Social") && "Social media usernames"}
                            {tool.name.includes("Username") && "Unique username ideas"}
                            {tool.name.includes("Pet") && "Adorable pet names"}
                            {tool.name.includes("Fantasy") && "Mystical character names"}
                            {tool.name.includes("Gamertag") && "Gaming usernames"}
                            {tool.name.includes("Character") && "Fiction character names"}
                            {tool.name.includes("Celebrity") && "Star-style name mixes"}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {["Privacy Policy", "Disclaimer"].map((name) => (
              <Link
                key={name}
                to={`/${name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-medium transition-smooth ${
                  isActive(`/${name.toLowerCase().replace(/\s+/g, '-')}`)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-smooth ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Tools Dropdown */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Tools</div>
                <div className="pl-4 space-y-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-smooth"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
      </header>
      
      {/* Mobile Header Ad */}
      <div className="md:hidden flex justify-center py-2 bg-background/50">
        <AdSlot id="mobile-header" size="mobile-banner" />
      </div>
    </>
  );
};

export default Header;