'use client'; // Add this line to designate the component as a Client Component

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [myArray, setMyArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    website: ''
  });

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMyArray(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      id: myArray.length + 1, // Generate a unique ID
      ...formData
    };
    setMyArray([...myArray, newUser]);
    setFormData({
      name: '',
      phone: '',
      website: ''
    });
  };

  const handleDeleteUser = (userId) => {
    const updatedArray = myArray.filter(item => item.id !== userId);
    setMyArray(updatedArray);
  };

  const filteredData = myArray.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='py-14'>
      <div className='flex bg-white w-[1280px] mx-auto p-[70px]'>
        <div className='flex-grow'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <label>
              Name:
              <input className='border-[1px] border-gray-300'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone:
              <input className='border-[1px] border-gray-300'
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Website:
              <input className='border-[1px] border-gray-300'
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-[50%]'>
              Create User
            </button>
          </form>
        </div>

        <div className='flex-grow'>
          <input
            className='mb-5 border-[1px] border-blue-400 rounded-2xl p-2'
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {filteredData.length > 0 && (
            <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
              <thead>
                <tr>
                  <th className='border-[1px] border-black p-2'>id</th>
                  <th className='border-[1px] border-black p-2'>name</th>
                  <th className='border-[1px] border-black p-2'>phone no</th>
                  <th className='border-[1px] border-black p-2'>website</th>
                  <th className='border-[1px] border-black p-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className='border-[1px] border-black p-2'>{item.id}</td>
                    <td className='border-[1px] border-black p-2'>{item.name}</td>
                    <td className='border-[1px] border-black p-2'>{item.phone}</td>
                    <td className='border-[1px] border-black p-2'>{item.website}</td>
                    <td className='border-[1px] border-black p-2'>
                      <button onClick={() => handleDeleteUser(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
