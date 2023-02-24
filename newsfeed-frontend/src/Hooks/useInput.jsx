import { useState } from "react";

const useInput = (validation) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validation(value);

    const setInputValue = (value) => {
        setValue(value);
    }

    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const resetInput = () => {
        setValue('');
        setIsTouched(false);
    }

    return {
        value,
        isValid,
        isTouched,
        setInputValue,
        valueChangeHandler,
        inputBlurHandler,
        resetInput,
    };
};

export default useInput;
