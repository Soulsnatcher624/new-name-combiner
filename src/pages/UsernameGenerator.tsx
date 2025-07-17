import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Sparkles } from "lucide-react";
import { generateUsernameNames } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";


const UsernameGenerator = () => {
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
        description: "Please enter at least 2 words to generate usernames.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateUsernameNames(validInputs);
      setResults(generated);
      setIsGenerating(false);
      toast({
        title: "Usernames generated!",
        description: `Created ${generated.length} unique username combinations.`,
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
        title: 'Check out this username!',
        text: `I found this cool username: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      copyToClipboard(`Check out this username: ${name} - ${window.location.href}`);
      toast({
        title: "Share text copied!",
        description: "Share text has been copied to your clipboard.",
      });
    }
  };

  const faqs = [
    {
      question: "What makes a good username?",
      answer: "A good username is memorable, unique, easy to spell, and reflects your personality or interests. It should be appropriate for the platform you're using."
    },
    {
      question: "Can I use these usernames anywhere?",
      answer: "Yes! These usernames work great for social media, gaming platforms, forums, and any online service that requires a unique identifier."
    },
    {
      question: "Are the usernames guaranteed to be available?",
      answer: "We can't guarantee availability since it depends on each platform. We recommend checking availability on your desired platform after generating names."
    },
    {
      question: "How do you ensure username uniqueness?",
      answer: "Our algorithm combines your inputs in creative ways, adds variations, and uses different combination techniques to create unique possibilities."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Username
          <span className="gradient-primary bg-clip-text text-transparent"> Generator</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create unique usernames by combining your interests, hobbies, or favorite words
        </p>
      </div>

      <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Username Combiner</span>
          </CardTitle>
          <CardDescription>
            Combine up to 9 different words to create unique usernames
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {inputs.map((input, index) => (
              <Input
                key={index}
                placeholder={`Interest/Word ${index + 1}`}
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
            {isGenerating ? "Generating..." : "Generate Usernames"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-elegant">
          <CardHeader>
            <CardTitle>Generated Usernames</CardTitle>
            <CardDescription>
              Here are your unique username combinations
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
          <h2 className="text-3xl font-bold">Everything About Username Generators</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="text-xl font-semibold text-foreground">How Username Generators Work</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Best Practices For Creating Usernames</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Common Questions About Username Generation</h3>
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

export default UsernameGenerator;