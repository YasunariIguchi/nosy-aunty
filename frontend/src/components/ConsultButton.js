import { Button } from "@mui/material";
export default function ConsultButton({ onClick }) {
  const handleClick = () => onClick();
  return (
    <Button fullWidth variant="contained" onClick={handleClick} >
      おばさんに見せてアドバイスをもらう
    </Button>
  );
}