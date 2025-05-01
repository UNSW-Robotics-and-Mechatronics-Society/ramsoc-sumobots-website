import Image from "next/image";

export default function FunFactsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sumobot Fun Facts</h1>
      <ul className="mt-4 list-inside list-disc">
        <li>Sumobots are awesome!</li>
        <li>Our robots are powered by Arduino and C++ firmware.</li>
      </ul>
      <p>My name is Alan</p>
      <Image src="/2025/image.png" alt="Alan" width={50} height={50} />
    </main>
  );
}
