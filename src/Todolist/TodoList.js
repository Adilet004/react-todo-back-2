
import React, { useState } from 'react'

 
  const TodoList = ({el, deleteTodo, changeStatus, updateTodo}) => {


const [isOpen, setIsOpen] = useState(false)
const [title, setTitle] = useState(el.name)
const handleChange = (e) => setTitle(e.target.value)

const openInput = () => {
  setIsOpen(true)

}


const closeInput = (title, id) => {
  updateTodo(title, id)
  setIsOpen(false)
}



    return (
        <li className="px-4 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
        <span className='flex'>
        <input type="checkbox" onChange={() => changeStatus(el.id)} 
        defaultChecked={el.isDone}/>
        {
            isOpen ? <input type="text"
            value={title}
            onChange={handleChange}
            className="text-black"/>: <span
            style={{
              textDecoration: el.isDone ? "line-through": ""
            }}
            className='mx-3'> {el.name}</span>
        }
        </span>
        <span>
        <button type='button'
         onClick={() => isOpen ? closeInput(title, el.id) : openInput()} 
          className="my-2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-2 mb-2">
         {isOpen ? "save": "изменить"}</button>
     
        <button onClick={() => deleteTodo(el.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-600 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-2 mb-2">
         удалить</button>
        </span>
           </li>
    )
  
    }


    export default TodoList