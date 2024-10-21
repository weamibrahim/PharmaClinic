import { createContext, useState, useContext, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const initialLoginState = !!localStorage.getItem('token') && !!localStorage.getItem('user');
  console.log(initialLoginState)
  const [IsLogin, setIsLogin] = useState(initialLoginState);

  useEffect(() => {
   
    console.log(IsLogin)

    //console.log(IsLogin)
  }, [IsLogin]);
    
    return (
        <LoginContext.Provider value={{ IsLogin, setIsLogin }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext)