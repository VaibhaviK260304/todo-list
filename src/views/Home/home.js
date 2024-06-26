import "./home.css"
import Add from "./add.png"
import TodoCard from "./../../component/TodoCard/todoCard"
import {useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";


function Home() {

    // const todoList =[
    //     "Go for morning walk",
    //     // "Do Yoga",
    //     // "Have Breakfast",
    //     // "Get ready for college",
    //     // "Attend classes",
    //     // "Do assignments",
    //     // "Have lunch",
    //     // "Submit assignments",
    //     // "come back to hostel",
    //     // "Call Mom"
    //     // "Have dinner",
    //     // "Sleep on time"
    // ]

    const [todoList, setTodoList] = useState([{task: "Go for walk", type:"daily"}])
    const [newTodo, setNewTodo] = useState("")
    const [type, setType] = useState("")

    useEffect(()=>{
        const storedTodoList = localStorage.getItem("todoList")

        if(storedTodoList){
            setTodoList(JSON.parse(storedTodoList))
        }
    },[])

    useEffect(()=>{
        if(todoList.length === 0) return

        localStorage.setItem("todoList", JSON.stringify(todoList))
    }, [todoList])

    function deleteItem(index){
        Swal.fire({
            title: "Are you sure?",
            text:"You want to delete the task!!",
            icon: "warning",
            showCancelButton: true
        }).then((result)=>{
            if(!result.isConfirmed){
                return
            }
            const newTodoList = todoList.filter((item, i)=>{
                if(i == index){
                    return false
                }
                else{
                    return true
                }
            })
        setTodoList(newTodoList)
      })
}

    return (
        <div>
            <h1 className="list-title">TODO LIST</h1>
            <div className="list-container">
                <h2 className="head">Add Tasks...</h2><hr/><br/>
                {todoList.map((todoItem, i)=>{

                    const {task, type} = todoItem

                    return <TodoCard key={i} task={task} type={type} index={i} deleteItem={deleteItem}/>   
                })}


                {
                    todoList.length === 0 ? 
                    <p style={{textAlign:"center", fontStyle:"italic", fontSize:"40px"}}>
                        Add Tasks to complete...
                    </p> : null
                }
               
            </div>
            <div className="parent">
                <input type="text" 
                   placeholder="Add your tasks" 
                   className="input" 
                   value={newTodo} 
                   onChange={(e)=>setNewTodo(e.target.value)}
                />

                <select 
                    className="type-todo" 
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                    >
                    <option value="">Choose...</option>
                    <option value="daily">Daily routine</option>
                    <option value="learning">Learning</option>
                    <option value="shopping">Shopping</option>
                    <option value="others">Others</option>

                </select>

                <img src={Add} 
                     alt="+" 
                     className="add-icon"
                     onClick={()=>{
                        if(newTodo === ""){
                            // toast('kuch to kaam krr le!!!')
                            toast.error('No empty Tasks!!!')
                            return
                        }

                        if(type === ""){
                            toast.error('Choose the task type!!!')
                            return
                        }

                        setTodoList([...todoList, {task: newTodo, type: type}])
                        setType("")
                        setNewTodo("")
                        toast.success('Hurrey!! Task Added successfully')
                    }}
                />
            </div>
                <Toaster/>
        </div>)
}

export default Home