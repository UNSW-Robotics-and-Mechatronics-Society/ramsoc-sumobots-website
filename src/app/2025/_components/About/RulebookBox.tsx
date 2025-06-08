import { SUMOBOTS_RULEBOOK_URL } from "@/app/constants";
import Link from "next/link";
import { LuFileText } from "react-icons/lu";

const RulebookBox = () => {
  return (
    <div className="mt-8 flex w-fit flex-col items-center justify-center self-center rounded-md border border-gray-500 bg-gray-950 p-4">
      <p className="text-gray-00 mb-2 text-center text-sm">
        For more detailed competition rules and guidelines, refer to the
        official rulebook.
      </p>
      <Link
        href={SUMOBOTS_RULEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="button flex"
      >
        <LuFileText className="size-5" />
        Official Rulebook
      </Link>
    </div>
  );
};

export default RulebookBox;
