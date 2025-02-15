export const Banner = () => {
    return (
        <div id="banner" className="container flex h-[100vh] flex-col items-center justify-center gap-8">
        <h1 className="font-display col-span-full flex w-full flex-col items-center leading-none">
          <span className="text-[8vw] md:text-[6.5vw] xl:text-[4.5vw]">
            RAMSOC UNSW PRESENTS
          </span>
          <span className="text-[12.57vw] text-blue-400 md:text-[10.3vw] xl:text-[7.2vw]">
            SUMOBOTS 2025
          </span>
        </h1>
      </div>
    );
}