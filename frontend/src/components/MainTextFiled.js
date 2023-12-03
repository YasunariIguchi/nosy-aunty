import { TextField } from '@mui/material';
export default function MainTextField() {
  return (
    <TextField
      id="outlined-multiline-static"
      label="ここに貼り付けるんやで"
      multiline
      fullWidth
      rows={10}
    />
  );
}