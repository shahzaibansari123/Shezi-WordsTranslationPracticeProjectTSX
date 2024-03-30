import { Button, Stack, Typography } from "@mui/material";
import Wrapper from "../Layout/Wrapper";
import { useNavigate } from "react-router-dom";

const Languages = [
  { name: "Urdu", code: "ur" },
  { name: "Japanese", code: "ja" },
  { name: "hindi", code: "hi" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleLanguageClick = (Languages: string): void => {
    navigate(`/learning?language=${Languages}`);
  };
  return (
    // <div style={{background: 'green' , height: '100vh'}}>
      <Wrapper >
        <Typography variant="h6" p={"2rem"} textAlign={"center"}>
          Welcome, Start Learning Today.
        </Typography>

        <Stack direction={"column"}  justifyContent={'center'} alignItems={'center'} spacing={"0.5rem"} >
          {Languages.map((item) => (
            <Button
              style={{ width: "80%" }}
              variant="contained"
              key={item.code}
              onClick={() => handleLanguageClick(item.code)}
            >
              {item.name}
            </Button>
          ))}
        </Stack>

        <Typography variant="h6" p={"2rem"} textAlign={"center"}>
          Please Select Any one to Proceed...
        </Typography>
      </Wrapper> 
    // </div>
  );
};

export default Home;
