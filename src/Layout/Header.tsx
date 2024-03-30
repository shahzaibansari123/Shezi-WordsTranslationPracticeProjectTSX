import { AppBar, Toolbar, Typography } from "@mui/material";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <AppBar position="static">
        <Toolbar>
          <Typography mr={"auto"}>LANGUAGES</Typography>
          <Link style={{ textDecoration: "none", color: "#ffff" }} to={"/"}>
            Home
          </Link>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default Header;
