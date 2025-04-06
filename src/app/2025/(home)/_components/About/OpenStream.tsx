import {
  Settings,
  Globe,
  Lightbulb,
  Trophy,
  Ruler,
  Weight,
  DollarSign,
  Wrench,
  FileText,
} from "lucide-react";

const OpenStream = () => {
  return (
    <div className="mt-8 flex flex-col justify-center">
      {/* Features Section */}
      <div className="grid w-fit grid-cols-1 grid-rows-2 gap-6 md:grid-cols-2">
        <div className="flex flex-row items-center">
          <div className="flex w-20 flex-shrink-0 items-center justify-center">
            <Settings className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="mb-0 font-semibold">Customization Freedom</h3>
            <p>
              Modify your bot with additional components and drivetrain
              upgrades.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex w-20 flex-shrink-0 items-center justify-center">
            <Globe className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="mb-0 font-semibold">Inter-University Competition</h3>
            <p>Face off against top students from other universities.</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex w-20 flex-shrink-0 items-center justify-center">
            <Lightbulb className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="mb-0 font-semibold">Innovation & Engineering</h3>
            <p>Experiment with advanced mechanics and adaptive strategies.</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex w-20 flex-shrink-0 items-center justify-center">
            <Trophy className="h-10 w-10 text-rose-600" />
          </div>
          <div>
            <h3 className="mb-0 font-semibold">High-Level Competition</h3>
            <p>
              Compete against the best in a fast-paced and unpredictable
              battlefield.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-1 my-10 w-[90%] self-center border-gray-500" />

      {/* Specifications Section */}
      <h3 className="mb-4 text-center font-semibold">Specifications</h3>
      <div className="flex w-full justify-center overflow-x-auto">
        <table className="w-[80%] table-fixed border-collapse border border-gray-500 text-left">
          <thead className="bg-gray-800/50 text-white">
            <tr>
              <th className="w-30 border border-gray-500 px-4 py-2">
                Attribute
              </th>
              <th className="border border-gray-500 px-4 py-2">
                Specification
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <Ruler className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Max Dimension</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                250mm x 250mm
              </td>
            </tr>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <Weight className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Max Weight</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                1.5kg
              </td>
            </tr>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <DollarSign className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Budget</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                $200 (without base kit), $100 (with base kit)
              </td>
            </tr>
            <tr>
              <td className="table-cell items-center gap-2 border border-gray-500 px-4 py-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <Wrench className="hidden h-5 w-5 text-white md:block" />
                  <p>
                    <b>Customization</b>
                  </p>
                </div>
              </td>
              <td className="table-cell border border-gray-500 px-4 py-2">
                Full drivetrain modifications & additional components
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
          href="https://docs.google.com/document/d/16KqDf9lArQZWStWT5tjy72ISZoLHtO71SLx5pW6Jmgw/edit?tab=t.0"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          <FileText className="h-5 w-5" />
          <span>Official Rulebook</span>
        </a>
      </div>
    </div>
  );
};

export default OpenStream;
