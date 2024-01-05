import React from "react";
import { useState, useEffect } from "react";
import Login from "../../components/adminComponents/login/Login";
import { adminSession } from "../../services/adminService";
import Dashboard from "../../components/adminComponents/dashboard/Dashboard";

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        adminSession().then((data) => {
            console.log(data)
            if (data === "No session") {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
                setAdmin(data);
            }
            setIsPending(false);
        }
        ).catch((error) => {
            console.log(error);
            setError(error);
            setIsPending(false);
        });
    }, []);
    
    return (
        <div className="page__container">
          <section className="page__section">
            <div className="flex__container--text">
              <div className="section-title__container">
                <h2 className="section-title">Admin</h2>
                <div className="section__title--border blue"></div>
              </div>
              {isPending && ( <div>Loading...</div> )}
              {error && <div className="error">{error.message}</div>}
              {!isLoggedIn && !isPending && !error && (
                <Login />
              )}
              {isLoggedIn && !isPending && !error && (
                <Dashboard username={admin.username}/>
              )}
              {/* <Dashboard username="test"/> */}
            </div>
          </section>
        </div>
      );
      
}

export default Admin;