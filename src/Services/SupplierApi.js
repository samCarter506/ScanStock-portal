import Api from "./api";

export const GetSuppliers = async () => {
    const response = await Api.get("/supplier");
    console.log(response.data)
    return response.data;
};

export const GetSupplier = async (id) => {
    const response = await Api.get(`/supplier/${id}`);
    return response.data;
};

export const CreateSupplier = async (supplier) => {
    const response = await Api.post("/supplier", supplier);
    return response.data;
};

export const UpdateSupplier = async (supplier) => {
    const response = await Api.put(`/supplier/${supplier.id}`, supplier);
    return response.data;
};

export const DeleteSupplier = async (id) => {
    const response = await Api.delete(`/supplier/${id}`);
    return response.data;
};