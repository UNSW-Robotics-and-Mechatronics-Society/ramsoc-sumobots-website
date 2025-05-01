import Image from "next/image";
export default function FunFactsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sumobot Fun Facts</h1>
      <ul className="mt-4 list-disc list-inside">
        <li>Sumobots are awesome!</li>
        <li>Our robots are powered by Arduino and C++ firmware.</li>
      </ul>
      <p>My name is Hanwen</p>
      <Image
        src="https://static.wikia.nocookie.net/the-rooms-ideas/images/a/ac/Tralalero_tralala.jpg/revision/latest?cb=20250328014537"
        alt="Hanwen"
        width={50}
        height={50}
      />
    </main>
  );
}