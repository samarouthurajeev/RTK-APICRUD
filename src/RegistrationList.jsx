import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistrations, deleteRegistration, updateRegistration } from './RegistrationSlice';

const RegistrationList = () => {
  const dispatch = useDispatch();
  const registrations = useSelector((state) => state.registrations.registrations);
  const status = useSelector((state) => state.registrations.status);
  const error = useSelector((state) => state.registrations.error);

  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRegistrations());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRegistration(id));
  };

  const handleEdit = (registrations) => {
    setEditing(registrations.id);
    setFormData({ ...registrations });
  };

  const handleCancel = () => {
    setEditing(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRegistration({ ...formData, id: editing }));
    setEditing(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
        <div className='col-md-12 pt-4'>
        {editing && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name" className='form-control'
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email" className='form-control'
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone" className='form-control'
          />
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter address" className='form-control'
          />
          <button className="btn btn-primary btn-sm" type="submit">Update</button>
          <button className="btn btn-danger btn-sm" type="button" onClick={handleCancel}>Cancel</button>
        </form>
      )}
        </div>
        <div className='col-md-12'>
            <table className='table table-bordered text-center'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((tr,index)=>{
                        return (
                            <tr  key={index}>
                                <td>{tr.id}</td>
                                <td>{tr.name}</td>
                                <td>{tr.email}</td>
                                <td>{tr.phone}</td>
                                <td>{tr.address}</td>
                                <td>
                                    <button className='btn btn-primary btn-sm ' onClick={()=>{
                                        handleEdit(tr)
                                    }}>Edit</button>
                                    <button className='btn btn-danger btn-sm' onClick={()=>{
                                        handleDelete(registrations.id)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default RegistrationList;
