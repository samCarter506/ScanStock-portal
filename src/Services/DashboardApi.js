import Api from "./api";

export const GetDashboardData = async () => {
  const response = await Api.get("/dashboard");
    console.log(response.data)
  return response.data;
};