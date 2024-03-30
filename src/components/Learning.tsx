import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Wrapper from "../Layout/Wrapper";
import { Button, Stack, Typography } from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  DoneOutline,
  VolumeUp,
} from "@mui/icons-material";
import { TextToSpeech, TranslatedWords } from "../Utils/Api/Api";

import { useDispatch, useSelector } from "react-redux";
import { getClearState, getWordsFailure, getWordsRequest, getWordsSuccess } from "../Utils/Reducers/Slices";
import Loader from "../Utils/Loader";

const Learning = () => {
  const dispatch = useDispatch();
  const { words, loading, error}= useSelector((state : {root : StateType})=>state.root)

  
  const [indexCount, setIndexCount] = useState<number>(0);
  
  const params = useSearchParams()[0].get("language") as LangCode;
  console.log(params, "sdfwejfbwekfnwe");
  
  const navigate = useNavigate();
  
  const audioRef= useRef(null)
  const [audioSrc, setAudioSrc] = useState<string>('');

  const handleNext = (): void => {
    if (indexCount < words?.length - 1) {
      setIndexCount((prev) => prev + 1);
      setAudioSrc('')
    } else {
      navigate("/quiz");
    }
  };


  const handleAudio= async ()=>{

    const player: HTMLAudioElement=audioRef.current!

    if(player){
      player.play()
    }else{
      const data:string= await TextToSpeech(words[indexCount].word, params)
      setAudioSrc(data)

      
      // TextToSpeech(words[indexCount].word, params).then(res=>setAudioSrc(res))
    }

    console.log(audioSrc ,"Dsdsabdjabdsjkdbsjdb")

  }

  useEffect(() => {
    dispatch(getWordsRequest());
    TranslatedWords(params)
      .then((finalResult) => {
        console.log(finalResult, "finalResult");
        dispatch(getWordsSuccess(finalResult));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getWordsFailure(err))
      });


      if(error){
        alert(error)
        dispatch(getClearState())
      }
  }, []);


  if(loading) return <Loader  />

  return (
    <Wrapper>
      <Button
        onClick={() => {
          indexCount === 0 ? navigate("/") : setIndexCount((prev) => prev - 1);
        }}
      >
        <ArrowBack />
      </Button>
      <Typography margin={"1rem"}>Learning Made Easy</Typography>
      <Stack direction={"row"} spacing={"1rem"} margin={"2rem"}>
        <Typography>{`${indexCount + 1}`} - </Typography>
        <Typography>{words[indexCount]?.word} :</Typography>
        <Typography color={"blue"}>{words[indexCount]?.meaning}</Typography>
        {
          params !== 'ur' &&
          <VolumeUp onClick={handleAudio} style={{cursor: 'pointer'}} />
        }
        {audioSrc && <audio src={audioSrc} ref={audioRef} autoPlay></audio>}

      </Stack>
      <Button variant="contained" fullWidth onClick={handleNext} >
        {indexCount === words?.length - 1 ? <DoneOutline /> : <ArrowForward />}
      </Button>
    </Wrapper>
  );
};

export default Learning;
