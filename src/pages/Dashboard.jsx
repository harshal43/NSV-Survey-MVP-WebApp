import { useEffect, useState, useRef } from "react";
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
  const [distressData, setDistressData] = useState();
  const socketRef = useRef(null);
  const hiddenFields = ["side", "lane_code", "distress_segment_id", "distance_meters", "start_chainage_m", "end_chainage_m"];


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
      });
      fetchPrevInspection(selectedProject).then(
        (res) => res.success && setInspectionData(res.data)
      );
      // setLiveLocation({ lat: 28.525771, lng: 77.068431 });

      const socket = new WebSocket(
        // process.env.REACT_APP_WEBSOCKET_URL
        // "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
        "wss://bzsler4r7h.execute-api.ap-south-1.amazonaws.com/Prod"
      );

      socketRef.current = socket;

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log("webSoket data :", msg);

        if (
          msg.project_id === selectedProject &&
          msg.connection_id === "nsvhackathon"
        ) {
          setLiveLocation({
            lat: parseFloat(msg.live_data.latitude),
            lng: parseFloat(msg.live_data.longitude),
          });
          setDistressData(msg.live_data.distress_data || {});
        }
      };

      socket.onerror = (err) => console.error("WebSocket Error:", err);
      return () => {
        socket.close();
        socketRef.current = null;
      };
    }
  }, [selectedProject]);

  const formatEpochDate = (epochStr) => {
  console.log("formatEpochDate called with:", epochStr);
  let epoch = Number(epochStr);

  if (isNaN(epoch)) return "—";

  // If epoch looks like seconds (10 digits), convert to ms
  if (epochStr.length <= 10) {
    epoch *= 1000;
  }

  const date = new Date(epoch);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-6">
        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={selectedRO}
            onChange={(e) => setSelectedRO(e.target.value)}
            className="border p-2 w-full rounded shadow"
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
            className="border p-2 w-full rounded shadow"
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
            className="border p-2 w-full rounded shadow"
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

        {/* Project Details */}
        {projectDetails && (
          <div>
            <h2 className="text-xl font-bold mb-2">Project Details</h2>
            <div className="bg-white shadow-lg rounded p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">
                {projectDetails.project_name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p>
                  <strong>NH Number:</strong> {projectDetails.nh_number}
                </p>
                <p>
                  <strong>Length:</strong> {projectDetails.length} km
                </p>
                <p>
                  <strong>Concessionaire:</strong>{" "}
                  {projectDetails.concessionaire}
                </p>
                <p>
                  <strong>Survey Year:</strong> {projectDetails.year}
                </p>
                <p>
                  <strong>Mode:</strong> {projectDetails.mode}
                </p>
                <p>
                  <strong>Completion Year:</strong>{" "}
                  {formatEpochDate(projectDetails.completion_year)}
                </p>
                <p>
                  <strong>ae/ie:</strong> {projectDetails["ae/ie"]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Inspection Cards */}
        {inspectionData.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Previous Inspections</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inspectionData.map((ins) => (
                <div
                  key={ins.id}
                  className="bg-white border rounded shadow-md p-4 space-y-2"
                >
                  <p>
                    <strong>Date:</strong> {formatEpochDate(ins.inspection_date)}
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
          </div>
        )}

        <div className="flex justify-between items-start gap-5">
        {/* Live Map */}
        {liveLocation && (
          <div className="justify-center items-start flex gap-5">
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Live Inspection Location</h3>
              <div className="flex justify-center items-center w-[50vw] rounded overflow-hidden shadow border">
                <LiveMap location={liveLocation} />
              </div>
            </div>
          </div>
        )}



{Array.isArray(distressData) && distressData.length > 0 && (
  <div className="mt-4 w-[46.5vw]">
    <div className="text-xl font-bold mb-2">Distress Data:</div>

    <div className="flex justify-between items-center mb-2">
      <div className="px-2 font-medium text-gray-600">
        Start Chainage: {distressData[0]["start_chainage_m"]}
      </div>
      <div className="px-2 font-medium text-gray-600">
        End Chainage: {distressData[0]["end_chainage_m"]}
      </div>
      <div className="px-2 font-medium text-gray-600">
        Distance Meters: {distressData[0]["distance_meters"]}
      </div>
    </div>

    <div className="overflow-x-auto rounded shadow border border-gray-200">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="py-2 px-4 border-b">Distress</th>
            {distressData.map((lane, idx) => (
              <th
                key={lane.distress_segment_id || idx}
                className="py-2 px-4 border-b text-center whitespace-nowrap"
              >
                {lane.lane_code || "N/A"} ({lane.side || "N/A"})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(distressData[0])
            .filter((field) => !hiddenFields.includes(field))
            .map((field) => (
              <tr key={field} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-medium text-gray-600 whitespace-nowrap">
                  {field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </td>
                {distressData.map((lane, idx) => (
                  <td
                    key={idx}
                    className="py-2 px-4 border-b text-center whitespace-nowrap"
                  >
                    {lane[field]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
)}
</div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-bold text-gray-600 border-t">
        Made with ❤️ by Ayan & Harshal
      </footer>
    </div>
  );
};

export default Dashboard;
