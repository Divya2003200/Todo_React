import React, { useEffect, useState } from "react";
import './Apicall.css'

const Apicall=()=>{
const[id,setId]=useState<number|null>(null)
const[data,setData]= useState<{ title?: string; body?:string }>({})

useEffect(() => {
    const timer=setTimeout(()=>{
        fetchDataById(id); 
    },2000)
return ()=> clearTimeout(timer)    
}, [id]

);

const fetchDataById = (id: number|null) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(json => {
            console.log(json);
            setData(json);  
         
        
        })
        .catch(error => console.error('Error fetching data:', error));
};

const handleId=(e:React.ChangeEvent<HTMLInputElement>)=>{
   const value=e.target.value

    if (value === '') {
        setId(null); 
        setData({}); 
    } else {
        const numericValue = Number(value);
        setId(numericValue);
    }

}

 
    return(
        <>
        <input placeholder="enter id" value={id?.toString() || ''} onChange={handleId}></input>
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Body:</strong> {data.body}</p>
        </>
    )
}

export default Apicall;