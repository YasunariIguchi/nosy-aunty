import { Button } from "@mui/material";
import axios from "axios";
export default function ConsultButton({ inputTextRef, typeStart, handleSpinner }) {

  const fetchResult = () => {
    handleSpinner(true);
    typeStart(" ");
    const requestBody = {
      line: inputTextRef.current.value,
    };
    const requestOptions = {
      withCredentials: true,
      withXSRFToken: true,
    };
    console.log(requestBody);
    try {
      axios
        .post(process.env.REACT_APP_API + "/conversation", requestBody, requestOptions)
        .then((res) => {
          console.log(res);
          handleSpinner(false);
          typeStart(res.data.advice);
      });
    } catch (e) {
      handleSpinner(false);
      typeStart("Error occurred.");
      return e;
    }
  }

  return (
    <Button fullWidth variant="contained" onClick={fetchResult} >
      おばちゃんに見せてアドバイスをもらう
    </Button>
  );
}