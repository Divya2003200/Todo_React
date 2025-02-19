import React, { useState } from "react"

const Form=()=>{
   const[data,formData]=useState({userId:'',title:'',body:''})
   
   const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; 
     formData(prev => ({ ...prev, [name]: value })); 
}

const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert(response.status)
        return response.json();  
    })
    .then(json => {
        console.log('Data posted successfully:', json);
        
        formData({ userId: '', title: '', body: '' }); 
    })
    .catch(error => console.error('Error posting data:', error));
};
    return(

        <>
        <form className="form" onSubmit={handlesubmit}>
    <input type="number" name='userId' placeholder="User ID"value={data.userId} onChange={handlechange} required  />
    <input type="text"  name="title" placeholder="Title" value={data.title} onChange={handlechange} required />
    <textarea placeholder="Body" name='body' value={data.body} required onChange={handlechange} ></textarea>
    <button type="submit">Submit</button>
        </form>

        </>
    )
}
export default Form