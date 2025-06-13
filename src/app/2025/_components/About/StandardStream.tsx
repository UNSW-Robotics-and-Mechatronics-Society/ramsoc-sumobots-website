import Divider from "../Divider";
import StreamSpecificationTable from "./SpecificationTable";
import StreamFeatures from "./StreamFeatures";

const StandardStream = () => {
  return (
    <div className="flex flex-col justify-center">
      <StreamFeatures streamType="standard" />
      <Divider />
      <StreamSpecificationTable streamType="standard" />
    </div>
  );
};

export default StandardStream;
