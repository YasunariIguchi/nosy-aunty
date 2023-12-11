import { Button } from "@mui/material";
import axios from "axios";
export default function ConsultButton({ inputTextRef, typeStart }) {

  const fetchResult = () => {
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
        .post("http://localhost/conversation", requestBody, requestOptions)
        .then((res) => {
          console.log(res);
          typeStart(res.data.advice);
      });
    } catch (e) {
      return e;
    }
  }

  return (
    <Button fullWidth variant="contained" onClick={fetchResult} >
      おばさんに見せてアドバイスをもらう
    </Button>
  );
}