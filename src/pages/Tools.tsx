import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Briefcase, AtSign, ArrowRight, User, Cat, Wand2, Gamepad2, UserCheck, Star } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      title: "Couple Name Generator",
      description: "Create romantic combined names for couples. Perfect for finding that special portmanteau that represents your relationship.",
      icon: Heart,
      href: "/tools/couple",
      color: "text-pink-500",
      features: ["Romantic combinations", "Phonetic harmony", "Meaningful blends"]
    },
    {
      title: "Baby Name Generator", 
      description: "Generate beautiful names for your little one by combining family names or meaningful words.",
      icon: Baby,
      href: "/tools/baby",
      color: "text-blue-500",
      features: ["Family heritage", "Pronunciation guide", "Gender neutral options"]
    },
    {
      title: "Brand Name Generator",
      description: "Professional names for your business that combine industry terms and concepts into memorable brands.",
      icon: Briefcase,
      href: "/tools/brand", 
      color: "text-green-500",
      features: ["Business focused", "Domain friendly", "Professional appeal"]
    },
    {
      title: "Social Media Generator",
      description: "Create catchy usernames for social platforms by combining your interests and personality traits.",
      icon: AtSign,
      href: "/tools/social",
      color: "text-purple-500",
      features: ["Platform optimized", "Availability hints", "Trendy variations"]
    },
    {
      title: "Username Generator",
      description: "Generate unique usernames by combining your interests, hobbies, and favorite words for any platform.",
      icon: User,
      href: "/tools/username",
      color: "text-cyan-500",
      features: ["Cross-platform ready", "Interest-based", "Easy to remember"]
    },
    {
      title: "Pet Name Generator",
      description: "Find the perfect name for your furry, feathered, or scaled friends by combining cute and meaningful words.",
      icon: Cat,
      href: "/tools/pet",
      color: "text-orange-500",
      features: ["Adorable combinations", "Pet-specific", "Easy pronunciation"]
    },
    {
      title: "Fantasy Name Generator",
      description: "Create mystical names for fantasy characters, places, or stories with magical word combinations.",
      icon: Wand2,
      href: "/tools/fantasy",
      color: "text-violet-500",
      features: ["Mystical elements", "Character names", "World building"]
    },
    {
      title: "Gamertag Generator",
      description: "Level up your gaming identity with cool gamertags that combine your favorite games and interests.",
      icon: Gamepad2,
      href: "/tools/gamertag",
      color: "text-red-500",
      features: ["Gaming focused", "Cool combinations", "Platform friendly"]
    },
    {
      title: "Character Name Generator",
      description: "Create memorable character names for stories, roleplay, or creative writing projects.",
      icon: UserCheck,
      href: "/tools/character",
      color: "text-indigo-500",
      features: ["Story characters", "Roleplay ready", "Diverse options"]
    },
    {
      title: "Celebrity Name Generator",
      description: "Generate stage names and celebrity personas by combining glamorous and memorable elements.",
      icon: Star,
      href: "/tools/celebrity",
      color: "text-yellow-500",
      features: ["Stage names", "Memorable", "Glamorous appeal"]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Specialized Name
          <span className="gradient-primary bg-clip-text text-transparent"> Generation Tools</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Choose the perfect tool for your specific naming needs. Each generator is optimized 
          for different use cases and contexts.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Card key={index} className="rounded-2xl shadow-elegant transition-smooth hover:scale-105">
            <CardHeader className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <tool.icon className={`h-8 w-8 ${tool.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Features
                </h4>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button asChild className="w-full rounded-xl" size="lg">
                <Link to={tool.href}>
                  Try {tool.title} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* How It Works */}
      <section className="gradient-secondary rounded-2xl p-8 md:p-12 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">How Our Tools Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All our generators use advanced algorithms to create meaningful combinations
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Input Names",
              description: "Enter 2-4 names or words that you want to combine"
            },
            {
              step: "2", 
              title: "AI Processing",
              description: "Our algorithm analyzes phonetics, syllables, and meaning"
            },
            {
              step: "3",
              title: "Get Results",
              description: "Receive 5 unique, pronounceable combinations with explanations"
            }
          ].map((item, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto">
                {item.step}
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tools;