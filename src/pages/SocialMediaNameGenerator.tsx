import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Sparkles, Copy, Share2, AtSign } from "lucide-react";
import { generateNameCombinations } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";

interface NameCombination {
  name: string;
  explanation: string;
}

const SocialMediaNameGenerator = () => {
  const [interests, setInterests] = useState<string[]>(['', '']);
  const [results, setResults] = useState<NameCombination[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addInterestField = () => {
    if (interests.length < 5) {
      setInterests([...interests, '']);
    }
  };

  const removeInterestField = (index: number) => {
    if (interests.length > 2) {
      const newInterests = interests.filter((_, i) => i !== index);
      setInterests(newInterests);
    }
  };

  const updateInterest = (index: number, value: string) => {
    const newInterests = [...interests];
    newInterests[index] = value;
    setInterests(newInterests);
  };

  const generateUsernames = async () => {
    const validInterests = interests.filter(interest => interest.trim().length > 0);
    
    if (validInterests.length < 2) {
      toast({
        title: "Not enough interests",
        description: "Please enter at least 2 interests to generate usernames.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const combinations = generateNameCombinations(validInterests);
        setResults(combinations);
        toast({
          title: "Usernames generated!",
          description: `Created ${combinations.length} unique username combinations.`,
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
    const text = `Check out this cool username: "${name}" - Generated using our Social Media Name Generator!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Username',
        text: text,
        url: url
      });
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
    
    toast({
      title: "Share opened!",
      description: "Share this cool username with others.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <AtSign className="h-10 w-10 text-purple-500" />
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Social Media Name Generator
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Combine your interests and personality traits to create catchy, memorable usernames for social platforms
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Your Interests
          </CardTitle>
          <CardDescription>
            Enter 2-5 words that represent your interests, hobbies, or personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {interests.map((interest, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Enter interest ${index + 1} (e.g., music, gaming, travel)`}
                  value={interest}
                  onChange={(e) => updateInterest(index, e.target.value)}
                  className="flex-1"
                />
                {interests.length > 2 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeInterestField(index)}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {interests.length < 5 && (
              <Button
                variant="outline"
                onClick={addInterestField}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Interest
              </Button>
            )}
          </div>

          <Button
            onClick={generateUsernames}
            className="w-full gradient-primary hover:opacity-90 transition-smooth"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                Generating Usernames...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Usernames
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Generated Usernames</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card key={index} className="shadow-soft transition-smooth hover:shadow-elegant">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">@{result.name}</CardTitle>
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
                    Username Option {index + 1}
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

export default SocialMediaNameGenerator;