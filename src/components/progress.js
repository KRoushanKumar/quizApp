import React,{useState} from 'react';
import { CircularProgress,Backdrop ,LinearProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function Progress(props){
    const{open,setOpen}=props;
    const classes = useStyles();
    console.log(open)
    return(
        
            <Backdrop open={open} className={classes.backdrop} invisible='false'>
                <CircularProgress color="primary">

                </CircularProgress>
            </Backdrop>
    
    )
}