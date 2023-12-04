import { Container } from "@mui/material";

export default function Footer() {
  return (
    <>
      <style jsx="true">{`
        .footer {
          color: #bdbdbd;
        }
        .copyright{
          padding: 1rem 0;
        }
      `}</style>
      <Container maxWidth="md" className="footer">
        <div className="copyright">
          <p>© 2023 おせっかいおばさん@</p>
        </div>
      </Container>
    </>
  );
}