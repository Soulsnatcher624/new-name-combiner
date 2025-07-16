import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Sparkles, Copy, Share2, Briefcase } from "lucide-react";
import { generateNameCombinations } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";

interface NameCombination {
  name: string;
  explanation: string;
}

const BrandNameGenerator = () => {
  const [keywords, setKeywords] = useState<string[]>(['', '']);
  const [results, setResults] = useState<NameCombination[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addKeywordField = () => {
    if (keywords.length < 6) {
      setKeywords([...keywords, '']);
    }
  };

  const removeKeywordField = (index: number) => {
    if (keywords.length > 2) {
      const newKeywords = keywords.filter((_, i) => i !== index);
      setKeywords(newKeywords);
    }
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const generateBrandNames = async () => {
    const validKeywords = keywords.filter(keyword => keyword.trim().length > 0);
    
    if (validKeywords.length < 2) {
      toast({
        title: "Not enough keywords",
        description: "Please enter at least 2 keywords to generate brand names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const combinations = generateNameCombinations(validKeywords);
        setResults(combinations);
        toast({
          title: "Brand names generated!",
          description: `Created ${combinations.length} unique brand name combinations.`,
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
    const text = `Check out this amazing brand name: "${name}" - Generated using our Brand Name Generator!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Brand Name',
        text: text,
        url: url
      });
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
    
    toast({
      title: "Share opened!",
      description: "Share this amazing brand name with others.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Briefcase className="h-10 w-10 text-green-500" />
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Brand Name Generator
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Combine business keywords to create professional, memorable brand names perfect for your company
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Business Keywords
          </CardTitle>
          <CardDescription>
            Enter 2-6 keywords related to your business or industry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Enter keyword ${index + 1} (e.g., tech, solutions, pro)`}
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                  className="flex-1"
                />
                {keywords.length > 2 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeKeywordField(index)}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {keywords.length < 6 && (
              <Button
                variant="outline"
                onClick={addKeywordField}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Keyword
              </Button>
            )}
          </div>

          <Button
            onClick={generateBrandNames}
            className="w-full gradient-primary hover:opacity-90 transition-smooth"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                Generating Brand Names...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Brand Names
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Generated Brand Names</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card key={index} className="shadow-soft transition-smooth hover:shadow-elegant">
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
                    Brand Option {index + 1}
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

export default BrandNameGenerator;