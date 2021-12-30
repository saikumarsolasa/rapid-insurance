import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GenerateTransactionId } from 'helper/api';
import { useEffect, useState } from 'react';
import KotakPayNow from './KotakPayNow';
import styles from './PayNow.module.scss';
import { RiErrorWarningLine } from 'react-icons/ri';
import VerifyDetails from './VerifyDetails';

const PayNow = ({ data, handleClose }) => {
  const [txnid, setTxnid] = useState('');

  return (
    <Dialog
      open={true}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={styles.pay_now_wrapper}
    >
      <div className="bg-warning text-center" style={{ height: '60px', lineHeight: '60px' }}>
        <RiErrorWarningLine color="#fff" size="3em" />
      </div>
      <DialogTitle>Please verify your details before proceeding ?</DialogTitle>
      <DialogContent>
        <VerifyDetails data={data} />
      </DialogContent>
      <DialogActions>
        <KotakPayNow data={{ ...data, ...txnid }} />
        <Button onClick={handleClose}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayNow;
