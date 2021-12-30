import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Head from 'next/head';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default MyApp;
