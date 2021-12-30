import styles from './QuotationCard.module.scss'
import kotakLogo from '../../public/kotak.png';
import Image from "next/image";
import { Button, Divider } from '@mui/material';

const QuotationCardDummy = () => {
     return (
          <div className={styles?.quotation_card}>
               <div className={styles?.logo_section}>
                    <div className={styles?.logo}>
                         <Image
                              src={kotakLogo}
                              alt='universe'
                              width={160}
                              height={80}
                         />
                    </div>
                    <p><b>Basic</b></p>
               </div>
               {/* <Divider orientation="vertical" variant="middle"  classes={styles.divider}  /> */}
               <div className={styles.addons_section}>
                    <p className={styles.idv}>IDV: <b>52935</b></p>
                    <p className={styles.varies}>varies form <b>52835</b> to <b>71481</b></p>
                    <p className={styles.addons}>Addons</p>
               </div>
               <div className={styles.premium}>
                    <Button variant="contained" size="small">&#8377; 1270</Button>
                    <p className={styles.gst}>&#8377; 1570 with GST</p>
                    <Button variant="outlined" size="small">More Info</Button>
               </div>
          </div>
     )
}

export default QuotationCardDummy;
