import { Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
export default function ClearButton({ inputTextRef }) {
  const handleClick = () => {
    inputTextRef.current.children[1].children[0].value = "";
  }
  return (
    <Button variant="contained" color="error" startIcon={<Cancel />} onClick={handleClick}>
      Clear
    </Button>
  );
}