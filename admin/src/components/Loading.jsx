// components/Loading.jsx
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <Spinner color="green" />
    </div>
  );
};

export default Loading;
