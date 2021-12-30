import { Button } from '@mui/material';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { fadeIn, routeAnimation } from '../../helper/animation';
import { GetAllLocations, GetInsuranceCompanies, GetManufacturers, GetModels, GetVarients } from 'helper/api';
import { bikeInsuranceRadios, bikeInsuranceInitialValues, getBikeInsuranceInitialValues } from 'helper/formik-initial-values';
import { bikeInsuranceValidations } from 'helper/formik-validations';
import { Input } from 'helper/formikFields/input';
import { useEffect, useState } from 'react';
import styles from './BikeInsuranceForm1.module.scss';
import { addMonths, subMonths } from 'date-fns';
import { calculateYears } from 'helper/formatDate';
import { CustomAlert } from 'helper/alert';
import { DecryptObject } from 'helper/hashing';
import format from 'date-fns/format';
import { RadioSet } from 'helper/formikFields/radio';
import { OptionsSelect, Select } from 'helper/formikFields/select';
import { ReactDateField3 } from 'helper/formikFields/reactDateField';
import { ReactDateFieldMonthYear } from 'helper/formikFields/dateField';
import { InputDataList } from 'helper/formikFields/inputDataList';

const BikeInsuranceForm1 = (props) => {
  useEffect(async () => {
    if (window.location.search.length > 0) {
      const urlObject = window.location.search.split('=');
      const userObj = await DecryptObject(urlObject[1]);
      setUserData(userObj);
    }
  }, []);
  const { setInsurance, values, isLoading } = props;

  const [manufacturers, setManufacturers] = useState([]);
  const [userData, setUserData] = useState({});
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [insurers, setInsurers] = useState([]);
  const [rtoLocations, setRtoLocations] = useState([]);

  const [selectedMake, setSelectedMake] = useState({});
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedVarient, setSelectedVarient] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedInsurer, setSelectedInsurer] = useState({});
  const [manufacturingDate, setManufacturingDate] = useState('');

  const [showExistingFields, setShowExistingFields] = useState(true);
  const [alert, setAlert] = useState(false);
  const [showNcb, setShowNcb] = useState(false);
  const [makeValue, setMakeValue] = useState('');
  const [fuelType, setFuelType] = useState([]);

  useEffect(async () => {
    if (Object.keys(values).length === 0 || makeValue.length === 0) {
      try {
        const response = await GetManufacturers();
        setManufacturers(response.makes);
        const response1 = await GetAllLocations();
        setRtoLocations(response1.data);
        const response2 = await GetInsuranceCompanies();
        setInsurers(response2.data);
      } catch (error) {
        alert(error.message);
      }
    }
  }, [makeValue]);

  const optionHanlder = async (value, displayKey, displayKey2, valueKey) => {
    if (displayKey === 'c_make') {
      let filteredMake = null;
      manufacturers.map((option) => {
        // console.log('opti', option);
        if (option[displayKey] === value) {
          filteredMake = option;
        }
      });

      if (filteredMake) {
        setSelectedMake(filteredMake);
        const response = await GetModels(filteredMake.c_make_code);
        if (response?.models && response.models.length > 0) {
          setModels(response.models);
        } else {
          alert('No models found for given manufacture');
        }
      }
    }

    if (displayKey === 'c_model') {
      let filteredModel = null;
      models.map((option) => {
        if (option[displayKey].toString() === value) {
          filteredModel = option;
        }
      });

      if (filteredModel) {
        setSelectedModel(filteredModel);
        const response = await GetVarients(selectedMake.c_make_code, filteredModel.c_model_code);
        if (response?.variants) {
          setVariants(response.variants);
        } else {
          alert('Something went wrong or No variants found for given model');
        }
      }
    }

    if (displayKey === 'c_variant') {
      let filteredVariant = null;
      variants.map((option) => {
        if (option[displayKey].toString() === value) {
          filteredVariant = option;
        }
      });
      if (filteredVariant) {
        setFuelType([{ ...filteredVariant }]);
        setSelectedVarient(filteredVariant);
      }
    }

    if (displayKey === 'c_rto_location') {
      let filteredLocation = null;
      let registartionValue = value.split(' ')[1];
      // console.log('register', rtoLocations);
      rtoLocations.map((option) => {
        if (option[displayKey2] === registartionValue) {
          filteredLocation = option;
        }
      });
      if (filteredLocation) {
        // console.log('filtered', filteredLocation);
        setSelectedLocation(filteredLocation);
      }
    }

    if (displayKey === 'c_prev_previous_insurer') {
      let filteredInsurer = null;
      insurers.map((option) => {
        if (option[valueKey] === value) {
          filteredInsurer = option;
        }
      });
      if (filteredInsurer) {
        setSelectedInsurer(filteredInsurer);
      }
    }
  };

  const existingPolicyHanlder = (value, name) => {
    if (value.toString() === 'true') {
      setShowExistingFields(true);
    } else if (value.toString() === 'false') {
      setShowExistingFields(false);
    }
  };

  const claimLastYearHanlder = (value, name) => {
    if (value.toString() === 'true') {
      setShowNcb(true);
    } else if (value.toString() === 'false') {
      setShowNcb(false);
    }
  };

  // const keyDownHandler = (event) => {
  //   console.log('event');
  // };

  const onSubmitHandler = (values) => {
    const manufacturingDate = values.c_manufacture_year_month.split('/');
    const yearSpan = calculateYears(new Date(values.c_manufacture_year_month), new Date());

    if (9.5 < yearSpan) {
      setAlert(true);
    } else {
      const obj = {
        c_make_model: '',
        c_claim_last_year: '',
        c_own_damage: '',
        c_third_party_damage: '',
        c_policy_tenure: '',
        c_rto_state: '',
        c_rto_state_code: '',
      };
      const selectedValues = {
        ...selectedMake,
        ...selectedModel,
        ...selectedVarient,
        ...selectedLocation,
        ...selectedInsurer,
        ...values,
        c_manufacture_year_month: manufacturingDate.length === 2 ? format(new Date(manufacturingDate[1], manufacturingDate[0] - 1, 1), 'yyyy/MM/dd') : values.c_manufacture_year_month,
      };
      setInsurance(selectedValues);
      console.log('selected', selectedValues);
    }
  };
  const onChangeHandler = (value) => {
    setMakeValue(value);
  };

  const onChangeYearManufacturing = (value) => {
    setManufacturingDate(value);
  };

  return (
    <>
      <div className={styles.MainWrapper}>
        {alert && (
          <div className={`${styles.alert}`}>
            <CustomAlert text="Your bike life span is above 9.5 years." closeAlert={() => setAlert(!alert)} />
          </div>
        )}
        <Formik enableReinitialize={Object.keys(userData).length > 0 ? true : false} initialValues={Object.keys(userData).length > 0 ? getBikeInsuranceInitialValues(userData) : bikeInsuranceInitialValues(values)} validationSchema={bikeInsuranceValidations(showExistingFields, showNcb, variants)} onSubmit={onSubmitHandler}>
          {(formik) => {
            return (
              <Form>
                <h2 className="py-3 m-0 text-center">Insure Your Drive</h2>
                <div className={styles.formMainWrapper}>
                  <div className={classNames(styles.formWrapper, 'py-4')}>
                    <motion.div {...routeAnimation} className="offset-lg-2">
                      <RadioSet name="c_customer_type" label="Customer Type" options={bikeInsuranceRadios.companyArray} defaultInput="I" />
                      <RadioSet name="c_plan" label="Plan Type" options={bikeInsuranceRadios.planArray} defaultInput="TP-1-OD-1" />
                      <div className={classNames('d-flex flex-wrap')}>
                        <InputDataList required name="c_make" label="Select Make" options={manufacturers} valueKey="c_make_code" displayKey="c_make" listName="MakeList" optionHanlder={optionHanlder} showInitial={true} handler={onChangeHandler} />
                        <InputDataList required name="c_model" label="Select Model" options={models} valueKey="c_model_code" displayKey="c_model" listName="ModelList" optionHanlder={optionHanlder} showInitial={true} dependentKey="c_make" />
                        <InputDataList
                          required
                          name="c_variant"
                          label="Select Variant"
                          options={variants}
                          valueKey="c_variant_code"
                          displayKey="c_variant"
                          // displayKey2="c_vehicle_CC"
                          listName="VarientList"
                          optionHanlder={optionHanlder}
                          showInitial={true}
                          dependentKey="c_model"
                        />
                        <InputDataList required name="c_fuel_type" label="Fuel Type" options={fuelType} listName="FuelType" optionHanlder={optionHanlder} showInitial={true} displayKey="c_fuel_type" dependentKey="c_variant" />
                        <ReactDateField3 required name="c_registration_date" startYear={2000} label="Registartion Date" maxDate={subMonths(new Date(), 6)} handleManufacturingDate={onChangeYearManufacturing} />
                        <InputDataList required name="c_place_of_registration" label="Select RTO" options={rtoLocations} valueKey="c_rto_location_code" displayKey="c_rto_location" displayKey2="c_rto_registration_code" listName="LocationsList" optionHanlder={optionHanlder} showInitial={false} />
                        <ReactDateFieldMonthYear required name="c_manufacture_year_month" label="Manufacture Month/Year" maxDate={addMonths(new Date(manufacturingDate), 0)} />
                      </div>
                      <div>
                        <RadioSet name="c_existing_policy" label="Do you have an existing policy" options={bikeInsuranceRadios.existingPolicyArrays} handler={existingPolicyHanlder} defaultInput={true} />
                      </div>
                      <div>
                        {showExistingFields && (
                          <div>
                            <div className="d-flex flex-wrap">
                              <ReactDateField3 required name="c_prev_policy_expire_date" startYear={2000} label="Prev Policy Expire Date" minDate={manufacturingDate} maxDate={addMonths(new Date(), 2)} />
                              <OptionsSelect required name="c_prev_previous_insurer" label="Previous Insurer" options={insurers} valueKey="c_prev_previous_insurer_code" displayKey="c_prev_previous_insurer" optionHanlder={optionHanlder} />
                            </div>
                            <div>
                              <RadioSet name="c_claim_last_year" label="Did you claim last year" options={bikeInsuranceRadios.claimLastYearArrays} handler={claimLastYearHanlder} defaultInput={false} />
                            </div>
                            {!showNcb && (
                              <div>
                                <Select required name="c_ncb" label="Select previous year NCB" optionHanlder={optionHanlder}>
                                  <option value="">Select</option>
                                  {bikeInsuranceRadios.ncbArray &&
                                    bikeInsuranceRadios.ncbArray.map((insurer, i) => {
                                      return (
                                        <option key={insurer.uniqueName} value={insurer.inputValue}>
                                          {insurer.displayValue}% ({i === 0 ? `less than 1 year` : i + ' year age'})
                                        </option>
                                      );
                                    })}
                                </Select>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="d-flex flex-wrap">
                        <Input required name="c_full_name" label="Full Name" />
                        <Input required name="c_mobile" label="Mobile" />
                        <Input required name="c_email" label="Email" />
                      </div>
                      <div style={{ margin: '10px 0px 20px 10px' }}>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                          Submit
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default BikeInsuranceForm1;
