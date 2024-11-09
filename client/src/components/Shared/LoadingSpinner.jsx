import PropTypes from "prop-types";
import { BeatLoader
} from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[240px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <BeatLoader color="#35A6DE" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;
