import React, { useEffect, useState } from "react";
import { getNotices } from "../api";

function Notices() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getNotices();
            setNotices(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>All Notices</h2>
            {notices.map((n, index) => (
                <div key={index}>
                    <h4>{n.title}</h4>
                    <p>{n.description}</p>
                    <small>Branch: {n.branch.join(", ")} | By: {n.announcer}</small>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Notices;
