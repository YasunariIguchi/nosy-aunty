import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
export default function ConsultButton({ inputTextRef, typeStart, handleSpinner }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchResult = () => {
    handleSpinner(true);
    setIsDisabled(true);
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
          setIsDisabled(false);
          typeStart(res.data.advice);
      });
    } catch (e) {
      handleSpinner(false);
      setIsDisabled(false);
      typeStart("Error occurred.");
      return e;
    }
  }

  return (
    <Button fullWidth variant="contained" onClick={fetchResult} disabled={isDisabled} >
      おばちゃんに見せてアドバイスをもらう
    </Button>
  );
}