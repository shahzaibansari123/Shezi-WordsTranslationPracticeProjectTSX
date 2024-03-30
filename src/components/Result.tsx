import {
  Button,
  // List,
  // ListItem,
  // Stack,
  Typography,
  Box,
} from "@mui/material";
import Wrapper from "../Layout/Wrapper";
import { Refresh } from "@mui/icons-material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClearState } from "../Utils/Reducers/Slices";
import { matchCountResult } from "../Utils/Api/Api";



const Result = () => {

    const navigate= useNavigate()
    const dispatch = useDispatch()

    
  const { words , result} = useSelector((state: { root: StateType }) => state.root);



  const correctAnsQty: number = matchCountResult(result, words.map((item)=>item.meaning));
  const percentage: number = (correctAnsQty / words.length) * 100;
  
  
  const handleReset=(): void=> {
    navigate('/')
    dispatch(getClearState())

  }
  return (
    <Wrapper>
      <Box padding={'1rem'}>
        <Typography variant="h4" fontWeight={"bold"} marginTop={"2rem"}>
          Result
        </Typography>
        <Typography>
          You have {correctAnsQty} correct Answers from {words?.length}
        </Typography>


        <TableContainer component={Paper} sx={{marginTop: "1rem", maxHeight: 240 }}>
          <Table stickyHeader sx={{ minWidth: "100%"}}>
            <TableHead >
              <TableRow >
                <TableCell align="left" sx={{color: 'black ', fontWeight: 'bold'}}>Correct Answers</TableCell>
                <TableCell align="right" sx={{color: 'black ', fontWeight: 'bold'}}>Your Answers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((word: any, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{word.meaning}</TableCell>
                  <TableCell align="right">{result[index]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography margin={"2rem 0"} textAlign={"center"}>
          Percentage {words.length > 0 ? percentage.toFixed(2) : '0%'}
        </Typography>
        <Typography
          margin={"2rem 0"}
          variant="h5"
          textAlign={"center"}
          color={percentage > 50 ? "green" : "red"}
        >
          {words.length > 0  ? (percentage > 50 ? "PASS" : "FAIL") : "No Result" }
        </Typography>
        <Button variant="contained" fullWidth onClick={handleReset}>
          <Refresh />
        </Button>
      </Box>
    </Wrapper>
  );
};

export default Result;
