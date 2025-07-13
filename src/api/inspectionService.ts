// src/api/inspectionService.ts
import api from "./apiClient";

export const fetchPrevInspection = async (projectId: string) => {
  try {
    const res = await api.get(`/nsv/inspections/prev-inspection-data?project_id=${projectId}`);
    return res.data.status === 200
      ? { success: true, data: res.data.data }
      : { success: false, msg: res.data.msg };
  } catch {
    return { success: false, msg: "Inspection data fetch failed" };
  }
};
