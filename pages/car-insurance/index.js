import RouteAnimation from 'components/RouteAnimation/RouteAnimation';
import { GetPcManufacturers } from 'helper/api';
import CarInsurance from '../../containers/CarInsurancePage/CarInsurancePage';
import { withRouter } from 'next/router';

const CarInsurancePage = ({ vehiclemanufacturers }) => {
  return (
    <RouteAnimation>
      <CarInsurance vehiclemanufacturers={vehiclemanufacturers} />
    </RouteAnimation>
  );
};

export default withRouter(CarInsurancePage);

export async function getServerSideProps(context) {
  const data = await GetPcManufacturers();
  return {
    props: {
      vehiclemanufacturers: data,
    },
  };
}
