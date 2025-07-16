import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import CoupleNameGenerator from "./pages/CoupleNameGenerator";
import BabyNameGenerator from "./pages/BabyNameGenerator";
import BrandNameGenerator from "./pages/BrandNameGenerator";
import SocialMediaNameGenerator from "./pages/SocialMediaNameGenerator";
import UsernameGenerator from "./pages/UsernameGenerator";
import PetNameGenerator from "./pages/PetNameGenerator";
import FantasyNameGenerator from "./pages/FantasyNameGenerator";
import GamertagGenerator from "./pages/GamertagGenerator";
import CharacterNameGenerator from "./pages/CharacterNameGenerator";
import CelebrityNameGenerator from "./pages/CelebrityNameGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/couple" element={<CoupleNameGenerator />} />
              <Route path="/tools/baby" element={<BabyNameGenerator />} />
              <Route path="/tools/brand" element={<BrandNameGenerator />} />
              <Route path="/tools/social" element={<SocialMediaNameGenerator />} />
              <Route path="/tools/username" element={<UsernameGenerator />} />
              <Route path="/tools/pet" element={<PetNameGenerator />} />
              <Route path="/tools/fantasy" element={<FantasyNameGenerator />} />
              <Route path="/tools/gamertag" element={<GamertagGenerator />} />
              <Route path="/tools/character" element={<CharacterNameGenerator />} />
              <Route path="/tools/celebrity" element={<CelebrityNameGenerator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
