// Name generation utilities for different types of name combinations

interface NameCombination {
  name: string;
  explanation: string;
}

// Syllable patterns for natural-sounding combinations
const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

// Common name endings for different types
const romanticEndings = ['ia', 'ella', 'ana', 'ina', 'ara', 'ley', 'son', 'ton'];
const modernEndings = ['ex', 'ly', 'fy', 'ze', 'co', 'io', 'ai'];
const brandEndings = ['ly', 'fy', 'co', 'io', 'ai', 'hub', 'lab', 'pro'];

function isVowel(char: string): boolean {
  return vowels.includes(char.toLowerCase());
}

function getFirstSyllable(name: string): string {
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 2) return clean;
  
  // Find natural break point
  for (let i = 1; i < clean.length - 1; i++) {
    if (isVowel(clean[i]) && !isVowel(clean[i + 1])) {
      return clean.slice(0, i + 1);
    }
  }
  
  return clean.slice(0, Math.ceil(clean.length / 2));
}

function getLastSyllable(name: string): string {
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 2) return clean;
  
  // Find natural break point from end
  for (let i = clean.length - 2; i > 0; i--) {
    if (!isVowel(clean[i]) && isVowel(clean[i - 1])) {
      return clean.slice(i);
    }
  }
  
  return clean.slice(Math.floor(clean.length / 2));
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ensurePronounceable(combination: string): string {
  // Fix common unpronounceable patterns
  let fixed = combination;
  
  // Avoid three consonants in a row
  fixed = fixed.replace(/([bcdfghjklmnpqrstvwxyz]){3,}/gi, (match) => {
    return match.slice(0, 2) + 'a' + match.slice(2);
  });
  
  // Ensure vowels between consonant clusters
  fixed = fixed.replace(/([bcdfghjklmnpqrstvwxyz]{2})([bcdfghjklmnpqrstvwxyz]{2})/gi, '$1e$2');
  
  return fixed;
}

export function generateNameCombinations(names: string[]): NameCombination[] {
  if (names.length < 2 || names.length > 4) {
    throw new Error('Please provide 2-4 names');
  }

  const cleanNames = names.map(name => name.trim()).filter(name => name.length > 0);
  if (cleanNames.length < 2) {
    throw new Error('Please provide at least 2 valid names');
  }

  const combinations: NameCombination[] = [];

  // Method 1: First half + Second half
  if (cleanNames.length >= 2) {
    const first = getFirstSyllable(cleanNames[0]);
    const second = getLastSyllable(cleanNames[1]);
    const combo = ensurePronounceable(first + second);
    combinations.push({
      name: capitalizeFirst(combo),
      explanation: `Combining the beginning of "${cleanNames[0]}" with the ending of "${cleanNames[1]}"`
    });
  }

  // Method 2: Reverse combination
  if (cleanNames.length >= 2) {
    const first = getFirstSyllable(cleanNames[1]);
    const second = getLastSyllable(cleanNames[0]);
    const combo = ensurePronounceable(first + second);
    combinations.push({
      name: capitalizeFirst(combo),
      explanation: `Combining the beginning of "${cleanNames[1]}" with the ending of "${cleanNames[0]}"`
    });
  }

  // Method 3: Triple combination (if 3+ names)
  if (cleanNames.length >= 3) {
    const first = getFirstSyllable(cleanNames[0]);
    const middle = cleanNames[1].toLowerCase().slice(1, 3);
    const last = getLastSyllable(cleanNames[2]);
    const combo = ensurePronounceable(first + middle + last);
    combinations.push({
      name: capitalizeFirst(combo),
      explanation: `Blending elements from "${cleanNames[0]}", "${cleanNames[1]}", and "${cleanNames[2]}"`
    });
  }

  // Method 4: Vowel harmony combination
  if (cleanNames.length >= 2) {
    const consonantsFromFirst = cleanNames[0].toLowerCase().replace(/[aeiou]/g, '');
    const vowelsFromSecond = cleanNames[1].toLowerCase().replace(/[bcdfghjklmnpqrstvwxyz]/g, '');
    let combo = '';
    
    for (let i = 0; i < Math.max(consonantsFromFirst.length, vowelsFromSecond.length); i++) {
      if (i < consonantsFromFirst.length) combo += consonantsFromFirst[i];
      if (i < vowelsFromSecond.length) combo += vowelsFromSecond[i];
    }
    
    if (combo.length > 2) {
      combo = ensurePronounceable(combo);
      combinations.push({
        name: capitalizeFirst(combo),
        explanation: `Harmonizing consonants from "${cleanNames[0]}" with vowels from "${cleanNames[1]}"`
      });
    }
  }

  // Method 5: Acronym-based (if 3+ names)
  if (cleanNames.length >= 3) {
    const acronym = cleanNames.map(name => name.charAt(0).toLowerCase()).join('');
    const base = acronym + romanticEndings[Math.floor(Math.random() * romanticEndings.length)];
    combinations.push({
      name: capitalizeFirst(base),
      explanation: `Creating an acronym from the first letters: ${cleanNames.map(n => n.charAt(0).toUpperCase()).join('')}`
    });
  }

  // Ensure we have exactly 5 combinations
  while (combinations.length < 5 && cleanNames.length >= 2) {
    // Generate additional variations
    const randomName1 = cleanNames[Math.floor(Math.random() * cleanNames.length)];
    const randomName2 = cleanNames[Math.floor(Math.random() * cleanNames.length)];
    
    if (randomName1 !== randomName2) {
      const syllable1 = getFirstSyllable(randomName1);
      const syllable2 = getLastSyllable(randomName2);
      const ending = modernEndings[Math.floor(Math.random() * modernEndings.length)];
      const combo = ensurePronounceable(syllable1 + syllable2.slice(0, -1) + ending);
      
      const newCombination = {
        name: capitalizeFirst(combo),
        explanation: `Modern fusion of "${randomName1}" and "${randomName2}" with contemporary styling`
      };
      
      // Check for duplicates
      if (!combinations.some(c => c.name === newCombination.name)) {
        combinations.push(newCombination);
      }
    }
  }

  return combinations.slice(0, 5);
}

