import TwoWheelerQuotationPage from 'containers/TwoWheelerQuotation/TwoWheelerQuotation';
import { GetPcPremiumQuotes } from 'helper/api';
import { DecryptObject } from 'helper/hashing';

const index = (props) => {
  return <TwoWheelerQuotationPage props={props} />;
};

export default index;

export async function getServerSideProps(context) {
  const query = context.req.__NEXT_INIT_QUERY.quotations;
  const decryped = DecryptObject(query);
  // console.log('decrypt', decryped);
  const response = await GetPcPremiumQuotes(decryped);
  return {
    props: {
      query: decryped,
      response,
    },
  };
}
