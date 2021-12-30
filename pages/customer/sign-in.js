import LogoHeader from "../../components/Logo Header/LogoHeader";
import SignInPage from "../../containers/SignInPage/SignInPage"


const SignIn = () => {
    return (
        <div>
            <SignInPage />
        </div>
    )
}

export default SignIn;

SignIn.getLayout = function getLayout(page) {
    return (
        <main>
            <LogoHeader />
            {page}

        </main>
    )
}