import React, { useEffect, useState } from "react";
import {
  fetchROList,
  fetchPIUList,
  fetchProjectList,
  fetchProjectDetails,
  fetchPrevInspection,
} from "../api/api";
import LiveMap from "../components/LiveMap";

const Dashboard = () => {
  const [roList, setRoList] = useState([]);
  const [piuList, setPiuList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const [selectedRO, setSelectedRO] = useState("");
  const [selectedPIU, setSelectedPIU] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
  const [inspectionData, setInspectionData] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  useEffect(() => {
    fetchROList().then((res) => res.success && setRoList(res.data));
  }, []);

  useEffect(() => {
    if (selectedRO) {
      fetchPIUList(selectedRO).then(
        (res) => res.success && setPiuList(res.data)
      );
      setSelectedPIU("");
      setSelectedProject("");
      setProjectList([]);
      setProjectDetails(null);
      setInspectionData([]);
      setLiveLocation(null);
    }
  }, [selectedRO]);

  useEffect(() => {
    if (selectedPIU) {
      fetchProjectList(selectedPIU).then(
        (res) => res.success && setProjectList(res.data)
      );
      setSelectedProject("");
      setProjectDetails(null);
      setInspectionData([]);
      setLiveLocation(null);
    }
  }, [selectedPIU]);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectDetails(selectedProject).then((res) => {
        res.success && setProjectDetails(res.data[0]);
        console.log(res.data);
      });
      fetchPrevInspection(selectedProject).then(
        (res) => res.success && setInspectionData(res.data)
      );
      setLiveLocation({ lat: 28.525771, lng: 77.068431 });
      const socket = new WebSocket(
        "wss://bzsler4r7h.execute-api.ap-south-1.amazonaws.com/Prod"
      );
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log("WebSocket Message:", msg);
        /* below setter id for testing purpose */
        setLiveLocation({
          lat: parseFloat(msg.live_data.latitude),
          lng: parseFloat(msg.live_data.longitude),
        });
        if (msg.project_id === selectedProject && msg.connection_id === "nsvhackathon") {
          setLiveLocation({
            lat: parseFloat(msg.live_data.latitude),
            lng: parseFloat(msg.live_data.longitude),
          });
        }
      };
      socket.onerror = (err) => console.error("WebSocket Error:", err);
      return () => socket.close();
    }
  }, [selectedProject]);

  return (
    <div className="p-6 space-y-6">
      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          value={selectedRO}
          onChange={(e) => setSelectedRO(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">Select RO</option>
          {roList.map((ro) => (
            <option key={ro.id} value={ro.id}>
              {ro.ro_name}
            </option>
          ))}
        </select>

        <select
          value={selectedPIU}
          onChange={(e) => setSelectedPIU(e.target.value)}
          className="border p-2 w-full rounded"
          disabled={!selectedRO}
        >
          <option value="">Select PIU</option>
          {piuList.map((piu) => (
            <option key={piu.id} value={piu.id}>
              {piu.piu_name}
            </option>
          ))}
        </select>

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border p-2 w-full rounded"
          disabled={!selectedPIU}
        >
          <option value="">Select Project</option>
          {projectList.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.project_name}
            </option>
          ))}
        </select>
      </div>

      {/* Project Info */}
      {projectDetails && (
        <div className="bg-white shadow-md rounded p-4 border">
          <h2 className="text-xl font-semibold mb-2">
            {projectDetails.project_name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>NH Number:</strong> {projectDetails.nh_number}
            </p>
            <p>
              <strong>Length:</strong> {projectDetails.length} km
            </p>
            <p>
              <strong>Concessionaire:</strong> {projectDetails.concessionaire}
            </p>
            <p>
              <strong>Survey Year:</strong> {projectDetails.year}
            </p>
            <p>
              <strong>Mode:</strong> {projectDetails.mode}
            </p>
            <p>
              <strong>Completion Year:</strong> {projectDetails.completion_year}
            </p>
            <p>
              <strong>ae/ie:</strong> {projectDetails["ae/ie"]}
            </p>
          </div>
        </div>
      )}

      {/* Inspection Table */}
      {/* Inspection Cards */}
      {inspectionData.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inspectionData.map((ins) => (
            <div
              key={ins.id}
              className="bg-white border rounded shadow p-4 space-y-2"
            >
              <p>
                <strong>Date:</strong> {ins.inspection_date}
              </p>
              <p>
                <strong>By:</strong> {ins.inspection_by}
              </p>
              <p>
                <strong>Duration:</strong> {ins.inspection_duration}
              </p>
              <p>
                <strong>Remarks:</strong> {ins.remarks}
              </p>
              <button
                className={`w-full mt-2 py-1 px-3 rounded text-white ${
                  ins.video_link
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!ins.video_link}
                onClick={() => {
                  if (ins.video_link) window.open(ins.video_link, "_blank");
                }}
              >
                {ins.video_link ? "Download Video" : "No Video Available"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Live Map */}
      <div className="mt-2">
        <h3 className="text-lg font-semibold mb-2">Live Inspection Location</h3>
        {liveLocation ? (
          <LiveMap location={liveLocation} />
        ) : (
          <p className="text-gray-250">No live Inspection Going On...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
