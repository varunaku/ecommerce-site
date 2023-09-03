// import { useState, useContext } from "react";
// //The actual code where the form to sign in appears.

// import FormInput from "../form-input/form-input.component";
// import Button from "../button/button.component";

// import { UserContext } from "../../contexts/user.context";

// import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

// import './sign-up-form.styles.scss'

// const defaultFormFields = {
//     displayName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
// }

// const SignUpForm = () => {

//     const [formFields, setFormFields] = useState(defaultFormFields); //Default form fields is being passed in as the default state for useState
//     //We are destructuring the 4 values and setting them as constants inside formFields
//     const {displayName, email, password, confirmPassword} = formFields;

//     //console.log(formFields);

//     const {setCurrentUser} = useContext(UserContext);

//     const resetFormFields = () => {
//         setFormFields(defaultFormFields);
//     }

//     const handleSubmit = async (event) => {
//         event.handleSubmit();

//         if(password !== confirmPassword){
//             alert("PASSWORDS DIFFER");
//             return;
//         }

//         try{
//             const {user} = await createAuthUserWithEmailAndPassword(email, password);

            

//             await createUserDocumentFromAuth(user, {displayName});
//             resetFormFields();
//             setCurrentUser(user); //from user.context.jsx


//         } catch(error) {
//             if(error.code) {
//                 console.log("Creation error");
//             }
//         }
//     }

//     const handleChange = (event) => { //event object tracks everything happening below. We destructure to find name and value which will appear under it. The whole thing is like a json.
//          const {name, value} = event.target;

//          setFormFields({...formFields, [name]: value}) //Whatever was typed in will update now. spread operator used here
//     } //Simply put, [name] here refers to the name="..." within each of the inputs below, and depending on which input is typed in, the value will update, and the spread operator is present to keep the other remaining fields the same.
//     // https://stackoverflow.com/questions/31048953/what-are-these-three-dots-in-react-doing#:~:text=The%20three%20dots%20in%20JavaScript%20are%20the%20spread%20%2F%20rest%20operator.

//     return(
//         <div className="sign-up-container">
//             <h2>New? Sign Up Here</h2>
//             <span>Enter Email and Password</span>
//             <form onSubmit={handleSubmit}>
               
//                 <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName"  value={displayName} />

                
//                 <FormInput label="email" type="email" required  onChange={handleChange} name="email"  value={email} />

               
//                 <FormInput label="password" type="password" required onChange={handleChange} name="password" value={password} />

//                 <FormInput label="Confirm password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

//                 <Button buttonType='inverted' type="submit">SUBMIT</Button>

//             </form>
        
//         </div>
//     ); //Above we have to make sure each name="..." is the exact same as its equivalent in defaultFormFields since we will be able to determine which box input changed using these unique names.
// };     //The value={} basicallyt determines what we see inside the box. If we set it to a string, we will see that string when we refresh. But as we keep typing, state will keep updating.

// export default SignUpForm;


import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;