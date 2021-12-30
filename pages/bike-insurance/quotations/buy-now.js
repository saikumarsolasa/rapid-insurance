import BikeBuyNow from 'containers/BikeInsuranceBuyNowPage/BikeBuyNow';
import { useRouter } from 'next/router';
import { DecryptObject } from 'helper/hashing';

const BikeInsurancePage = ({ decrypt }) => {
  return <BikeBuyNow defaultValue={decrypt} />;
};

export default BikeInsurancePage;

export async function getServerSideProps(context) {
  const encryptedString = context.req.__NEXT_INIT_QUERY.jijejsnsdaj;
  const jsonObject = DecryptObject(encryptedString);

  return {
    props: {
      decrypt: jsonObject,
    },
  };
}
