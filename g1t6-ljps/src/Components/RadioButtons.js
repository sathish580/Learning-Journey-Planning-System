import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function RadioButtons(props) {
  const { header, options, onSubmit } = props;
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(' ');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === options[0]) {
      setHelperText(' ');
      setError(false);
      onSubmit(value);
    } else if (value === options[1]) {
      setHelperText(' ');
      setError(false);
      onSubmit(value);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant='standard'>
        <FormLabel id='demo-error-radios'>{header}</FormLabel>
        <RadioGroup
          aria-labelledby='demo-error-radios'
          name='quiz'
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value={options[0]}
            control={<Radio />}
            label={options[0]}
          />
          <FormControlLabel
            value={options[1]}
            control={<Radio />}
            label={options[1]}
          />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1, maxWidth: '100px', px: 3 }} type='submit' variant='contained'>
          Confirm
        </Button>
      </FormControl>
    </form>
  );
}
