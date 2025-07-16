import NameGenerator from "@/components/NameGenerator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Baby, Briefcase, AtSign } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
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
      <section>
        <NameGenerator />
      </section>

      {/* Tools Section */}
      <section className="space-y-8">
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
      </section>

      {/* Editable Blog Section */}
      <section className="gradient-secondary rounded-2xl p-8 md:p-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">About NameMixer</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Welcome to NameMixer - your go-to destination for creating unique and meaningful name combinations. 
              Whether you're looking for couple names, baby names, brand names, or any other creative combinations, 
              our advanced algorithms ensure you get the perfect blend every time.
            </p>
            <p>
              Our tools are designed to be fast, reliable, and completely free to use. Simply enter your names, 
              click generate, and discover amazing combinations that sound great and have meaningful connections.
            </p>
            {/* This section can be edited later for blog content and backlinks */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;