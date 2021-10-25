import {useField} from "formik";

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={"flex flex-col mb-2"}>
            <label className={"capitalize text-sm"} htmlFor={props.id || props.name}>{label}</label>
            <input
                className={"bg-transparent border-b text-sm border-gray-400 h-12 focus:outline-none"} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="text-sm text-red-600">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextInput;
