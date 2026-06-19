import Api from "./api";

export const GetUserGroups = async () => {
    const response = await Api.get("/roles");
    return response.data;
};

export const GetUserGroup = async (id) => {
    const response = await Api.get(`/roles/${id}`);
    return response.data;
};

export const CreateUserGroup = async (userGroup) => {
    const response = await Api.post("/roles", userGroup);
    return response.data;
};

export const UpdateUserGroup = async (userGroup) => {
  
    try {
        const response = await Api.put(`/roles/${userGroup.role}`, userGroup);
        
        return response.data;
    } catch (err) {
        console.log(err)
    }

};

export const DeleteUserGroup = async (id) => {
    console.log("----",id)
    const response = await Api.delete(`/roles/${id}`);
    return response.data;
};