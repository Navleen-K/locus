import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";
import {URL} from "../config.js";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get(`${URL}/api/profile`, { withCredentials: true }).then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}