import TeamProfile from "./TeamProfile";
import { mentors } from "../_data/mentors";
import { primaryOrganisers, secondaryOrganisers } from "../_data/organisers";

const TeamProfileGrid = () => {
  return (
    <div className="container" id="team">
      <fieldset
        className="relative mb-5 overflow-hidden rounded-lg border border-dashed border-gray-300 bg-black/40 px-4 py-8 bg-repeat"
        style={{ backgroundImage: "url(/2026/team/gear-pattern.svg)" }}
      >
        <legend className="ml-4 -mb-4 px-2 text-left text-sm text-gray-300">
          Main Organisers
        </legend>
        <div className="mb-4 flex w-full flex-wrap justify-center gap-4">
          {primaryOrganisers.map((member) => (
            <div
              key={member.id}
              className="w-full md:w-[calc(33.333%-0.6667rem)]"
            >
              <TeamProfile member={member} size="l" />
            </div>
          ))}
        </div>
        <div className="mt-5 flex w-full flex-wrap justify-center gap-4">
          {secondaryOrganisers.map((member) => (
            <div
              key={member.id}
              className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.6667rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <TeamProfile member={member} />
            </div>
          ))}
        </div>
      </fieldset>
      <h3 className="mb-4 text-left">Mentors</h3>
      <div className="mt-5 flex w-full flex-wrap justify-center gap-4">
        {mentors.map((member) => (
          <div
            key={member.id}
            className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.6667rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <TeamProfile member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamProfileGrid;
