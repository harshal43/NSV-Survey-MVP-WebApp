// src/api/masterService.ts
import api from "./apiClient";

export const fetchROList = async () => {
  try {
    const res = await api.get("/nsv/master/ro-list");
    return res.data.status === 200
      ? { success: true, data: res.data.data }
      : { success: false, msg: res.data.msg };
  } catch {
    return { success: false, msg: "Failed to fetch RO list" };
  }
};

export const fetchPIUList = async (roId: string) => {
  try {
    const res = await api.get(`/nsv/master/piu-list?ro_id=${roId}`);
    return res.data.status === 200
      ? { success: true, data: res.data.data }
      : { success: false, msg: res.data.msg };
  } catch {
    return { success: false, msg: "Failed to fetch PIU list" };
  }
};

export const fetchProjectList = async (piuId: string) => {
  try {
    const res = await api.get(`/nsv/master/project-list?piu_id=${piuId}`);
    return res.data.status === 200
      ? { success: true, data: res.data.data }
      : { success: false, msg: res.data.msg };
  } catch {
    return { success: false, msg: "Failed to fetch project list" };
  }
};

export const fetchProjectDetails = async (projectId: string) => {
  try {
    const res = await api.get(`/nsv/master/project-details?project_id=${projectId}`);
    return res.data.status === 200
      ? { success: true, data: res.data.data }
      : { success: false, msg: res.data.msg };
  } catch {
    return { success: false, msg: "Failed to fetch project details" };
  }
};
