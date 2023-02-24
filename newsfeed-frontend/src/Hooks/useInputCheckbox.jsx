import { useState } from "react";

const useInputCheckbox = () => {
    const [value, setValue] = useState([]);

    const setInputValue = value => setValue(value);

    const valueChangeHandler = event => {
        const {value: checkedValue, checked} = event.target;
        const intValue = parseInt(checkedValue);

        if(checked){
            setValue(
                prev => [...prev, intValue]
            );
        } else {
            setValue(
                prev => {
                    return [...prev.filter(val => val !== intValue )]
                }
            );
        }
    }

    return {
        value,
        setInputValue,
        valueChangeHandler
    };
};

export default useInputCheckbox;
