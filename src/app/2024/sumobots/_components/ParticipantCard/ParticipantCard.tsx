import Image from "next/image";

export default function ParticipantCard({ data }: { data: { title: string } }) {
  return (
    <div className="flex w-full flex-col justify-center gap-4 overflow-hidden sm:w-64">
      <div className="aspect-square w-full overflow-hidden">
        <Image
          width={256}
          height={256}
          className="h-full w-full overflow-hidden object-cover"
          src={`/2024/sumobots/images/participants/fullsize/${data.title}.png`}
          blurDataURL={`/2024/sumobots/images/participants/blur/${data.title}.png`}
          placeholder="blur"
          alt={data.title}
        ></Image>
      </div>
      <p className="font-display text-center">{data.title}</p>
    </div>
  );
}
