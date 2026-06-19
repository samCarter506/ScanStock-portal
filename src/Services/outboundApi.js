import Api from "./api";


// =========================
// OUTBOUND HEADER
// =========================

export const GetOutbounds = async () => {
    const response = await Api.get("/outbound");
    console.log(response.data)
    return response.data;
};

export const GetOutbound = async (id) => {
    const response = await Api.get(`/outbound/${id}`);
    return response.data;
};

export const CreateOutbound = async (outbound) => {
    const response = await Api.post("/outbound", outbound);
    return response.data;
};

export const UpdateOutbound = async (outbound) => {
    const response = await Api.put(`/outbound/${outbound.id}`, outbound);
    return response.data;
};

export const DeleteOutbound = async (id) => {
    const response = await Api.delete(`/outbound/${id}`);
    return response.data;
};


// =========================
// OUTBOUND LINES
// =========================

export const GetOutboundLines = async () => {
    const response = await Api.get("/outboundline");
    console.log(">>>>>",response.data)
    return response.data;
};

export const GetOutboundLine = async (id) => {
    const response = await Api.get(`/outboundline/${id}`);
    return response.data;
};

export const CreateOutboundLine = async (line) => {
    const response = await Api.post("/outboundline", line);
    return response.data;
};



export const GetOutboundLinesByOutbound = async (id) => {
    const response = await Api.get(
        `/outboundline/outbound/${id}`
    );

    return response.data;
};
export const UpdateOutboundLine = async (line) => {
    const response = await Api.put(`/outboundline/${line.id}`, line);
    return response.data;
};

export const DeleteOutboundLine = async (id) => {
    const response = await Api.delete(`/outboundline/${id}`);
    return response.data;
};