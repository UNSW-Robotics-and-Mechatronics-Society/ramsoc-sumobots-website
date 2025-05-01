import Image from "next/image";
export default function FunFactsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sumobot Fun Facts</h1>
      <ul className="mt-4 list-disc list-inside">
        <li>Sumobots are awesome!</li>
        <li>Our robots are powered by Arduino and C++ firmware.</li>
      </ul>
      <p>My name is Dash</p>
      <Image alt="meme" src="/2025/images/resources/RamImg.jpeg" width={2000} height={2000} className="max-w-96"></Image>
    </main>
  );
}