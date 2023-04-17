import '../App.css'; 
import {React, useState} from 'react';
import axios from 'axios';

function TodoCard({ data, handleDelete, handleMove }) {

    const { _id, title, description,list,dueDate } = data;
    const [updateTitle,setUpdateTitle] = useState(0);
    const [updateDesc, setUpdateDesc] = useState(0);
    const [updateDate, setUpdateDate] = useState(0);

   //click edit to 1) show title and description inputs 2) set
    //ondoubleclick - 1) hide text 2) show input box 3) make input box == current title 4) allow users to edit 5) enter changes title 6)axios put request
    
    function handleTitleEdit() {
        var textInput = document.getElementById(`${_id}_inputTxt`);
        textInput.style.display = 'block';
        textInput.style.marginTop = '1vw'
        var textTitle = document.getElementById(`${_id}_title`);
        textTitle.style.display = 'none';
    };

    function handleTitleChange(e) {
        document.addEventListener("keydown", function(event) {
            var newTitle = e.target.value
            if (event.code === 'Enter') {
                var textInput = document.getElementById(`${_id}_inputTxt`);
                textInput.style.display = 'none';
                var textTitle = document.getElementById(`${_id}_title`);
                textTitle.style.display = 'block';
                data.title = newTitle

                const newTodo = {
                    title: data.title,
                    description: data.description,
                    list: data.list,
                    dueDate: data.dueDate
                };
                axios.put(`https://simply-managable.herokuapp.com/api/todo/${_id}`,newTodo)
                setUpdateTitle(updateTitle+1)
            }
        });
    };

    function handleDescEdit() {
        var textInput = document.getElementById(`${_id}_inputDescTxt`);
        textInput.style.display = 'block';
        var textTitle = document.getElementById(`${_id}_desc`);
        textTitle.style.display = 'none';
    };

    function handleDescChange(e) {
        document.addEventListener("keydown", function(event) {
            var newDesc = e.target.value
            if (event.code === 'Enter') {
                var textInput = document.getElementById(`${_id}_inputDescTxt`);
                textInput.style.display = 'none';
                var textTitle = document.getElementById(`${_id}_desc`);
                textTitle.style.display = 'block';
                data.description = newDesc;

                const newTodo = {
                    title: data.title,
                    description: data.description,
                    list: data.list,
                    dueDate: data.dueDate
                };
                axios.put(`https://simply-managable.herokuapp.com/api/todo/${_id}`,newTodo)
                setUpdateDesc(updateDesc+1)
            }
        });
    };

    function handleDateClick() {
        var dateInput = document.getElementById(`${_id}_dateInput`);
        dateInput.style.display = 'block';
    };

    function handleDateChange(e) {
        var dateInput = document.getElementById(`${_id}_dateInput`);
        var newDate = e.target.value;
        data.dueDate = newDate;

        const newTodo = {
            title: data.title,
            description: data.description,
            list: data.list,
            dueDate: data.dueDate
        };
        axios.put(`https://simply-managable.herokuapp.com/api/todo/${_id}`,newTodo)        
        dateInput.style.display= 'none';
        setUpdateDate(updateDate+1)
    };



    return (
        <div key={_id}>
            <div className="title-description">
                <h2 className='show' onDoubleClick={handleTitleEdit} id={`${_id}_title`}>{title}</h2>
                <input type='text' name={_id+'inputTxt'} id={`${_id}_inputTxt`} className='hide' onChange={handleTitleChange}></input>
                <p onDoubleClick={handleDescEdit} id={`${_id}_desc`}>{description}</p>
                <input type='text' id={`${_id}_inputDescTxt`} className='hide' onChange={handleDescChange}></input>
                <p onDoubleClick={handleDateClick} id={`${_id}_date`}>{dueDate}</p>
                <input type='date' id={`${_id}_dateInput`} className='hide' onChange={handleDateChange}></input>
            </div>
            <div className="button-container">
                <button name={_id} className="button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <div>
                <select name={_id} class='browser-default' className='dropdown' id={_id} onChange={handleMove}>
                    <option value='ignore'>Move</option>
                    <option value='Todo'>Todo</option>
                    <option value='InProgress'>In Progress</option>
                    <option value='Complete'>Complete</option>
                </select>
            </div>
        </div>
    );
}

export default TodoCard;