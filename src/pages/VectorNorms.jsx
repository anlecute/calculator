import { useState } from "react";

const VectorNorms = () => {
  const [dimension, setDimension] = useState(3);
  const [vector, setVector] = useState([3, 4, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newVector = [...vector];
    newVector[index] = Number(value) || 0;
    setVector(newVector);
  };

  const getActiveVector = () => vector.slice(0, dimension);

  const calculateNorms = () => {
    const v = getActiveVector();
    
    // L0 Norm (count non-zero elements)
    const l0 = v.filter(x => x !== 0).length;

    // L1 Norm (Manhattan)
    const l1 = v.reduce((sum, x) => sum + Math.abs(x), 0);

    // L2 Norm (Euclidean)
    const l2 = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));

    // L-infinity Norm (Max)
    const lInf = Math.max(...v.map(Math.abs));

    // P-norms for different p values
    const pNorms = [3, 4, 5].map(p => ({
      p,
      value: Math.pow(v.reduce((sum, x) => sum + Math.pow(Math.abs(x), p), 0), 1/p)
    }));

    // Unit vector (normalized)
    const unitVector = l2 !== 0 ? v.map(x => x / l2) : v;

    setResult({
      vector: v,
      l0,
      l1,
      l2,
      lInf,
      pNorms,
      unitVector,
      isZero: l2 === 0,
      isUnit: Math.abs(l2 - 1) < 1e-6
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Vector Norms Calculator</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Dimension:</span>
            <input
              type="number"
              min="2"
              max="10"
              value={dimension}
              onChange={(e) => setDimension(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3 text-blue-600 text-center">Vector v</label>
            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: dimension }).map((_, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">v{i + 1}:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={vector[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">v = ({getActiveVector().join(", ")})</p>
          </div>

          <button
            onClick={calculateNorms}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate Norms
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Vector Norms</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* L0 Norm */}
              <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-500">
                <h4 className="font-semibold text-purple-800 mb-2">L⁰ Norm (Sparsity)</h4>
                <p className="text-3xl font-bold text-purple-800 mb-2">{result.l0}</p>
                <p className="text-sm text-purple-700">Count of non-zero elements</p>
                <p className="text-xs text-purple-600 mt-2 font-mono">||v||₀ = {result.l0}</p>
              </div>

              {/* L1 Norm */}
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">L¹ Norm (Manhattan)</h4>
                <p className="text-3xl font-bold text-blue-800 mb-2">{result.l1.toFixed(4)}</p>
                <p className="text-sm text-blue-700">Sum of absolute values</p>
                <p className="text-xs text-blue-600 mt-2 font-mono">
                  ||v||₁ = {result.vector.map(x => `|${x}|`).join(' + ')} = {result.l1.toFixed(4)}
                </p>
              </div>

              {/* L2 Norm */}
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">L² Norm (Euclidean)</h4>
                <p className="text-3xl font-bold text-green-800 mb-2">{result.l2.toFixed(4)}</p>
                <p className="text-sm text-green-700">Standard vector length</p>
                <p className="text-xs text-green-600 mt-2 font-mono">
                  ||v||₂ = √({result.vector.map(x => `${x}²`).join(' + ')}) = {result.l2.toFixed(4)}
                </p>
              </div>

              {/* L-infinity Norm */}
              <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">L^∞ Norm (Max)</h4>
                <p className="text-3xl font-bold text-orange-800 mb-2">{result.lInf.toFixed(4)}</p>
                <p className="text-sm text-orange-700">Maximum absolute value</p>
                <p className="text-xs text-orange-600 mt-2 font-mono">
                  ||v||∞ = max(|v|) = {result.lInf.toFixed(4)}
                </p>
              </div>

              {/* Other P-norms */}
              {result.pNorms.map(({ p, value }) => (
                <div key={p} className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-500">
                  <h4 className="font-semibold text-indigo-800 mb-2">L^{p} Norm</h4>
                  <p className="text-3xl font-bold text-indigo-800 mb-2">{value.toFixed(4)}</p>
                  <p className="text-sm text-indigo-700">P-norm with p = {p}</p>
                  <p className="text-xs text-indigo-600 mt-2 font-mono">
                    ||v||_{p} = (Σ|vᵢ|^{p})^(1/{p})
                  </p>
                </div>
              ))}
            </div>

            {/* Unit Vector */}
            <div className="p-6 bg-cyan-50 rounded-lg border-2 border-cyan-500 mb-6">
              <h4 className="font-semibold text-cyan-800 mb-3 text-lg">Unit Vector (Normalized)</h4>
              <p className="text-cyan-700 mb-2">
                v̂ = v / ||v||₂ = ({result.unitVector.map(x => x.toFixed(4)).join(", ")})
              </p>
              <p className="text-sm text-cyan-600">
                {result.isZero ? "Cannot normalize zero vector" : `Magnitude: ||v̂||₂ = 1.0000`}
              </p>
            </div>

            {/* Properties */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg border-2 ${result.isZero ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500"}`}>
                <h4 className={`font-semibold mb-2 ${result.isZero ? "text-red-800" : "text-green-800"}`}>
                  Zero Vector Check
                </h4>
                <p className={`text-2xl font-bold ${result.isZero ? "text-red-800" : "text-green-800"}`}>
                  {result.isZero ? "✓ Is Zero Vector" : "✗ Not Zero Vector"}
                </p>
              </div>

              <div className={`p-4 rounded-lg border-2 ${result.isUnit ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-500"}`}>
                <h4 className={`font-semibold mb-2 ${result.isUnit ? "text-green-800" : "text-gray-800"}`}>
                  Unit Vector Check
                </h4>
                <p className={`text-2xl font-bold ${result.isUnit ? "text-green-800" : "text-gray-800"}`}>
                  {result.isUnit ? "✓ Is Unit Vector" : "✗ Not Unit Vector"}
                </p>
                <p className={`text-sm ${result.isUnit ? "text-green-700" : "text-gray-700"}`}>
                  ||v||₂ = {result.l2.toFixed(4)}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Norm Explanations</h4>
              <div className="text-blue-700 text-sm space-y-2">
                <p><strong>L⁰ (Sparsity):</strong> Number of non-zero components. Used in sparse signal processing.</p>
                <p><strong>L¹ (Manhattan):</strong> Sum of absolute values. Used in optimization (LASSO), measures "city block" distance.</p>
                <p><strong>L² (Euclidean):</strong> Standard geometric length. Most common norm, measures straight-line distance.</p>
                <p><strong>L^∞ (Max):</strong> Maximum absolute component. Used in uniform approximation, Chebyshev distance.</p>
                <p><strong>L^p Norms:</strong> Generalized norms. As p → ∞, L^p approaches L^∞. As p → 0, approaches L⁰.</p>
                <p><strong>Unit Vector:</strong> Direction of v with magnitude 1. Used for representing directions in ML/graphics.</p>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Norm Comparison</h4>
              <div className="space-y-2">
                {[
                  { name: "L⁰", value: result.l0, max: dimension },
                  { name: "L¹", value: result.l1, max: Math.max(result.l1, result.l2, result.lInf) },
                  { name: "L²", value: result.l2, max: Math.max(result.l1, result.l2, result.lInf) },
                  { name: "L^∞", value: result.lInf, max: Math.max(result.l1, result.l2, result.lInf) }
                ].map(({ name, value, max }) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{name}</span>
                      <span className="text-gray-600">{typeof value === 'number' ? value.toFixed(4) : value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${max > 0 ? (value / max) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VectorNorms;
