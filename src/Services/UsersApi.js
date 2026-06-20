import Api from "./api";

export const GetUsers = async () => {
    const response = await Api.get("/users");
    console.log("GET USERS RESPONSE:", response);
    return response.data;
};

export const GetUser = async (id) => {
    const response = await Api.get(`/users/${id}`);
    return response.data;
};

export const CreateUser = async (user) => {
    const response = await Api.post("/users", user);
    return response.data;
};

export const UpdateUser = async (user) => {
  
    try {
        const response = await Api.put(`/users/${user.UserID}`, user);
        
        return response.data;
    } catch (err) {
        console.log(err)
    }

};

export const DeleteUser = async (id) => {
    console.log("----",id)
    const response = await Api.delete(`/users/${id}`);
    return response.data;
};


export const GetMyProfile = async () => {
  const response = await Api.get(
    "/users/profile/me"
  );

  console.log("From Get:",response.data)
  return response.data;
};

export const UpdateMyProfile = async (profile) => {
  const response = await Api.put(
    "/users/profile/me",
    profile
  );

  return response.data;
};

export const ChangeMyPassword = async (passwords) => {
  const response = await Api.put(
    "/users/profile/change-password",
    passwords
  );

  return response.data;
};