import Api from "./api";


// =========================
// RECEIPT HEADER
// =========================

export const GetReceipts = async () => {
    const response = await Api.get("/receipt");
    return response.data;
};

export const GetReceipt = async (id) => {
    const response = await Api.get(`/receipt/${id}`);
    return response.data;
};

export const CreateReceipt = async (receipt) => {
    const response = await Api.post("/receipt", receipt);
    return response.data;
};

export const UpdateReceipt = async (receipt) => {
    const response = await Api.put(`/receipt/${receipt.id}`, receipt);
    return response.data;
};

export const DeleteReceipt = async (id) => {
    const response = await Api.delete(`/receipt/${id}`);
    return response.data;
};


// =========================
// RECEIPT LINES
// =========================

export const GetReceiptLines = async () => {
    const response = await Api.get("/receiptline");
    return response.data;
};

export const GetReceiptLine = async (id) => {
    const response = await Api.get(`/receiptline/${id}`);
    return response.data;
};

export const GetReceiptLinesByReceipt = async (receiptId) => {
    const response = await Api.get(
        `/receiptline/receipt/${receiptId}`
    );

    return response.data;
};

export const CreateReceiptLine = async (line) => {
    const response = await Api.post("/receiptline", line);
    return response.data;
};

export const UpdateReceiptLine = async (line) => {
    const response = await Api.put(`/receiptline/${line.id}`, line);
    return response.data;
};

export const DeleteReceiptLine = async (id) => {
    const response = await Api.delete(`/receiptline/${id}`);
    return response.data;
};