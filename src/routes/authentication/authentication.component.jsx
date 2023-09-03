//This page is the top level Sign in page


//Not to be confused with sign up form component as that involves the actual form itself, while this relates to routing and is a level higher.


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {


    return(
        <div className="authentication-container">
            
            <SignInForm/>
            <SignUpForm/>
        
        </div>
        
    );
};


export default Authentication;