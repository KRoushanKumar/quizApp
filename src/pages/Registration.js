import React, {useState ,useEffect} from 'react';
import Axios from 'axios';
import {makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,DialogTitle,DialogContent,TextField,Radio,RadioGroup,FormControl,
  FormControlLabel,Select,FormLabel,FormHelperText,InputLabel} from '@material-ui/core';
import Progress from '../components/progress';


const initialValues={
    fullName:"",
    fathersName:"",
    email:"",
    mobile:"",
    gender:"M",
    dob:"",
    course:"",
    sem:"",
    password:"",
    address:"",
    pin:"",
    code:"",
    
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '47%',
    
  
      }},
      formControl: {
      
        margin: theme.spacing(1),
        width: '47%',
        
        
    },
  
  }));

  


export default function Registration(props) {
  const {openPopup, setOpenPopup} = props;
  const [openProgress,setOpenProgress]=useState(false)
  const [values,setvalues]=useState(initialValues)
  const [nameErr,setNameErr]=useState({})
  const [disableVer,setDisableVer]=useState(true)
  const [disableAll,setDisableAll]=useState(false)
  const [disableButton,setDisableButton]=useState(false)
  const [buttonLabel,setButtonLabel]=useState("continue")
  const [submit,setSubmit]=useState(false)
  const [dublicate,setDublicate]=useState(false)
  let status=true;
  let cnt=0;
  let temp=false;
  var dub=false;
  
  const classes=useStyles();
  const d= ()=>{
    Axios.post('https://quiz--2021.herokuapp.com/api/CheckEmailDubl', { EmailId:values.email}).then((response) => {
      console.log(response.data.Dublicate)
          if(response.data.Dublicate){
            console.log("Dublicate rouhan")
            alert('this Email already registered');
            //temp.email="Already registered";
           // status=false;
           setDisableButton(true)
          }
          else { 
          //temp.email="" 
          setDisableButton(false)
          }
    })
  }
 
  const validate=()=>{
    let temp={}
    
    const invalid="This field is required."
    if((/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/).test(values.fullName) )
      temp.fullName=""
    else{
      if(values.fullName.trim()==="")
        temp.fullName=invalid;
      else
        temp.fullName="Invalid Name";
      status=false;
    }
    if((/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/).test(values.fathersName) )
      temp.fathersName=""
    else{
      if(values.fathersName.trim()==="") 
         temp.fathersName=invalid;
      else
        temp.fathersName="Invalid Name";
      status=false;
    }
    if((/^[0-9\b]+$/).test(values.pin)&&(values.pin.length===6) )
      temp.pin=""
    else{
      if(values.pin.trim()==="")
        temp.pin=invalid;
      else
        temp.pin="Invalid pin code";
      status=false;
    }
    if((/^[0-9\b]+$/).test(values.mobile)&&(values.mobile.length===10) )
      temp.mobile=""
    else{
      if(values.mobile.trim()==="")
        temp.mobile=invalid;
      else
        temp.mobile="Invalid mobile number.";
      status=false;
    }
    
    if((/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(values.email)){
    
    temp.email="";
 
    }
      else{
      if(values.email.trim()==="")
        temp.email=invalid;
      else{
        temp.email="Invalid email id.";
      status=false;
    }
  }
    if((/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/).test(values.address))
      temp.address=""
    else{
      if(values.address.trim()==="")
        temp.address=invalid;
      else
        temp.address="Invalid address";
      status=false;
    }
    if(values.password)
      temp.password=""
    else{
      temp.password=invalid;
      status=false;
    }
    if(values.sem.length!=0)
      temp.sem=""
    else{
      temp.sem=invalid;
      status=false;
    }
    if(values.dob)
      temp.dob=""
    else{
      temp.dob=invalid;
      status=false;
    }

    setNameErr({...temp})
    if((status)&&(cnt===0)){
      const otp=Math.floor(100000 + Math.random() * 900000);
      sessionStorage.setItem('otp',otp);
      handleSentMail(otp,1);
      if(temp){
        setOpenProgress(true)
        setDisableVer(false);
        setDisableAll(true);
        setDisableButton(true);
        status=false;
        cnt++;
      }
    
    }
    if(submit===true){
      AddUser()
      handleSentMail(values.password,0)
      if(temp){
        setSubmit(false)
        setDisableAll(false)
        setDisableButton(false)
        setDisableVer(true)
      }
    }
  }

  const verify=()=>{
    if(values.code===sessionStorage.getItem('otp')){
      status=false;
      alert("You have successfully verified email id.\n Please click  SUBMIT to complete the registration. ")
      setSubmit(true)
      setDisableButton(false)
      setButtonLabel("Submit")
      setDisableVer(true)
      
    }
    else{
      alert("Invalid verification code\n Try again..")
      setSubmit(false)
    }
  }


  const Reset=()=>{
    setNameErr("")
    setvalues(initialValues)
  }

  const Close=()=>{
    setOpenPopup(false)
    setDisableAll(false)
    setDisableButton(false)
    Reset();
    
    //setOpenProgress(true)
  }
  const handleSentMail=(value1,value2)=>{
    if(dub===true)
      alert("Already exits")
    else{
    Axios.post("https://quiz--2021.herokuapp.com/api/send_mail",{email:values.email,value1,value2}).then((response)=>{
    if(response.data.code){
      temp=true;
      setOpenProgress(false)
      if(response.data.value===1)
        alert("Verification Code has been sent to your mail id.\n Please verify your mail id by given code below.");
      else
        alert("Registration completed...\n Your user Id and password sent to your mail.")
      
    }
    else{
      temp=false;
      console.log(response)
      alert("Mail not sent...\nPlease try again!!")
    }
    })

    return temp;
  }
  }

  const AddUser=()=>{
    Axios.post('https://quiz--2021.herokuapp.com/api/registration',{
      Name:values.fullName,FatherNm:values.fathersName,EmailId:values.email, Password:values.password ,mob:values.mobile,address:values.address,pin:values.pin,sem:values.sem,dob:values.dob,gender:values.gender}).then((response) =>
      {
        alert("Data Saved")
        Reset();
    })
  }
  
  const handleChange=e=>{
    const {name,value}=e.target
    setvalues({
      ...values,
      [name]:value,
    })
  }
  
  return (
    <>

      <form noValidate autoComplete="off" style={{ backgroundColor: '#cfe8fc' }} >


        <Dialog className={classes.root} style={{ backgroundColor: '#17a2b8' }} aria-labelledby="customized-dialog-title" open={openPopup}>
          <DialogTitle id="customized-dialog-title" style={{ backgroundColor: '#B2EBF2' }}>
            <div style={{ textAlign: "center" }}>
              <h4 style={{ color: "yellowgreen" }}>
                Maulana Azad National Institute of Technology,BHOPAL
              </h4>
              <h6>(An Institute Of National Importance)</h6>
            </div>
          </DialogTitle>
          <DialogContent dividers style={{ backgroundColor: '#E0F7FA' }} >


            <TextField disabled={disableAll} sm={12} helperText={nameErr.fullName} required error={nameErr.fullName} label="Full Name" variant="filled" name="fullName" value={values.fullName} onChange={handleChange} />

            <TextField disabled={disableAll} helperText={nameErr.fathersName} required error={nameErr.fathersName} label="Father's Name" variant="filled" name="fathersName" value={values.fathersName} onChange={handleChange} />

            <TextField disabled={disableAll} helperText={nameErr.address} error={nameErr.address} label="Address" required variant="filled" name="address" value={values.address} onChange={handleChange} />

            <TextField disabled={disableAll} helperText={nameErr.pin} error={nameErr.pin} label="Pin Code" keyboardType="numeric" required variant="filled" name="pin" value={values.pin} onChange={handleChange} />

            <TextField disabled={disableAll} helperText={nameErr.email} error={nameErr.email} label="Email Id" required variant="filled" name="email" value={values.email} onChange={handleChange} onKeyPress={d} onKeyUp={d} />


            <TextField disabled={disableAll} helperText={nameErr.mobile} error={nameErr.mobile} label="Mobile Number" required default="+91" variant="filled" name="mobile" value={values.mobile} onChange={handleChange} />

            <TextField disabled={disableAll} helperText={nameErr.password} error={nameErr.password} label="Password" required variant="filled" type="password" name="password" value={values.password} onChange={handleChange} />

            <FormControl variant="filled" className={classes.formControl} >
              <InputLabel htmlFor="outlined-age-native-simple" required error={nameErr.sem} >Semester</InputLabel>
              <Select
                native
                value={values.sem}
                onChange={handleChange}
                label="Semester"
                disabled={disableAll}
                name="sem" >

                <option aria-label="None" value="" />
                <option value={1}>I</option>
                <option value={2}>II</option>
                <option value={3}>III</option>
                <option value={4}>IV</option>
                <option value={5}>V</option>
                <option value={6}>VI</option>
              </Select>
              <FormHelperText error={nameErr.sem}>{nameErr.sem}</FormHelperText>
            </FormControl>

            <TextField required helperText={nameErr.dob} error={nameErr.dob}
              id="date"
              label="Date of Birth"
              variant="filled"
              type="date"
              value={values.dob}
              name="dob"
              onChange={handleChange}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,

              }}
              disabled={disableAll}
            />

            <FormControl component="fieldset" className={classes.formControl} required disabled={disableAll}>
              <FormLabel component="legend" variant="filled" >Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" row
                value={values.gender}
                onChange={handleChange}>
                <FormControlLabel value="M" control={<Radio color="primary" />} label="Male" />
                <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" />


              </RadioGroup>
              <FormHelperText>{nameErr.gender}</FormHelperText>
            </FormControl>
            <TextField disabled={disableVer} autoFocus label="Verification Code" variant="filled" type="text" name="code" value={values.code} onChange={handleChange} />

          </DialogContent>
          <DialogActions style={{ backgroundColor: '#B2EBF2' }}>
            <Button disabled={disableVer} autoFocus color="primary" onClick={verify}>verify</Button>
            <Button disabled={disableButton} autoFocus onClick={validate} color="primary">{buttonLabel}</Button>

            <Button color="primary" onClick={Reset}>Reset</Button>
            <Button onClick={Close} color="primary">Close</Button>
          </DialogActions>
          <Progress open={openProgress}
      setOpen={setOpenProgress}>

      </Progress>
        </Dialog>
        
      </form>
      
      
    </>
  );
}

        
    



