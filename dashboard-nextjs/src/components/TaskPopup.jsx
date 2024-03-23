import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Button } from 'flowbite-react';

function TaskModal({boardId, isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        boardId:boardId,
        name: '',
        description: '',

        flagId: 1
    });

    let accessToken=''
    useEffect(()=>{
        accessToken=localStorage.getItem('token')
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            throw new Error('Failed to create task');
          }
          // Reset form data after successful submission
          setFormData({
            boardId:boardId,
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            flagId: ''
          });
          // Call the onSubmit callback if provided
          if (onSubmit) {
            onSubmit(formData);
            console.log(accessToken)
          }
        } catch (error) {
          console.error('Error creating task:', error.message);
          // Handle error as needed
        }
      };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Task Create</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Task Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                        <input type="datetime-local" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                        <input type="datetime-local" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="flagId" className="block text-gray-700 text-sm font-bold mb-2">Flag ID:</label>
                        <input type="number" id="flagId" name="flagId" value={formData.flagId} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-gray-200 hover:bg-blue-100 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Task</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default TaskModal;
