import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Wrapper from "../Layout/Wrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForward, DoneOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getResultsSuccess } from "../Utils/Reducers/Slices";

const Quiz = () => {
  const [results, setResults] = useState<string[]>([]);
  const [quesCount, setQuesCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");

  const { words } = useSelector((state: { root: StateType }) => state.root);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleNext = (): void => {
    // if (quesCount + 1  < words.length) {
      setQuesCount((prev) => prev + 1);
      setResults((prev) => [...prev, ans]);
      setAns("");
    // } else {
    //   navigate("/result");
    // }
  };

  console.log(ans, "dwdwejfbwejkfbfjbe" , words.length - 1);


  useEffect(()=>{
    if (quesCount + 1  > words.length) navigate('/result') 

    dispatch(getResultsSuccess(results))
    

  },[results])

  return (
    <Wrapper>
      <Typography variant="h6" p={"2rem"} textAlign={"center"}>
        Quiz
      </Typography>
      <Typography variant="h6" textAlign={"left"}>
        {`${quesCount + 1} : ${words[quesCount]?.word}`}
      </Typography>

      <FormControl sx={{ mt: "1rem", mb: "2rem" }}>
        <FormLabel>Meaning</FormLabel>
        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
          {words[quesCount]?.options?.map((item) => (
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={item}
              key={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        onClick={handleNext}
        disabled={ans === ""}
      >
        {quesCount === words?.length - 1 && ans !== "" ? (
          <DoneOutline />
        ) : (
          <ArrowForward />
        )}
      </Button>
    </Wrapper>
  );
};

export default Quiz;
