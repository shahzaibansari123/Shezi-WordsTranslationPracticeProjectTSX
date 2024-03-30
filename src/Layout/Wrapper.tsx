import { Container } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return <Container maxWidth="xs" >{children}</Container>;
};

export default Wrapper;
