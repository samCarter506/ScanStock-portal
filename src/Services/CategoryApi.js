import Api from "./api";

export const GetCategories = async () => {
    const response = await Api.get("/category");
    return response.data;
};

export const GetCategory = async (id) => {
    const response = await Api.get(`/category/${id}`);
    return response.data;
};

export const CreateCategory = async (category) => {
    const response = await Api.post("/category", category);
    return response.data;
};

export const UpdateCategory = async (category) => {
  
    try {
        const response = await Api.put(`/category/${category.id}`, category);
        
        return response.data;
    } catch (err) {
        console.log(err)
    }

};

export const DeleteCategory = async (id) => {
    console.log("----",id)
    const response = await Api.delete(`/category/${id}`);
    return response.data;
};