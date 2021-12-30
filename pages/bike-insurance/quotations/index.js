import { DecryptObject } from 'helper/hashing';
import TwoWheelerQuotationPage from 'containers/TwoWheelerQuotation/TwoWheelerQuotation';
import { GetPremiumQuotes } from 'helper/api';
import { format } from 'date-fns';
import formatDate from 'helper/formatDate';

const TwoWheelerQuotation = (props) => {
  return (
    <div>
      <TwoWheelerQuotationPage props={props} />
    </div>
  );
};

export default TwoWheelerQuotation;

export async function getServerSideProps(context) {
  const query = context.req.__NEXT_INIT_QUERY.quotations;
  const decryped = DecryptObject(query);

  const response = await GetPremiumQuotes(decryped);
  return {
    props: {
      query: decryped,
      response,
    },
  };
}
