import React , { Component }from 'react';
import { inject, observer } from 'mobx-react'
const COMPLETED = "COMPLETED";
const TODOS = "TODOS";
@inject('store')
@observer
class Hello extends Component {
 
   constructor() {
    super();
  this.state = {
      todos: this.getTodosFromStorage() || [
        {
          taskID: 1,
          task: "sai the walk"
        },
        {
          taskID: 2,
          task: "sai the talk"
        },
        {
          taskID: 3,
          task: "sai the jump"
        }
      ],
      completedTasks: this.getCompletedFromStorage() || [
        {
          taskID: 4,
          task: "Test the test!"
        }
      ],
      draggedTask: {}
    };
  }

 // Local storage handlers
  getTodosFromStorage = () => {
    return JSON.parse(localStorage.getItem(TODOS));
  };

  getCompletedFromStorage = () => {
    return JSON.parse(localStorage.getItem(COMPLETED));
  };

  saveCompletedToStorage = completed => {
    localStorage.setItem(COMPLETED, JSON.stringify(completed));
  };

  saveTodosToStorage = todos => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  };

   dragEndTodo = (event) => {
    document.getElementById(event.target.id).classList.remove("on-drag");
  }
    // Format the draggable item
  dragStartTodo = (event) => {
    document.getElementById(event.target.id).classList.add("on-drag");
  }

  onDragCompleted = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  };
onDragTodo = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    },()=>{
      console.log(this.state)
    });
  };
onDragOverTodo = event => {
    event.preventDefault();
  };
  onDragOverCompleted = event => {
    event.preventDefault();
  };


  // When dropping a completed todo back to todo list
  onDropTodo = event => {
    const { completedTasks, draggedTask, todos } = this.state;

    // Ignore if task is dropped in the same box
    var found = todos.filter(todo => todo.taskID === draggedTask.taskID);
    if (found.length > 0) {
      return;
    }

    this.setState({
      todos: [...todos, draggedTask],
      completedTasks: completedTasks.filter(
        task => task.taskID !== draggedTask.taskID
      ),
      draggedTask: {}
    });
  };


    // When dropping a todo to completed
  onDropCompleted = event => {
    const { completedTasks, draggedTask, todos } = this.state;

    // Ignore if task is dropped in the same box
    var found = completedTasks.filter(
      task => task.taskID === draggedTask.taskID
    );
    
    if (found.length > 0) {
      return;
    }
    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      todos: todos.filter(task => task.taskID !== draggedTask.taskID),
      draggedTask: {}
    });
  };
 // Save the todos and completed on each rendering/update
  componentDidUpdate() {
    this.saveTodosToStorage(this.state.todos);
    this.saveCompletedToStorage(this.state.completedTasks);
  }
   
   
   
   render() {
 const { todos, completedTasks } = this.state;

 let { count, increment} = this.props.store
     return (
      <div>
      <p>this is from store</p>
        <h1>{count}</h1>
         <button onClick={() => {
            increment()
          }}>+</button>


                <div className="App">
        <div
          className="todos"
          onDrop={event => this.onDropTodo(event)}
          onDragOver={event => this.onDragOverTodo(event)}
        >
          <div className="header">In Progress</div>
          <div>
            {todos.map(todo => (
              <div
                className="item"
                id={todo.taskID}
                key={todo.taskID}
                draggable
                onDragStart ={(e)=> this.dragStartTodo(e)}
                onDragEnd ={(e)=> this.dragEndTodo(e)}
                onDrag={event => this.onDragTodo(event, todo)}
              >
                {todo.task}
              </div>
            ))}
          </div>
        </div>
        <div
          onDrop={event => this.onDropCompleted(event)}
          onDragOver={event => this.onDragOverCompleted(event)}
          className="done"
        >
          <div className="header">Completed</div>
          {completedTasks.map((task, index) => (
            <div 
              className="item"
              key={task.taskID}
              id={task.taskID}
              draggable
              onDragStart ={(e)=> this.dragStartTodo(e)}
              onDragEnd ={(e)=> this.dragEndTodo(e)}
              onDrag={event => this.onDragCompleted(event, task)}
            >
              {task.task}
            </div>
          ))}
        </div>
      </div>
          </div>
     )
   }
}
export default Hello;
