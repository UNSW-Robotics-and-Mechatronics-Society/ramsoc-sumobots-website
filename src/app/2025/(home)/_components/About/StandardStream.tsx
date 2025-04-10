import { RULEBOOK_URL } from "@/app/constants";
import {
  LuGraduationCap,
  LuScale,
  LuBuilding,
  LuUserCheck,
  LuRuler,
  LuWeight,
  LuDollarSign,
  LuWrench,
  LuFileText,
} from "react-icons/lu";

const StandardStream = () => {
  return (
    <div className="mt-8 flex flex-col justify-center">
      {/* Features Section */}
      <div className="grid w-fit grid-cols-1 grid-rows-2 gap-6 md:grid-cols-2">
        <div className="flex flex-row items-center">
          <div className="flex w-20 shrink-0 items-center justify-center">
            <LuBuilding className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold">UNSW Exclusive</h3>
            <p>This competition is exclusive to UNSW students.</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex w-20 shrink-0 items-center justify-center">
            <LuGraduationCap className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold">Beginner Friendly</h3>
            <p>This stream is designed for those who are new to the field.</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex w-20 shrink-0 items-center justify-center">
            <LuScale className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold">Equal Opportunity</h3>
            <p>All competitors use the same core components.</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex w-20 shrink-0 items-center justify-center">
            <LuUserCheck className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold">Guidance and Support</h3>
            <p>
              Each team will be assigned a <b>mentor</b> to guide them
              throughout the competition.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 w-[90%] self-center border-t-1 border-gray-500" />

      {/* Specifications Section */}
      <h3 className="mb-4 text-center font-semibold">Specifications</h3>
      <div className="flex w-full justify-center overflow-x-auto">
        <table className="w-[80%] table-fixed border-collapse border border-gray-500 text-left">
          <thead className="bg-gray-800/50 text-white">
            <tr>
              <th className="w-1/2 border border-gray-500 px-4 py-2">
                Attribute
              </th>
              <th className="w-1/2 border border-gray-500 px-4 py-2">
                Specification
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <LuRuler className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Max Dimension</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                200mm x 200mm
              </td>
            </tr>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <LuWeight className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Max Weight</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                1kg
              </td>
            </tr>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <LuDollarSign className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Budget</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                $200 (supplied kit and preapproved extras list only)
              </td>
            </tr>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <LuWrench className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Customization</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                Limited to preapproved components
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Official Rulebook Link */}
      <div className="mt-8 flex w-fit flex-col items-center justify-center self-center rounded-md border border-gray-500 bg-gray-950 p-4">
        <p className="text-gray-00 mb-2 text-center text-sm">
          For more detailed competition rules and guidelines, refer to the
          official rulebook.
        </p>
        <a
          href={RULEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button self-center"
        >
          <LuFileText className="h-5 w-5" />
          <span>Official Rulebook</span>
        </a>
      </div>
    </div>
  );
};

export default StandardStream;
