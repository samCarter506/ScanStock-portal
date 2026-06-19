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