'use client'

import Link from "next/link";
import "./page.css"
import { useState } from "react";

export default function Home() {
const [random, setRandom] = useState(0);
const links: string[] = ["trade", "web", "language"];

return (
        <div className="flexBox">
            <button className="randombot" onClick={()=> {
                setRandom( Math.floor(Math.random() * links.length)+ 1);

            }}>
                Random!
            </button>

            <div className="flexBox">
                {links.map((item, index) => (
                    <Link 
                    href={item}
                    key={index}
                    className={index +1 == random ? "option lactive" : "option"}>
                        {item}
                    </Link>                    
                ))}
            </div>
        </div>
    )
}