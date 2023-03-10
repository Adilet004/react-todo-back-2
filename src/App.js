import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import TodoList from './Todolist/TodoList';
import axios from 'axios';

function App() {

const [todo, setTodo] = useState([])
const [title, setTitle] = useState("")

const handleChange = (e) => {
setTitle(e.target.value)
}

 
const addTodo = () => {
  // const newTodo = {
  //   id: todo.length ? todo[todo.length -1].id + 1: 1,
  //   name: title,
  //   isDone: false
  // }

  // setTodo((state) => [...state, newTodo])
  axios.post("https://63ab1bbecf281dba8c1ad2b4.mockapi.io/frontend-2/todo", {
    name: title,

  })
  .then(({data}) => {
    setTodo([...todo, data])
  })
}


const deleteTodo = (id) => {
  setTodo(state => state.filter(el => el.id !==id))
  axios.delete(` https://63ab1bbecf281dba8c1ad2b4.mockapi.io/frontend-2/todo/${id}`)
  .then(({data}) => { 
console.log(data);
  })
}

const changeStatus = (id) => {
 const element = todo.find(el => el.id === id)
    axios.put(`https://63ab1bbecf281dba8c1ad2b4.mockapi.io/frontend-2/todo/${id}`,{
      isDone: !element.isDone
}).then(({data}) => {
  setTodo(state => state.map(el => el.id === id ? data : el))
})
}

const updateTodo = (title, id) => {
// setTodo(state => state.map(el => el.id === id ? {...el, name: title}: el))
axios.put(` https://63ab1bbecf281dba8c1ad2b4.mockapi.io/frontend-2/todo/${id}`, {
  name: title
}).then(({data})=> {
  setTodo(state => state.map(el => el.id === id ? data : el))

})
}






// https://63ab1bbecf281dba8c1ad2b4.mockapi.io/frontend-2/todo
const getTodo = async () => {
  const url = await axios("https://63ab1bbecf281dba8c1ad2b4.mockapi.io/frontend-2/todo")
  const {data} = await url
  setTodo(data)
  return;
}


useEffect(() => {
  getTodo()
},[])


  return (
    <div className="App">
     <div className="container">
      <h1 className='text-4xl my-5'>TODO APP</h1>
<div className='flex-row flex flex-wrap justify-center'>
<div className='basis-1/3 items-center '>

<div>
<div className="flex">
      <input id="default-search" 
onChange={handleChange}
      className=" w-full   p-3 mr-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      placeholder="type todo name" required/>
      <button 
onClick={addTodo}
       className="text-white  bottom-1.2  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        ????????????????</button>
  </div>
  <ul className=" my-4  text-sm font-medium text-gray-900 bg-white rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
 {
  todo.filter(el => el.isDone === false).map(el => <TodoList
    updateTodo={updateTodo}
    changeStatus={changeStatus}
     deleteTodo={deleteTodo} 
     el={el} key={el.id}/>)
 }
</ul>
</div>
</div>
</div>
<div className='flex flex-wrap flex-row justify-center py-16'>
  <div className='basis-1/3'>
  <hr/>
    ?????????????????????? ????????!
    <hr/>

    <ul className=" my-4  text-sm font-medium text-gray-900 bg-white rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
 {
  todo.filter(el => el.isDone === true).map(el => <TodoList changeStatus={changeStatus} deleteTodo={deleteTodo} el={el} key={el.id}/>)
 }
</ul>
  </div>
</div>
     </div>
    </div>
  );
}

export default App;

