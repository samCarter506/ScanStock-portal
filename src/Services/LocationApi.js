import Api from "./api";

export const GetLocations = async () => {
    const response = await Api.get("/location");
    //console.log(response.data)
    return response.data;
};

export const GetLocation = async (id) => {
    const response = await Api.get(`/location/${id}`);
    return response.data;
};

export const CreateLocation = async (location) => {
    const response = await Api.post("/location", location);
    return response.data;
};

export const UpdateLocation = async (location) => {
  
    try {
        const response = await Api.put(`/location/${location.id}`, location);
        
        return response.data;
    } catch (err) {
        console.log(err)
    }

};

export const DeleteLocation = async (id) => {
    //console.log("----",id)
    const response = await Api.delete(`/location/${id}`);
    return response.data;
};