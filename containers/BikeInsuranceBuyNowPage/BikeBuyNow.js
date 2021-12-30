import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './BikeBuyNow.module.scss';
import { Formik, Form } from 'formik';
import { DefaultInput } from 'helper/formik-inputs';
import { Alert, Button } from '@mui/material';
import { bike_buynow_validations } from 'helper/formik-validations';
import { bikeBuyNowInitialValue } from 'helper/formik-initial-values';
import { PostTwoWheelerBuyNow } from 'helper/api';
import PayNow from 'components/PayNow/PayNow';
import { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { CustomAlert } from 'helper/alert';
import { subYears } from 'date-fns';
import { ReactDateField3 } from 'helper/formikFields/reactDateField';
import { Select } from 'helper/formikFields/select';
import { BuyNowInput } from 'helper/formikFields/buyNowInput';
import AlertDialog from 'components/Dailog/AlertDialog';

export default function BikeInsuranceBuyNow({ defaultValue }) {
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [data, setData] = useState({ ...defaultValue });
  const [expanded, setExpanded] = useState('panel1');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // console.log('value', defaultValue);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmitHandler = async (values) => {
    if (defaultValue.c_rto_registration_code.toLowerCase() !== values.c_registration_number.toLowerCase().slice(0, 4)) {
      setAlert(true);
    } else {
      const obj = {
        c_aa_membership: values.c_aa_membership === 'No' ? false : true,
        c_anti_theif_device: values.c_anti_theif_device === 'No' ? false : true,
        c_is_vehicle_financed: values.c_is_vehicle_financed === 'yes' ? true : false,
        c_valid_pucc: values.c_valid_pucc === 'yes' ? true : false,
        c_voluntry_excess: values.c_voluntry_excess === 'No' ? false : true,
        c_tppd: values.c_tppd === 'Yes' ? true : false,
      };
      // setData({ ...data, ...values, ...obj });
      setData({ ...data, ...values, ...obj });
      const bikeNow = { ...data, ...values, ...obj };
      console.log(bikeNow);
      // console.log(JSON.stringify(bikeNow));
      setShowBuyNow(true);
    }
  };

  const handleCloseBuyNow = () => {
    setShowBuyNow(false);
  };
  const details = ['c_title', 'c_first_name', 'c_last_name', 'c_maritial_status', 'c_aadhar_number', 'c_gender', 'c_mobile', 'c_email'];
  const contactDetails = ['c_address_line1', 'c_address_line2', 'c_pincode', 'c_city', 'c_state'];
  const vehicleDetails = ['c_registration_number', 'c_engine_number', 'c_chassis_number', 'c_prev_policy_number', 'c_vehicle_colour', 'c_is_vehicle_financed', 'c_valid_pucc'];
  const nomineeDetails = ['c_nominee_relation', 'c_nominee_full_name', 'c_nominee_dob'];
  let detailsError = false;
  let contactError = false;
  let vehicleError = false;
  let nomineeError = false;

  const validateTouchedFields = (arr, formik) => {
    return Object.keys(formik.touched).some((err, index) => {
      if (arr.includes(err)) {
        return true;
      }
    });
  };

  return (
    <>
      <div className={styles.main_accordion_wrapper}>
        {showBuyNow && <PayNow data={data} handleClose={handleCloseBuyNow} />}
        <div className={styles.accordion_wrapper}>
          <Formik enableReinitialize initialValues={bikeBuyNowInitialValue(defaultValue)} validationSchema={bike_buynow_validations} onSubmit={onSubmitHandler}>
            {(formik) => {
              detailsError = false;
              contactError = false;
              vehicleError = false;
              nomineeError = false;
              Object.keys(formik.errors).map((field, index) => {
                if (details.includes(field)) {
                  detailsError = true;
                }
                if (contactDetails.includes(field)) {
                  contactError = true;
                }
                if (vehicleDetails.includes(field)) {
                  vehicleError = true;
                }
                if (nomineeDetails.includes(field)) {
                  nomineeError = true;
                }
              });

              return (
                <Form>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                      {formik.errors.c_idv ? <FaCheck size="1.5em" /> : null}
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        <span>&nbsp;View Input Details</span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="px-2">
                        <div className="d-flex flex-wrap pt-1 justify-content-between">
                          <DefaultInput name="c_idv" label="IDV" />
                          <DefaultInput name="c_make_model" label="Make and Model" />
                          <DefaultInput name="c_rto_details" label="RTO" />
                          <DefaultInput name="c_registration_date" label="Registration Date" />
                          <DefaultInput name="c_policy_tenure" label="Policy Duration" />
                          <DefaultInput name="c_prev_policy_expire_date" label="Prev Policy Expire Date" />
                          <DefaultInput name="c_electrical_accessories" label="Electrical" />
                          <DefaultInput name="c_non_electrical_accessories" label="Non Electrical" />
                          <DefaultInput name="c_ncb" label="No Claim Bonus" />
                          <DefaultInput name="c_voluntry_excess" label="VOLUNTRY ACCESS" />
                          <DefaultInput name="c_anti_theif_device" label="ANTI-THEFT DEVICE" />
                          <DefaultInput name="c_aa_membership" label="AA MEMBERSHIP" />
                          <DefaultInput name="c_tppd" label="TPPD" />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} disabled={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                      {validateTouchedFields(details, formik) ? detailsError ? <ImCancelCircle size="1.5em" color="red" /> : <BsCheckCircle size="1.5em" color="green" /> : null}
                      <Typography className="ml-2" sx={{ width: '33%', flexShrink: 0 }}>
                        &nbsp;Contact Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="px-2">
                        <div className="d-flex flex-wrap pt-1  justify-content-evenly ">
                          <Select name="c_title" label="Title" required>
                            <option value="">Select</option>
                            <option value="mr">Mr</option>
                            <option value="mrs">Mrs</option>
                            <option value="miss">Miss</option>
                          </Select>
                          <BuyNowInput name="c_first_name" label="First Name" required />
                          <BuyNowInput name="c_last_name" label="Last Name" required />
                          <ReactDateField3 name="c_dob" label="DOB" startYear={1950} maxDate={subYears(new Date(), 18)} required />
                          <Select name="c_maritial_status" label="Marital Status" required>
                            <option value="">Select</option>
                            <option value="married">Married</option>
                            <option value="single">Single</option>
                            <option value="divorced">Divorced</option>
                            <option value="window">Widow</option>
                          </Select>
                          <BuyNowInput name="c_aadhar_number" label="Aadhar" required />
                          <Select name="c_gender" label="Gender" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </Select>
                          <BuyNowInput name="c_gst_number" label="GST" />
                          <BuyNowInput name="c_mobile" label="Mobile" required />
                          <BuyNowInput name="c_email" label="Email" required />
                          {defaultValue.c_personal_accident_cover !== 'true' ||
                            (true && (
                              <Select name="c_cpa" label="Reason for not opting CTA" required>
                                <option value="">Select</option>
                                <option value="hired_driver">hired driver</option>
                                <option value="stand-alone_cpa">stand alone cpa</option>
                                <option value="general_presonal_accident_cover">general presonal accident cover</option>
                              </Select>
                            ))}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} disabled={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                      {validateTouchedFields(contactDetails, formik) ? contactError ? <ImCancelCircle size="1.5em" color="red" /> : <BsCheckCircle size="1.5em" color="green" /> : null}
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>&nbsp;Address Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="px-2">
                        <div className="d-flex flex-wrap pt-1 justify-content-evenly">
                          <BuyNowInput name="c_address_line1" label="Address Line 1" required />
                          <BuyNowInput name="c_address_line2" label="Address Line 2" required />
                          <BuyNowInput name="c_address_line3" label="Address Line3" />
                          <BuyNowInput name="c_pincode" label="Pincode" required />
                          <BuyNowInput name="c_city" label="City" required />
                          <BuyNowInput name="c_state" label="State" required />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} disabled={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                      {validateTouchedFields(vehicleDetails, formik) ? vehicleError ? <ImCancelCircle size="1.5em" color="red" /> : <BsCheckCircle size="1.5em" color="green" /> : null}
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>&nbsp;Vehicle Additional Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="px-2">
                        <div className="d-flex flex-wrap pt-1  justify-content-evenly ">
                          <BuyNowInput name="c_registration_number" label="Registration Number" required />
                          <BuyNowInput name="c_engine_number" label="Engine Number" required />
                          <BuyNowInput name="c_chassis_number" label="Chassis Number" required />
                          <BuyNowInput name="c_prev_policy_number" label="Previous Policy Number" required />
                          <Select name="c_vehicle_colour" label="Color Type" required>
                            <option value="">Select</option>
                            <option value="black">Black</option>
                            <option value="blue">Blue</option>
                            <option value="red">Red</option>
                            <option value="brown">Brown</option>
                            <option value="green">Green</option>
                            <option value="light_blue">Light Blue</option>
                            <option value="light_green">Light Green</option>
                          </Select>
                          <Select name="c_is_vehicle_financed" label="Is your vehicle financed ?" required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </Select>
                          <Select name="c_valid_pucc" label="Is valid PUCC ?" required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </Select>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} disabled={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content" id="panel5bh-header">
                      {validateTouchedFields(nomineeDetails, formik) ? nomineeError ? <ImCancelCircle size="1.5em" color="red" /> : <BsCheckCircle size="1.5em" color="green" /> : null}
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>&nbsp;Nominee Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="px-2">
                        <div className="d-flex flex-wrap pt-1  justify-content-evenly ">
                          <BuyNowInput name="c_nominee_full_name" label="Full Name" />
                          <ReactDateField3 name="c_nominee_dob" label="DOB" startYear={1950} maxDate={subYears(new Date(), 18)} />
                          <Select name="c_nominee_relation" label="Relationship">
                            <option value="">Select</option>
                            <option value="spouse">spouse</option>
                            <option value="brother">brother</option>
                            <option value="mother">mother</option>
                            <option value="father">father</option>
                            <option value="son">son</option>
                            <option value="others">Others</option>
                          </Select>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6bh-content" id="panel6bh-header">
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>&nbsp;Terms and Conditions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Malesuada pellentesque elit eget gravida. Elementum eu facilisis sed odio morbi quis commodo odio aenean. Ridiculus mus mauris vitae ultricies leo integer malesuada. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Sed lectus vestibulum mattis ullamcorper velit. A arcu cursus vitae congue.
                        Pellentesque diam volutpat commodo sed. Et tortor at risus viverra adipiscing at. Rhoncus aenean vel elit scelerisque. Leo vel fringilla est ullamcorper eget nulla. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Risus in hendrerit gravida rutrum quisque non tellus orci. Lacus vestibulum sed arcu non odio euismod. Accumsan tortor posuere ac ut consequat semper.
                        <br />
                        <br />
                        <br />
                        Arcu vitae elementum curabitur vitae nunc. Lacus luctus accumsan tortor posuere ac ut. Nisl rhoncus mattis rhoncus urna. Ac tortor vitae purus faucibus ornare suspendisse. Turpis massa tincidunt dui ut ornare. Dignissim sodales ut eu sem. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus. Sed adipiscing diam donec adipiscing tristique risus nec. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Ultricies lacus sed turpis tincidunt. Pharetra magna ac placerat vestibulum
                        lectus mauris ultrices eros. Risus quis varius quam quisque id diam vel quam. Mauris vitae ultricies leo integer malesuada nunc vel risus. Maecenas accumsan lacus vel facilisis volutpat est.
                        <br />
                        <br />
                        <br />
                        Tempus imperdiet nulla malesuada pellentesque. Proin sagittis nisl rhoncus mattis. Quis lectus nulla at volutpat diam ut venenatis tellus. Sit amet mauris commodo quis imperdiet. Vitae elementum curabitur vitae nunc. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Maecenas sed enim ut sem. Etiam erat velit scelerisque in dictum non. Bibendum arcu vitae elementum curabitur vitae nunc. Nisl rhoncus mattis rhoncus urna neque viverra. In cursus turpis massa tincidunt dui ut ornare lectus sit. Mollis aliquam ut porttitor leo a diam sollicitudin
                        tempor. Mauris augue neque gravida in fermentum et. Gravida in fermentum et sollicitudin ac orci phasellus. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Pharetra vel turpis nunc eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <div className={styles.online_button}>
                    <Button type="submit" variant="contained" disableRipple={true}>
                      ONLINE PAYMENT
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        {alert && <AlertDialog data="Registration number mismatch" handleClose={() => setAlert(false)} />}
      </div>
    </>
  );
}
