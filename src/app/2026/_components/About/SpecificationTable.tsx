import { JSX } from "react";
import { LuDollarSign, LuRuler, LuWeight, LuWrench } from "react-icons/lu";

const streamSpecs = {
  standard: {
    "Max Dimension": "200mm x 200mm",
    "Max Weight": "1kg",
    Budget:
      "N/A (supplied kit and preapproved extras list only - see rulebook)",
    Customization: "Limited to preapproved components",
  },
  open: {
    "Max Dimension": "250mm x 250mm",
    "Max Weight": "1.5kg",
    Budget: "$200 (without base kit), $100 (with base kit)",
    Customization: "Full drivetrain modifications & additional components",
  },
};

const specIcons: Record<string, JSX.Element> = {
  "Max Dimension": <LuRuler className="hidden h-5 w-5 text-white md:block" />,
  "Max Weight": <LuWeight className="hidden h-5 w-5 text-white md:block" />,
  Budget: <LuDollarSign className="hidden h-5 w-5 text-white md:block" />,
  Customization: <LuWrench className="hidden h-5 w-5 text-white md:block" />,
};

type SpecificationProps = {
  streamType: "standard" | "open";
};

type SpecKey = keyof (typeof streamSpecs)["standard"];

const SpecificationRow = ({
  label,
  value,
}: {
  label: SpecKey;
  value: string;
}) => (
  <tr>
    <td className="border border-gray-500 px-4 py-2 text-white">
      <div className="flex flex-row items-center gap-2">
        {specIcons[label]}
        <b>{label}</b>
      </div>
    </td>
    <td className="border border-gray-500 px-4 py-2">{value}</td>
  </tr>
);

const StreamSpecificationTable = ({ streamType }: SpecificationProps) => {
  const specs = streamSpecs[streamType];

  return (
    <>
      <h3 className="mb-2 text-center font-semibold">Robot Specifications</h3>
      <div className="flex w-full justify-center overflow-x-auto">
        <table className="w-[80%] table-fixed border-collapse border border-gray-500 text-left">
          <thead className="bg-gray-800/50 text-white">
            <tr>
              <th className="w-1/2 border border-gray-500 px-4 py-2">
                Requirement
              </th>
              <th className="w-1/2 border border-gray-500 px-4 py-2">
                Allowed Specification
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(specs).map(([key, value]) => (
              <SpecificationRow
                key={key}
                label={key as SpecKey}
                value={value}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StreamSpecificationTable;
