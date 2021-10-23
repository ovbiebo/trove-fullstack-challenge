import {ErrorMessage, Field} from "formik";

const RadioGroup = ({label, items, ...props}) => {
    return (
        <>
            <div id={"radio-group"} className={"capitalize text-sm"}>{label}</div>
            <div role="group" aria-labelledby="radio-group">
                {items.map((item, index) => {
                    return <label id={index} className={"mr-4"}>
                        <Field
                            type="radio"
                            value={index}
                            {...props}
                        />
                        {item}
                    </label>
                })}
                <ErrorMessage name={props.id || props.name} component="div" className="text-sm text-red-600"/>
            </div>
        </>
    );
};

export default RadioGroup;
