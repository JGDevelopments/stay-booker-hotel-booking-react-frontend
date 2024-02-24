import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from 'services/NetworkAdapter';
import { useNavigate } from 'react-router-dom';
import Toast from 'components/ux/toast/Toast';
import { REGISTRATION_MESSAGES } from 'utils/constants';

/**
 * Register Component
 * Renders a registration form that allows new users to create an account.
 * It captures user input for personal information and credentials, submitting these to a registration endpoint.
 * Upon successful registration, the user is notified and redirected to the login page.
 */
const Register = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [firstNameBlur, setFirstNameBlur] = useState(false);
  const [lastNameBlur, setLastNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [confirmPasswordBlur, setConfirmPasswordBlur] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const validEmail = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
  );
  const validName = new RegExp('^[a-zA-Z]{2,64}$');
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

  /**
   * Updates the form data state with the value of the input field that triggered the change.
   * This function ensures that the component's state reflects the user's input.
   *
   * @param {Object} e - The event object generated by the input field change.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Submits the registration form data to the server.
   * It performs an asynchronous operation to post the form data to a registration endpoint.
   * If registration is successful, a success message is displayed, and the user is redirected to the login page after a brief delay.
   * Otherwise, the user is informed of the failure.
   *
   * @param {Object} e - The event object generated by the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await networkAdapter.post('/api/register', formData);
    if (response && !response.errors) {
      setSuccessMessage(REGISTRATION_MESSAGES.SUCCESS);
      setShowSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  useEffect(() => {
    if (validName.test(formData.firstName)) {
      if (validName.test(formData.lastName)) {
        if (validEmail.test(formData.email)) {
          if (validPassword.test(formData.password)) {
            if (validPassword.test(formData.confirmPassword)) {
              if (formData.password === formData.confirmPassword) {
                console.log('congrats');
                setDisabled(false);
              } else {
                setDisabled(true);
                console.log('stuck on matching ps');
              }
            } else {
              setDisabled(true);
              console.log('stuck on p2');
            }
          } else {
            setDisabled(true);
            console.log('stuck on p1');
          }
        } else {
          setDisabled(true);
          console.log('stuck on email');
        }
      } else {
        setDisabled(true);
        console.log('stuck on lastName');
      }
    } else {
      setDisabled(true);
      console.log('stuck on firstName');
    }
  }, [
    firstNameBlur,
    lastNameBlur,
    emailBlur,
    passwordBlur,
    confirmPasswordBlur,
  ]);

  return (
    <>
      <div className="register__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-4 md:p-10 shadow-md"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-brand">
                Join the Adventure!
              </h2>
              <p className="text-gray-500">
                Create your account and start your journey with us
              </p>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={(e) => {
                    setFirstNameBlur(!firstNameBlur);
                  }}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={(e) => {
                    setLastNameBlur(!lastNameBlur);
                  }}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => {
                  setEmailBlur(!emailBlur);
                }}
                placeholder="Email"
                value={formData.email}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => {
                  setPasswordBlur(!passwordBlur);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => {
                  setConfirmPasswordBlur(!confirmPasswordBlur);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="flex items-center my-3 w-full">
              <button
                disabled={disabled}
                type="submit"
                className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Register
              </button>
            </div>
            <Link
              to="/login"
              className="inline-block align-baseline text-lg text-gray-500 hover:text-blue-800 text-center w-full"
            >
              Back to login
            </Link>
            {showSuccess && (
              <Toast type="success" message={successMessage} dismissError />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
