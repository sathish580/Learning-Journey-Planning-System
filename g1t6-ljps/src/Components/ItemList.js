import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import { Card, Typography, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import Popup from './Popup';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function ItemList(props) {
  const {
    listItems,
    listPaths,
    staffhome,
    progress,
    deletable,
    arrow,
    onDelete,
  } = props;
  const items = [];
  for (let i = 0; i < listItems.length; i++) {
    const a_path = {
      pathname: listPaths[i],
    };

    items.push(
      <>
        {staffhome && (
          <>
            <Grid
              container
              spacing={2}
              justifyContent='center'
              alignItems='center'
            >
              <Grid item xs={12} md={11}>
                <Link
                  to={a_path}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem
                    button
                    key={listItems[i]}
                    sx={{
                      p: 3,
                      border: '1px solid lightgrey',
                      borderRadius: 3,
                      my: 1,
                    }}
                  >
                    <ListItemText primary={listItems[i]} />
                    <ProgressBar progress={progress[i]} />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item xs={12} md={1}>
                <Popup
                  buttonText='Delete'
                  header='Confirm Delete Learning Journey'
                  body={
                    'You are about to delete the Learning Journey ' +
                    listItems[i] +
                    '. Confirm deletion?'
                  }
                  onConfirm={{
                    method: "put",
                    api: "http://localhost:5011/deleteLJ",
                    body: {
                      Job_Role_ID: parseInt(
                        a_path.pathname.split("/")[a_path.pathname.split("/").length - 1]
                      ),
                      Staff_ID: parseInt(
                        window.sessionStorage.getItem("userID")
                      ),
                    },
                    message: "Deleted learning journey"
                  }}
                />
              </Grid>
            </Grid>
          </>
        )}

        {!staffhome && (
          <>
            <Link
              to={a_path}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem
                sx={{ p: 2 }}
                button
                key={listItems[i]}
                secondaryAction={arrow && <ArrowIcon />}
              >
                <ListItemText primary={listItems[i]} />
                {/* <Typography color='text.secondary' sx={{mr: 2}}>Start</Typography> */}
                {deletable && (
                  <Link to='/learner'>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Link>
                )}
              </ListItem>
              {i !== listItems.length - 1 && <Divider />}
            </Link>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {staffhome && (
        <List sx={style} component='nav' aria-label='mailbox folders'>
          {items}
        </List>
      )}

      {!staffhome && (
        <>
          <Card sx={{ mt: 3 }}>
            <List sx={style} component='nav' aria-label='mailbox folders'>
              {items}
            </List>
          </Card>
        </>
      )}
    </>
  );
}
