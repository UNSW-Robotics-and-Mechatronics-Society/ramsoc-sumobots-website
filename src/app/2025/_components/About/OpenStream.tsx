import Divider from "../Divider";
import StreamSpecificationTable from "./SpecificationTable";
import StreamFeatures from "./StreamFeatures";

const OpenStream = () => {
  return (
    <div className="flex flex-col justify-center">
      <StreamFeatures streamType="open" />
      <Divider />
      <StreamSpecificationTable streamType="open" />
    </div>
  );
};

export default OpenStream;
