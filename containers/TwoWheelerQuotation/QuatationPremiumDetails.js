import { formatMoney } from 'helper/formatMoney';
import styles from './QuatationPremiumDetails.module.scss';
const QuatationPremiumDetails = (details) => {
  return (
    <>
      <div className={styles.detailsItem}>
        <p className={styles.key1}>Plan Name</p>
        <p className={styles.value1}>{details.details.c_plan_name}</p>
      </div>
      <div className={styles.detailsItem}>
        <p className={styles.key1}>Bike Model</p>
        <p className={styles.value1}>{details.details.c_make_model_details}</p>
      </div>
      <div className={styles.detailsItem}>
        <p className={styles.key1}>RTO</p>
        <p className={styles.value1}>{details.details.c_rto_details}</p>
      </div>
      <div className={styles.detailsItem}>
        <p className={styles.key1}>IDV</p>
        <p className={styles.value1}>{formatMoney(details.details.c_idv)}</p>
      </div>
      <div className={styles.detailsItem}>
        <p className={styles.key1}>CRN</p>
        <p className={styles.value1}></p>
      </div>
      <hr />
      <div>
        <div className={styles.premiumCheckout}>
          <p className={styles.key} style={{ fontWeight: '700' }}>
            Own damage premium (A)
          </p>
          <p className={styles.value}>
            &#8377;&nbsp;
            {parseInt(Math.round(details.details.c_basic_od_premium)) - parseInt(Math.round(details.details.c_ncb_discount))}
          </p>
          <p className={styles.key} style={{ fontWeight: '700' }}>
            Third Party Premium (B)
          </p>
          <p className={styles.value}>
            &#8377;&nbsp;
            {Math.round(details.details.c_basic_tp_premium)}
          </p>
        </div>
        <div className={styles.premiumCheckout}>
          <p className={styles.key}>Basic OD</p>
          <p className={styles.value}>&#8377;&nbsp;{Math.round(details.details.c_basic_od_premium)}</p>
          <p className={styles.key}>Basic 3rd Party Premium</p>
          <p className={styles.value}>&#8377;&nbsp;{Math.round(details.details.c_basic_tp_premium)}</p>
        </div>
        <div className={styles.premiumCheckout}>
          <p className={styles.key}>No Claim Bonus</p>
          <p className={styles.value}>&#8377;&nbsp;{Math.round(details.details.c_ncb_discount)}</p>
          {details.details.c_unnamed_passenger_premium ? (
            <>
              <p className={styles.key}>PA for Unnamed Passenger</p>
              <p className={styles.value}>&#8377;&nbsp;{Math.round(details.details.c_unnamed_passenger_premium)}</p>
            </>
          ) : (
            <>
              <p className={styles.key}></p>
              <p className={styles.value}></p>
            </>
          )}
        </div>
        <div className={styles.premiumCheckout}>
          <p className={styles.key}></p>
          <p className={styles.value}></p>
          <p className={styles.key}>Net Premium</p>
          <p className={styles.value}>&#8377;&nbsp;{formatMoney(Math.round(parseInt(details.details.c_net_premium) - parseInt(details.details.c_gst)))}</p>
        </div>
        <div className={styles.premiumCheckout}>
          <p className={styles.key}></p>
          <p className={styles.value}></p>
          <p className={styles.key}>GST/Service Tax extra {details.details.c_gst_percent}% :</p>
          <p className={styles.value}>&#8377;&nbsp;{formatMoney(Math.round(details.details.c_gst))}</p>
        </div>
      </div>
    </>
  );
};

export default QuatationPremiumDetails;
