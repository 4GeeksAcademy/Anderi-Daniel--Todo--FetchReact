import React, { useState, useEffect } from 'react';
import { FcEmptyTrash } from "react-icons/fc";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://playground.4geeks.com/apis/fake/todos/user/Daniel1`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Respuesta:', data);
            setList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputEnter = async (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            const updatedList = [...list, { label: task, done: false }];
            setList(updatedList)
            try {
                const response = await fetch(
                    `https://playground.4geeks.com/apis/fake/todos/user/Daniel1`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(updatedList),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to update todo list');
                }
                if (response.ok) {
                    console.log('Todo list added and updated successfully');
                }
            } catch (error) {
                console.error('Error updating todo list:', error);
            }
            setTask("");
        }
    }

    const handleDeleteTask = async (label) => {
        let newList = list.filter((item) => item.label !== label);
        setList(newList);
        try {
            const response = await fetch(
                `https://playground.4geeks.com/apis/fake/todos/user/Daniel1`,
                {
                    method: 'PUT',
                    body: JSON.stringify(newList),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to update todo list');
            }
            if (response.ok) {
                console.log('Todo list task deleted and updated successfully');
            }
        } catch (error) {
            console.error('Error updating todo list:', error);
        }
    }

    return (
        <div className="TodoWrapper">
            <h1>To Do List</h1>
            <input className="todo-input" onKeyDown={handleInputEnter} onChange={e => setTask(e.target.value)} value={task} placeholder='Add task here' type='text'></input>
            <ol >
                {list.map((item, index) => (<li className="Todo" key={index}>{item.label}<button className="color" onClick={() => handleDeleteTask(item.label)}><FcEmptyTrash className="color"/></button></li>))}
            </ol >
        </div >
    )
}

export default TodoList;
