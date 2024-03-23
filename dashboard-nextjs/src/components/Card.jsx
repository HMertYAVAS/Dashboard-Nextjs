import React, { useEffect, useState } from 'react'
import TaskPopup from './TaskPopup';
import TaskShow from './TaskShow';

export default function Card({ Board,onPopupClose }) {

	const [isPopupOpen, setPopupOpen] = useState(false);
	const [isTaskOpen, setTaskOpen] = useState(false);
	
	let accessToken = ''
	useEffect(()=>{
		accessToken = localStorage.getItem('token')
	})

	const togglePopup = () => {
		setPopupOpen(!isPopupOpen);
	  }

	const toggleTask = () => {
		setTaskOpen(!isTaskOpen)

	}
  
	const handleCreateTask = () => {
		console.log('access: '+accessToken)
		onPopupClose(accessToken)
	  setPopupOpen(false);
	  setTaskOpen(false)
	};

	const formatDate = (dateString) => {
		// Create a new Date object from the date string
		const date = new Date(dateString);
	  
		const formattedDate = date.toLocaleString('en-US', {
		  month: 'short',
		  day: '2-digit',
		  year: 'numeric',
		  hour: '2-digit',
		  minute: '2-digit',
		  hour12: true,
		  timeZone: 'UTC' //Timezone
		});
	  
		return formattedDate;
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
							<div onClick={toggleTask} key={index} className="bg-slate-400 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-slate-300">
								{task.name}
								<div className='flex justify-between'>
								{/* <span className='text-end'>flag:{task.flagId}</span> */}
								<span>End Date: {task.endDate && formatDate(task.endDate)} </span>
								</div>
								<TaskShow taskId ={task.code} task={task} isOpen={isTaskOpen} onClose={toggleTask} onSubmit={handleCreateTask} />
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
