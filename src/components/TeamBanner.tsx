
import React from "react";

const TeamBanner: React.FC = () => {
  return (
    <div className="w-full py-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
      <p className="text-sm md:text-base text-gray-700">
        Created with ❤️ by{" "}
        <span className="font-medium text-quiz-purple">
          Shreekant Pukale, Parmeshwar Chauhan, Tanmay Bhanushali, Aditya Shinde
        </span>
      </p>
    </div>
  );
};

export default TeamBanner;
