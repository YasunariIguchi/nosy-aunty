import { Container } from "@mui/material";

export default function Footer() {
  return (
    <>
      <style jsx="true">{`
        .footer {
          color: #bdbdbd;
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: #333; /* フッターの背景色を設定 */
        }
        .copyright{
          /*padding: 0.01rem 0;*/
          text-align: center;
          height: 30px;
        }
      `}</style>
      <Container maxWidth={false} className="footer">
        <div className="copyright">
          <p>© 2023 おせっかいおばちゃん@</p>
        </div>
      </Container>
    </>
  );
}