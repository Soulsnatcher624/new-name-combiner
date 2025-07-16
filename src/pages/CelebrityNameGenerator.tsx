import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Star } from "lucide-react";
import { generateCharacterNames } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";


const CelebrityNameGenerator = () => {
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

  const generateCelebrityNames = (inputs: string[]): string[] => {
    const glamSuffixes = ["star", "gold", "divine", "royal", "crystal"];
    const stageStyles = ["the", "mc", "dj", "lady", "lord"];
    const combinations: string[] = [];
    
    // Celebrity-style combinations
    for (let i = 0; i < inputs.length; i++) {
      for (let j = i + 1; j < inputs.length; j++) {
        const name1 = inputs[i];
        const name2 = inputs[j];
        
        // Stage name style
        combinations.push(`${name1} ${name2}`);
        combinations.push(`${name2} ${name1}`);
        
        // Single name with flair
        combinations.push(`${name1}${name2}`);
      }
    }
    
    // With glamorous elements
    const merged = inputs.join('').toLowerCase();
    glamSuffixes.forEach(suffix => {
      combinations.push(`${inputs[0]} ${suffix}`);
    });
    
    stageStyles.forEach(style => {
      combinations.push(`${style} ${inputs[0]}`);
    });
    
    return combinations.slice(0, 5);
  };

  const generateNames = () => {
    const validInputs = inputs.filter(input => input.trim());
    if (validInputs.length < 2) {
      toast({
        title: "More names needed",
        description: "Please enter at least 2 words to generate celebrity names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCelebrityNames(validInputs);
      setResults(generated);
      setIsGenerating(false);
      toast({
        title: "Celebrity names generated!",
        description: `Created ${generated.length} glamorous stage name combinations.`,
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
        title: 'Check out this celebrity name!',
        text: `I found this amazing stage name: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      copyToClipboard(`Check out this celebrity name: ${name} - ${window.location.href}`);
      toast({
        title: "Share text copied!",
        description: "Share text has been copied to your clipboard.",
      });
    }
  };

  const faqs = [
    {
      question: "What makes a good stage name?",
      answer: "A good stage name should be memorable, easy to pronounce, unique, and reflect your artistic persona. It should also be easy to search for online and work well on promotional materials."
    },
    {
      question: "Should I use my real name as part of my stage name?",
      answer: "You can! Many celebrities use variations of their real names. Our generator can help you create combinations using parts of your actual name with other meaningful words."
    },
    {
      question: "Can I check if a celebrity name is already taken?",
      answer: "We recommend searching online, checking social media platforms, and verifying trademark databases to ensure your chosen name isn't already in use by another performer."
    },
    {
      question: "How do I make my stage name stand out?",
      answer: "Choose something that reflects your artistic style, is easy to remember, and creates the right image for your brand. Avoid overly complicated names that are hard to spell or pronounce."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Celebrity Name
          <span className="gradient-primary bg-clip-text text-transparent"> Generator</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create glamorous stage names and celebrity personas that shine in the spotlight
        </p>
      </div>

      <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Star className="h-6 w-6 text-primary" />
            <span>Celebrity Name Combiner</span>
          </CardTitle>
          <CardDescription>
            Combine up to 9 different words to create glamorous stage names
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {inputs.map((input, index) => (
              <Input
                key={index}
                placeholder={`Name/Word ${index + 1}`}
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
            {isGenerating ? "Generating..." : "Generate Celebrity Names"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
          <CardHeader>
            <CardTitle>Generated Celebrity Names</CardTitle>
            <CardDescription>
              Here are your glamorous stage name combinations
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

      {/* Editable Blog Content Area */}
      <div className="mt-12 gradient-secondary rounded-2xl p-8 md:p-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">About Celebrity Name Generator</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Learn how our celebrity name generator helps aspiring performers and content creators 
              develop memorable stage names that capture attention. Perfect for artists, influencers, 
              and entertainers looking to create their unique brand identity.
            </p>
            {/* This section can be edited later for blog content and backlinks */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityNameGenerator;