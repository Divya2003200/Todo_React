import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./InputForm.css";

const TextForm = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const { param } = useParams();


    useEffect(() => {
        setText(param || ""); 
    }, [param]);

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        if (text) {
            navigate(`/input/${text}`);
        }
    };

    const handlereset=(event: React.FormEvent)=>{

        setText('')
        navigate("/input");
    }

    return (
        <>
            <form onSubmit={handleSubmission}>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter the parameter"
                />
                <button type="button" onClick={handlereset}>Reset</button>

                <button type="submit">Submit</button>
            </form>
            <p>URL Parameter: {param ? param : "No parameter"}</p>
        </>
    );
};

export default TextForm;
