import Image from "next/image";
import Link from "next/link";
import {
  internalResources,
  externalResources,
  internalVideoResources,
} from "@/app/2025/_data/resources";

interface ResourceCardProps {
  title: string;
  url: string;
  image: string;
  description?: string;
}

function ResourceCard({ title, url, image, description }: ResourceCardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      className="group flex flex-col overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-transform hover:scale-105"
    >
      {/* Image Section */}
      <div className="relative h-44 w-full md:h-48 lg:h-56">
        <Image
          src={`/2025${image}`}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-opacity group-hover:opacity-90"
        />
      </div>

      {/* Text Content */}
      <div className="p-4 text-white">
        <span className="text-lg font-semibold text-blue-400 group-hover:underline md:text-xl">
          {title}
        </span>
        {description && (
          <p className="mt-2 text-sm text-gray-300 md:text-base">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function Resources({ className }: { className?: string }) {
  return (
    <div className={`${className} px-6 py-10`} id="resources">
      <h2 className="mb-6">Resources.</h2>

      {/* Sections */}
      <div className="space-y-10">
        {/* Documents / Slides */}
        <div>
          <h3 className="mt-6 mb-4 font-semibold text-blue-300">
            Documents / Slides
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internalResources.map((data, i) => (
              <ResourceCard key={i} {...data} />
            ))}
          </div>
        </div>

        {/* Videos */}
        <div>
          <h3 className="mb-4 font-semibold text-blue-300">Helpful Videos</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internalVideoResources.map((data, i) => (
              <ResourceCard key={i} {...data} />
            ))}
          </div>
        </div>

        {/* Other Resources */}
        <div>
          <h3 className="mb-4 font-semibold text-blue-300">
            External Resources
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {externalResources.map((data, i) => (
              <ResourceCard key={i} {...data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
