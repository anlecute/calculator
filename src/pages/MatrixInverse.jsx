import { useState, useEffect } from "react";

const MatrixInverse = () => {
  const [size, setSize] = useState("2");
  const [matrix, setMatrix] = useState(Array(2).fill(0).map(() => Array(2).fill(0)));
  const [result, setResult] = useState(null);

  // Function to convert decimal to fraction
  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const toFraction = (decimal) => {
    if (Math.abs(decimal) < 1e-10) return "0";
    if (Number.isInteger(decimal)) return decimal.toString();

    const tolerance = 1e-6;
    const sign = decimal < 0 ? "-" : "";
    decimal = Math.abs(decimal);

    // Try to find fraction with denominator up to 1000
    for (let denominator = 1; denominator <= 1000; denominator++) {
      const numerator = Math.round(decimal * denominator);
      if (Math.abs(decimal - numerator / denominator) < tolerance) {
        const g = gcd(numerator, denominator);
        const num = numerator / g;
        const den = denominator / g;
        if (den === 1) return sign + num;
        return sign + num + "/" + den;
      }
    }

    // Fallback to decimal with 4 digits
    return decimal.toFixed(4);
  };

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

  const calculateDeterminant = (mat) => {
    const n = mat.length;
    if (n === 1) return mat[0][0];
    if (n === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];

    let det = 0;
    for (let j = 0; j < n; j++) {
      const minor = mat.slice(1).map(row => row.filter((_, idx) => idx !== j));
      det += Math.pow(-1, j) * mat[0][j] * calculateDeterminant(minor);
    }
    return det;
  };

  const calculateInverse = () => {
    const n = matrix.length;
    const det = calculateDeterminant(matrix);
    const steps = [];

    steps.push({
      description: "Original Matrix A",
      matrix: matrix.map(row => [...row]),
      augmented: null
    });

    // Check if matrix is invertible
    if (Math.abs(det) < 1e-10) {
      setResult({
        error: true,
        message: "Matrix is singular (determinant = 0). Inverse does not exist.",
        determinant: det,
        steps: steps
      });
      return;
    }

    const detFraction = toFraction(det);
    steps.push({
      description: `Determinant: det(A) = ${detFraction} ≠ 0, so A⁻¹ exists`,
      matrix: null,
      augmented: null
    });

    // Create augmented matrix [A | I]
    const augmented = matrix.map((row, i) => [
      ...row,
      ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
    ]);

    steps.push({
      description: "Create Augmented Matrix [A | I]",
      matrix: null,
      augmented: augmented.map(row => [...row])
    });

    // Gauss-Jordan Elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }

      // Swap rows if needed
      if (maxRow !== i) {
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
        steps.push({
          description: `Swap Row ${i + 1} ↔ Row ${maxRow + 1}`,
          matrix: null,
          augmented: augmented.map(row => [...row])
        });
      }

      // Scale pivot row to make pivot = 1
      const pivot = augmented[i][i];
      if (pivot !== 1) {
        const pivotFraction = toFraction(pivot);
        for (let j = 0; j < 2 * n; j++) {
          augmented[i][j] /= pivot;
        }
        steps.push({
          description: `Row ${i + 1} = Row ${i + 1} / (${pivotFraction})`,
          matrix: null,
          augmented: augmented.map(row => [...row])
        });
      }

      // Eliminate column
      for (let k = 0; k < n; k++) {
        if (k !== i && augmented[k][i] !== 0) {
          const factor = augmented[k][i];
          const factorFraction = toFraction(factor);
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
          steps.push({
            description: `Row ${k + 1} = Row ${k + 1} - (${factorFraction}) × Row ${i + 1}`,
            matrix: null,
            augmented: augmented.map(row => [...row])
          });
        }
      }
    }

    // Extract inverse matrix from right side
    const inverse = augmented.map(row => row.slice(n));

    steps.push({
      description: "Final: [I | A⁻¹] - Extract the inverse from right side",
      matrix: null,
      augmented: augmented.map(row => [...row])
    });

    // Verify: A × A⁻¹ = I
    const identity = matrix.map((row, i) =>
      Array(n).fill(0).map((_, j) => {
        let sum = 0;
        for (let k = 0; k < n; k++) {
          sum += matrix[i][k] * inverse[k][j];
        }
        return sum;
      })
    );

    setResult({
      error: false,
      inverse: inverse,
      determinant: det,
      identity: identity,
      steps: steps
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Matrix Inverse Calculator</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Matrix Size:</span>
            <input
              type="number"
              min="2"
              max="5"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg font-bold text-gray-600">×</span>
            <input
              type="number"
              min="2"
              max="5"
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
            onClick={calculateInverse}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate Inverse
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Result</h3>

            {result.error ? (
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-500">
                <p className="text-xl text-center text-red-800 font-bold mb-2">{result.message}</p>
                <p className="text-center text-red-700">det(A) = {toFraction(result.determinant)}</p>
              </div>
            ) : (
              <>
                <div className="mb-12">
                  <h4 className="text-lg font-semibold text-center mb-6 text-gray-700">A⁻¹ (Inverse Matrix)</h4>
                  <div className="flex justify-center">
                    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${result.inverse[0].length}, 100px)` }}>
                      {result.inverse.map((row, i) =>
                        row.map((cell, j) => (
                          <div
                            key={`inv-${i}-${j}`}
                            className="w-[100px] h-[70px] border-2 border-green-500 bg-green-50 rounded flex items-center justify-center font-bold text-green-700 text-sm px-1"
                          >
                            {toFraction(cell)}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-12 p-6 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <h4 className="font-semibold text-blue-800 mb-4 text-lg text-center">Verification: A × A⁻¹ = I</h4>
                  <div className="flex justify-center">
                    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${result.identity[0].length}, 90px)` }}>
                      {result.identity.map((row, i) =>
                        row.map((cell, j) => (
                          <div
                            key={`id-${i}-${j}`}
                            className={`w-[90px] h-[60px] border-2 rounded flex items-center justify-center text-sm font-semibold ${
                              Math.abs(cell - (i === j ? 1 : 0)) < 0.01
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-red-500 bg-red-50 text-red-700"
                            }`}
                          >
                            {toFraction(cell)}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-bold text-center mb-6 text-gray-800">Step-by-Step Solution</h4>
                  <div className="space-y-6">
                    {result.steps.map((step, idx) => (
                      <div key={idx} className="p-5 bg-orange-50 rounded-lg border-2 border-orange-300">
                        <p className="font-semibold text-orange-800 mb-3 text-base">{step.description}</p>
                        {step.augmented && (
                          <div className="overflow-x-auto mt-3">
                            <div className="inline-block min-w-full">
                              {step.augmented.map((row, i) => (
                                <div key={i} className="flex items-center gap-3 mb-3 justify-center">
                                  <span className="text-gray-600 w-12 text-sm font-semibold">R{i+1}:</span>
                                  {row.map((cell, j) => (
                                    <span 
                                      key={j} 
                                      className={`inline-flex items-center justify-center w-24 h-10 text-center font-mono text-sm border-2 border-gray-300 bg-white rounded px-2 ${
                                        j === row.length / 2 ? "border-l-4 border-l-orange-500 ml-3" : ""
                                      }`}
                                    >
                                      {toFraction(cell)}
                                    </span>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-5 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <h4 className="font-semibold text-blue-800 mb-3 text-lg">Method: Gauss-Jordan Elimination</h4>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Create augmented matrix [A | I], then use row operations to transform it into [I | A⁻¹].
                    The determinant det(A) = <strong>{toFraction(result.determinant)}</strong> ≠ 0, confirming the matrix is invertible.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixInverse;
