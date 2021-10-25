import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {LockClosedIcon} from '@heroicons/react/solid'
import {LoadingSpinner} from "../common/indicators/loadingSpinner";
import TextInput from "../common/inputs/text-input";

const EditProfileForm = ({onSubmit, userDetails}) => {
    return (
        <Formik
            initialValues={{
                firstName: userDetails?.firstName,
                lastName: userDetails?.lastName,
                email: userDetails?.email
            }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
            })}
            onSubmit={
                async (values, {setSubmitting, setStatus}) => {
                    try {
                        await onSubmit(values);
                        setSubmitting(false);
                    } catch (e) {
                        setStatus("Invalid credentials")
                    }
                }
            }
        >{({isSubmitting, status}) => (
            <Form>
                <div className="text-red-600">{status}</div>
                <TextInput
                    label="First Name*"
                    name="firstName"
                    type="text"
                />
                <TextInput
                    label="Last Name*"
                    name="lastName"
                    type="text"
                />
                <TextInput
                    label="Email Address*"
                    name="email"
                    type="email"
                />

                <button
                    type="submit"
                    className="button-primary mt-12"
                    disabled={isSubmitting}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {isSubmitting
                          ? <LoadingSpinner className="h-5 w-5 text-white" aria-hidden="true"/>
                          : <LockClosedIcon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-500"
                                            aria-hidden="true"/>
                      }
                  </span>
                    Update Profile
                </button>
            </Form>
        )}
        </Formik>
    )
}

export default EditProfileForm
