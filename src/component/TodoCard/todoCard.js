import "./todoCard.css"
import React from 'react'
import Bin from "./bin.png"

function TodoCard({index, task, type, deleteItem}){

  const Category_emoji_map = {
    daily: "📅",
    learning: "📚",
    shopping:"🛒",
    others: "🎥"
}
  
  const Category_colors = {
    daily: "#1ac6ff",
    learning: "#66ff33",
    shopping: "#e6f600",
    others: "#ff884d"
  }

  return (
    <div className="todo-card">
            <img src={Bin} className="delete" onClick={()=>{
              deleteItem(index)
            }}/> 
        {task} 
        <span className="type-task" style={{
          backgroundColor: Category_colors[type]
        }}>
            {Category_emoji_map[type]} {type}
        </span>
    </div>
  )
}

export default TodoCard