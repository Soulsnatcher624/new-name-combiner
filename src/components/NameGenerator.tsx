import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Sparkles, Copy, Share2 } from "lucide-react";
import { generateNameCombinations } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";

interface NameCombination {
  name: string;
  explanation: string;
}

const NameGenerator = () => {
  const [names, setNames] = useState<string[]>(['', '']);
  const [results, setResults] = useState<NameCombination[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addNameField = () => {
    if (names.length < 9) {
      setNames([...names, '']);
    }
  };

  const removeNameField = (index: number) => {
    if (names.length > 2) {
      const newNames = names.filter((_, i) => i !== index);
      setNames(newNames);
    }
  };

  const updateName = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const generateNames = async () => {
    const validNames = names.filter(name => name.trim().length > 0);
    
    if (validNames.length < 2) {
      toast({
        title: "Not enough names",
        description: "Please enter at least 2 names to generate combinations.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        const combinations = generateNameCombinations(validNames);
        setResults(combinations);
        toast({
          title: "Names generated!",
          description: `Created ${combinations.length} unique name combinations.`,
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

  const shareOnSocialMedia = (name: string) => {
    const text = `Check out this amazing name combination: "${name}" - Generated using our Name Combiner tool!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Name Combination',
        text: text,
        url: url
      });
    } else {
      // Fallback to Twitter share
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
    
    toast({
      title: "Share opened!",
      description: "Share this amazing name combination with others.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Name Combiner
          </CardTitle>
          <CardDescription>
            Combine up to 9 different names to create meaningful combinations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {names.map((name, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Enter name ${index + 1}`}
                  value={name}
                  onChange={(e) => updateName(index, e.target.value)}
                  className="flex-1 rounded-2xl"
                />
                {names.length > 2 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeNameField(index)}
                    className="shrink-0 rounded-2xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {names.length < 9 && (
              <Button
                variant="outline"
                onClick={addNameField}
                className="w-full rounded-2xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Name
              </Button>
            )}
          </div>

          <Button
            onClick={generateNames}
            className="w-full gradient-primary hover:opacity-90 transition-smooth rounded-2xl"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                Generating Names...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Names
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Generated Names</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card key={index} className="shadow-soft transition-smooth hover:shadow-elegant rounded-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(result.name)}
                        className="h-8 w-8 p-0"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareOnSocialMedia(result.name)}
                        className="h-8 w-8 p-0"
                        title="Share on social media"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    Option {index + 1}
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
    </div>
  );
};

export default NameGenerator;