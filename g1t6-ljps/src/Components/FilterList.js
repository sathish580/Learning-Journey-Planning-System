import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export default function FilterList(props) {
  const { id, filterCol , clicked} = props;

//   let display = 'none'
//   if (id == filterCol) {
//       display = 'block'
//   }

const filterItems = ['hello', 'bye']


  React.useEffect(()=> {
    console.log(id, filterCol)
  })

const [display, setDisplay] = useState('none')

// React.useEffect(() => {
//     if (display == 'none') {
//         setDisplay('block')
//     }
// }, [])

//   const [display, setDisplay] = useState('none');

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'absolute',
        display: { display },
        border: '1px solid lightgray',
      }}
    >
      {filterItems.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <>
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItemButton>
            </ListItem>
          </>
        );
      })}
      <Button variant='contained' sx={{ mx: 1 }}>
        Filter
      </Button>
    </List>
  );
}
