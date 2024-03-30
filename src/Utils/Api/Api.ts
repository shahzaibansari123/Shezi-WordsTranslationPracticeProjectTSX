import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";


const TWRAkey=import.meta.env.VITE_TRANSLATEWORDRAPIDAPIKEY;
const TTSRAkey=import.meta.env.VITE_TEXTTOSPEECHRAPIDAPIKEY;
const TTSkey=import.meta.env.VITE_TEXTTOSPEECHAPIKEY;

export const TranslatedWords = async (
  params: LangCode
): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({ Text: i }));

    const generateMCQS = (
      meaning: {
        Text: string;
      }[],
      index: number
    ): string[] => {
      const correctAns: string = meaning[index]?.Text;

      const optionalAns: string[] = _.sampleSize(
        meaning.filter((i) => i.Text !== correctAns),
        3
      )?.map((i) => i.Text);

      console.log(optionalAns, "fwefbewjfbeffj");

      const finalSortedOptions: string[] = _.shuffle([
        ...optionalAns,
        correctAns,
      ]);

      return finalSortedOptions;
    };
    const { data } = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
          TWRAkey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    console.log(data[0].translations[0].text, "dwedbwejfweyjdfwehfweedf");

    const recievedDataFormat: FetchDataType[] = data;

    console.log(recievedDataFormat, "wefnejofergergj");

    const finalResult: WordType[] = recievedDataFormat?.map((item, index) => {
      const options: string[] = generateMCQS(words, index);
      return {
        word: item.translations[0].text,
        meaning: words[index].Text,
        options,
      };
    });

    console.log(finalResult, "Dednwednweejnfjffjnfnfwejdnqiksdn");

    return finalResult;
  } catch (error) {
    console.log(error, "dwfbwejfwefbw");
    throw new Error("Some thing went wrong");
  }
};

export const matchCountResult = (arr1: string[], arr2: string[]): number => {
  let totalCorrectAnswers = 0;
  if (arr1.length !== arr2.length) throw new Error("Array are not equal");

  for (let i: number = 0; i < arr1.length; i++)
    if (arr1[i] == arr2[i]) {
      totalCorrectAnswers++;
    }

  return totalCorrectAnswers;
};

export const TextToSpeech = async (text: string, lang: LangCode): Promise<string> => {
  const encodedParams = new URLSearchParams({
    src: text,
    // hl: lang,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    // v: 'Zoe',
    b64: 'true',
  });


  console.log(text,"dasbdajhsdasjhdasjhd", lang)

  if(lang === 'ja'){
    encodedParams.set('hl','ja-jp')
    console.log("shahzaib")
  }else if(lang === "es"){
    encodedParams.set('hl','es-es')


  }else if(lang === "fr"){
    encodedParams.set('hl','fr-fr')


  }else{
    encodedParams.set('hl','hi-in')

  }

  try {
    const {data}:{data:string} = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams,
      {
        params: {
          key: TTSkey,
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
          TTSRAkey,
          "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
        },
      }
    );

    return data   

  } catch (error) {
    console.log(error, "dwfbwejfwefbw");
    throw new Error("Some thing went wrong");
  }

};


