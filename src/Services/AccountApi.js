import api from './api'

export const LoginUser = async (user) => {
    const response = await api.post(
    "account/login",
    user
  );

  return response.data;
}

export const Logout = async ()=>{
    const response = await api.post(
        "account/logout"
    );

    return response.data;
}
