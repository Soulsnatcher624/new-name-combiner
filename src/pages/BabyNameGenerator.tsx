import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Copy, Sparkles, Plus, Minus } from "lucide-react";
import { generateBabyNames } from "@/utils/nameGenerators";
import { useToast } from "@/hooks/use-toast";

interface NameCombination {
  name: string;
  explanation: string;
}

const BabyNameGenerator = () => {
  const [parentNames, setParentNames] = useState<string[]>(['', '']);
  const [results, setResults] = useState<NameCombination[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addParentField = () => {
    if (parentNames.length < 4) {
      setParentNames([...parentNames, '']);
    }
  };

  const removeParentField = (index: number) => {
    if (parentNames.length > 2) {
      const newNames = parentNames.filter((_, i) => i !== index);
      setParentNames(newNames);
    }
  };

  const updateParentName = (index: number, value: string) => {
    const newNames = [...parentNames];
    newNames[index] = value;
    setParentNames(newNames);
  };

  const generateNames = async () => {
    const validNames = parentNames.filter(name => name.trim().length > 0);
    
    if (validNames.length < 2) {
      toast({
        title: "Not enough names",
        description: "Please enter at least 2 parent/family names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const combinations = generateBabyNames(validNames);
        setResults(combinations);
        toast({
          title: "Baby names generated!",
          description: `Created ${combinations.length} beautiful name combinations.`,
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
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Baby className="h-10 w-10 text-blue-500" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Baby Name Generator
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create beautiful names for your little one by combining parent names, 
          family names, or meaningful words that represent your family heritage.
        </p>
      </section>

      {/* Generator */}
      <Card className="shadow-elegant max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            Family Names & Heritage
          </CardTitle>
          <CardDescription>
            Enter parent names, grandparent names, or meaningful family words
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {parentNames.map((name, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`${index < 2 ? 'Parent' : 'Family Name'} ${index + 1}`}
                  value={name}
                  onChange={(e) => updateParentName(index, e.target.value)}
                  className="flex-1"
                />
                {parentNames.length > 2 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeParentField(index)}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {parentNames.length < 4 && (
              <Button
                variant="outline"
                onClick={addParentField}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Family Name
              </Button>
            )}
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
                Creating Beautiful Names...
              </>
            ) : (
              <>
                <Baby className="h-5 w-5 mr-2" />
                Generate Baby Names
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Perfect Names for Your Baby</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {results.map((result, index) => (
              <Card key={index} className="shadow-soft transition-smooth hover:shadow-elegant group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-blue-600">{result.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.name)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-smooth"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="secondary" className="w-fit bg-blue-50 text-blue-700">
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

      {/* Tips Section */}
      <section className="gradient-secondary rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Baby Naming Tips</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center space-x-2">
              <Baby className="h-5 w-5 text-blue-500" />
              <span>Consider the Sound</span>
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Say it out loud with your last name</li>
              <li>• Check for potential nicknames</li>
              <li>• Consider initials and abbreviations</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Family Heritage</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Honor grandparents or ancestors</li>
              <li>• Combine cultural traditions</li>
              <li>• Include meaningful family words</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Future Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Professional settings</li>
              <li>• International pronunciation</li>
              <li>• Spelling simplicity</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BabyNameGenerator;