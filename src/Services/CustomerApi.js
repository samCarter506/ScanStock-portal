import Api from "./api";

export const GetCustomers = async () => {
    const response = await Api.get("/customer");
    return response.data;
};

export const GetCustomer = async (id) => {
    const response = await Api.get(`/customer/${id}`);
    return response.data;
};

export const CreateCustomer = async (customer) => {
    const response = await Api.post("/customer", customer);
    return response.data;
};

export const UpdateCustomer = async (customer) => {


    try {
        console.log(customer.CustomerCode)
        const response = await Api.put(`/customer/${customer.CustomerCode}`, customer);
        return response.data;
    } catch (err) {
        console.log(err)
    }
};

export const DeleteCustomer = async (id) => {
    const response = await Api.delete(`/customer/${id}`);
    return response.data;
};