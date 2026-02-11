'use client'

import style from './taskCreator.module.css'
import "@/app/root.css"
import { useEffect, useState } from 'react'

type Props = {source: string;};

export default function TasksCreator({ source }: Props) {
    type Task = {id: string; title: string;};

    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");
    const [loaded, setLoaded] = useState(false);

    //* load from api on first render
    
    useEffect(() => {
        const loadTasks = async () => {
            const res = await fetch("http://localhost:4000/data");        
            const data = await res.json();
            setTasks(data.tasks?.[source] ?? []);
            setLoaded(true);
        };
        loadTasks();
    }, [source]);
    
    //*sync to api whenever tasks change

    useEffect(() => {
        if (!loaded) return; // تا دیتا نیومده، ذخیره نکن
        const saveTasks = async () => {
            const res = await fetch("http://localhost:4000/data");
            const data = await res.json();
    
            const updatedData = {
                ...data,
                tasks: {
                    ...data.tasks,
                    [source]: tasks
                }
            };
    
            await fetch("http://localhost:4000/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
        };
        saveTasks();
    }, [tasks, loaded, source]);
    

    const addTasks = () => {
        const value = input.trim();
        if (!value) return;
        setTasks(prev => [...prev, {
            id: crypto.randomUUID(),
            title: value
        }]);
        setInput('')
    };

    const clearTasks = ()=> {
        setTasks([]);
    };
    

    const removeItem = (id: string)=> {
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    return (
        <div>
            <div className={style.headFlex}>
                <input className={style.input}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e)=>{
                    if (e.key === "Enter") {
                        addTasks()
                    }
                }}
                placeholder='Add a Task!'
                />

                <button className={style.add} onClick={addTasks}> ➕ </button>

                <button className={style.clear} onClick={clearTasks}> ♻ </button>
            </div>

            <div className={style.flexBox}>
                {tasks.map( task => (
                    <div key={task.id}>
                        <div className={`${style.removable} option`}>
                            {task.title}
                            <div
                            onClick={()=> removeItem(task.id)}
                            className={style.removeButton}>
                                🗑
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}