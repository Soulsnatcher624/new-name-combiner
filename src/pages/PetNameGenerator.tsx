import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Heart } from "lucide-react";
import { generatePetNames } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";


const PetNameGenerator = () => {
  const [inputs, setInputs] = useState<string[]>(["", ""]);
  const [results, setResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 9) {
      setInputs([...inputs, ""]);
    }
  };

  const removeInput = () => {
    if (inputs.length > 2) {
      setInputs(inputs.slice(0, -1));
    }
  };

  const generateNames = () => {
    const validInputs = inputs.filter(input => input.trim());
    if (validInputs.length < 2) {
      toast({
        title: "More names needed",
        description: "Please enter at least 2 words to generate pet names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generatePetNames(validInputs);
      setResults(generated);
      setIsGenerating(false);
      toast({
        title: "Pet names generated!",
        description: `Created ${generated.length} adorable pet name combinations.`,
      });
    }, 1000);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: "Copied!",
      description: `"${name}" has been copied to your clipboard.`,
    });
  };

  const shareOnSocialMedia = (name: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this pet name!',
        text: `I found this cute pet name: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      copyToClipboard(`Check out this pet name: ${name} - ${window.location.href}`);
      toast({
        title: "Share text copied!",
        description: "Share text has been copied to your clipboard.",
      });
    }
  };

  const faqs = [
    {
      question: "What makes a good pet name?",
      answer: "A good pet name is easy to pronounce, memorable, and reflects your pet's personality or appearance. It should be something you're comfortable calling out in public!"
    },
    {
      question: "Can I use human names for pets?",
      answer: "Absolutely! Many pet owners choose human names for their pets. Our generator can combine traditional names with pet-related words for unique results."
    },
    {
      question: "Should pet names be short?",
      answer: "Generally yes - shorter names (1-2 syllables) are easier for pets to recognize and respond to, but the most important thing is that you love the name."
    },
    {
      question: "How do I choose between multiple options?",
      answer: "Try saying each name out loud, see how it feels, and consider your pet's personality. You can also test which name gets the best response from your pet!"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Pet Name
          <span className="gradient-primary bg-clip-text text-transparent"> Generator</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create adorable names for your furry, feathered, or scaled friends
        </p>
      </div>

      <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span>Pet Name Combiner</span>
          </CardTitle>
          <CardDescription>
            Combine up to 9 different words to create perfect pet names
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {inputs.map((input, index) => (
              <Input
                key={index}
                placeholder={`Word/Trait ${index + 1}`}
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="rounded-xl"
              />
            ))}
          </div>

          <div className="flex justify-center space-x-2">
            {inputs.length < 9 && (
              <Button variant="outline" onClick={addInput} className="rounded-xl">
                Add Word
              </Button>
            )}
            {inputs.length > 2 && (
              <Button variant="outline" onClick={removeInput} className="rounded-xl">
                Remove Word
              </Button>
            )}
          </div>

          <Button 
            onClick={generateNames} 
            disabled={isGenerating}
            className="w-full rounded-xl"
            size="lg"
          >
            {isGenerating ? "Generating..." : "Generate Pet Names"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
          <CardHeader>
            <CardTitle>Generated Pet Names</CardTitle>
            <CardDescription>
              Here are your adorable pet name combinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {results.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary rounded-xl transition-smooth hover:bg-secondary/80"
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="rounded-lg">
                      {index + 1}
                    </Badge>
                    <span className="font-medium text-lg">{name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(name)}
                      className="rounded-xl"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => shareOnSocialMedia(name)}
                      className="rounded-xl"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blog Section */}
      <section className="bg-background rounded-2xl border p-8 md:p-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Complete Guide To Pet Naming</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Choosing The Perfect Pet Name</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Popular Pet Name Trends</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Safety And Legal Considerations</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
            {/* This section is editable for adding blog content and backlinks */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetNameGenerator;