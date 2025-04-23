import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Notices from "./components/Notices";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div style={{ padding: 20 }}>
            <h1> Digital Notice Board</h1>
            {!isLoggedIn ? (
                <>
                    <Register />
                    <hr />
                    <Login setIsLoggedIn={setIsLoggedIn} />
                </>
            ) : (
                <Notices />
            )}
        </div>
    );
}

export default App;