export function generateCoupleNames(name1: string, name2: string): NameCombination[] {
  return generateNameCombinations([name1, name2]).map(combo => ({
    ...combo,
    explanation: `Perfect couple name combining "${name1}" and "${name2}"`
  }));
}

export function generateBabyNames(parentNames: string[]): NameCombination[] {
  const combinations = generateNameCombinations(parentNames);
  return combinations.map(combo => ({
    ...combo,
    explanation: `Beautiful baby name inspired by ${parentNames.join(' and ')}`
  }));
}

export function generateBrandNames(words: string[]): NameCombination[] {
  const combinations = generateNameCombinations(words);
  return combinations.map(combo => {
    // Add brand-style endings sometimes
    const shouldAddEnding = Math.random() > 0.6;
    const name = shouldAddEnding 
      ? combo.name + brandEndings[Math.floor(Math.random() * brandEndings.length)]
      : combo.name;
    
    return {
      name: capitalizeFirst(name),
      explanation: `Professional brand name combining business concepts: ${words.join(', ')}`
    };
  });
}

export function generateSocialMediaNames(interests: string[]): NameCombination[] {
  const combinations = generateNameCombinations(interests);
  return combinations.map(combo => ({
    name: combo.name.toLowerCase() + (Math.random() > 0.5 ? Math.floor(Math.random() * 99) : ''),
    explanation: `Catchy social media handle based on: ${interests.join(', ')}`
  }));
}

export const generateUsernameNames = (inputs: string[]): string[] => {
  const numbers = ["123", "007", "99", "2024", "x"];
  const styles = ["_", ".", "x", "o", ""];
  const prefixes = ["mr", "ms", "the", "super", "mega", "ultra"];
  const suffixes = ["pro", "master", "guru", "ninja", "legend"];
  
  const combinations: string[] = [];
  
  // Direct combinations with styles
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const name1 = inputs[i].toLowerCase().replace(/\s+/g, '');
      const name2 = inputs[j].toLowerCase().replace(/\s+/g, '');
      
      styles.forEach(style => {
        combinations.push(`${name1}${style}${name2}`);
        combinations.push(`${name2}${style}${name1}`);
      });
    }
  }
  
  // With numbers
  const merged = inputs.join('').toLowerCase().replace(/\s+/g, '');
  numbers.forEach(num => {
    combinations.push(`${merged}${num}`);
    combinations.push(`${num}${merged}`);
  });
  
  // With prefixes and suffixes
  prefixes.forEach(prefix => {
    combinations.push(`${prefix}${merged}`);
  });
  
  suffixes.forEach(suffix => {
    combinations.push(`${merged}${suffix}`);
  });
  
  return combinations.slice(0, 5);
};

