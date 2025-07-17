import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper" | "mobile-banner";
  className?: string;
  isVisible?: boolean;
}

const AdSlot = ({ id, size, className, isVisible = false }: AdSlotProps) => {
  const sizeClasses = {
    banner: "w-full h-[250px]", // 300x250
    rectangle: "w-full h-[280px]", // 336x280  
    leaderboard: "w-full h-[90px]", // 728x90
    skyscraper: "w-[160px] h-[600px]", // 160x600
    "mobile-banner": "w-full h-[50px]" // 320x50
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "ad-slot bg-muted/20 border border-dashed border-muted-foreground/20 rounded-xl flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      id={`ad-slot-${id}`}
      data-ad-slot={id}
    >
      <span className="text-muted-foreground/40 text-xs">Ad Space</span>
    </div>
  );
};

export default AdSlot;