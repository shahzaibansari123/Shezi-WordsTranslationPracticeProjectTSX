import { Skeleton } from "@mui/material";
import Wrapper from "../Layout/Wrapper";

const Loader = () => {
  return (
    <Wrapper>
      <Skeleton sx={{ marginTop: "2rem" }} height={50} />
      <Skeleton height={80} />
      <Skeleton height={80} />
    </Wrapper>
  );
};

export default Loader;
