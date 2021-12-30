import { formatMoney } from 'helper/formatMoney';
import { addYears, subDays } from 'date-fns';
import format from 'date-fns/format';
import styles from './PayNow.module.scss';

const VerifyDetails = ({ data }) => {
  // console.log(data);
  const startDate = data?.c_prev_policy_start_date;
  const endDate = data?.c_prev_policy_expire_date;
  return (
    <>
      <table className="table table-striped table-bordered table_items" style={{ borderCollapse: 'initial' }}>
        <tbody className="text-bold">
          <tr>
            <td className="h6">Name</td>
            <td className="h6">
              {data.c_title.toLocaleUpperCase()} {data?.c_first_name.toLocaleUpperCase()}
            </td>
          </tr>
          <tr>
            <td className="h6">Vehicle Number</td>
            <td className="h6">{data?.c_registration_number}</td>
          </tr>
          <tr>
            <td className="h6">Vehicle Details</td>
            <td className="h6">{data?.c_make_model_details}</td>
          </tr>
          <tr>
            <td className="h6">Policy Duration</td>
            {startDate.length > 0 ? (
              <td className="h6">
                {startDate}&nbsp;-&nbsp;{endDate}
              </td>
            ) : (
              <td className="h6">{format(new Date(), 'dd/MM/yyyy') + ' - ' + format(subDays(new Date(addYears(new Date(), parseInt(data?.c_policy_tenure))), 1), 'dd/MM/yyyy')}</td>
            )}
          </tr>
          <tr>
            <td className="h6">Vehicle Reg Date</td>
            <td className="h6">{format(new Date(data?.c_registration_date), 'dd/MM/yyyy')}</td>
          </tr>
          <tr>
            <td className="h6">IDV</td>
            <td className="h6">{data?.c_idv}</td>
          </tr>
          <tr>
            <td className="h6">Net Premium</td>
            <td className="h6">&#8377;&nbsp;{formatMoney(Math.round(data?.c_net_premium))}.00</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default VerifyDetails;
