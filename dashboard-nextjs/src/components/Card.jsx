import React, { useState } from 'react'
import TaskPopup from './TaskPopup';

export default function Card({ Board }) {

	const [isPopupOpen, setPopupOpen] = useState(false);

	const togglePopup = () => {
	  setPopupOpen(!isPopupOpen);
	};
  
	const handleCreateTask = (formData) => {
	  console.log(formData);
	  // Handle task creation logic here
	  setPopupOpen(false);
	};
	return (
		<>
			{console.log(Board)}
			<div className="rounded flex flex-col bg-gray-700 w-96 h-80 p-2 mr-8 hover:bg-gray-600 ">

				<div className="flex justify-between w-52 py-2">
					<h3 className="text-base  font-medium">{Board.name}</h3>
				</div>

				<div className='overflow-y-auto flex-row scrollbar-thumb-slate-800 scrollbar-track-slate-600 scrollbar-thin'>
					<div className="text-sm mt-2 ">
						{
						//Order and listed items
						Board.tasks && 
						Board.tasks
						.toSorted((a, b) => a.order > b.order ? 1 : -1)
						.map((task, index) => (
							<div key={index} className="bg-slate-400 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-slate-300">
								{task.name}
								<div >
								<span className='text-end'>{task.flagId}</span>
								<span>{task.endDate && task.endDate}</span>
								</div>
							</div>
						))}
					</div>

				</div>

				<button className="mt-3  p-1 hover: hover:bg-gray-500 rounded text-start" onClick={togglePopup}>Add a card...</button>

			</div>
				<TaskPopup boardId ={Board.id} isOpen={isPopupOpen} onClose={togglePopup} onSubmit={handleCreateTask} />
		</>
	)
}
