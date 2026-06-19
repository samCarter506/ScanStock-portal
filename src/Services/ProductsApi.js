import Api from "./api";

export const GetProducts = async () => {
    const response = await Api.get("/product");
    return response.data;
};

export const GetProduct  = async (barcode) => {
    const response = await Api.get(`/product/${barcode}`);
    return response.data;
};
export const GetOneProduct  = async (id) => {
    const response = await Api.get(`/product/${id}`);
    return response.data;
};

export const CreateProduct  = async (product) => {
    const response = await Api.post("/product", product);
    return response.data;
};

export const UpdateProduct  = async (product) => {
  
    try {
        const response = await Api.put(`/product/${product.ProductName}`, product);
        
        return response.data;
    } catch (err) {
        console.log(err)
    }

};

export const DeleteProduct = async (id) => {
  
    const response = await Api.delete(`/product/${id}`);
    return response.data;
};

export const ScanProduct = async (barcode)=>{
    const response = await  Api.get(`/barcode/${barcode}`);
    return response.data
};