import { GetPcPremiumQuotes, GetPremiumQuotes, GetVarients, GetPcVarients } from 'helper/api';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import QuotationCard from 'components/QuotationCard/QuotationCard';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './TwoWheelerQuotation.module.scss';
import FullScreenLoading from 'components/Dailog/FullScreenLoading';
import QuotationCardDummy from 'components/QuotationCard/QuotationCardDummy';
import { useRouter } from 'next/router';
import { EncryptObject } from 'helper/hashing';
import { quotationSortingOptions } from 'helper/constants';
import { quotations } from 'helper/constants';
import QuotationDetails from 'components/Dailog/QuotationDetails';
import sortingFunction, { defaultSort } from 'helper/sortingFunction';
import Addons from 'components/Dailog/addons';
import SummaryDetails from 'components/Dailog/SummaryDetails';

const TwoWheelerQuotationPage = ({ props }) => {
  // console.log('props', props);
  const initialValues = {
    c_request_idv: 0,
    c_personal_accident_cover: true,
    c_limit_tp_damage: false,
    c_unnamed_passenger: 0,
    c_legal_liability_pd: false,
    c_electrical_accessories: 0,
    c_non_electrical_accessories: 0,
    c_anti_theif_device: false,
    c_voluntry_excess: 0,
  };

  const navHeaderValues = {
    c_make_model: props.query.c_make_model,
    c_ncb: props.query.c_ncb,
    c_place_of_registration: props.query.c_place_of_registration,
  };

  const [sideBarValues, setSideBarValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [varients, setVarients] = useState([]);
  const [quote, setQuote] = useState(null);
  const [quotationSortingValue, setQuotationSortingValue] = useState('P-L-H');
  const [showQuotationDetails, setShowQuotationDetails] = useState(false);
  const [data, setData] = useState({});
  const [sortQuotationData, setSortQuotationData] = useState([]);
  const [errorFreeArray, setErrorFreeArray] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [displayQuotations, setDisplayQuotation] = useState([]);
  const [showCoverItems, setShowCoverItems] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const [minMaxValues, setMinMaxValues] = useState([]);
  const router = useRouter();
  const [customerDetails, setCustomerDetails] = useState(false);

  const insuranceType = router.pathname.split('/')[1];

  useEffect(async () => {
    let errorFreeData = [];
    let errorData = [];

    if (props?.response?.status === 200) {
      props?.response?.data?.map((obj, index) => {
        if (obj.error === 'false' || obj.error === false) {
          errorFreeData.push(obj.data);
        } else {
          errorData.push(obj.data);
        }
      });
    }
    setErrorFreeArray(errorFreeData);
    setErrorArray(errorData);
    setDisplayQuotation([...errorFreeData, ...quotations]);
    setSortQuotationData([...errorFreeData, ...quotations]);
    const varientResponse = await GetVarients(props.query.manufacturer_code, props.query.model_code);
    setVarients(varientResponse.varients);
    setMinMaxValues([...errorFreeData, ...quotations]);
  }, []);

  const sortingQuotations = (value, displayQuotations) => {
    let sortingArray;
    switch (value) {
      case 'P-L-H':
        sortingArray = sortingFunction(displayQuotations, 'c_net_premium', 1);
        break;
      case 'P-H-L':
        sortingArray = sortingFunction(displayQuotations, 'c_net_premium');
        break;
      case 'IDV-L-H':
        sortingArray = sortingFunction(displayQuotations, 'c_idv', 1);
        break;
      case 'IDV-H-L':
        sortingArray = sortingFunction(displayQuotations, 'c_idv');
        break;
      default:
        sortingArray = sortingFunction(displayQuotations, 'c_net_premium', 1);
        break;
    }
    setSortQuotationData(sortingArray);
  };

  useEffect(() => {
    sortingQuotations('P-L-H', displayQuotations);
  }, [displayQuotations]);

  useEffect(() => {
    setMinMaxValues(defaultSort(minMaxValues, 'c_net_premium'));
  }, [minMaxValues]);

  const onChangeHandler = (event) => {
    if (event.target.value === 'false' || event.target.value === 'true') {
      setSideBarValues({
        ...sideBarValues,
        [event.target.name]: event.target.value === 'false' ? false : true,
      });
      return;
    }

    if (typeof event.target.value === 'string' && event.target.type === 'radio') {
      setSideBarValues({
        ...sideBarValues,
        [event.target.name]: Number(event.target.value),
      });
      return;
    }
    if (typeof event.target.value === 'string' && event.target.type === 'number') {
      setSideBarValues({
        ...sideBarValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onResetFormHandler = () => {
    setSideBarValues({
      ...sideBarValues,
      ...initialValues,
    });
  };

  const sidebarSubmitHandler = async (event) => {
    event.preventDefault();
    setShowCoverItems(false);
    setShowAddons(true);
    let responseArray = [];
    const systemIdv = {
      c_system_idv: props.response.data[0].data.c_system_idv,
    };
    const client_object = { ...sideBarValues, ...props.query, ...systemIdv };
    try {
      setIsLoading(true);
      let response;
      if (insuranceType !== 'car-insurance') {
        response = await GetPremiumQuotes(client_object);
      } else {
        response = await GetPcPremiumQuotes(client_object);
      }

      if (response.status === 200) {
        setDisplayQuotation([response.data[0].data, ...quotations]);
        setMinMaxValues([response.data[0].data, ...quotations]);
        window.scrollTo(0, 0);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      window.scrollTo(0, 0);
      setIsLoading(false);
    }
  };

  const onBuyHandler = async (values) => {
    const client_object = { ...props.query, ...sideBarValues, ...values };
    const encrypted = EncryptObject(client_object);
    router.push({
      pathname: '/bike-insurance/quotations/buy-now',
      query: { jijejsnsdaj: encrypted },
    });
  };

  const onChangeSelectHandler = (e) => {
    sortingQuotations(e.target.value, displayQuotations);
    setQuotationSortingValue(e.target.value);
  };

  const onClickInfoHandler = (data) => {
    setShowQuotationDetails(true);
    setData(data);
  };

  const alertCloseHandler = () => {
    setShowQuotationDetails(false);
    setShowCoverItems(false);
    setCustomerDetails(false);
  };

  const showCoverItemsHandler = () => {
    setShowCoverItems(true);
  };

  const showCustomerDetails = () => {
    setCustomerDetails(true);
  };

  const redirectToBikeInsurancePage = () => {
    const form_object = { ...props.query };
    const encrypted = EncryptObject(form_object);
    if (insuranceType === 'car-insurance') {
      return router.push({
        pathname: '/car-insurance',
        query: { jijejsnsdaj: encrypted },
      });
    } else {
      return router.push({
        pathname: '/bike-insurance',
        query: { jijejsnsdaj: encrypted },
      });
    }
  };

  return (
    <div className={styles.tw_quote_wrapper}>
      {isLoading && <FullScreenLoading />}
      <div className={styles.quotation_section}>
        <div className={styles?.header_section}>
          <div>
            <p>
              CRN: <b>5419889</b>
            </p>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={styles?.vehicle_section}>
            <p>
              VEHICLE: <b>{props.query.c_make_model}</b>
            </p>
          </div>
          <div>
            <select>
              <option value="">Varient</option>
              {varients?.map((value) => {
                if (value.varient_code == props.query.varient_code) {
                  return (
                    <option selected="selected" key={value.varient_code} value={value.varient_code}>
                      {value.varient}
                    </option>
                  );
                }
                return (
                  <option key={value.varient_code} value={value.varient_code}>
                    {value.varient}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p>
              RTO: <b>{props.query.c_place_of_registration}</b>
            </p>
          </div>
          <div>
            <p>
              NEW NCB: <b>{`${props.query.c_ncb}%`}</b>
            </p>
          </div>
          <div>
            <p>
              PREMIUM:{' '}
              <b>
                {`${minMaxValues[0]?.c_net_premium}`} -{`${minMaxValues[minMaxValues.length - 1]?.c_net_premium}`}
              </b>
            </p>
          </div>
        </div>
        <Divider classes={styles.divider} />
        <div className={styles.filter_section}>
          <div className={styles.no_of_insurances}>
            <p>Insurer: 7</p>
          </div>
          <div className={styles.filter}>
            <Button variant="contained" size="small" onClick={redirectToBikeInsurancePage}>
              Edit
            </Button>
            <Button variant="outlined" size="small" onClick={showCoverItemsHandler}>
              cover
            </Button>
            <Button variant="outlined" size="small" onClick={showCustomerDetails}>
              Summary
            </Button>
            <p>Sort by:</p>
            <select
              onChange={(e) => {
                onChangeSelectHandler(e);
              }}
            >
              {/* <option value="">Sort by premium or IDV</option> */}
              {quotationSortingOptions.map((list, index) => {
                return (
                  <option value={list.value} key={index}>
                    {list.display}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles?.titles_section}>
          <div className={styles.plan}>
            <p>Insurance & Plan</p>
          </div>
          <div className={styles.addons}>
            <p>Addons</p>
          </div>
          <div className={styles.premium}>
            <p>Premium/Year Excl.Tax</p>
          </div>
        </div>
        {/* {console.log('srt',sortQuotationData)} */}
        <div className={styles?.insurance_cards_section}>
          {displayQuotations.length > 0 ? (
            sortQuotationData.map((quotation, index) => {
              return (
                <div className={styles.insurance_card} key={quotation?.c_plan_name}>
                  <input className={classNames('form-check-input', styles.checkbox)} type="checkbox" value="" />
                  <QuotationCard data={quotation} onSubmitHandler={onBuyHandler} showAddons={showAddons} handler={() => onClickInfoHandler(quotation)} />
                </div>
              );
            })
          ) : (
            <h2>No Quotations Found</h2>
          )}
        </div>
      </div>
      {showQuotationDetails && <QuotationDetails data={data} handleClose={alertCloseHandler} />}
      {showCoverItems && <Addons data={sideBarValues} handler={onChangeHandler} closeDialogHandler={alertCloseHandler} submitHandler={sidebarSubmitHandler} resetHandler={onResetFormHandler} />}
      {customerDetails && <SummaryDetails data={props} handler={alertCloseHandler} />}
    </div>
  );
};

export default TwoWheelerQuotationPage;
