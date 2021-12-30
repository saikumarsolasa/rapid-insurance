import RouteAnimation from "components/RouteAnimation/RouteAnimation"
import { GetManufacturers } from "helper/api";
import BikeInsurancePage from "containers/BikeInsurancePage/BikeInsurancePage";
import { withRouter } from 'next/router'

const BikeInsurance = ({vehiclemanufacturers}) => {
    return (
        <RouteAnimation>
            <BikeInsurancePage vehiclemanufacturers={vehiclemanufacturers} />
        </RouteAnimation>
    )
}

export default withRouter(BikeInsurance)


export async function getServerSideProps(context) {
    const data = await GetManufacturers();
    return {
        props : {
            vehiclemanufacturers : data,
        }
    }
}