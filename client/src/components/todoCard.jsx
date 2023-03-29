import '../App.css'; 
function TodoCard({ data, handleDelete, handleMove }) {

    const { _id, title, description,list,dueDate } = data;
   

    return (
        <div key={_id}>
            <div className="title-description">
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{dueDate}</p>
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