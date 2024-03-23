import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Button } from 'flowbite-react';

function TaskShow({ taskId, isOpen, onClose, onSubmit, task }) {

    const [close,setClose] = useState('false')
    const [formData, setFormData] = useState({
        name: task.name || '',
        description: task.description || '',
        boardId: task.boardId || '',
        flagId: task.flagId || '',
        startDate: task.startDate ? task.startDate.slice(0, -5) : '', // Remove milliseconds
        endDate: task.endDate ? task.endDate.slice(0, -5) : '' // Remove milliseconds
      });

    let accessToken = ''
    useEffect(() => {
        accessToken = localStorage.getItem('token')
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
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
           
            // Call the onSubmit callback if provided
            if (onSubmit) {
                onSubmit(formData);
                console.log(formData)
            }
        } catch (error) {
            console.error('Error creating task:', error.message);
            // Handle error as needed
        }
    };

    const handleDelete = async (e) => {

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            onSubmit(formData);
            console.log('delete')
        } catch (error) {
            console.error('Error delete task:', error.message);
            // Handle error as needed
        }

    }

    return (
        <Modal show={isOpen} onClose={ onClose }>
            <Modal.Header>Task Update</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Task Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                        <input type="datetime-local" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                        <input type="datetime-local" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="flagId" className="block text-gray-700 text-sm font-bold mb-2">Flag ID:</label>
                        <input type="number" id="flagId" name="flagId" value={formData.flagId} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-green-400 hover:bg-green-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Task</button>
                        <button type="button" onClick={handleDelete} className="bg-red-400 hover:bg-red-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete Task</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default TaskShow;
