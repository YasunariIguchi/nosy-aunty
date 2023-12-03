import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import PasteButton from '../components/PasteButton';
import MainTextField from '../components/MainTextFiled';
import ConsultButton from '../components/ConsultButton';
import ClearButton from '../components/ClearButton';

export default function Top() {
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
          <ConsultButton />
        </div>

        <div className="result-wrapper">
          <h2>おせっかいおばさんのありがたいお言葉</h2>
          <div className="result-text">
            <p>
              そんな子どもみたいなやり取りしてたら、そら振られるわ！
            </p>
          </div>
        </div>

      </Container>
    </>
  );
}