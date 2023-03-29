import React from "react";
import {useState,useEffect} from 'react';
import axios from 'axios'
import TodoCard from "./todoCard";
import '../App.css';


function TodoList() {
    const [todos,setTodos] = useState([]);
    const [data,setData] = useState({ title: '', description: '', list:''});
    const [update,setUpdate] = useState(false);
    const [render,setRender] = useState(false);
    const [formStatus,setFormStatus] = useState({
        button: true,
        inTodo: false,
        inProgress: false,
        inComplete: false
    });

    const todoListCheck = document.getElementById('inTodoList');
    const inProgressListCheck = document.getElementById('inProgressList');
    const inCompleteListCheck = document.getElementById('inCompleteList');

    const handleSubmit = (e) => {
        e.preventDefault();
        let dueDate = document.getElementById('dueDate');
        data.dueDate= dueDate.value;
        axios({
            method: 'post',
            url:'https://simply-managable.herokuapp.com/api/todo',
            data:{
                title: data.title,
                description: data.description,
                list: data.list,
                dueDate: data.dueDate
            }
        });
        axios
                .get("https://simply-managable.herokuapp.com/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodos(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        if (update) {
            setUpdate(false)
        }else{
            setUpdate(true)
        } 
        setData({
            title:'',description:'',list:'',dueDate:''
        });
        inProgressListCheck.checked=false;
        inCompleteListCheck.checked=false;
        todoListCheck.checked=false;
    };

    useEffect(
        function () {
            axios
                .get("https://simply-managable.herokuapp.com/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodos(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    let todo = [];
    let inProgress = [];
    let complete = [];
    
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].list === 'Todo'){
            todo = [...todo,todos[i]]
        };

        if (todos[i].list === 'InProgress'){
            inProgress = [...inProgress,todos[i]]
        };
        if (todos[i].list === 'Complete'){
            complete = [...complete,todos[i]]
        };
    };

    function handleChange(e) {
        setData((data) => ({...data, [e.target.name]: e.target.value}));
    };

    const handleTodoListCheck = (e) => {
        inProgressListCheck.checked=false;
        inCompleteListCheck.checked=false;
        setFormStatus(existingValues => ({
            ...existingValues,
            button:false
        }))

        setData(existingValues => ({
            ...existingValues,
            list:'Todo'
        }));

        if(!todoListCheck.checked){
            setFormStatus(existingValues => ({
                ...existingValues,
                button:true
            })); 
        };
    };

    const handleInProgressListCheck = (e) => {
        todoListCheck.checked=false
        inCompleteListCheck.checked=false
        setFormStatus(existingValues => ({
            ...existingValues,
            button:false
        }))

        setData(existingValues => ({
            ...existingValues,
            list:'InProgress'
        }));

        if(!inProgressListCheck.checked){
            setFormStatus(existingValues => ({
                ...existingValues,
                button:true
            })); 
        };
    };

    const handleInCompleteListCheck = (e) => {
        inProgressListCheck.checked=false
        todoListCheck.checked=false
        setFormStatus(existingValues => ({
            ...existingValues,
            button:false
        }))

        setData(existingValues => ({
            ...existingValues,
            list:'Complete'
        }));

        if(!inCompleteListCheck.checked){
            setFormStatus(existingValues => ({
                ...existingValues,
                button:true
            })); 
        };
    };

    function handleDelete(e) {
        console.log('BELOW')
        console.log(todos)
        axios.delete(`https://simply-managable.herokuapp.com/api/todo/${e.target.name}`);
        setTodos((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    };

    function handleMove(e) {
        let mover = e.target.value
        let moverId = e.target.name
        
        for (let i = 0; i < todos.length; i++) {
            if ((todos[i]._id === moverId)&&(mover !== 'ignore')){
                todos[i].list=mover
    
                const newTodo = {
                    title: todos[i].title,
                    description: todos[i].description,
                    list: mover,
                    dueDate: todos[i].dueDate
                };
                axios.put(`https://simply-managable.herokuapp.com/api/todo/${moverId}`,newTodo)
                axios.get("https://simply-managable.herokuapp.com/api/todo")
                console.log(newTodo)
                if (update) {
                    setUpdate(false)
                }else{
                    setUpdate(true)
                }
            }  
        }
    };

    const current = new Date();
    const date1 =  `${current.getMonth()+1}/${current.getDate()}`;
    const date2 =  `${current.getMonth()+1}/${current.getDate()+1}`;
    const date3 =  `${current.getMonth()+1}/${current.getDate()+2}`;
    const date4 =  `${current.getMonth()+1}/${current.getDate()+3}`;
    const date5 =  `${current.getMonth()+1}/${current.getDate()+4}`;
    const date6 =  `${current.getMonth()+1}/${current.getDate()+5}`;
    const date7 =  `${current.getMonth()+1}/${current.getDate()+6}`;
    const dates = [date1,date2,date3,date4,date5,date6,date7]

    const showDates = () => {
        for (let i = 0; i < todos.length; i++) {
            let temp = todos[i].dueDate
            let monthDay = `${temp.split('-')[1]}/${temp.split('-')[2]}`
            for (let j = 0; j < dates.length; j++){
                if (`0${dates[j]}` === monthDay){
                    console.log('jes')
                    console.log(todos[i])
                    //make a dateCard and map over it
                }
            }
        }
    };

    return (
        <div className='App'>
            <div>
                <h1 className="main-header">Simply Manageable</h1>
            </div>
            <div className="flex-container">
                <form className='form' onSubmit={handleSubmit}>
                    <h1 style={{textDecoration: 'underline', textDecorationColor: 'azure'}} >Add </h1>
                    <div>
                        <input type='checkbox' value='inTodoList' id='inTodoList' name='inTodoList' onClick={handleTodoListCheck} />
                        <label for='inTodoList'> Todo </label>
                    </div>
                    <div>
                        <input type='checkbox' value='inProgressList' id='inProgressList' name='inProgressList'  onClick={handleInProgressListCheck} />
                        <label for ='inProgressList'> In Progress </label>
                    </div>
                    <div>
                        <input type='checkbox' value='inCompleteList' id='inCompleteList' name='inCompleteList'  onClick={handleInCompleteListCheck} />
                        <label for ='inCompleteList'> Complete </label>
                    </div>
                    <br/>
                    <div>
                        <input className="formInput" type='text' placeholder='Todo Name' name='title' value={data.title} onChange={handleChange} />
                    </div>
                    <div>
                        <input className="formInput" type='text' placeholder='Todo Description' name='description' value={data.description} onChange={handleChange} />                
                    </div>
                    <div>
                        <input className="formDate" type='date' placeholder='Due Date' name='date' id="dueDate"/>
                    </div>
                    <br/>
                    <div>
                        <button className="formButton" id="postTodo" type='submit' disabled={formStatus.button} >
                            Add Todo!
                        </button>
                    </div>
                </form>
                <div className='todoLists'>
                    <h1 style={{textDecoration: 'underline', textDecorationColor: '#fbff0e'}}>Todo</h1>
                    <ul>
                        {todo.map((data) => (
                            <TodoCard
                                data={data}
                                handleDelete={handleDelete}
                                handleMove={handleMove}
                            />
                        ))}                        
                    </ul>
                </div>
                <div className='inProgressLists'>
                    <h1 style={{textDecoration: 'underline', textDecorationColor: '#ff452c'}}>In Progress</h1>
                    <ul>
                        {inProgress.map((data) => (
                            <TodoCard
                                data={data}
                                handleDelete={handleDelete}
                                handleMove={handleMove}
                            />
                        ))}                        
                    </ul>
                </div>
                <div className='inCompleteLists'>
                    <h1 style={{textDecoration: 'underline', textDecorationColor: '#a9ff31'}}>Complete</h1>
                   <ul>
                        {complete.map((data) => (
                            <TodoCard
                                data={data}
                                handleDelete={handleDelete}
                                handleMove={handleMove}
                            />
                        ))}                        
                    </ul> 
                </div>
            </div>
        </div>
    );
}
    
export default TodoList;