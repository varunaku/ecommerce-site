import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

//Basically there are 3 button types. One is normal, one is google (blue), and one is inverted (white to black when you hover on it). What is done here is that depnding on the buttonType='' that you set whenever you use a button, it will simply be a different colour. L101.