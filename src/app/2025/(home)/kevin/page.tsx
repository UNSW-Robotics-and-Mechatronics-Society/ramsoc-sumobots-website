import Image from "next/image";

export default function FunFactsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sumobot Fun Facts</h1>
      <ul className="mt-4 list-inside list-disc">
        <li>Sumobots are awesome!</li>
        <li>Our robots are powered by Arduino and C++ firmware.</li>
      </ul>
      <p>My name is Kevin Sus</p>
      <Image
        src={
          "https://preview.redd.it/so-then-you-make-a-meme-about-it-v0-o4idh7hhj2id1.jpeg?width=640&crop=smart&auto=webp&s=f6911f26a2e65fb1d7e23482d96f746bf6026a42"
        }
        width={20}
        height={20}
        alt="Meme"
      />
    </main>
  );
}
