import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {LockClosedIcon} from '@heroicons/react/solid'
import {LoadingSpinner} from "../common/indicators/loadingSpinner";
import TextInput from "../common/inputs/text-input";
import RadioGroup from "../common/inputs/radio-group";

const TakeLoanForm = ({onSubmit}) => {
    return (
        <>
            <p className={"mb-4 text-sm"}>Note: Minimum loan amount is N1000 and you can’t take a loan of more than 60% of your total portfolio value.</p>
            <Formik
                initialValues={{
                    amount: "",
                    duration: "",
                }}
                validationSchema={Yup.object({
                    amount: Yup.number()
                        .required('Required'),
                    duration: Yup.number()
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
                        label="Amount*"
                        name="amount"
                        type="number"
                    />
                    <RadioGroup
                        label="Duration"
                        name="duration"
                        items={['6 Months', '12 Months']}
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
                        Take Loan
                    </button>
                </Form>
            )}
            </Formik>
        </>
    )
}

export default TakeLoanForm
