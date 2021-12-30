import styles from './QuotationCard.module.scss';
import kotakLogo from '../../public/kotak.png';
import Image from 'next/image';
import { Button, Divider } from '@mui/material';
import { formatMoney } from 'helper/formatMoney';
import Badge from 'helper/badge';

const QuotationCard = ({ data, onSubmitHandler, handler, showAddons }) => {
  // console.log('data', data);
  const c_ncb_discount = data?.c_ncb_discount === null ? 0 : data?.c_ncb_discount;
  const c_unnamed_passenger = data?.c_unnamed_passenger_premium === null ? 0 : data?.c_unnamed_passenger_premium;
  return (
    <div className={styles?.quotation_card}>
      <div className={styles?.logo_section}>
        <div className={styles?.logo}>
          <Image src={`/${data?.c_company_name}.png`} alt="universe" width={160} height={80} />
        </div>
        <p>
          <b>Basic</b>
        </p>
      </div>
      {/* <Divider orientation="vertical" variant="middle"  classes={styles.divider}  /> */}
      <div className={styles.addons_section}>
        <p className={styles.idv}>
          IDV: <b>{formatMoney(data?.c_idv)}</b>
        </p>
        <p className={styles.addons}>Addons</p>
        {showAddons ? (
          <>
            <p className={styles.cover_items}>Cover :{data?.c_unnamed_passenger_premium > 0 ? <Badge text="PA Unnamed" value={data?.c_unnamed_passenger_premium} /> : <p style={{ fontSize: '12px' }}>No cover Available</p>}</p>
            {/* <hr className="p-0 m-0" />
            <p className={styles.cover_items}>Addons :</p> */}
          </>
        ) : null}
      </div>
      <div className={styles.premium}>
        <Button variant="contained" size="small" onClick={(e) => onSubmitHandler(data)}>
          &#8377; {formatMoney(Math.round(parseInt(data?.c_net_premium - data?.c_gst + c_ncb_discount + c_unnamed_passenger)))}
        </Button>
        <p className={styles.gst}>&#8377; {formatMoney(Math.round(data?.c_gst))} with GST</p>
        <Button variant="outlined" size="small" onClick={(data) => handler()}>
          More Info
        </Button>
      </div>
    </div>
  );
};

export default QuotationCard;
