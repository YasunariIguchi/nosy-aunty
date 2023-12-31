import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import PasteButton from '../components/PasteButton';
import MainTextField from '../components/MainTextFiled';
import ConsultButton from '../components/ConsultButton';
import ClearButton from '../components/ClearButton';
import axios from 'axios';
import { useTyping, TypeWriterText } from '../components/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Top() {
  const [ spinnerVisible , setSpinnerVisible ] = useState(false);
  const { typeStart, ...params } = useTyping();
  const inputText = useRef(null);

  const handleSpinner = (visibility) => {
    setSpinnerVisible(visibility);
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + '/sanctum/csrf-cookie', { withCredentials: true })
  }, []);

  return (
    <>
      <style jsx="true">{`
        .pre-text {
          margin-bottom: 3rem;
        }
        .button-area {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .main-text-field {
          margin-bottom: 3rem;
        }
        .consult-button {
          margin-bottom: 3rem;
        }
        .result-wrapper {
          margin-bottom: 3rem;
        }
        .result-text {
          border: 1px solid #bdbdbd;
          border-radius: 20px;
          padding: 2rem;
          position: relative;
        }
      `}</style>
      <CssBaseline />
      <Container maxWidth="md">
        <div className="pre-text">
          <h1>おせっかいおばちゃん</h1>
          <p>あんたまたマッチングアプリで振られたんやて！？ちょっとスマホでどんなやり取りしてんの！？見せてみーや！</p>
        </div>

        <div className="button-area">
          <ClearButton inputTextRef={inputText}/>
          <PasteButton inputTextRef={inputText}/>
        </div>

        <div className="main-text-field">
          <MainTextField ref={inputText}/>
        </div>

        <div className="consult-button">
          <ConsultButton inputTextRef={inputText} typeStart={typeStart} handleSpinner={handleSpinner}/>
        </div>


        <div className="result-wrapper">
          <h2>おせっかいおばちゃんのありがたいお言葉</h2>
          <div className="result-text">
            <LoadingSpinner visibility={spinnerVisible} />
            <div className="result-wrap">
              <TypeWriterText {...params} />
            </div>
          </div>
        </div>

      </Container>
    </>
  );
}