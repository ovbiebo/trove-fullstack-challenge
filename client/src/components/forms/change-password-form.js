import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {LockClosedIcon} from '@heroicons/react/solid'
import {LoadingSpinner} from "../common/indicators/loadingSpinner";
import TextInput from "../common/inputs/text-input";

const ChangePasswordForm = ({onSubmit}) => {
    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }}
                validationSchema={Yup.object({
                    oldPassword: Yup.string()
                        .required('Required')
                        .matches(
                            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            "Must contain 8 characters, a letter and a number"
                        ),
                    newPassword: Yup.string()
                        .required('Required')
                        .matches(
                            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            "Must contain 8 characters, a letter and a number"
                        ),
                    confirmNewPassword: Yup.string()
                        .required('Required')
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
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
                        label="Old Password*"
                        name="oldPassword"
                        type="password"
                    />
                    <TextInput
                        label="New Password*"
                        name="newPassword"
                        type="password"
                    />
                    <TextInput
                        label="Confirm New Password*"
                        name="confirmNewPassword"
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
                        Update Password
                    </button>
                </Form>
            )}
            </Formik>
        </>
    )
}

export default ChangePasswordForm
