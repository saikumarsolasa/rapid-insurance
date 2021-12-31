import axios from 'axios';
import RapidInsuranceService from '../config/index';

export const GetManufacturers = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + `/api/vehicle/two-wheeler/manufacturers`);
  return data;
};

export const GetModels = async (manufacturer_code) => {
  const values = { manufacturer_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + `/api/vehicle/two-wheeler/models`, values);
  return data;
};

export const GetVarients = async (manufacturer_code, model_code) => {
  const values = { manufacturer_code, model_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/vehicle/two-wheeler/variants', values);
  return data;
};

export const GetPcManufacturers = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/vehicle/private-car/manufacturers');
  return data;
};

export const GetPcModels = async (manufacturer_code) => {
  const values = { manufacturer_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/vehicle/private-car/models', values);
  return data;
};

export const GetPcVarients = async (manufacturer_code, model_code) => {
  const values = { manufacturer_code, model_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/vehicle/private-car/variants', values);
  return data;
};

/////////////////////////////// RTO Details

export const GetState = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/states');
  return data;
};

export const GetLocations = async (state_code) => {
  const values = { state_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/locations', values);
  return data;
};

export const GetAllLocations = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/all-locations');
  return data;
};

export const GetPcState = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/pc-states');
  return data;
};

export const GetPcLocations = async (state_code) => {
  const values = { state_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/pc-locations', values);
  return data;
};

export const GetPcAllLocations = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/pc-all-locations');
  return data;
};

export const GetTwState = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/tw-states');
  return data;
};

export const GetTwLocations = async (state_code) => {
  const values = { state_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/tw-locations', values);
  return data;
};

export const GetTwAllLocations = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/pc-all-locations');
  return data;
};

export const GetRtoDetails = async (location_code) => {
  const values = { location_code };
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/rto/rto-details', values);
  return data;
};

////////////////////////////////// Insurance

export const GetInsuranceCompanies = async () => {
  const { data } = await axios.get(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/insurance_companies');
  return data;
};

export const GetPremiumQuotes = async (values) => {
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/two-wheeler/premium', values);
  return data;
};

export const GetPcPremiumQuotes = async (values) => {
  console.log('val', values);
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/private-car/premium', values);
  return data;
};

export const PostTwoWheelerBuyNow = async (values) => {
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/two-wheeler/buy-now', values);
  return data;
};

export const GetOtp = async (values) => {
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/auth/send-otp', values);
  return data;
};

export const VerifyOtp = async (values) => {
  const { data } = await axios.post(RapidInsuranceService.RapidInsuranceService.baseURL + '/api/auth/verify-otp', values);
  return data;
};

//////////////////////////// KOTAK API's

export const KotakSaveProposalAndPayment = async (values) => {
  const { data } = await axios.post('/api/kotak/two-wheeler/save-proposal-and-payment', values);
  return data;
};

export const KotakDownloadPolicyDocument = async (values) => {
  const { data } = await axios.post('/api/kotak/two-wheeler/policy-document', values);
  return data;
};

export const VerifyKotakTransaction = async (values) => {
  const { key, command, hash, var1 } = values;
  const { data } = await axios.post('/api/kotak/payment/verify-payment', { key, command, hash, var1 });
  return data;
};

///////////////////////////// Transactions API's
export const TransactionIdVerify = async (values) => {
  const { data } = await axios.post('/api/transactions/txnid-verify', {
    txnid: values,
  });
  return data;
};

export const GenerateTransactionId = async () => {
  const { data } = await axios.get('/api/transactions/generate-txnid');
  return data;
};

///////////////////////////// Customer API's

export const VerifyCRN = async (values) => {
  const { data } = await axios.post('/api/customer/verify-crn', {
    crn: values,
  });
  return data;
};

export const GenerateCRN = async () => {
  const { data } = await axios.get('/api/customer/generate-crn');
  return data;
};
