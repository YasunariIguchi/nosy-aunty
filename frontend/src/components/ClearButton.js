import { Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
export default function ClearButton({ inputTextRef }) {
  const handleClick = () => {
    console.log(inputTextRef);
    inputTextRef.current.value = "";
  }
  return (
    <Button variant="contained" color="error" startIcon={<Cancel />} onClick={handleClick}>
      Clear
    </Button>
  );
}