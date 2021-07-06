import React ,{useState} from 'react';
import Axios from 'axios';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
// import Grid from '@material-ui/core/Grid';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
//import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(4),
    flex: 1,
  },

  
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TakeTest(props) {
  const classes = useStyles();
  const [question,setquestion] = useState([]);

  const {open, setOpen}= props;

  const [resultId,setResultId] = useState(0)
  const history = useHistory();

  function allquestion(){
    Axios.post('https://quiz--2021.herokuapp.com/api/question',{Q_ID:sessionStorage.getItem('Q__ID')})
    .then((response)=>{
      setquestion(response.data);
    })
  }
  
  function SubmitTest()
  {
    if(resultId===0){
    Axios.post('https://quiz--2021.herokuapp.com/api/setQuizResult',{U_ID:sessionStorage.getItem('UserID'),Q_ID:sessionStorage.getItem('Q__ID')})
    .then((response)=>{
      alert(response.data.insertId)
      setResultId(response.data.insertId)
    })
    document.getElementById('SubminTestFinal').style.display = 'block'
    document.getElementById('SubminTest').style.display = 'none'
    }

    if(resultId>0)
    {
      
      var i=0;
      alert(question.length)
      //var len = question.length
      for(i=0 ;i <question.length; i++ )
      {
        
        var n = 'Option_'+question[i].Qu_ID;
        var a = document.querySelector('input[name="'+n+'"]:checked').value; 
        Axios.post('https://quiz--2021.herokuapp.com/api/setQuizResultQpiton',{QR_ID:resultId,S_Ans:a,QNo:question[i].Qu_ID})
         .then((response)=>{
         alert(response.data.insertId)
        

         })
        console.log('n');
      }
      setTimeout(history.push('/'),5000)
      
    }
  }
  function setOption()
  {
    
  }
  function StartQuiz()
  {
    document.getElementById('MainTest').style.display= 'block'
    document.getElementById('StartTest').style.display= 'none'
    
    allquestion();
  }
  
  return (
    
      <Dialog fullScreen open={open}  TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
            <ListItemText style={{textAlign:"center",paddingTop:"10px",fontSize:'32px'}} primary={<Typography variant="h5" >Maulana Azad National Institute of Technology, BHOPAL-462003</Typography> }
            secondary={<Typography variant="h6" style={{color:"#343a40"}}>(An Institute of National Importance)</Typography>} />
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Student Id
                </Typography>
                <Typography variant="h6" style={{textAlign:"center"}}>
                {props.name}
                </Typography>
                <Typography variant="h6" className={classes.title}>
                Timer
                </Typography>
          </Toolbar>
         
        </AppBar>
        <div>Try to Attempt All Question <br></br>
            No Negative Marking
        </div>
        <Button id="StartTest" onClick={StartQuiz}>Click here to Start Quiz</Button>
        <div id="MainTest" style={{display:'none'}}>
        <Card  variant="outlined" style={{alignSelf:"center",marginTop:"50px" , marginBottom: "100px" ,width:'800px' , overflow:"scroll"}}>
          {
          question.map((obj)=>(
                  
            <div >
              <h4 style={{marginTop:"20px"}}>QNo.{obj.Question} </h4><hr/>
              
              <input type='radio' name={'Option_'+obj.Qu_ID}  value='a' onChange={setOption}></input>
              {obj.O1}
              <input type='radio'  name={'Option_'+obj.Qu_ID} value='b' onChange={setOption}></input>
              
              {obj.O2}
              <input type='radio'  name={'Option_'+obj.Qu_ID} value='c' onChange={setOption}></input>
              {obj.O3}
              <input type='radio'  name={'Option_'+obj.Qu_ID} value='d' onChange={setOption}></input>
              {obj.O4}
                 
            </div>
             ))

             }<hr/>
            
            
        </Card>
        <Button id="SubminTest" onClick={SubmitTest}> Submit</Button>
        <Button id="SubminTestFinal" style={{display:'none'}} onClick={SubmitTest}>final Submit</Button>
        </div>
    </Dialog>
    
  );
}
