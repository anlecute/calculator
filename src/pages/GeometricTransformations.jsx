import { useState, useRef, useEffect } from "react";

const GeometricTransformations = () => {
  const [transformType, setTransformType] = useState("rotation");
  const [angle, setAngle] = useState("45");
  const [scaleX, setScaleX] = useState("1.5");
  const [scaleY, setScaleY] = useState("1.5");
  const [shearX, setShearX] = useState("0.5");
  const [shearY, setShearY] = useState("0.5");
  const [reflectAxis, setReflectAxis] = useState("x");
  
  const canvasRef = useRef(null);

  const originalShape = [
    [1, 0],
    [2, 0],
    [2, 1],
    [1, 1]
  ];

  const getTransformationMatrix = () => {
    switch (transformType) {
      case "rotation": {
        const rad = (Number(angle) * Math.PI) / 180;
        return [
          [Math.cos(rad), -Math.sin(rad)],
          [Math.sin(rad), Math.cos(rad)]
        ];
      }
      case "scaling":
        return [
          [Number(scaleX), 0],
          [0, Number(scaleY)]
        ];
      case "shearing":
        return [
          [1, Number(shearX)],
          [Number(shearY), 1]
        ];
      case "reflection":
        if (reflectAxis === "x") {
          return [
            [1, 0],
            [0, -1]
          ];
        } else if (reflectAxis === "y") {
          return [
            [-1, 0],
            [0, 1]
          ];
        } else {
          return [
            [0, 1],
            [1, 0]
          ];
        }
      default:
        return [
          [1, 0],
          [0, 1]
        ];
    }
  };

  const applyTransformation = (matrix, point) => {
    return [
      matrix[0][0] * point[0] + matrix[0][1] * point[1],
      matrix[1][0] * point[0] + matrix[1][1] * point[1]
    ];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const scale = 60;
    const originX = width / 2;
    const originY = height / 2;

    // Draw grid
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(originX + i * scale, 0);
      ctx.lineTo(originX + i * scale, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, originY + i * scale);
      ctx.lineTo(width, originY + i * scale);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Draw original shape
    ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
    ctx.strokeStyle = "rgb(59, 130, 246)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    originalShape.forEach((point, i) => {
      const x = originX + point[0] * scale;
      const y = originY - point[1] * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Apply transformation
    const transformMatrix = getTransformationMatrix();
    const transformedShape = originalShape.map(point => 
      applyTransformation(transformMatrix, point)
    );

    // Draw transformed shape
    ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
    ctx.strokeStyle = "rgb(239, 68, 68)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    transformedShape.forEach((point, i) => {
      const x = originX + point[0] * scale;
      const y = originY - point[1] * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw legend
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgb(59, 130, 246)";
    ctx.fillText("■ Original", 20, 30);
    ctx.fillStyle = "rgb(239, 68, 68)";
    ctx.fillText("■ Transformed", 120, 30);

  }, [transformType, angle, scaleX, scaleY, shearX, shearY, reflectAxis]);

  const matrix = getTransformationMatrix();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Geometric Transformations Visualizer
        </h1>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Controls */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Transformation Controls</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Transformation Type</label>
              <select
                value={transformType}
                onChange={(e) => setTransformType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rotation">Rotation</option>
                <option value="scaling">Scaling</option>
                <option value="shearing">Shearing</option>
                <option value="reflection">Reflection</option>
              </select>
            </div>

            {transformType === "rotation" && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Angle (degrees): {angle}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full"
                />
                <input
                  type="number"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {transformType === "scaling" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Scale X: {scaleX}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleX}
                    onChange={(e) => setScaleX(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={scaleX}
                    onChange={(e) => setScaleX(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Scale Y: {scaleY}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleY}
                    onChange={(e) => setScaleY(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={scaleY}
                    onChange={(e) => setScaleY(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {transformType === "shearing" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Shear X: {shearX}</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={shearX}
                    onChange={(e) => setShearX(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={shearX}
                    onChange={(e) => setShearX(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Shear Y: {shearY}</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={shearY}
                    onChange={(e) => setShearY(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={shearY}
                    onChange={(e) => setShearY(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {transformType === "reflection" && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Reflection Axis</label>
                <select
                  value={reflectAxis}
                  onChange={(e) => setReflectAxis(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="x">X-axis</option>
                  <option value="y">Y-axis</option>
                  <option value="diagonal">Diagonal (y=x)</option>
                </select>
              </div>
            )}

            {/* Transformation Matrix */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-500">
              <h4 className="font-semibold text-green-800 mb-3 text-center">Transformation Matrix</h4>
              <div className="flex justify-center mb-3">
                <div className="grid grid-cols-2 gap-2">
                  {matrix.map((row, i) =>
                    row.map((cell, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="w-24 h-12 border-2 border-green-600 bg-white rounded flex items-center justify-center font-bold text-green-700"
                      >
                        {cell.toFixed(3)}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <p className="text-sm text-green-700 text-center">
                [x'] = [a  b] [x]
                <br />
                [y']   [c  d] [y]
              </p>
            </div>

            {/* Explanation */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">How it works:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                {transformType === "rotation" && (
                  <>
                    <p>• Rotates points around origin by angle θ</p>
                    <p>• Matrix: [cos θ  -sin θ; sin θ  cos θ]</p>
                    <p>• Preserves distances and angles</p>
                  </>
                )}
                {transformType === "scaling" && (
                  <>
                    <p>• Stretches/compresses along axes</p>
                    <p>• Matrix: [sx  0; 0  sy]</p>
                    <p>• sx &gt; 1: expand X, sx &lt; 1: compress X</p>
                    <p>• sy &gt; 1: expand Y, sy &lt; 1: compress Y</p>
                  </>
                )}
                {transformType === "shearing" && (
                  <>
                    <p>• Slants shape parallel to axes</p>
                    <p>• Matrix: [1  kx; ky  1]</p>
                    <p>• kx: shear horizontally, ky: shear vertically</p>
                    <p>• Preserves area but changes angles</p>
                  </>
                )}
                {transformType === "reflection" && (
                  <>
                    <p>• Mirrors shape across axis/line</p>
                    <p>• X-axis: [1  0; 0  -1]</p>
                    <p>• Y-axis: [-1  0; 0  1]</p>
                    <p>• Diagonal: [0  1; 1  0]</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">Visualization</h3>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="border-2 border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Blue shape: Original</p>
              <p>Red shape: After transformation</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Understanding Geometric Transformations</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Rotation Matrix</h4>
              <p className="text-sm mb-2">Rotates counterclockwise by angle θ around the origin:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                R(θ) = [cos(θ)  -sin(θ)]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sin(θ)   cos(θ)]
              </code>
              <p className="text-xs mt-2 text-gray-600">Preserves lengths and angles (isometry)</p>
            </div>

            <div>
              <h4 className="font-semibold text-green-800 mb-2">Scaling Matrix</h4>
              <p className="text-sm mb-2">Scales by factors sx (horizontal) and sy (vertical):</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                S(sx, sy) = [sx   0]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0  sy]
              </code>
              <p className="text-xs mt-2 text-gray-600">Uniform scaling if sx = sy</p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Shearing Matrix</h4>
              <p className="text-sm mb-2">Slants shape parallel to coordinate axes:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                Shear = [1   kx]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ky   1]
              </code>
              <p className="text-xs mt-2 text-gray-600">Preserves area but distorts angles</p>
            </div>

            <div>
              <h4 className="font-semibold text-red-800 mb-2">Reflection Matrix</h4>
              <p className="text-sm mb-2">Mirrors across axes or diagonal:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                X-axis: [1   0]  Y-axis: [-1  0]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0  -1]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0  1]
              </code>
              <p className="text-xs mt-2 text-gray-600">Reverses orientation (determinant = -1)</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-300">
            <h4 className="font-semibold text-amber-800 mb-2">Composition of Transformations</h4>
            <p className="text-sm text-amber-700">
              Multiple transformations can be combined by multiplying their matrices: T = T₃ × T₂ × T₁
              (applied right to left). This is powerful in computer graphics for complex animations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometricTransformations;
