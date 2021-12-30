import styles from './BikeInsurancePage.module.scss';
import bikeInsurance from 'public/bike-insurance.svg';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BikeNumberForm from 'components/BikeNumber/BikeNumberForm';
import { useRouter } from 'next/router';
import BikeInsuranceForm1 from 'components/BikeInsurance/BikeInsuranceForm1';
import NewBikeInsuranceForm from 'containers/NewBikeInurancePage/NewBikeInsurancePage';
import { EncryptObject } from 'helper/hashing';

const BikeInsurancePage = ({ vehiclemanufacturers }) => {
  const router = useRouter();
  useEffect(() => {
    if (window.location.search.length > 0) {
      setShowInsuranceForm(true);
      setBikeNumberForm(false);
    }
  }, []);

  ///// Values State
  const [bikeNumber, setBikeNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRollover, setIsRollover] = useState(false);
  const [bikeDetails, SetBikeDetails] = useState({});
  const [newBikeForm, setNewBikeForm] = useState(false);

  ///// Form States
  const [bikeNumberForm, setBikeNumberForm] = useState(true);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);

  //////// Values Hanlders
  const bikeNumberHandler = async (value) => {
    setIsLoading(true);
    const c_registration_number = `${value.state_code}${value.rto_code}${value.series}${value.number}`;
    setBikeNumber(c_registration_number);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/vehicle/${c_registration_number}`);
      // console.log(data);
      if (data.status === 200) {
        if (data?.data?.c_vehicle_category_desc === 'M-Cycle/Scooter(2WN)') {
          SetBikeDetails(data.data);
          setBikeNumberForm(false);
          setShowInsuranceForm(true);
        } else if (data?.data?.c_no_cylinders === '4') {
          alert('You have entered a car number, Please enter a bike number');
        }
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const bikeNumberHandler2 = () => {
    setBikeNumberForm(false);
    setShowInsuranceForm(true);
    setIsRollover(true);
  };

  const bikeInsuranceHandler = async (values) => {
    const planType = values.c_plan.split('-');
    const client_object = {
      ...values,
      c_make_model: `${values.c_make},${values.c_model},${values.c_variant}, ${values.c_fuel_type}`,
      c_own_damage: planType[3],
      c_third_party_damage: planType[1],
      c_policy_tenure: planType[3],
      c_rollover: true,
      c_registration_number: bikeNumber,
    };

    // console.log(JSON.stringify(client_object));
    // console.log(client_object)

    const encrypt = EncryptObject(client_object);

    router.push({
      pathname: '/bike-insurance/quotations',
      query: {
        quotations: encrypt,
      },
    });
    setIsLoading(true);
  };

  const newBikeHandler = () => {
    setBikeNumberForm(false);
    setIsRollover(false);
    setNewBikeForm(true);
  };

  return (
    <>
      <div className={styles.bikeMainWrapper}>
        <div className={styles.contentWrapper}>
          {bikeNumberForm && (
            <div className={styles.bikeNumberForm}>
              <div className={styles.bikeImageWrapper}>
                <Image src={bikeInsurance} alt="Lmv Insurance" width="600" height="400" />
              </div>
              <div>
                <BikeNumberForm submitHandler={bikeNumberHandler} linkHandler={bikeNumberHandler2} isLoading={isLoading} newBikeHandler={newBikeHandler} />
              </div>
            </div>
          )}
          {showInsuranceForm && <BikeInsuranceForm1 setInsurance={bikeInsuranceHandler} values={bikeDetails} isLoading={isLoading} />}
          {newBikeForm && <NewBikeInsuranceForm setInsurance={bikeInsuranceHandler} values={bikeDetails} isLoading={isLoading} />}
        </div>
      </div>
    </>
  );
};

export default BikeInsurancePage;
