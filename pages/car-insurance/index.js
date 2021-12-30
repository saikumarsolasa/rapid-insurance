import RouteAnimation from 'components/RouteAnimation/RouteAnimation';
import { GetPcManufacturers } from 'helper/api';
import CarInsurance from '../../containers/CarInsurancePage/CarInsurancePage';
import { withRouter } from 'next/router';

const CarInsurancePage = ({ data }) => {
  return (
    <RouteAnimation>
      <CarInsurance vehiclemanufacturers={data} />
    </RouteAnimation>
  );
};

export default withRouter(CarInsurancePage);

export async function getStaticProps(context) {
  const data = await GetPcManufacturers();
  return {
    props: {
      // vehiclemanufacturers: data,
      data,
    },
  };
}
