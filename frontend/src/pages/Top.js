import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';

export default function Top() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <h1>おせっかいおばさん</h1>
        <p>あんたまた出会い系で女に振られたんやて！？ちょっとスマホでどんなやり取りしてんの！？見せてみーや！</p>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </>
  );
}