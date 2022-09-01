import * as yup from "yup";
export const SigninValidation = yup.object({
  email: yup
    .string("Enter your email address")
    .email("Enter valid email address")
    .required("Enter your email address"),
  password: yup
    .string("Enter your password")
    // .min(8, 'Please enter valid password')
    .required("Enter your password"),
});

export const SignupValidation = yup.object({
  email: yup
    .string("Enter your email address")
    .email("Enter valid email address")
    .required("Enter your email address"),
  password: yup
    .string("Enter your password")
    .min(8, 'Please enter a valid 8-digit password')
    .required("Enter your password"),
  confirmPassword: yup
    .string("Confirm your password")
    .min(8, 'Please enter a valid 8-digit password')
    .required("Confirm your password")
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  name: yup
    .string("Enter your name")
    .required("Enter your name"),
});

export const updateValiationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .required("Enter your name"),
  phone: yup
    .string("Enter your phone")
    .min(10, 'Please enter valid phone number')
    .max(10, 'Please enter valid phone number')
    .required("Enter your phone"),
  dob: yup
    .string("Enter your DOB")
    .required("Enter your DOB"),
});

export const InputErrorMessage = ({ error, marginTop, marginBottom }) => {
  if (error) {
    return (
      <p
        className="text-danger"
        style={{
          marginTop: marginTop ? marginTop : 0,
          marginBottom: marginBottom ? marginBottom : 0,
        }}
      >
        {error}
      </p>
    );
  }
  return (
    <p
      style={{
        marginTop: marginTop ? marginTop : 0,
        marginBottom: marginBottom ? marginBottom : 0,
      }}
      className="invisible"
    >
      -
    </p>
  );
};
