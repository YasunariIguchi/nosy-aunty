import { Button } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
export default function PasteButton({ inputTextRef }) {
  const handleClick = () => {
    inputTextRef.current.value = navigator.clipboard.readText();
  }
  return (
    <Button variant="contained" startIcon={<ContentCopy />} onClick={handleClick}>
      Paste
    </Button>
  );
}