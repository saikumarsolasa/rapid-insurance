import { Button } from '@mui/material';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { fadeIn, routeAnimation } from '../../helper/animation';
import { GetAllLocations, GetInsuranceCompanies, GetManufacturers, GetModels, GetVarients } from 'helper/api';
import { newBikeInsuranceRadios, newBikeInsuranceInitialValues } from 'helper/formik-initial-values';
import { newBikeInsuranceValidation } from 'helper/formik-validations';
import { Input } from 'helper/formikFields/input';
import { useEffect, useState } from 'react';
import styles from './NewBikeInsurancePage.module.scss';
import addMonths from 'date-fns/addMonths';
import { InputDataList } from 'helper/formikFields/inputDataList';
import { RadioSet } from 'helper/formikFields/radio';
import { ReactDateField3 } from 'helper/formikFields/reactDateField';
import { Select } from 'helper/formikFields/select';
import { ReactDateFieldMonthYear } from 'helper/formikFields/dateField';

const NewBikeInsuranceForm = (props) => {
  const { setInsurance, values, isLoading } = props;

  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);

  const [selectedMake, setSelectedMake] = useState({});
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedVarient, setSelectedVarient] = useState({});
  const [makeValue, setMakeValue] = useState('');
  const [fuelType, setFuelType] = useState([]);

  useEffect(async () => {
    if (Object.keys(values).length === 0 || makeValue.length === 0) {
      try {
        const response = await GetManufacturers();
        setManufacturers(response.makes);
      } catch (error) {
        alert(error.message);
      }
    }
  }, [makeValue]);

  const optionHanlder = async (value, displayKey, displayKey2, valueKey) => {
    if (displayKey === 'c_make') {
      let filteredMake = null;
      manufacturers.map((option) => {
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
        // console.log('fil', filteredModel);
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
        setFuelType((values) => [...values, filteredVariant.c_fuel_type]);
        setSelectedVarient(filteredVariant);
      }
    }
  };

  const keyDownHandler = (event) => {
    console.log('event');
  };

  const onSubmitHandler = (values) => {
    console.log('values', values);
    const selectedValues = {
      ...selectedMake,
      ...selectedModel,
      ...selectedVarient,
      ...values,
    };

    console.log(selectedValues);
    setInsurance(selectedValues);
  };
  const onChangeHandler = (value) => {
    setMakeValue(value);
  };

  return (
    <div className={styles.MainWrapper}>
      <Formik initialValues={newBikeInsuranceInitialValues()} validationSchema={newBikeInsuranceValidation()} onSubmit={onSubmitHandler}>
        {(formik) => {
          return (
            <Form>
              <h2 className="py-3 m-0 text-center">Insure Your Drive</h2>
              <div className={styles.formMainWrapper}>
                <div className={classNames(styles.formWrapper, 'py-4')}>
                  <motion.div {...routeAnimation} className="offset-lg-2">
                    <RadioSet name="c_customer_type" label="Customer Type" options={newBikeInsuranceRadios.companyArray} defaultInput="I" />
                    <RadioSet name="c_plan" label="Plan Type" options={newBikeInsuranceRadios.planArray} defaultInput="TP-5-OD-1" />
                    <div className={classNames('d-flex flex-wrap')}>
                      <InputDataList name="c_make" label="Select Make" options={manufacturers} valueKey="c_make_code" displayKey="c_make" listName="MakeList" optionHanlder={optionHanlder} showInitial={true} handler={onChangeHandler} />
                      <InputDataList name="c_model" label="Select Model" options={models} valueKey="c_model_code" displayKey="c_model" listName="ModelList" optionHanlder={optionHanlder} showInitial={true} dependentKey="c_make" />
                      <InputDataList name="c_variant" label="Select Variant" options={variants} valueKey="c_variant_code" displayKey="c_variant" listName="VarientList" optionHanlder={optionHanlder} showInitial={true} dependentKey="c_model" />
                      <Select name="c_fuel_type" label="Fuel Type">
                        <option value="">Select</option>
                        {fuelType.length > 0 &&
                          fuelType.map((type) => {
                            return (
                              <option key={type} value={type.toLowerCase()}>
                                {type}
                              </option>
                            );
                          })}
                      </Select>
                      {/* <ReactDateField3 
                        name="c_registration_date"
                        label="Registartion Date"
                      /> */}
                      <ReactDateFieldMonthYear name="c_manufacture_year_month" label="Manufacture Month/Year" maxDate={addMonths(new Date(), 0)} />
                    </div>
                    <div className="d-flex flex-wrap">
                      <Input name="c_full_name" label="Full Name" />
                      <Input name="c_mobile" label="Mobile" />
                      <Input name="c_email" label="Email" />
                    </div>
                    <div style={{ margin: '10px 0px 20px 10px' }}>
                      <button type="submit" className="btn btn-primary">
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
  );
};

export default NewBikeInsuranceForm;
