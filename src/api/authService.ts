// src/api/authService.ts
import api from "./apiClient.ts";

export const loginUser = async (username: string, password: string) => {
  try {
    const res = await api.post("nsv/auth/login", { username, password });
    console.log("Login response:", res);
    
    if (res.data.status === 200 && res.data.data?.loggedIn) {
      return {
        success: true,
        user: res.data.data,
      };
    } else {
      return {
        success: false,
        msg: res.data.msg || "Login failed",
      };
    }
  } catch (err) {
    return { success: false, msg: "Network error" };
  }
};
