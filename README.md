# 🚛 Smart City Routing & IoT Optimization

An intelligent decision-support system that bridges the gap between **IoT-enabled bin monitoring** and **combinatorial optimization** to revolutionize urban waste management.

<img width="1900" height="642" alt="{20F295A8-2B94-4656-A324-EE4A2416278A}" src="https://github.com/user-attachments/assets/630fed5c-7279-4361-9d17-8b02f4f2a51d" />

<img width="1884" height="877" alt="{67B0C254-84CE-42E0-8A62-EDC81092704B}" src="https://github.com/user-attachments/assets/5c859112-6374-4577-82c7-7dd54bf86454" />

<img width="1891" height="929" alt="{1734999E-2159-4606-9392-6C7B9BB255FC}" src="https://github.com/user-attachments/assets/b7102aa0-dc8e-4e36-999b-7995516ad804" />



---

## 📖 Key Research Findings

Our research identifies two critical areas where technology disrupts traditional sanitation models:

* **Dynamic vs. Static:** Traditional "fixed-route" collection leads to **40% fuel wastage** due to inefficient "empty-bin" pickups.
* **Optimization Gap:** Transitioning to the **Held-Karp algorithm** provides a mathematically optimal path compared to greedy heuristics, yielding a **~22% reduction** in total distance traveled.

---

## 🚀 Features

* **Interactive Map UI:** Built with `Leaflet.js` to simulate real-world bin placement and depot locations across urban landscapes.
* **IoT Logic Simulation:** Dynamic fill-level simulation that triggers "Urgent" status for bins exceeding **80% capacity**.
* **Held-Karp Routing:** High-precision Python backend solving the **Traveling Salesman Problem (TSP)** using Dynamic Programming.
* **Sustainability Metrics:** Real-time dashboards for **Distance (KM)**, **Fuel Consumption (L)**, and **CO2 Emissions (KG)**.

---

## 🛠️ Technical Stack

| Layer | Technology | Role |
| --- | --- | --- |
| **Frontend** | React, React-Leaflet | Map Visualization & State Management |
| **Backend** | Flask (Python) | REST API & Optimization Engine |
| **Algorithm** | Held-Karp (DP) | Shortest Path Calculation ($O(n^2 2^n)$) |
| **Math/Science** | NumPy | Coordinate Haversine Distances |

---

## ⚙️ System Architecture

The system operates through a structured data pipeline from the edge to the server:

1. **Input:** User interacts with the UI to place a bin (simulating an **IoT Node**).
2. **Request:** React transmits GPS coordinates to the Flask `/optimize` endpoint via Axios.
3. **Process:** The backend generates a distance matrix and computes the **Shortest Hamiltonian Path**.
4. **Output:** React re-orders the `itinerary-list` and renders an animated **Polyline** route.

---

## 📊 Methodology & Optimization

The core engine utilizes the **Held-Karp Algorithm**. Unlike "Nearest Neighbor" heuristics, Held-Karp uses **memoization** to eliminate sub-optimal paths, which is critical for minimizing urban carbon footprints.

### Geospatial Calculation

To ensure accuracy on a spherical Earth, we calculate edge weights using the **Haversine Formula**:

$$d(i, j) = 2R \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos\phi_1\cos\phi_2\sin^2\left(\frac{\Delta\lambda}{2}\right)}\right)$$

---

## 🛠️ Local Setup

### 1. Backend (Python)

```bash
cd waste-backend
pip install flask flask-cors numpy
python app.py

```

### 2. Frontend (React)

```bash
cd easte-frontend
npm install
npm run dev

```

---

## 📝 Future Roadmap

* [ ] **Real IoT Integration:** Connect physical ESP32/Ultrasonic sensors to the cloud.
* [ ] **Predictive Analytics:** Implement **LSTM models** to predict bin fill-rates based on historical data.
* [ ] **Multi-Vehicle Support:** Solve the **Capacitated Vehicle Routing Problem (CVRP)** for fleet management.
