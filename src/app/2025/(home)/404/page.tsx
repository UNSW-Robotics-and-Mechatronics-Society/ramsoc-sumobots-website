'use client';
import BackHomeButton from '../_components/HomeButton';
import Image from 'next/image';
import Navbar from '../_components/Nav/Navbar';
import { SparkBurst } from '../_components/Spark';

export default function Custom404() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Navbar/>
        <div className="inline-block align-middle h-full w-full" style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="relative aspect-4/1 rounded-lg mx-auto mb-4">
            <div className="">
              <Image
                className="relative h-full object-contain"
                src="/2025/404/4 4.svg"
                alt="404 Background"
                layout="fill"
              />
            </div>
            <SparkBurst
              count={22}
              origin={{ left: "58%", top: "22%" }}
              minAngle={-30}
              maxAngle={30}
              baseAngle={320}
              seed={1} // Added seed
            />
            <SparkBurst
              count={8}
              origin={{ left: "38%", top: "30%" }}
              minAngle={-40}
              maxAngle={40}
              baseAngle={210}
              seed={2} // Added seed
            />
            <SparkBurst
              count={4}
              origin={{ left: "45%", top: "85%" }}
              minAngle={-30}
              maxAngle={30}
              baseAngle={125}
              seed={3} // Added seed
            />
            
            <div className="text-white rounded-full mx-auto mb-4 relative aspect-[1/1] h-full">
              <Image
                className="animate-[wiggle_2s_ease-in-out_infinite] z-1"
                src="/2025/404/Gear.svg"
                alt="404 Gear"
                layout="fill"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative w-5/8 h-5/8"
                  style={{ transform: 'translate(-15%, 20%)' }} // Move left 15%, down 20% of its own size
                >
                  <Image
                    className="relative object-contain z-0"
                    src="/2025/404/RamboBroken.svg"
                    alt="404 Background"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
            </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl pt-10">
            Looks like you're a little lost?
          </p>
          <div className='pt-4'><p className="text-base sm:text-lg md:text-xl lg:text-2xl inline-flex items-center gap-2">
            Let's take you <BackHomeButton />
          </p></div>
          </div>
        </div>

      <style jsx global>{`
        @keyframes wiggle {
          0% { transform: rotate(-10deg); }
          20% { transform: rotate(12deg); }
          40% { transform: rotate(-8deg); }
          60% { transform: rotate(10deg); }
          80% { transform: rotate(-6deg); }
          100% { transform: rotate(-10deg); }
        }
        ${keyframes}
      `}</style>
    </>
  );
}

const animName = 'spark-animation';
const tx = 85;
const ty = 40;
const scale = 1;

const keyframes = `
  @keyframes ${animName} {
    0% {
      opacity: 1;
      background: #fefce8;
      transform: rotate(var(--spark-angle)) translate(0, 0) scale(0.3, 0.3);
    }
    100% {
      background: #ea580c;
      opacity: 0;
      transform: rotate(var(--spark-angle)) translate(${tx}px, ${ty}px) scale(${scale}, ${scale});
    }
  }
`;
