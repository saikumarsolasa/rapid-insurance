import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './Dailog.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { GetOtp, VerifyOtp } from 'helper/api';

export default function VerifyOtpComponent({ closeHandler, mobile }) {
     const otpFields = {
          number1: "",
          number2: "",
          number3: "",
          number4: "",
     }
     const [otpNumber, setOtpNumber] = useState(otpFields)
     const [error, setError] = useState(false);
     const [isLoading, setIsLoading] = useState(false)

     const closeDailogHanlder = () => {
          let verify = confirm("Are you sure ?. The changes will not be saved");
          if (verify) {
               closeHandler(false)
          }
     }

     useEffect(() => {
          if (!isLoading) {
               setTimeout(() => {
                    document.querySelector("input[name='number1']").focus()
               }, 500);
          }
     }, [])

     const onFocusHanlder = (event, focusOn) => {
          if (event.target.value.length === 0 || event.target.value.length === 1) {
               setOtpNumber({
                    ...otpNumber,
                    [event.target.name]: event.target.value
               });
          }
          if (event.target.value.length === 1) {
               document.querySelector(`input[name=${focusOn}]`).focus();
               return;
          }
     }

     const onChangeHanlder = (event) => {
          setError(false);
          if (event.target.name === "number1") {
               onFocusHanlder(event, "number2")
          }
          if (event.target.name === "number2") {
               onFocusHanlder(event, "number3")
          }
          if (event.target.name === "number3") {
               onFocusHanlder(event, "number4")
          }
          if (event.target.name === "number4") {
               onFocusHanlder(event, "number4")
          }
     }

     const resendOtpHandler = async () => {
          setError(false);
          setIsLoading(true);
          setOtpNumber(otpFields)
          console.log(mobile)
          const response = await GetOtp({ mobile })
          if (response.status === 200) {
               setIsLoading(false)
               sessionStorage.setItem("phone", response.phone);
               sessionStorage.setItem("fullHash", response.fullHash);
               console.log(response)
          }
     }


     const submitHandler = async () => {
          const otp = `${otpNumber.number1}${otpNumber.number2}${otpNumber.number3}${otpNumber.number4}`;
          if (otp.length !== 4) {
               setError(true);
               return;
          }

          const obj = {
               hash: sessionStorage.hash,
               phone: sessionStorage.phone,
               otp: otp
          }
          setIsLoading(true)
          const response = await VerifyOtp(obj);
          console.log(response);
          if (response.status === 200 && response.error === true) {
               setError(true);
               setIsLoading(false)
          } else if (response.status === 200 && response.error === false) {
               closeHandler(true)
               setIsLoading(false)
          }
     }

     return (
          <div className={styles.verify_otp}>
               <Dialog
                    className={styles.verify_otp__dailog}
                    open={true}
                    onClose={(event, reason) => {
                         if (reason !== 'backdropClick') {
                              closeDailogHanlder()
                         }
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <DialogTitle id="alert-dialog-title">
                         Verify OTP
                    </DialogTitle>
                    {
                         isLoading ? <div className={styles.verify_otp__loading}><CircularProgress /> </div> : (<div>
                              <DialogContent>
                                   <DialogContentText id="alert-dialog-description">
                                        We enter the otp that we have sent to your mobile number
                                   </DialogContentText>
                                   <div className={styles.verify_otp__input_wrapper}>
                                        <input type="number" className={classNames("form-control", error && styles.inputError)} name="number1" value={otpNumber.number1} onChange={onChangeHanlder} />
                                        <input type="number" className={classNames("form-control", error && styles.inputError)} name="number2" value={otpNumber.number2} onChange={onChangeHanlder} />
                                        <input type="number" className={classNames("form-control", error && styles.inputError)} name="number3" value={otpNumber.number3} onChange={onChangeHanlder} />
                                        <input type="number" className={classNames("form-control", error && styles.inputError)} name="number4" value={otpNumber.number4} onChange={onChangeHanlder} />
                                   </div>
                              </DialogContent>
                              <DialogActions>
                                   <Button onClick={resendOtpHandler} variant="contained" color="primary">Resend</Button>
                                   <Button onClick={submitHandler} variant="contained" color="success">Submit</Button>
                                   <Button onClick={closeDailogHanlder} >
                                        Cancel
                                   </Button>
                              </DialogActions>
                         </div>)
                    }

               </Dialog>
          </div>
     );
}


