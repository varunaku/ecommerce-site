// import { useState, useContext } from "react";
// //The actual code where the form to sign in appears.



// //Sign UP form  is when you register, sign IN form is to log in. On the left side. 



// import FormInput from "../form-input/form-input.component";
// import Button from "../button/button.component";
// import { UserContext } from "../../context/user.context";

// import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

// import './sign-in-form.styles.scss'

// const defaultFormFields = {
//     email: '',
//     password: '',
  
// }

// const SignInForm = () => {

//     const [formFields, setFormFields] = useState(defaultFormFields); //Default form fields is being passed in as the default state for useState
//     //We are destructuring the 4 values and setting them as constants inside formFields
//     const {email, password } = formFields;

//     const {setCurrentUser} = useContext(UserContext);

//     //console.log(formFields);

//     const resetFormFields = () => {
//         setFormFields(defaultFormFields);
//     }

//     const signInWithGoogle = async () => {
//         const {user} = await signInWithGooglePopup();
//         await createUserDocumentFromAuth(user); //one level below in firebase utils, it is receiving the {users} object it was sent, and will now run it's function on it (this line).
//     }


//     const handleSubmit = async (event) => {
//         event.handleSubmit();

//         try{
            
//             const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
//             //console.log(response);
//             resetFormFields();
//             setCurrentUser(user);
           

//         } catch(error) {
//            if(error.code === ("auth/wrong-password")){
//             alert('incorrect password or email')
//            }
//         }
//     }

//     const handleChange = (event) => { //event object tracks everything happening below. We destructure to find name and value which will appear under it. The whole thing is like a json.
//          const {name, value} = event.target;

//          setFormFields({...formFields, [name]: value}) //Whatever was typed in will update now. spread operator used here
//     } //Simply put, [name] here refers to the name="..." within each of the inputs below, and depending on which input is typed in, the value will update, and the spread operator is present to keep the other remaining fields the same.
//     // https://stackoverflow.com/questions/31048953/what-are-these-three-dots-in-react-doing#:~:text=The%20three%20dots%20in%20JavaScript%20are%20the%20spread%20%2F%20rest%20operator.

//     return(
//         <div className="sign-up-container">
//             <h2>Sign In Here</h2>
//             <span>Enter Email and Password</span>
//             <form onSubmit={handleSubmit}>
               

                
//                 <FormInput label="email" type="email" required  onChange={handleChange} name="email"  value={email} />

               
//                 <FormInput label="password" type="password" required onChange={handleChange} name="password" value={password} />

//                 <div className="buttons-container">
//                     <Button buttonType='inverted' type="submit">SUBMIT</Button>
//                     <Button type='button' buttonType='google' onClick={signInWithGoogle}>SIGN IN</Button>
//                 </div>

//             </form>
        
//         </div>
//     ); //Above we have to make sure each name="..." is the exact same as its equivalent in defaultFormFields since we will be able to determine which box input changed using these unique names.
// };     //The value={} basicallyt determines what we see inside the box. If we set it to a string, we will see that string when we refresh. But as we keep typing, state will keep updating.

// export default SignInForm;


import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

//   const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
     await signInWithGooglePopup();
    // setCurrentUser(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();

    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;