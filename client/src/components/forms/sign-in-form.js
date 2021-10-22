import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {LockClosedIcon} from '@heroicons/react/solid'
import {LoadingSpinner} from "../common/indicators/loadingSpinner";
import TextInput from "../common/inputs/text-input";

const SignInForm = ({onSubmit}) => {
    return (
        <>
            <h1 className={"heading"}>Sign in</h1>
            <p className={"mb-6 text-sm text-gray-500"}>Login to manage your account</p>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
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
                        label="Email Address*"
                        name="email"
                        type="email"
                    />
                    <TextInput
                        label="Password*"
                        name="password"
                        type="password"
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
                        Sign in
                    </button>
                </Form>
            )}
            </Formik>
        </>
    )
}

export default SignInForm
