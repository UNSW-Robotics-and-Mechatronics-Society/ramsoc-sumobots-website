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
        <div className="mb-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {primaryOrganisers.map((member) => (
            <TeamProfile key={member.id} member={member} size="l" />
          ))}
        </div>
        <div className="mt-5 grid w-full grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
          {secondaryOrganisers.map((member) => (
            <TeamProfile key={member.id} member={member} />
          ))}
        </div>
      </fieldset>
      <h3 className="mb-4 text-left">Mentors</h3>
      <div className="mt-5 grid w-full grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
        {mentors.map((member) => (
          <TeamProfile key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamProfileGrid;
