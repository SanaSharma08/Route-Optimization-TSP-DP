import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import './Simulator.css';
import 'leaflet/dist/leaflet.css';

const Simulator = () => {
  const depotPos = [28.6139, 77.2090];
  const initialDepot = { pos: depotPos, fill: 0, address: 'Main Depot Center', id: 'DEPOT' };
  
  const [bins, setBins] = useState([initialDepot]); 
  const [metrics, setMetrics] = useState({ distance: 0, fuel: 0, co2: 0 });
  const [loading, setLoading] = useState(false);

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: { 'User-Agent': 'WasteLogix-App' }
      });
      return res.data.display_name.split(',').slice(0, 2).join(','); 
    } catch { return "New Collection Point"; }
  };

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        setLoading(true);
        const { lat, lng } = e.latlng;
        const address = await fetchAddress(lat, lng);
        setBins(prev => [...prev, { pos: [lat, lng], fill: Math.floor(Math.random() * 100), address, id: prev.length }]);
        setLoading(false);
      },
    });
    return null;
  }

  const runOptimization = async () => {
  if (bins.length < 3) return alert("Add at least 2 bins plus the Depot!");
  setLoading(true);
  
  try {
    const response = await axios.post('http://localhost:5000/optimize', { 
      locations: bins.map(b => b.pos) 
    });

    // Check if the structure exists
    if (response.data && Array.isArray(response.data.route)) {
      const optimalIndices = response.data.route;
      
      // 1. Reorder the bins based on the returned indices
      // We slice(0, -1) because Python returns [0, 1, 2, 0], and we don't want the depot twice in the array
      const reorderedBins = optimalIndices.slice(0, -1).map(idx => bins[idx]);

      // 2. Batch update state
      setBins(reorderedBins);
      setMetrics({
        distance: response.data.distance.toFixed(2),
        fuel: (response.data.distance * 0.4).toFixed(2),
        co2: (response.data.distance * 2.6).toFixed(2)
      });
    } else {
      alert("Backend returned empty data. Check your Python terminal for errors.");
    }
  } catch (err) {
    console.error("Fetch Error:", err);
    alert("Connection Error: Is the Flask server running on port 5000?");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="brand"><h1> CleanUp</h1><span>Smart Decision Support System</span></div>
        <div className="header-stats">
          <div className="h-stat"><span>DISTANCE</span><strong>{metrics.distance} KM</strong></div>
          <div className="h-stat"><span>FUEL</span><strong>{metrics.fuel} L</strong></div>
          <div className="h-stat"><span>CO2</span><strong>{metrics.co2} KG</strong></div>
        </div>
      </header>

      <div className="app-content">
        <aside className="sidebar-modern">
          <div className="action-group">
            <button onClick={runOptimization} className="btn-modern primary" disabled={loading}>
              {loading ? "Calculating..." : "Optimize Route"}
            </button>
            <button onClick={() => setBins([initialDepot])} className="btn-modern danger">Clear All</button>
          </div>
          <div className="itinerary-section">
            <h3>Pickup Sequence</h3>
            <div className="itinerary-list">
              {bins.map((bin, idx) => (
                <div key={idx} className={`itinerary-item ${bin.fill > 80 ? 'urgent' : ''}`}>
                  <div className="step-num">{idx === 0 ? "★" : idx}</div>
                  <div className="step-info">
                    <p className="addr">{bin.address}</p>
                    <small>{bin.id === 'DEPOT' ? 'DEPOT' : `Bin #${bin.id} - ${bin.fill}%`}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="map-view-modern">
          <MapContainer center={depotPos} zoom={13} style={{height: "100%", width: "100%"}} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            {bins.map((bin, idx) => (
              <Marker key={idx} position={bin.pos} icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div class="marker-pin ${idx === 0 ? 'depot' : bin.fill > 80 ? 'full' : 'ok'}"><span>${idx === 0 ? 'H' : idx}</span></div>`
                })} 
              />
            ))}
            {metrics.distance > 0 && <Polyline positions={[...bins.map(b => b.pos), depotPos]} color="#2e7d32" weight={4} dashArray="10, 15" className="animated-polyline" />}
          </MapContainer>
        </main>
      </div>
    </div>
  );
}

export default Simulator