import carInsurance from '../../public/car-insurance.svg';
import styles from './CarInsurancePage.module.scss';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CarNumberForm from '../../components/CarNumber/CarNumberForm';
import CarInsuranceForm from 'components/CarInsurance/CarInsuranceForm';
import { GetKotakRolloverQuotes, GetPremiumQuotes } from 'helper/api';
import { useRouter } from 'next/router';
import NewCarInsuranceForm from 'containers/NewCarInsurancePage/NewCarInsurancePage';
import { EncryptObject } from 'helper/hashing';

const CarInsurancePage = ({ vehiclemanufacturers }) => {
  const router = useRouter();
  const [carNumber, setCarNumber] = useState(null);
  const [isRollover, setIsRollover] = useState(false);
  const [carDetails, SetCarDetails] = useState({});
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [showNewCarForm, setShowNewCarForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carNumberForm, setCarNumberForm] = useState(true);
  // console.log('router', router.query.jijejsnsdaj.length);
  useEffect(() => {
    if (window.location.search.length > 0) {
      setShowInsuranceForm(true);
      setCarNumberForm(false);
      setShowNewCarForm(false);
    }
  }, []);

  const carNumberHandler = async (value) => {
    setIsLoading(true);

    const c_registration_number = `${value.state_code}${value.rto_code}${value.series}${value.number}`;
    // setCarNumber(c_registration_number );
    try {
      const { data } = await axios.get(`http://localhost:3000/api/vehicle/${c_registration_number}`);
      console.log('data', data);
      if (data.status === 200) {
        if (data.data.c_vehicle_category_desc === 'Motor Car(LMV)') {
          SetCarDetails(data.data);
          setCarNumberForm(false);
          setShowInsuranceForm(true);
          setIsLoading(false);
        } else {
          alert('You have entered a valid car number');
        }
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const carNumberHandler2 = () => {
    setCarNumberForm(false);
    setShowInsuranceForm(true);
    setIsRollover(true);
  };

  const carInsuranceHandler = async (values) => {
    const planType = values.c_plan.split('-');
    const client_object = {
      ...values,
      c_make_model: `${values.c_make},${values.c_model},${values.c_variant}, ${values.c_fuel_type}`,
      c_own_damage: planType[3],
      c_third_party_damage: planType[1],
      c_policy_tenure: planType[3],
      c_rollover: true,
      c_registration_number: carNumber,
    };
    // console.log(client_object);

    const encrypt = EncryptObject(client_object);

    router.push({
      pathname: '/car-insurance/quotations',
      query: {
        quotations: encrypt,
      },
    });
    setIsLoading(true);
  };

  const newCarHandler = () => {
    setIsRollover(false);
    setShowNewCarForm(true);
    setShowInsuranceForm(false);
    setCarNumberForm(false);
  };
  return (
    <div className={styles.carBannerWrapper}>
      {carNumberForm && (
        <div className={styles.carImageWrapper}>
          <Image src={carInsurance} alt="Lmv Insurance" width="600" height="400" />
          <CarNumberForm submitHandler={carNumberHandler} linkHandler={carNumberHandler2} isLoading={isLoading} newCarHandler={newCarHandler} />
        </div>
      )}
      <div>{showInsuranceForm && <CarInsuranceForm setInsurance={carInsuranceHandler} values={carDetails} isLoading={isLoading} />}</div>
      <div>{showNewCarForm && <NewCarInsuranceForm values={carDetails} isLoading={isLoading} />}</div>
    </div>
  );
};

export default CarInsurancePage;
