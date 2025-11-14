import { useState, useEffect } from "react";

const Determinant = () => {
  const [size, setSize] = useState("2");
  const [matrix, setMatrix] = useState(Array(2).fill(0).map(() => Array(2).fill(0)));
  const [result, setResult] = useState(null);

  useEffect(() => {
    const n = Number(size);
    if (n > 0 && n <= 10) {
      const newMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
      setMatrix(newMatrix);
      setResult(null);
    }
  }, [size]);

  const handleChange = (i, j, value) => {
    const newMatrix = matrix.map((row, r) =>
      row.map((cell, c) => (r === i && c === j ? Number(value) || 0 : cell))
    );
    setMatrix(newMatrix);
  };

  const getMinorMatrixString = (mat) => {
    if (mat.length === 1) return `${mat[0][0]}`;
    if (mat.length === 2) {
      return `|${mat[0][0]} ${mat[0][1]}| |${mat[1][0]} ${mat[1][1]}|`;
    }
    return mat.map(row => `[${row.map(v => v.toFixed(2)).join(', ')}]`).join(', ');
  };

  const calculateDeterminant = (mat) => {
    const n = mat.length;
    if (n === 1) return { value: mat[0][0], steps: [] };
    if (n === 2) {
      const value = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
      const steps = [{
        description: "2×2 Determinant Formula",
        formula: `det(A) = (${mat[0][0]}) × (${mat[1][1]}) - (${mat[0][1]}) × (${mat[1][0]}) = ${value}`
      }];
      return { value, steps };
    }

    let det = 0;
    const steps = [];
    steps.push({
      description: `Cofactor Expansion along Row 1`,
      formula: `det(A) = ${mat[0].map((val, j) => `${j > 0 ? (j % 2 === 0 ? ' + ' : ' - ') : ''}${val} × M${1}${j + 1}`).join('')}`
    });

    for (let j = 0; j < n; j++) {
      const minor = mat.slice(1).map(row => row.filter((_, idx) => idx !== j));
      const minorDet = calculateDeterminant(minor);
      const cofactor = Math.pow(-1, j) * mat[0][j] * minorDet.value;
      det += cofactor;
      
      if (mat[0][j] !== 0) {
        // Hiển thị ma trận minor chi tiết
        let minorCalc = '';
        if (minor.length === 2) {
          minorCalc = ` = (${minor[0][0]} × ${minor[1][1]}) - (${minor[0][1]} × ${minor[1][0]}) = ${(minor[0][0] * minor[1][1]).toFixed(2)} - ${(minor[0][1] * minor[1][0]).toFixed(2)}`;
        }
        
        steps.push({
          description: `Minor M${1}${j + 1} (remove row 1, column ${j + 1})`,
          formula: `M${1}${j + 1} = det(${getMinorMatrixString(minor)})${minorCalc} = ${minorDet.value.toFixed(2)}`
        });
        
        steps.push({
          description: `Cofactor C${1}${j + 1}`,
          formula: `C${1}${j + 1} = ${j % 2 === 0 ? '(+1)' : '(-1)'} × ${mat[0][j]} × ${minorDet.value.toFixed(2)} = ${cofactor.toFixed(2)}`
        });
      }
    }

    steps.push({
      description: "Final Result",
      formula: `det(A) = ${mat[0].map((val, j) => Math.pow(-1, j) * val * calculateDeterminant(mat.slice(1).map(row => row.filter((_, idx) => idx !== j))).value).map((v, i) => `${i > 0 ? ' + ' : ''}${v.toFixed(2)}`).join('')} = ${det.toFixed(2)}`
    });

    return { value: det, steps };
  };

  const calculate = () => {
    const result = calculateDeterminant(matrix);
    setResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Determinant Calculator</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Matrix Size:</span>
            <input
              type="number"
              min="2"
              max="10"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg font-bold text-gray-600">×</span>
            <input
              type="number"
              min="2"
              max="10"
              value={size}
              disabled
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center bg-gray-100"
            />
          </div>

          {matrix.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-center">
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrix.length}, 60px)` }}>
                  {matrix.map((row, i) =>
                    row.map((cell, j) => (
                      <input
                        key={`${i}-${j}`}
                        type="text"
                        inputMode="numeric"
                        value={cell}
                        onChange={(e) => handleChange(i, j, e.target.value)}
                        className="w-[60px] h-[60px] border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate Determinant
          </button>
        </div>

        {result !== null && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Result</h3>
            <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg border-2 border-green-500 mb-8">
              <span className="text-3xl font-bold text-green-700">det(A) = {result.value.toFixed(4)}</span>
            </div>

            {result.steps.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-bold text-center mb-4 text-gray-800">Step-by-Step Calculation</h4>
                <div className="space-y-3">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                      <p className="font-semibold text-orange-800 mb-2">{step.description}</p>
                      <p className="font-mono text-sm text-orange-700">{step.formula}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Method:</h4>
              <p className="text-blue-700">
                {matrix.length === 2 
                  ? "For a 2×2 matrix, the determinant is calculated using the formula: ad - bc"
                  : "For larger matrices, we use cofactor expansion along the first row. Each element is multiplied by its cofactor (minor determinant with alternating signs)."
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Determinant;
