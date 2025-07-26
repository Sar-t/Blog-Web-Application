import React from 'react'
import { useId } from 'react'; //useId is used to generate a unique id for the input element, so that we can link the label with the input element
//***********************************REVIEW************************************* */
const Input = React.forwardRef(function Input({ //forwarding the ref to the input element 
  //also to do integration with react-hook-form, we can use the ref to register the input element
    label,
    type="text",
    className = "",
    ...props
},ref){
    const id = useId(); //this id is used to link the label with the input element, so that when the label is clicked, the input element is focused. 
   return (<div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1 text-white' id={id}>{label}</label>
    }
    <input
    type = {type}
    className={`px-3 py-2 rounded-lg bg-blend-color text-white outline-none focus: duration-200 border border-gray-200 w-full ${className}`}
    ref = {ref} //forwarding the ref to the input element
    {...props} //spreading the rest of the props
    id = {id} //setting the id for the input element
    />
   </div>)
})

export default Input