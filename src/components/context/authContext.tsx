import React, { useState, useEffect } from 'react';
import { userModel } from 'types/userModel';
import {
  getMe,
  logout,
  LoginModel,
  login,
  register,
} from 'components/api/users';
import { useHistory } from 'react-router-dom';

type AuthContextValue = {
  user: userModel | null;
  logout: (data: userModel) => void;
  login: (data: LoginModel) => Promise<void>;
  loginError: string | null;
  register: (data: userModel) => Promise<void>;
  registerError: string | null;
};
type State = AuthContextValue;
const AuthContext = React.createContext({} as AuthContextValue);

type Props = {
  children: React.ReactNode;
};
export function AuthContexProvider({ children }: Props) {
  const history = useHistory();

  const loginAction = async (data: LoginModel) => {
    try {
      const res = await login(data);
      if (res) {
        localStorage.setItem('loggedUser', JSON.stringify(res));
        setState((prev) => ({ ...prev, loginError: null, user: res }));
        history.push('/');
      }
    } catch (err) {
      setState((prev) => ({ ...prev, loginError: err.message }));
    }
  };

  const registerAction = async (data: userModel) => {
    setState((prev) => ({ ...prev, registerError: null }));
    try {
      await register(data);
      history.push('/login');
    } catch (err) {
      setState((prev) => ({ ...prev, registerError: err.message }));
    }
  };

  const logoutAction = (data: userModel) => {
    logout(data);
    setState((prev) => ({ ...prev, user: null }));
    history.push('/');
  };

  const [state, setState] = useState<State>({
    user: null,
    logout: logoutAction,
    login: loginAction,
    loginError: null,
    register: registerAction,
    registerError: null,
  });

  const loadUser = async () => {
    const res = await getMe();
    setState((prev) => ({ ...prev, user: res }));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export { AuthContext };
