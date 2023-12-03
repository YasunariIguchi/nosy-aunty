import { Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
export default function ClearButton() {
  return (
    <Button variant="contained" color="error" startIcon={<Cancel />}>
      Clear
    </Button>
  );
}