import NameGenerator from "@/components/NameGenerator";
import AdSlot from "@/components/AdSlot";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Baby, Briefcase, AtSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const tools = [
    {
      title: "Couple Name Generator",
      description: "Create romantic combined names for couples",
      icon: Heart,
      href: "/tools/couple",
      color: "text-pink-500"
    },
    {
      title: "Baby Name Generator", 
      description: "Generate beautiful names for your little one",
      icon: Baby,
      href: "/tools/baby",
      color: "text-blue-500"
    },
    {
      title: "Brand Name Generator",
      description: "Professional names for your business",
      icon: Briefcase,
      href: "/tools/brand", 
      color: "text-green-500"
    },
    {
      title: "Social Media Generator",
      description: "Catchy usernames for social platforms",
      icon: AtSign,
      href: "/tools/social",
      color: "text-purple-500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>NameMixer - Create Perfect Name Combinations | Free Name Generator Tool</title>
        <meta name="description" content="Create unique name combinations for couples, babies, brands, and more. Free online name generator with 9+ specialized tools. Fast, reliable, and easy to use." />
        <meta name="keywords" content="name generator, couple names, baby names, brand names, name combiner, name mixer, free tool" />
        <meta property="og:title" content="NameMixer - Create Perfect Name Combinations" />
        <meta property="og:description" content="Create unique name combinations for couples, babies, brands, and more. Free online name generator with 9+ specialized tools." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://namemixer.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "NameMixer",
            "description": "Create unique name combinations for couples, babies, brands, and more",
            "url": "https://namemixer.com",
            "applicationCategory": "Utility",
            "operatingSystem": "Web Browser"
          })}
        </script>
      </Helmet>
      
      <div className="space-y-16">
        {/* Header Ad Slot */}
        <AdSlot id="header-banner" size="leaderboard" className="mx-auto mt-4" />
        
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Create Perfect
            <span className="gradient-primary bg-clip-text text-transparent"> Name Combinations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Combine up to 9 different names to create meaningful, pronounceable combinations. 
            Perfect for couples, babies, brands, and more.
          </p>
        </div>
      </section>

        {/* Main Generator */}
        <section className="space-y-8">
          <NameGenerator />
          
          {/* Below Generator Ad */}
          <div className="flex justify-center">
            <AdSlot id="below-generator" size="rectangle" />
          </div>
        </section>

      {/* Tools Section */}
      <section className="space-y-8 -mt-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Specialized Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our specialized generators designed for specific use cases
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Card key={index} className="shadow-soft transition-smooth hover:shadow-elegant group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  <h3 className="font-semibold">{tool.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  <Link to={tool.href}>
                    Try Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Between Tools and Content Ad */}
        <div className="flex justify-center py-8">
          <AdSlot id="mid-content" size="banner" />
        </div>
      </section>

      {/* Editable Blog Section */}
      <section className="bg-background rounded-2xl border p-8 md:p-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">About NameMixer</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 text-left">
            <p>
              Welcome to NameMixer - your go-to destination for creating unique and meaningful name combinations. 
              Whether you're looking for couple names, baby names, brand names, or any other creative combinations, 
              our advanced algorithms ensure you get the perfect blend every time.
            </p>
            <p>
              Our tools are designed to be fast, reliable, and completely free to use. Simply enter your names, 
              click generate, and discover amazing combinations that sound great and have meaningful connections.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Why Choose NameMixer?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            {/* This section is editable for adding blog content and backlinks */}
          </div>
        </div>
        
        {/* Bottom Content Ad */}
        <div className="flex justify-center pt-8">
          <AdSlot id="bottom-content" size="rectangle" />
        </div>
      </section>
      
      {/* Footer Ad */}
      <div className="flex justify-center pb-8">
        <AdSlot id="footer-banner" size="leaderboard" />
      </div>
    </div>
    </>
  );
};

export default Home;