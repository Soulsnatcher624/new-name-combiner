import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, UserCheck } from "lucide-react";
import { generateCharacterNames } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";


const CharacterNameGenerator = () => {
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
        description: "Please enter at least 2 words to generate character names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCharacterNames(validInputs);
      setResults(generated);
      setIsGenerating(false);
      toast({
        title: "Character names generated!",
        description: `Created ${generated.length} memorable character name combinations.`,
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
        title: 'Check out this character name!',
        text: `I found this great character name: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      copyToClipboard(`Check out this character name: ${name} - ${window.location.href}`);
      toast({
        title: "Share text copied!",
        description: "Share text has been copied to your clipboard.",
      });
    }
  };

  const faqs = [
    {
      question: "What makes a good character name?",
      answer: "A good character name should fit the character's personality, background, and the world they inhabit. It should be memorable and easy for readers to pronounce and remember."
    },
    {
      question: "Can I use these names for published works?",
      answer: "Absolutely! All generated character names are created by our algorithm and are free to use in your stories, novels, games, or any published work without restrictions."
    },
    {
      question: "How do I choose the right name for my character?",
      answer: "Consider your character's personality, background, culture, and the tone of your story. Try saying the name out loud and see if it feels right for your character."
    },
    {
      question: "Can I modify the generated names?",
      answer: "Of course! Feel free to use the generated names as inspiration and modify them to better fit your character or story. They're a starting point for your creativity."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Character Name
          <span className="gradient-primary bg-clip-text text-transparent"> Generator</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create memorable character names for your stories, novels, and creative projects
        </p>
      </div>

      <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <UserCheck className="h-6 w-6 text-primary" />
            <span>Character Name Combiner</span>
          </CardTitle>
          <CardDescription>
            Combine up to 9 different words to create memorable character names
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {inputs.map((input, index) => (
              <Input
                key={index}
                placeholder={`Trait/Name ${index + 1}`}
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
            {isGenerating ? "Generating..." : "Generate Character Names"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
          <CardHeader>
            <CardTitle>Generated Character Names</CardTitle>
            <CardDescription>
              Here are your memorable character name combinations
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
          <h2 className="text-3xl font-bold">Complete Character Naming Guide</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Psychology Of Character Names</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Genre-Specific Naming Conventions</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Tips For Writers And Game Developers</h3>
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

export default CharacterNameGenerator;