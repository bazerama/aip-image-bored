//The following Errors code is is by learnetto
//See //https://github.com/learnetto/react-form-validation-demo/blob/master/src/Form.js
export const FormErrors = ({ formErrors }) => (
    <div className="formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>
                        {fieldName} {formErrors[fieldName]}
                    </p>
                );
            } else {
                return '';
            }
        })}
    </div>
);
