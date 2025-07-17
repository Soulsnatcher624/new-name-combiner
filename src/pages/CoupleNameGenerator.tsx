import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Copy, Sparkles } from "lucide-react";
import { generateCoupleNames } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";
import AdSlot from "@/components/AdSlot";
import { Helmet } from "react-helmet";

interface NameCombination {
  name: string;
  explanation: string;
}

const CoupleNameGenerator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [results, setResults] = useState<NameCombination[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNames = async () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Missing names",
        description: "Please enter both names to generate couple combinations.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const combinations = generateCoupleNames(name1.trim(), name2.trim());
        setResults(combinations);
        toast({
          title: "Couple names generated!",
          description: `Created ${combinations.length} romantic name combinations.`,
        });
      } catch (error) {
        toast({
          title: "Generation failed",
          description: "Please check your input and try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: "Copied!",
      description: `"${name}" has been copied to your clipboard.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Couple Name Generator - Create Romantic Name Combinations | NameMixer</title>
        <meta name="description" content="Generate perfect couple names by combining two names. Create romantic portmanteaus for partners with our free couple name generator tool." />
        <meta name="keywords" content="couple name generator, ship names, romantic names, name combiner, portmanteau generator" />
      </Helmet>
      
      <div className="space-y-8">
        {/* Top Ad */}
        <AdSlot id="couple-top" size="leaderboard" className="mx-auto" />
        
        {/* Header */}
        <section className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center space-x-1 sm:space-x-3 mb-4">
          <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Couple Name Generator
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create the perfect romantic portmanteau for you and your partner. 
          Combine your names into beautiful, meaningful combinations.
        </p>
      </section>

      {/* Generator */}
      <Card className="shadow-elegant max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Enter Your Names
          </CardTitle>
          <CardDescription>
            We'll create 5 romantic combinations perfect for couples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Partner 1 Name</label>
              <Input
                placeholder="e.g., Jennifer"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Partner 2 Name</label>
              <Input
                placeholder="e.g., Michael"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="text-center"
              />
            </div>
          </div>

          <Button
            onClick={generateNames}
            className="w-full gradient-primary hover:opacity-90 transition-smooth"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                Creating Romantic Names...
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 mr-2" />
                Generate Couple Names
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Mid Ad */}
      <div className="flex justify-center">
        <AdSlot id="couple-mid" size="rectangle" />
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Your Couple Names</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {results.map((result, index) => (
              <Card key={index} className="shadow-soft transition-smooth hover:shadow-elegant group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-pink-600">{result.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.name)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-smooth"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="secondary" className="w-fit bg-pink-50 text-pink-700">
                    Combination {index + 1}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <section className="gradient-secondary rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Tips For Perfect Couple Names</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center space-x-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span>What Makes A Great Couple Name</span>
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Easy to pronounce and remember</li>
              <li>• Flows naturally when spoken</li>
              <li>• Represents both partners equally</li>
              <li>• Has a pleasant sound</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Popular Examples</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Brangelina</strong> - Brad + Angelina</li>
              <li>• <strong>Kimye</strong> - Kim + Kanye</li>
              <li>• <strong>Bennifer</strong> - Ben + Jennifer</li>
              <li>• <strong>TomKat</strong> - Tom + Katie</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-background rounded-2xl border p-8 md:p-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Everything About Couple Name Generators</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h3 className="text-xl font-semibold text-foreground">How Couple Name Generators Work</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Is It Safe To Use?</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Common Questions</h3>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
            {/* This section is editable for adding blog content and backlinks */}
          </div>
        </div>
        
        {/* Bottom Ad */}
        <div className="flex justify-center pt-8">
          <AdSlot id="couple-bottom" size="banner" />
        </div>
      </section>
      </div>
    </>
  );
};

export default CoupleNameGenerator;