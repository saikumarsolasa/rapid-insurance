import styles from './HomePage.module.scss';
import HomeBanner from '../../public/home-hero.jpg';
import carInsurance from "../../public/car-insurance.svg";
import bikeInsurance from '../../public/bike-insurance.svg'
import healthInsurance from "../../public/health-insurance.svg"
import Image from "next/image";
import Link from "next/link";
import classNames from 'classnames';


const HomePage = () => {

    return <div className={styles.homeMainWrapper}>
        <div className={styles.bannerWrapper}>
            {/* <div className={styles.bannerImageWrapper}>
                <Image className={styles.bannerImage} src={HomeBanner} alt='Lmv Insurance' width='600' height='400' />
            </div> */}
            <div className={styles.bannerContentWrapper}>
                <h1>
                    OUR PRODUCTS
                </h1>
                <div className={styles.insuranceCardWrapper}>
                    <div className={classNames(styles.insuranceCard, styles.bike)}>
                        <Link href="/bike-insurance">
                            <a>
                                <Image className={styles.cardImage} src={bikeInsurance} alt="Bike Insurance" width='300' height='200' />
                                <p>Bike Insurance</p>
                            </a>
                        </Link>
                    </div>
                    <div className={classNames(styles.insuranceCard)}>
                        <Link href="/car-insurance">
                            <a>
                                <Image src={carInsurance} alt="Car Insurance" width='300' height='200' />
                                <p>Car Insurance</p>
                            </a>
                        </Link>
                    </div>
                    <div className={classNames(styles.insuranceCard)}>
                        <Link href="/health-insurance">
                            <a>
                                <Image src={healthInsurance} alt="Health Insurance" width='300' height='200' />
                                <p>Health Insurance</p>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HomePage;