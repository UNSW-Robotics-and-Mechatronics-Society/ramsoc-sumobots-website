import { SUMOBOTS_RULEBOOK_URL } from "@/app/constants";
import Link from "next/link";
import { LuFileText } from "react-icons/lu";

const RulebookBox = () => {
  return (
    <div className="mt-8 flex w-fit flex-col items-center justify-center self-center rounded-md border border-gray-500 bg-gray-950 p-4">
      <p className="mb-2 text-center text-sm">
        For more detailed competition rules and guidelines, refer to the
        official rulebook.
      </p>
      <div className="button flex cursor-default opacity-50">
        <LuFileText className="size-5" />
          Coming Soon.
      </div>
    </div>
  );
};

export default RulebookBox;
