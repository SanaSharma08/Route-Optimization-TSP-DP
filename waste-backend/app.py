from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

def haversine(coord1, coord2):
    R = 6371.0
    lat1, lon1 = np.radians(coord1)
    lat2, lon2 = np.radians(coord2)
    dlat, dlon = lat1 - lat2, lon1 - lon2
    a = np.sin(dlat / 2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2)**2
    return R * (2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a)))

def held_karp(dists):
    n = len(dists)
    if n <= 1: return 0, [0]
    
    memo = {}
    for i in range(1, n):
        memo[(1 << i, i)] = (dists[0][i], 0)

    for size in range(2, n):
        for subset in range(1, 1 << n):
            if bin(subset).count('1') != size or (subset & 1): continue
            for next_node in range(1, n):
                if not (subset & (1 << next_node)): continue
                prev_subset = subset ^ (1 << next_node)
                res = [(memo[(prev_subset, k)][0] + dists[k][next_node], k) 
                       for k in range(1, n) if (prev_subset & (1 << k))]
                if res: memo[(subset, next_node)] = min(res)

    full_subset = (1 << n) - 2
    res = [(memo[(full_subset, k)][0] + dists[k][0], k) for k in range(1, n) if (full_subset, k) in memo]
    
    if not res: return 0, list(range(n)) + [0]
    
    min_cost, parent = min(res)
    path, curr, subset = [0], parent, full_subset
    while curr != 0:
        path.append(curr)
        new_subset = subset ^ (1 << curr)
        _, curr = memo[(subset, curr)]
        subset = new_subset
    path.reverse()
    return min_cost, path + [0]

@app.route('/optimize', methods=['POST'])
def optimize():
    try:
        locations = request.json.get('locations', [])
        n = len(locations)
        if n < 2: return jsonify({"distance": 0, "route": [0]})

        matrix = [[haversine(locations[i], locations[j]) for j in range(n)] for i in range(n)]
        dist, route = held_karp(matrix)
        
        # Return as plain list of ints
        return jsonify({"distance": float(dist), "route": [int(i) for i in route]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)