import { Button } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
export default function PasteButton({ inputTextRef }) {
  const handleClick = async () => {
    try {
      const textFromClipboard = await navigator.clipboard.readText();
      inputTextRef.current.value = textFromClipboard;
    } catch (error) {
      console.error('Failed to paste from clipboard:', error);
    }
  }
  return (
    <Button variant="contained" startIcon={<ContentCopy />} onClick={handleClick}>
      貼り付け
    </Button>
  );
}