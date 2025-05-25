"use client";

export const Prize = () => {

  return (
    <div 
      id="Prizes"
      className="relative flex min-h-screen flex-col items-center justify-center gap-4 pt-15"
    >
      <h1 className="pb-16">Prizes for winners</h1>
      <h2>Standard Stream</h2>
      <div 
        className=" border-3 flex h-[40vh] max-h-[500] min-h-[20rem] items-center gap-17 justify-center bg-white/30 p-10 pt-10 rounded-[100px]"
      >
        <div className="relative w-50 h-50 bg-[#A2A2A2] rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
          <div className="absolute right-2 top-2 w-50 h-50 bg-[#D9D9D9] rounded-full "></div>
          <div className="absolute right-6 top-6 w-42 h-42 bg-[radial-gradient(at_30%_40%,white_0%,#CD7F32_60%)] rounded-full "></div>
          <span className="absolute right-15 top-21 text-[40px] text-black font-bold">$200</span>
        </div>
        <div className="relative w-65 h-65 bg-[#A2A2A2] rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
          <div className="absolute right-2 top-2 w-65 h-65 bg-[#D9D9D9] rounded-full "></div>
          <div className="absolute right-6 top-6 w-57 h-57 bg-[radial-gradient(at_30%_40%,white_0%,#FFD700_60%)] rounded-full "></div>
          <span className="absolute right-15 top-25 text-[60px] text-black font-bold">$500</span>
        </div>
        <div className="relative w-50 h-50 bg-[#A2A2A2] rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
          <div className="absolute right-2 top-2 w-50 h-50 bg-[#D9D9D9] rounded-full "></div>
          <div className="absolute right-6 top-6 w-42 h-42 bg-[radial-gradient(at_30%_40%,white_0%,#A5A5A5_60%)] rounded-full "></div>
          <span className="absolute right-15 top-21 text-[40px] text-black font-bold">$300</span>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <h2>Open Stream</h2>
      <div 
        className=" border-3 flex h-[40vh] max-h-[500] min-h-[20rem] items-center gap-17 justify-center bg-black/30 p-10 pt-10 rounded-[100px]"
      >
        <div className="relative w-50 h-50 bg-[#A2A2A2] rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
          <div className="absolute right-2 top-2 w-50 h-50 bg-[#D9D9D9] rounded-full "></div>
          <div className="absolute right-6 top-6 w-42 h-42 bg-[radial-gradient(at_30%_40%,white_0%,#CD7F32_60%)] rounded-full "></div>
          <span className="absolute right-15 top-21 text-[40px] text-black font-bold">$200</span>
        </div>
        <div className="relative w-65 h-65 bg-[#A2A2A2] rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
          <div className="absolute right-2 top-2 w-65 h-65 bg-[#D9D9D9] rounded-full "></div>
          <div className="absolute right-6 top-6 w-57 h-57 bg-[radial-gradient(at_30%_40%,white_0%,#FFD700_60%)] rounded-full "></div>
          <span className="absolute right-15 top-25 text-[60px] text-black font-bold">$500</span>
        </div>
        <div className="relative w-50 h-50 bg-[#A2A2A2] rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
          <div className="absolute right-2 top-2 w-50 h-50 bg-[#D9D9D9] rounded-full "></div>
          <div className="absolute right-6 top-6 w-42 h-42 bg-[radial-gradient(at_30%_40%,white_0%,#A5A5A5_60%)] rounded-full "></div>
          <span className="absolute right-15 top-21 text-[40px] text-black font-bold">$300</span>
        </div>
      </div>
    </div>
  );
};
