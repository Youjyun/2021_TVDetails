import React, { useContext } from "react";
import { TvContext } from "./context";
import { fetchLogout } from "./service";
import errors from "./errors";
import { ErrorContext } from "./context";

function Nav({setPage,onLogout}){

    function navTo(target){
        setPage(target);
    }
    const [tvState, setTvState] = useContext(TvContext);
   

    const [error, setError] = useContext(ErrorContext);

    const performLogout = () => {
        fetchLogout()
          .then(() => {
            onLogout();
          })
          .catch((err) => {
            setError(errors[err.error || "DEFAULT"]);
          });
      };

    return (
        <div className="header">
        <nav>
            <ul>
                <li><button className="header-btn" onClick={() => {setTvState({}); navTo('Home')}}>Home</button></li>
                <li><button className="header-btn" onClick={() => navTo('About')}>About</button></li>
                <li><button className="header-btn" onClick={() => navTo('Privacy')}>Privacy</button></li>
                <li><button className="header-btn" onClick={() =>  {setTvState({}); performLogout(); navTo('Logout')}}>Log out</button></li>
            </ul>

        </nav>
        </div>
    );
}
export default Nav;