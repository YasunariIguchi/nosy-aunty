import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import PasteButton from '../components/PasteButton';
import MainTextField from '../components/MainTextFiled';
import ConsultButton from '../components/ConsultButton';
import ClearButton from '../components/ClearButton';
import axios from 'axios';
import { useTyping, TypeWriterText } from '../components/TypeWriterText';

export default function Top() {
  const url = "http://localhost/api/list";
  const { typeStart, ...params } = useTyping();
  const fetchResult = () => {
    try {
      axios.get(url).then((res) => {
        let result = "";
        res.data.post.forEach(element => {
          result += element.content;
        });
        typeStart(result);
      });
      return;
    } catch (e) {
      return e;
    }
  }
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
        }
      `}</style>
      <CssBaseline />
      <Container maxWidth="md">
        <div className="pre-text">
          <h1>おせっかいおばさん</h1>
          <p>あんたまた出会い系で女に振られたんやて！？ちょっとスマホでどんなやり取りしてんの！？見せてみーや！</p>
        </div>

        <div className="button-area">
          <ClearButton />
          <PasteButton />
        </div>

        <div className="main-text-field">
          <MainTextField />
        </div>

        <div className="consult-button">
          <ConsultButton onClick={fetchResult}/>
        </div>

        <div className="result-wrapper">
          <h2>おせっかいおばさんのありがたいお言葉</h2>
          <div className="result-text">
            <TypeWriterText {...params} />
          </div>
        </div>

      </Container>
    </>
  );
}