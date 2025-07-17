import { ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
import SEOHead from "@/components/SEOHead";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  children: ReactNode;
  pageId: string;
}

const ToolPageLayout = ({ title, description, keywords, canonical, children, pageId }: ToolPageLayoutProps) => {
  return (
    <>
      <SEOHead 
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
      />
      
      <div className="space-y-8">
        {/* Top Ad */}
        <AdSlot id={`${pageId}-top`} size="leaderboard" className="mx-auto" />
        
        {children}
        
        {/* Bottom Ad */}
        <div className="flex justify-center pt-8">
          <AdSlot id={`${pageId}-bottom`} size="banner" />
        </div>
      </div>
    </>
  );
};

export default ToolPageLayout;