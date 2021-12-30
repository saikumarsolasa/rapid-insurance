import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import styles from './CarInsuranceForm.module.scss';
import { GetPcManufacturers, GetInsuranceCompanies, GetPcModels, GetPcVarients, GetPcAllLocations } from 'helper/api';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { fadeIn, routeAnimation } from '../../helper/animation';
import { Input } from 'helper/formikFields/input';
import { RadioSet } from 'helper/formikFields/radio';
import { OptionsSelect, Select } from 'helper/formikFields/select';
import { ReactDateField3 } from 'helper/formikFields/reactDateField';
import { ReactDateFieldMonthYear } from 'helper/formikFields/dateField';
import { InputDataList } from 'helper/formikFields/inputDataList';
import { carInsuranceRadios, carInsuranceInitialValues, getCarInsuranceInitialValues } from 'helper/formik-initial-values';
import { addMonths, subMonths } from 'date-fns';
import { carInsuranceValidations } from 'helper/formik-validations';
import AlertDialog from 'components/Dailog/AlertDialog';
import { calculateYears } from 'helper/formatDate';
import { useRouter } from 'next/router';
import { DecryptObject } from 'helper/hashing';

const CarInsuranceForm = (props) => {
  const { setInsurance, values, isLoading } = props;
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [placeOfRegistration, setPlaceOfRegistration] = useState([]);
  const [variants, setVariants] = useState([]);
  const [insurers, setInsurers] = useState([]);
  const [rtoLocations, setRtoLocations] = useState([]);
  const [selectedMake, setSelectedMake] = useState({});
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedVarient, setSelectedVarient] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedInsurer, setSelectedInsurer] = useState({});
  const [selectedTpInsurer, setSelectedTpInsurer] = useState({});
  const [fuelType, setFuelType] = useState([]);
  const [showExistingFields, setShowExistingFields] = useState(true);
  const [showNcb, setShowNcb] = useState(false);
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [makeValue, setMakeValue] = useState('');
  const [planTypeAlert, setPlanTypeAlert] = useState(false);
  const [existingPolicyAlert, setExistingPolicyAlert] = useState(false);
  const [comprehensivePolicy, setComprehensivePolicy] = useState(true);
  const [tpPolicyInsurer, setTpPolicyInsurer] = useState(false);
  const [planType, setPlanType] = useState('TP-1-OD-1');
  const [policyExpireAlert, setPolicyExpireAlert] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(async () => {
    const response = await GetPcManufacturers();
    setManufacturers(response.makes);
    const response1 = await GetPcAllLocations();
    setRtoLocations(response1.data);
    const response2 = await GetInsuranceCompanies();
    setInsurers(response2.data);
  }, []);

  useEffect(async () => {
    if (Object.keys(router.query).length > 0) {
      const data = await DecryptObject(router.query.jijejsnsdaj);
      setUserData(data);
    }
  }, []);

  const optionHanlder = async (value, displayKey, displayKey2, valueKey, name) => {
    if (displayKey === 'c_make') {
      let filteredMake = '';
      manufacturers.map((option) => {
        if (option[displayKey] === value) {
          filteredMake = option;
        }
      });
      if (filteredMake) {
        setSelectedMake(filteredMake);
        const response = await GetPcModels(filteredMake.c_make_code);
        if (response?.models && response.models.length > 0) {
          setModels(response.models);
        } else {
          alert('No models found for given manufacture');
        }
      }
    }

    if (displayKey === 'c_model') {
      let filteredModel = '';
      models.map((option) => {
        if (option[displayKey].toString() === value) {
          filteredModel = option;
        }
      });

      if (filteredModel) {
        setSelectedModel(filteredModel);
        const response = await GetPcVarients(selectedMake.c_make_code, filteredModel.c_model_code);
        if (response?.variants) {
          setVariants(response.variants);
        } else {
          alert('Something went wrong or No variants found for given model');
        }
      }
    }

    if (displayKey === 'c_variant') {
      let filteredVariant = '';
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
      let filteredLocation = '';
      let registartionValue = value.split(' ')[1];
      rtoLocations.map((option) => {
        if (option[displayKey2] === registartionValue) {
          filteredLocation = option;
        }
      });
      if (filteredLocation) {
        setSelectedLocation(filteredLocation);
      }
    }

    if (displayKey === 'c_prev_previous_insurer') {
      let filteredInsurer = '';
      insurers.map((option) => {
        if (option[valueKey] === value) {
          filteredInsurer = option;
        }
      });
      if (filteredInsurer) {
        setSelectedInsurer(filteredInsurer);
      }
    }

    if (name === 'c_tp_previous_insurer') {
      let filteredTpInsurer = '';
      insurers.map((option) => {
        if (option[valueKey] === value) {
          filteredTpInsurer = option;
        }
      });
      if (filteredTpInsurer) {
        const prevTpInsurer = {
          c_tp_previous_insurer: filteredTpInsurer.c_prev_previous_insurer,
          c_tp_previous_insurer_code: filteredTpInsurer.c_prev_previous_insurer_code,
        };
        setSelectedTpInsurer(prevTpInsurer);
      }
    }
  };

  const onChangeHandler = (value) => {
    setMakeValue(value);
  };

  const onChangeYearManufacturing = (value) => {
    setManufacturingDate(value);
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

  const onSubmitHandler = (value) => {
    const manufacturingDate = value.c_manufacture_year_month.split('/');
    const yearSpan = calculateYears(new Date(value.c_manufacture_year_month), new Date(value.c_prev_policy_expire_date));
    if (yearSpan < 1) {
      setPolicyExpireAlert(true);
    } else {
      const selectedValues = {
        ...selectedMake,
        ...selectedModel,
        ...selectedVarient,
        ...selectedLocation,
        ...selectedInsurer,
        ...selectedTpInsurer,
        ...value,
      };
      setInsurance(selectedValues);
    }
  };

  const getSelectedPlanType = (value) => {
    setPlanType(value);
    if (value === 'TP-0-OD-1') {
      setPlanTypeAlert(true);
      setTpPolicyInsurer(true);
      setComprehensivePolicy(false);
      setShowExistingFields(true);
    }
    if (value === 'TP-1-OD-1') {
      setComprehensivePolicy(true);
      setTpPolicyInsurer(false);
      setShowExistingFields(true);
    }
    if (value === 'TP-1-OD-0') {
      setTpPolicyInsurer(false);
      setComprehensivePolicy(false);
      setShowExistingFields(true);
    }
  };

  const closeAlert = () => {
    setPlanTypeAlert(false);
    setExistingPolicyAlert(false);
    setPolicyExpireAlert(false);
  };

  const existingComprehensivePolicyHanlder = (value) => {
    if (value === 'false') {
      setExistingPolicyAlert(true);
      setShowExistingFields(false);
    }
    if (value === 'true') {
      setShowExistingFields(true);
    }
  };

  return (
    <>
      <div className={styles.carInsuranceWrapper}>
        <Formik enableReinitialize={Object.keys(userData).length > 0 ? true : false} initialValues={Object.keys(userData).length > 0 ? getCarInsuranceInitialValues(userData) : carInsuranceInitialValues(values)} onSubmit={onSubmitHandler} validationSchema={carInsuranceValidations(showExistingFields, showNcb, variants, planType)}>
          {(formik) => {
            return (
              <Form>
                <h2 className="py-3 m-0 text-center">Insure Your Drive</h2>
                <div className={styles.formMainWrapper}>
                  <div className={classNames(styles.formWrapper, 'py-4')}>
                    <motion.div {...routeAnimation} className="offset-lg-2">
                      <RadioSet name="c_customer_type" label="Customer Type" options={carInsuranceRadios.companyArray} defaultInput="I" />
                      <RadioSet name="c_plan" handler={getSelectedPlanType} label="Plan Type" options={carInsuranceRadios.planArray} defaultInput="TP-1-OD-1" />
                      <div className={classNames('d-flex flex-wrap')}>
                        <InputDataList required name="c_make" label="Select Make" options={manufacturers} valueKey="c_make_code" displayKey="c_make" listName="MakeList" optionHanlder={optionHanlder} showInitial={true} handler={onChangeHandler} />
                        <InputDataList required name="c_model" label="Select Model" options={models} valueKey="c_model_code" displayKey="c_model" listName="ModelList" optionHanlder={optionHanlder} showInitial={true} dependentKey="c_make" />
                        <InputDataList required name="c_variant" label="Select Variant" options={variants} valueKey="c_variant_code" displayKey="c_variant" listName="VarientList" optionHanlder={optionHanlder} showInitial={true} dependentKey="c_model" />
                        <InputDataList required name="c_fuel_type" label="Fuel Type" options={fuelType} listName="FuelType" optionHanlder={optionHanlder} showInitial={true} displayKey="c_fuel_type" dependentKey="c_variant" />
                        <ReactDateField3 required name="c_registration_date" startYear={2000} label="Registartion Date" maxDate={subMonths(new Date(), 6)} handleManufacturingDate={onChangeYearManufacturing} />
                        <InputDataList required name="c_place_of_registration" label="Select RTO" options={rtoLocations} valueKey="c_rto_location_code" displayKey="c_rto_location" displayKey2="c_rto_registration_code" listName="LocationsList" optionHanlder={optionHanlder} showInitial={false} />
                        <ReactDateFieldMonthYear required name="c_manufacture_year_month" label="Manufacture Month/Year" maxDate={addMonths(new Date(manufacturingDate), 0)} />
                      </div>
                      {!comprehensivePolicy && (
                        <div>
                          <RadioSet name="c_existing_policy" label="Do you have an existing policy" options={carInsuranceRadios.existingPolicyArrays} handler={existingPolicyHanlder} defaultInput={true} />
                        </div>
                      )}
                      {comprehensivePolicy && (
                        <div>
                          <RadioSet name="c_existing_policy" label='Do you have an existing comprehensive policy (Select "NO" if ownership transfer)' options={carInsuranceRadios.existingComprehensivePolicyArrays} handler={existingComprehensivePolicyHanlder} defaultInput={true} />
                        </div>
                      )}
                      <div>
                        {showExistingFields && (
                          <div>
                            <div className="d-flex flex-wrap">
                              <ReactDateField3 required name="c_prev_policy_expire_date" startYear={new Date(subMonths(new Date(), 4)).getFullYear()} label="Prev Policy Expire Date" minDate={subMonths(new Date(), 4)} maxDate={addMonths(new Date(), 2)} />
                              <OptionsSelect required name="c_prev_previous_insurer" label="Previous Insurer" options={insurers} valueKey="c_prev_previous_insurer_code" displayKey="c_prev_previous_insurer" optionHanlder={optionHanlder} />
                            </div>
                            <div>
                              <RadioSet name="c_claim_last_year" label="Did you claim last year" options={carInsuranceRadios.claimLastYearArrays} handler={claimLastYearHanlder} defaultInput={false} />
                            </div>
                            {!showNcb && (
                              <div>
                                <Select required name="c_ncb" label="Select previous year NCB" optionHanlder={optionHanlder}>
                                  <option value="">Select</option>
                                  {carInsuranceRadios.ncbArray &&
                                    carInsuranceRadios.ncbArray.map((insurer, i) => {
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
                        {tpPolicyInsurer && (
                          <div className="d-flex flex-wrap">
                            <OptionsSelect required name="c_tp_previous_insurer" label="TP Policy Insurer" options={insurers} valueKey="c_prev_previous_insurer_code" displayKey="c_prev_previous_insurer" optionHanlder={optionHanlder} />
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
      {planTypeAlert && <AlertDialog handleClose={closeAlert} data="You can buy only an OD policy. If you have an active TP policy coverage up to next year." />}
      {existingPolicyAlert && <AlertDialog handleClose={closeAlert} data="Your policy will not issue instantly. It will issue after inspection." />}
      {policyExpireAlert && <AlertDialog handleClose={closeAlert} data="Policy expiry date should be 1 year greater than manufacturing date." />}
    </>
  );
};

export default CarInsuranceForm;
