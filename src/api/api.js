import axios from "axios";

const api = axios.create({
  baseURL: "https://nsv-survey-mvp-backend-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🚀 LOGIN
export const loginUser = async (username, password) => {
  try {
    const res = await api.post("/nsv/auth/login", {
      username,
      password,
    });

    if (res.data.status === 200 && res.data.Data?.loggedIn) {
      return {
        success: true,
        user: res.data.Data,
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

// 🔁 GET RO LIST
export const fetchROList = async () => {
  try {
    const res = await api.get("/nsv/master/ro-list", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWksySk5UUlQ0V0hORkc3TVMwU0tZTlYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUyMTU3ODg3fQ.usMVQWlmTr0Z7CmCTQwsCKuK1ZU3doBiQeDWQd-ip-E`,
      },
    });

    if (res.data.status === 200) {
      return { success: true, data: res.data.data };
    } else {
      return { success: false, msg: res.data.msg };
    }
  } catch (err) {
    return { success: false, msg: "Failed to fetch RO list" };
  }
};

// 🔁 GET PIU LIST by RO
export const fetchPIUList = async (roId) => {
  try {
    const res = await api.get(`/nsv/master/piu-list?ro_id=${roId}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWksySk5UUlQ0V0hORkc3TVMwU0tZTlYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUyMTU3ODg3fQ.usMVQWlmTr0Z7CmCTQwsCKuK1ZU3doBiQeDWQd-ip-E`,
      },
    });

    if (res.data.status === 200) {
      return { success: true, data: res.data.data };
    } else {
      return { success: false, msg: res.data.msg };
    }
  } catch (err) {
    return { success: false, msg: "Failed to fetch PIU list" };
  }
};

// 🔁 GET PROJECT LIST by PIU
export const fetchProjectList = async (piuId) => {
  try {
    const res = await api.get(`/nsv/master/project-list?piu_id=${piuId}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWksySk5UUlQ0V0hORkc3TVMwU0tZTlYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUyMTU3ODg3fQ.usMVQWlmTr0Z7CmCTQwsCKuK1ZU3doBiQeDWQd-ip-E`,
      },
    });

    if (res.data.status === 200) {
      return { success: true, data: res.data.data };
    } else {
      return { success: false, msg: res.data.msg };
    }
  } catch (err) {
    return { success: false, msg: "Failed to fetch project list" };
  }
};
export const fetchProjectDetails = async (project_id) => {
  try {
    const res = await api.get(`/nsv/master/project-details?project_id=${project_id}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWksySk5UUlQ0V0hORkc3TVMwU0tZTlYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUyMTU3ODg3fQ.usMVQWlmTr0Z7CmCTQwsCKuK1ZU3doBiQeDWQd-ip-E`,
      },
    });

    if (res.data.status === 200) {
      return { success: true, data: res.data.data };
    } else {
      return { success: false, msg: res.data.msg };
    }
  } catch (err) {
    return { success: false, msg: "Failed to fetch project list" };
  }
};

export const fetchPrevInspection = async (projectId) => {
  try {
    const res = await api.get(
      `/nsv/inspections/prev-inspection-data?project_id=${projectId}`,
      {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWksySk5UUlQ0V0hORkc3TVMwU0tZTlYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUyMTU3ODg3fQ.usMVQWlmTr0Z7CmCTQwsCKuK1ZU3doBiQeDWQd-ip-E`,
        },
      }
    );
    return res.data.status === 200
      ? { success: true, data: res.data.data }
      : { success: false, msg: res.data.msg };
  } catch {
    return { success: false, msg: "Inspection data fetch failed" };
  }
};

export default api;
