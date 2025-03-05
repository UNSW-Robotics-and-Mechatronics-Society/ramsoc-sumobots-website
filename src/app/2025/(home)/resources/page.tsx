import Image from "next/image";
import {
  InternalResourceData,
  ExternalResourceData,
  InternalVideoResourceData,
} from "@/app/2025/_data/ResourceData";
import Link from "next/link";
import { Fragment } from "react";

interface ResourceCardProps {
  title: string;
  url: string;
  image: string;
  description?: string;
}

function ResourceCard({ title, url, image, description }: ResourceCardProps) {
  return (
    <Link
      href={`${url}`}
      target="_blank"
      className="group col-span-full aspect-[3/4] bg-[#07070e] shadow-none shadow-[#23274c77] transition duration-300 hover:shadow-xl hover:shadow-[#23274c77] sm:col-span-6 lg:col-span-4 xl:col-span-3"
    >
      <div className="aspect-video w-full overflow-hidden bg-black">
        <Image
          width={400}
          height={225}
          src={`/2025${image}`}
          alt={title}
          className="transition group-hover:scale-105"
        ></Image>
      </div>
      <div className="w-full px-4">
        <h2 className="mb-2 mt-4 text-2xl text-blue-400 group-hover:underline">
          {title}
        </h2>
        <p className="text-lg">{description}</p>
      </div>
    </Link>
  );
}

export default function Resources() {
  return (
    <Fragment>
      <section className="container min-h-screen gap-y-12 py-24">
        <h1 className="font-display col-span-full text-6xl">Resources</h1>
        {InternalResourceData.map((data, i) => (
          <ResourceCard key={i} {...data}></ResourceCard>
        ))}
        <h1 className="font-display col-span-full text-6xl">Videos</h1>
        {InternalVideoResourceData.map((data, i) => (
          <ResourceCard key={i} {...data}></ResourceCard>
        ))}
        <h1 className="font-display col-span-full text-6xl">Others</h1>
        {ExternalResourceData.map((data, i) => (
          <ResourceCard key={i} {...data}></ResourceCard>
        ))}
      </section>
    </Fragment>
  );
}
