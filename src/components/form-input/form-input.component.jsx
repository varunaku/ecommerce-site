import './form-input.styles.scss'

//This file refers to the physical part of each row of the sign in form. For example, the password row. 

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;




// type="text" required onChange={changeHandler} name="displayName"  value={value} <- ...otherProps

