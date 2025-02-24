import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export default function EOIFormEnd() {
  return (
    <>
      <h1 className="mb-3 text-center text-3xl font-semibold">Thank you!</h1>
      <p className="mb-6 text-center text-base text-gray-400">
        We&apos;ve received your EOI!
      </p>
      <p className="text-center text-base text-gray-400">
        Our team will reach out when applications open.
        <br />
        In the meantime, follow us and check out past events!
      </p>
      <div className="mt-6 flex flex-col justify-center gap-4">
        <div className="flex h-12 justify-center gap-8">
          <Link
            className="h-full transform transition-transform hover:scale-110"
            href="https://www.instagram.com/ramsocunsw"
            target="_blank"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="sm" />
          </Link>
          <Link
            className="h-full transform transition-transform hover:scale-110"
            href="https://www.facebook.com/RAMSOCUNSW"
            target="_blank"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} size="sm" />
          </Link>
          <Link
            className="h-full transform transition-transform hover:scale-110"
            href="https://discord.com/invite/4dWMWAjWm9"
            target="_blank"
            aria-label="Discord"
          >
            <FontAwesomeIcon icon={faDiscord} size="sm" />
          </Link>
        </div>
        <Link
          className="button self-center text-base"
          href="/sumobots/2024"
          target="_blank"
          aria-label="Discord"
        >
          Check Out SUMOBOTS 2024
        </Link>
      </div>
    </>
  );
}