export const generatePetNames = (inputs: string[]): string[] => {
  const petSuffixes = ["ie", "y", "kins", "paws", "fur", "whiskers"];
  const petPrefixes = ["mr", "ms", "little", "big", "sweet", "fluffy"];
  
  const combinations: string[] = [];
  
  // Cute combinations
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const name1 = inputs[i].toLowerCase();
      const name2 = inputs[j].toLowerCase();
      
      // Simple blends
      combinations.push(name1.slice(0, -1) + name2);
      combinations.push(name2.slice(0, -1) + name1);
      combinations.push(name1.slice(0, 2) + name2.slice(-2));
    }
  }
  
  // With cute suffixes
  inputs.forEach(input => {
    const clean = input.toLowerCase().replace(/\s+/g, '');
    petSuffixes.forEach(suffix => {
      combinations.push(`${clean}${suffix}`);
    });
  });
  
  // With prefixes
  const merged = inputs.join('').toLowerCase().replace(/\s+/g, '');
  petPrefixes.forEach(prefix => {
    combinations.push(`${prefix} ${merged}`);
  });
  
  return combinations.slice(0, 5);
};

export const generateFantasyNames = (inputs: string[]): string[] => {
  const fantasySuffixes = ["iel", "wen", "oth", "ard", "ion", "wyn"];
  const fantasyPrefixes = ["aer", "al", "el", "gal", "thor", "val"];
  const mystical = ["star", "moon", "shadow", "flame", "storm", "frost"];
  
  const combinations: string[] = [];
  
  // Fantasy blends
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const name1 = inputs[i].toLowerCase();
      const name2 = inputs[j].toLowerCase();
      
      combinations.push(name1.slice(0, 3) + name2.slice(-3));
      combinations.push(name2.slice(0, 3) + name1.slice(-3));
    }
  }
  
  // With fantasy elements
  inputs.forEach(input => {
    const clean = input.toLowerCase().replace(/\s+/g, '');
    fantasySuffixes.forEach(suffix => {
      combinations.push(`${clean}${suffix}`);
    });
    fantasyPrefixes.forEach(prefix => {
      combinations.push(`${prefix}${clean}`);
    });
  });
  
  // Mystical combinations
  const merged = inputs.join('').toLowerCase().slice(0, 4);
  mystical.forEach(element => {
    combinations.push(`${merged}${element}`);
    combinations.push(`${element}${merged}`);
  });
  
  return combinations.slice(0, 5);
};

export const generateGamertags = (inputs: string[]): string[] => {
  const gamerSuffixes = ["gamer", "pro", "x", "gg", "plays", "gaming"];
  const numbers = ["420", "69", "2024", "99", "007"];
  const symbols = ["x", "_", "o", ".", ""];
  
  const combinations: string[] = [];
  
  // Gamer combinations
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const name1 = inputs[i].toLowerCase().replace(/\s+/g, '');
      const name2 = inputs[j].toLowerCase().replace(/\s+/g, '');
      
      symbols.forEach(symbol => {
        combinations.push(`${name1}${symbol}${name2}`);
        combinations.push(`${name2}${symbol}${name1}`);
      });
    }
  }
  
  // With gaming elements
  const merged = inputs.join('').toLowerCase().replace(/\s+/g, '');
  gamerSuffixes.forEach(suffix => {
    combinations.push(`${merged}${suffix}`);
  });
  
  // With numbers
  numbers.forEach(num => {
    combinations.push(`${merged}${num}`);
    combinations.push(`${num}${merged}`);
  });
  
  return combinations.slice(0, 5);
};

export const generateCharacterNames = (inputs: string[]): string[] => {
  const titles = ["lord", "lady", "sir", "captain", "doctor", "professor"];
  const regions = ["north", "south", "vale", "shire", "field", "wood"];
  
  const combinations: string[] = [];
  
  // Character combinations
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const name1 = inputs[i];
      const name2 = inputs[j];
      
      // First name + Last name style
      combinations.push(`${name1} ${name2}`);
      combinations.push(`${name2} ${name1}`);
      
      // Blended names
      combinations.push(name1.slice(0, 3) + name2.slice(-3));
    }
  }
  
  // With titles
  const firstName = inputs[0];
  titles.forEach(title => {
    combinations.push(`${title} ${firstName}`);
  });
  
  // With regions
  const lastName = inputs[inputs.length - 1];
  regions.forEach(region => {
    combinations.push(`${firstName} ${region}${lastName}`);
  });
  
  return combinations.slice(0, 5);
};