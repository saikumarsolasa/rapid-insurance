import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@material-ui/core';
import styles from './Dailog.module.scss';
import { ImCross } from 'react-icons/im';
import RadioButton from 'helper/radioButton';
import Input from 'helper/inputBox';
import { options, unNamedPassengers, voluntryExcess } from 'helper/constants';
import { motion } from 'framer-motion';
const transactionAlertsVariants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 5,
      type: 'spring',
      stiffness: 30,
    },
  },
};

const Addons = ({
  data,
  handler,
  closeDialogHandler,
  submitHandler,
  resetHandler,
}) => {
  const [open, setOpen] = React.useState(false);

  const onChangeHandler = (e) => {
    handler(e);
  };
  const onSubmitHandler = (e) => {
    submitHandler(e);
  };

  return (
    <motion.div
      variants={transactionAlertsVariants}
      initial="hidden"
      animate="visible"
    >
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div>
            {' '}
            <div className={styles.closeIcon} onClick={closeDialogHandler}>
              <ImCross title="close" size="0.9em" />
            </div>
            <form method="post" onSubmit={onSubmitHandler}>
              <Input
                type="number"
                name="c_request_idv"
                label="Request IDV"
                handler={onChangeHandler}
                values={data}
              />
              <RadioButton
                name="c_personal_accident_cover"
                options={options}
                values={data}
                handler={onChangeHandler}
                label="Personal Accident Cover for owner driver"
              />
              <RadioButton
                name="c_limit_tp_damage"
                options={options}
                values={data}
                handler={onChangeHandler}
                label="Do you want to limit the third party damage up to 6000 ?"
              />
              <RadioButton
                name="c_unnamed_passenger"
                options={unNamedPassengers}
                values={data}
                handler={onChangeHandler}
                label="Un-Named Passenger"
              />
              <RadioButton
                name="c_legal_liability_pd"
                options={options}
                values={data}
                handler={onChangeHandler}
                label="Liability to paid driver"
              />
              <div className="d-flex justify-content-between">
                <Input
                  type="number"
                  name="c_electrical_accessories"
                  label="Electrical Accessories"
                  handler={onChangeHandler}
                  values={data}
                />
                <Input
                  type="number"
                  name="c_non_electrical_accessories"
                  label="Non Electrical Accessories"
                  handler={onChangeHandler}
                  values={data}
                />
              </div>
              <RadioButton
                name="c_anti_theif_device"
                options={options}
                values={data}
                handler={onChangeHandler}
                label="Anti Theif Device"
              />
              <RadioButton
                name="c_voluntry_excess"
                options={voluntryExcess}
                values={data}
                handler={onChangeHandler}
                label="Voluntry Excess"
              />
              <div className="text-center mt-2 mr-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  size="small"
                >
                  Re-calculate
                </Button>
                &nbsp;
                <Button
                  type="reset"
                  onClick={() => resetHandler()}
                  variant="contained"
                  size="small"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Addons;
