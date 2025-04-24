
import React from "react";
import { Heart } from "lucide-react";

const TeamBanner: React.FC = () => {
  return (
    <div className="w-full py-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
      <p className="text-sm md:text-base text-muted-foreground text-center flex items-center justify-center gap-2">
        Created with <Heart size={16} className="text-primary animate-pulse" /> by
        <span className="font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Shreekant Pukale, Parmeshwar Chauhan, Tanmay Bhanushali, Aditya Shinde
        </span>
      </p>
    </div>
  );
};

export default TeamBanner;
