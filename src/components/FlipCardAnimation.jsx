import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FlipCard = () => {
  return (
    <div className="w-[35rem] h-72 [perspective:1000px] group hidden lg:flex">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
          <DotLottieReact
            src="https://lottie.host/5eaae932-fb81-46ae-a970-52a9efa75674/BWBUraDGNT.lottie"
            loop
            autoplay
          />
        </div>

        {/* Back Side */}
        <div className="absolute w-fit h-full rotate-y-180 backface-hidden flex items-center justify-center">
          <DotLottieReact
            src="https://lottie.host/21e38416-e81a-48d3-9435-a06899862f4e/VFEYBECyHz.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
