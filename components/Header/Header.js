import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo.png";
import classnames from "classnames";
import styles from './header.module.scss';
import Link from 'next/link';
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";


const Header = () => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);

    const menuHandler = () => {
        setOpenMenu(!openMenu);
    }


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <a>
                        <Image src="/logo.png" alt='LMV IB Logo' width='150' height='100' />
                    </a>
                </Link>
            </div>
            <div className={`${styles.mobileMenuBar} ${openMenu ? styles.openMenu : styles.closeMenu}`}>
                <div className={styles.mobileIconDiv} onClick={menuHandler}>
                    <AiOutlineMenu />
                </div>
            </div>
            <div className={styles.menu}>
                <ul >
                    <li>
                        <Link href="/about-us">
                            <a>About Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact-us">
                            <a>Contact Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog">
                            <a>Blog</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sign-in">
                            <a>Sign In</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sign-up">
                            <a>Sign Up</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;
