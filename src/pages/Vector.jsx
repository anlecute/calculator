import { useState } from "react";

const Vector = () => {
  const [dimension, setDimension] = useState(2);
  const [vectorU, setVectorU] = useState([3, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [vectorV, setVectorV] = useState([1, 2, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [scalar, setScalar] = useState(2);
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const handleUChange = (index, value) => {
    const newVector = [...vectorU];
    newVector[index] = Number(value) || 0;
    setVectorU(newVector);
  };

  const handleVChange = (index, value) => {
    const newVector = [...vectorV];
    newVector[index] = Number(value) || 0;
    setVectorV(newVector);
  };

  const getActiveU = () => vectorU.slice(0, dimension);
  const getActiveV = () => vectorV.slice(0, dimension);

  const calculateMagnitude = (vec) => {
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  };

  const dotProduct = (u, v) => {
    return u.reduce((sum, val, i) => sum + val * v[i], 0);
  };

  const crossProduct = (u, v) => {
    if (u.length !== 3 || v.length !== 3) return null;
    return [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0]
    ];
  };

  const calculateOperation = () => {
    const u = getActiveU();
    const v = getActiveV();
    let resultData = {};

    switch (operation) {
      case "add":
        resultData = {
          type: "vector",
          title: "Vector Addition: u + v",
          vector: u.map((val, i) => val + v[i]),
          formula: `(${u.join(", ")}) + (${v.join(", ")}) = (${u.map((val, i) => val + v[i]).join(", ")})`
        };
        break;

      case "subtract":
        resultData = {
          type: "vector",
          title: "Vector Subtraction: u - v",
          vector: u.map((val, i) => val - v[i]),
          formula: `(${u.join(", ")}) - (${v.join(", ")}) = (${u.map((val, i) => val - v[i]).join(", ")})`
        };
        break;

      case "dot":
        const dot = dotProduct(u, v);
        resultData = {
          type: "scalar",
          title: "Dot Product: u · v",
          value: dot,
          formula: `u · v = ${u.map((val, i) => `(${val} × ${v[i]})`).join(" + ")} = ${dot.toFixed(4)}`
        };
        break;

      case "cross":
        if (dimension !== 3) {
          resultData = {
            type: "error",
            title: "Cross Product: u × v",
            message: "Cross product is only defined for 3D vectors"
          };
        } else {
          const cross = crossProduct(u, v);
          resultData = {
            type: "vector",
            title: "Cross Product: u × v",
            vector: cross,
            formula: `u × v = (${u[1]}×${v[2]} - ${u[2]}×${v[1]}, ${u[2]}×${v[0]} - ${u[0]}×${v[2]}, ${u[0]}×${v[1]} - ${u[1]}×${v[0]}) = (${cross.join(", ")})`
          };
        }
        break;

      case "distance":
        const diff = u.map((val, i) => val - v[i]);
        const dist = calculateMagnitude(diff);
        resultData = {
          type: "scalar",
          title: "Distance: d(u, v)",
          value: dist,
          formula: `d(u,v) = ||u - v|| = √(${diff.map(val => `${val}²`).join(" + ")}) = ${dist.toFixed(4)}`
        };
        break;

      case "angle":
        const dot2 = dotProduct(u, v);
        const magU = calculateMagnitude(u);
        const magV = calculateMagnitude(v);
        const cosTheta = dot2 / (magU * magV);
        const angleRad = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
        const angleDeg = angleRad * (180 / Math.PI);
        resultData = {
          type: "scalar",
          title: "Angle: θ(u, v)",
          value: angleDeg,
          formula: `cos(θ) = (u · v) / (||u|| × ||v||) = ${dot2.toFixed(4)} / (${magU.toFixed(4)} × ${magV.toFixed(4)}) = ${cosTheta.toFixed(4)}\nθ = ${angleDeg.toFixed(4)}°`
        };
        break;

      case "parallel":
        const ratios = u.map((val, i) => v[i] !== 0 ? val / v[i] : null);
        const firstRatio = ratios.find(r => r !== null);
        const isParallel = ratios.every(r => r === null || Math.abs(r - firstRatio) < 0.0001);
        resultData = {
          type: "boolean",
          title: "Parallel Check",
          value: isParallel,
          formula: `Vectors are parallel if u = k×v for some scalar k.\nRatio check: ${isParallel ? `All ratios equal ${firstRatio?.toFixed(4)}` : "Ratios are not equal"}`
        };
        break;

      case "orthogonal":
        const dot3 = dotProduct(u, v);
        const isOrthogonal = Math.abs(dot3) < 0.0001;
        resultData = {
          type: "boolean",
          title: "Orthogonal Check",
          value: isOrthogonal,
          formula: `Vectors are orthogonal if u · v = 0.\nu · v = ${dot3.toFixed(4)} → ${isOrthogonal ? "Orthogonal ✓" : "Not Orthogonal ✗"}`
        };
        break;

      case "projection":
        const dot4 = dotProduct(u, v);
        const magVSq = v.reduce((sum, val) => sum + val * val, 0);
        const projScalar = dot4 / magVSq;
        const projection = v.map(val => projScalar * val);
        resultData = {
          type: "vector",
          title: "Projection of u onto v",
          vector: projection,
          formula: `proj_v(u) = ((u · v) / ||v||²) × v = (${dot4.toFixed(4)} / ${magVSq.toFixed(4)}) × (${v.join(", ")}) = (${projection.map(p => p.toFixed(4)).join(", ")})`
        };
        break;

      case "scalarProj":
        const dot5 = dotProduct(u, v);
        const magV2 = calculateMagnitude(v);
        const scalarProj = dot5 / magV2;
        resultData = {
          type: "scalar",
          title: "Scalar Projection of u onto v",
          value: scalarProj,
          formula: `comp_v(u) = (u · v) / ||v|| = ${dot5.toFixed(4)} / ${magV2.toFixed(4)} = ${scalarProj.toFixed(4)}`
        };
        break;

      case "scalarMult":
        resultData = {
          type: "vector",
          title: `Scalar Multiplication: ${scalar} × u`,
          vector: u.map(val => scalar * val),
          formula: `${scalar} × (${u.join(", ")}) = (${u.map(val => scalar * val).join(", ")})`
        };
        break;

      case "negate":
        resultData = {
          type: "vector",
          title: "Negate Vector: -u",
          vector: u.map(val => -val),
          formula: `-(${u.join(", ")}) = (${u.map(val => -val).join(", ")})`
        };
        break;

      case "magnitude":
        const mag = calculateMagnitude(u);
        resultData = {
          type: "scalar",
          title: "Magnitude: ||u||",
          value: mag,
          formula: `||u|| = √(${u.map(val => `${val}²`).join(" + ")}) = √${u.reduce((sum, val) => sum + val * val, 0)} = ${mag.toFixed(4)}`
        };
        break;

      case "normalize":
        const mag2 = calculateMagnitude(u);
        if (mag2 === 0) {
          resultData = {
            type: "error",
            title: "Normalize Vector",
            message: "Cannot normalize zero vector"
          };
        } else {
          const normalized = u.map(val => val / mag2);
          resultData = {
            type: "vector",
            title: "Normalize Vector: u / ||u||",
            vector: normalized,
            formula: `u / ||u|| = (${u.join(", ")}) / ${mag2.toFixed(4)} = (${normalized.map(n => n.toFixed(4)).join(", ")})`
          };
        }
        break;

      case "isZero":
        const isZero = u.every(val => val === 0);
        resultData = {
          type: "boolean",
          title: "Zero Vector Check",
          value: isZero,
          formula: `Vector u = (${u.join(", ")}) → ${isZero ? "Is Zero Vector ✓" : "Not Zero Vector ✗"}`
        };
        break;

      default:
        resultData = { type: "error", message: "Unknown operation" };
    }

    setResult(resultData);
  };



  const needsVectorV = ["add", "subtract", "dot", "cross", "distance", "angle", "parallel", "orthogonal", "projection", "scalarProj"].includes(operation);
  const needsScalar = ["scalarMult"].includes(operation);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Vector Operations</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
          {/* Dimension Selection */}
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

          {/* Vector U Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3 text-red-600">Vector u</label>
            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: dimension }).map((_, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">u{i + 1}:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={vectorU[i]}
                    onChange={(e) => handleUChange(i, e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">u = ({getActiveU().join(", ")})</p>
          </div>

          {/* Vector V Input (conditional) */}
          {needsVectorV && (
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3 text-blue-600">Vector v</label>
              <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: dimension }).map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">v{i + 1}:</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={vectorV[i]}
                      onChange={(e) => handleVChange(i, e.target.value)}
                      className="w-16 h-10 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">v = ({getActiveV().join(", ")})</p>
            </div>
          )}

          {/* Scalar Input (conditional) */}
          {needsScalar && (
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3 text-purple-600 text-center">Scalar k</label>
              <div className="flex justify-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={scalar}
                  onChange={(e) => setScalar(Number(e.target.value) || 0)}
                  className="w-24 h-10 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* Operation Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {/* Vector-Vector Operations */}
              <button onClick={() => setOperation("add")} className={`p-2 rounded text-sm ${operation === "add" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>u + v</button>
              <button onClick={() => setOperation("subtract")} className={`p-2 rounded text-sm ${operation === "subtract" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>u - v</button>
              <button onClick={() => setOperation("dot")} className={`p-2 rounded text-sm ${operation === "dot" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>u · v</button>
              <button onClick={() => setOperation("cross")} className={`p-2 rounded text-sm ${operation === "cross" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>u × v (3D)</button>
              <button onClick={() => setOperation("distance")} className={`p-2 rounded text-sm ${operation === "distance" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Distance</button>
              <button onClick={() => setOperation("angle")} className={`p-2 rounded text-sm ${operation === "angle" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Angle</button>
              <button onClick={() => setOperation("parallel")} className={`p-2 rounded text-sm ${operation === "parallel" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Parallel?</button>
              <button onClick={() => setOperation("orthogonal")} className={`p-2 rounded text-sm ${operation === "orthogonal" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Orthogonal?</button>
              <button onClick={() => setOperation("projection")} className={`p-2 rounded text-sm ${operation === "projection" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Projection</button>
              <button onClick={() => setOperation("scalarProj")} className={`p-2 rounded text-sm ${operation === "scalarProj" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Scalar Proj</button>
              
              {/* Vector-Scalar Operations */}
              <button onClick={() => setOperation("scalarMult")} className={`p-2 rounded text-sm ${operation === "scalarMult" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>k × u</button>
              <button onClick={() => setOperation("negate")} className={`p-2 rounded text-sm ${operation === "negate" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>-u</button>
              
              {/* Single Vector Operations */}
              <button onClick={() => setOperation("magnitude")} className={`p-2 rounded text-sm ${operation === "magnitude" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>||u||</button>
              <button onClick={() => setOperation("normalize")} className={`p-2 rounded text-sm ${operation === "normalize" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Normalize</button>
              <button onClick={() => setOperation("isZero")} className={`p-2 rounded text-sm ${operation === "isZero" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Zero?</button>
            </div>
          </div>

          <button
            onClick={calculateOperation}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-6">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">{result.title}</h3>
            
            {result.type === "vector" && (
              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-500">
                <p className="text-xl text-center mb-4 text-green-800 font-bold">
                  Result = ({result.vector.map(v => v.toFixed(4)).join(", ")})
                </p>
                <p className="text-sm text-green-700 text-center whitespace-pre-line">{result.formula}</p>
              </div>
            )}

            {result.type === "scalar" && (
              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-500">
                <p className="text-2xl text-center mb-4 text-blue-800 font-bold">
                  Result = {result.value.toFixed(4)}
                </p>
                <p className="text-sm text-blue-700 text-center whitespace-pre-line">{result.formula}</p>
              </div>
            )}

            {result.type === "boolean" && (
              <div className={`p-6 rounded-lg border-2 ${result.value ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}>
                <p className={`text-2xl text-center mb-4 font-bold ${result.value ? "text-green-800" : "text-red-800"}`}>
                  {result.value ? "✓ TRUE" : "✗ FALSE"}
                </p>
                <p className={`text-sm text-center whitespace-pre-line ${result.value ? "text-green-700" : "text-red-700"}`}>{result.formula}</p>
              </div>
            )}

            {result.type === "error" && (
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-500">
                <p className="text-xl text-center text-red-800 font-bold">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vector;
