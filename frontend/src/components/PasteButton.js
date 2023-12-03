import { Button } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
export default function PasteButton() {
  return (
    <Button variant="outlined" startIcon={<ContentCopy />}>
      Paste
    </Button>
  );
}