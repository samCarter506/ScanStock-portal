import Api from "./api";

export const GetProducts = async () => {
  const response = await Api.get("/product");
  return response.data;
};

export const GetProduct = async (barcode) => {
  const response = await Api.get(`/product/${barcode}`);
  return response.data;
};

export const GetOneProduct = async (id) => {
  const response = await Api.get(`/product/${id}`);
  return response.data;
};

export const GenerateBarcode = async (barcode) => {
  const response = await Api.get(
    `/product/barcode/${encodeURIComponent(barcode)}`
  );

  return response.data;
};

export const CreateProduct = async (product) => {
  const response = await Api.post("/product", product);
  return response.data;
};

export const UpdateProduct = async (product) => {
  const response = await Api.put(
    `/product/${product.Barcode}`,
    product
  );

  return response.data;
};

export const DeleteProduct = async (barcode) => {
  const response = await Api.delete(
    `/product/${encodeURIComponent(barcode)}`
  );

  return response.data;
};

export const ScanProduct = async (barcode) => {
  const response = await Api.get(
    `/product/scan/${encodeURIComponent(barcode)}`
  );

  return response.data;
};