
import React from "react";

const TeamBanner: React.FC = () => {
  return (
    <div className="w-full py-4 bg-gradient-purple text-white text-center">
      <p className="text-sm md:text-base">
        Created with ❤️ by{" "}
        <span className="font-semibold">
          Shreekant Pukale, Parmeshwar Chauhan, Tanmay Bhanushali, Aditya Shinde
        </span>
      </p>
    </div>
  );
};

export default TeamBanner;
