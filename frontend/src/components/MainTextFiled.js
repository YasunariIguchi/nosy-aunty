import { TextField } from '@mui/material';
import { forwardRef } from 'react';
const MainTextField = forwardRef((props, ref) => (
    <TextField
      id="outlined-multiline-static"
      label="ここに貼り付けるんやで"
      multiline
      fullWidth
      rows={10}
      inputRef={ref}
    />
));

export default MainTextField;