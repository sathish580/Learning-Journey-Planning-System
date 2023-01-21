import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Checkbox,
} from '@mui/material';
import FilterIcon from '@mui/icons-material/FilterListOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Dropdown(props) {
  const { headers, rows, header, onFilter, onClearFilter } = props;

  const [filterItems, setFilterItems] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
//   const [filterCol, setFilterCol] = React.useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const col = event.currentTarget.getAttribute('value');
    const colIndex = headers.indexOf(col);

    const filterList = [];
    for (let row of rows) {
      for (const [key, value] of Object.entries(row)) {
        filterList.push(value);
      }
    }
    const cleanFilterList = [];
    const headerLength = headers.length;

    for (let i = colIndex; i < filterList.length; i += headerLength) {
      if (!cleanFilterList.includes(filterList[i])) {
        cleanFilterList.push(filterList[i]);
      }
    }
    setFilterItems(cleanFilterList);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleFilter = (value) => () => {
    //   console.log(checked.splice(1)) // column data
    //   console.log(value) // column name
      onFilter(value, checked.splice(1))
      handleClose()
  }

  const handleClearFilter = () => {
      onClearFilter()
      handleClose()
  }

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        value={header}
      >
        <FilterIcon />
      </IconButton>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {filterItems.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <MenuItem key={index} onClick={handleToggle(value, index)}>
                  <Checkbox
                    edge='start'
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                  {value}
            </MenuItem>
          );
        })}
        <Button variant='contained' sx={{ mx: 1 }} onClick={handleFilter(header)}>
          Filter
        </Button>
        <Button variant='contained' sx={{ mx: 1, backgroundColor: 'red' }} onClick={handleClearFilter}>
          Reset
        </Button>
      </Menu>
    </div>
  );
}
