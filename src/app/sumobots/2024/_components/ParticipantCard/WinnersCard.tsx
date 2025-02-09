import Image from "next/image";

export default function WinnersCard({
  title,
  color,
}: {
  title: string;
  color: number;
}) {
  const medal = ["🥇", "🥈", "🥉", ""];
  return (
    <div className="col-span-12 flex flex-col justify-center gap-8 md:col-span-6 xl:col-span-4">
      <div className="h-80">
        <Image
          width={470}
          height={320}
          className="object-cover"
          src={`/sumobots/2024/images/participants/fullsize/winner_${title}.png`}
          blurDataURL={`/sumobots/2024/images/participants/blur/winner_${title}.png`}
          placeholder="blur"
          alt={title}
        ></Image>
      </div>
      <p className="font-display text-center text-3xl">
        {medal[color]}
        {title}
      </p>
    </div>
  );
}
