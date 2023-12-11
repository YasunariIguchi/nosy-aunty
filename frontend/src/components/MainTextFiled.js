import { TextField } from '@mui/material';
import { forwardRef } from 'react';
const MainTextField = forwardRef((props, ref) => (
    <TextField
      id="outlined-multiline-static"
      multiline
      fullWidth
      placeholder={'ここにLINEのやり取りを貼り付けるんやで'}
      rows={10}
      inputRef={ref}
    />
));

export default MainTextField;