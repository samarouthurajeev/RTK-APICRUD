import { useState } from "react"
import { useDispatch } from "react-redux"
import { addRegistration } from "./RegistrationSlice";

const AddRegistration = () => {
const[formData,setFormData]=useState({
    name:"",
    email:"",
    phone:"",
    address:""
})
const dispatch = useDispatch();
// const handleSubmit = (e)=>{
//     e.preventDefault();
//     dispatch(addRegistration(formData))
//     setFormData({name:"",email:"",phone:"",address:""})

// }
const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRegistration(formData));
    console.log(formData)
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='container'>
        <div className='col-md-12'>
            <div className='col-md-4'>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} 
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        name:e.target.value
                    })
                }}
                className='form-control' placeholder='Enter Name'/>
            </div>
            <div className='col-md-12'>
            <div className='col-md-4'>
                <label>Email</label>
                <input type="text" name="email" value={formData.email} 
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        email:e.target.value
                    })
                }}
                className='form-control' placeholder='Enter Name'/>
            </div>
        </div>
        <div className='col-md-12'>
            <div className='col-md-4'>
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} 
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        phone:e.target.value
                    })
                }}
                className='form-control' placeholder='Enter Name'/>
            </div>
        </div>
        <div className='col-md-12'>
            <div className='col-md-4'>
                <label>Address</label>
                <input type="text" name="address" value={formData.address} 
                  onChange={(e)=>{
                    setFormData({
                        ...formData,
                        address:e.target.value
                    })
                }}
                className='form-control' placeholder='Enter Name'/>
            </div>
        </div>
        </div>
        <div className="col-md-12">
        <div className="col-md-4">
        <button className="btn btn-primary mt-2">Register</button>
        </div>
    </div>
    </div>
    </form>
    </>
    
  )
}

export default AddRegistration