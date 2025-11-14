import { useState, useEffect } from "react";

const Eigenvectors = () => {
  const [size, setSize] = useState("2");
  const [matrix, setMatrix] = useState([[0, 0], [0, 0]]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const s = Number(size);
    if (s === 2) {
      setMatrix([[0, 0], [0, 0]]);
      setResult(null);
    }
  }, [size]);

  const handleChange = (i, j, value) => {
    const newMatrix = matrix.map((row, r) =>
      row.map((cell, c) => (r === i && c === j ? Number(value) || 0 : cell))
    );
    setMatrix(newMatrix);
  };

  const calculateEigenvalues = (mat) => {
    const [[a, b], [c, d]] = mat;
    
    const trace = a + d;
    const determinant = a * d - b * c;
    const discriminant = trace * trace - 4 * determinant;

    if (discriminant < 0) {
      const realPart = trace / 2;
      const imaginaryPart = Math.sqrt(-discriminant) / 2;
      return {
        eigenvalue1: { real: realPart, imag: imaginaryPart, isComplex: true },
        eigenvalue2: { real: realPart, imag: -imaginaryPart, isComplex: true }
      };
    } else {
      const sqrtDisc = Math.sqrt(discriminant);
      return {
        eigenvalue1: { value: (trace + sqrtDisc) / 2, isComplex: false },
        eigenvalue2: { value: (trace - sqrtDisc) / 2, isComplex: false }
      };
    }
  };

  const calculateEigenvector = (mat, eigenvalue) => {
    const [[a, b], [c, d]] = mat;
    const lambda = eigenvalue;

    // (A - λI)v = 0
    // [a-λ   b  ] [v1] = [0]
    // [ c   d-λ ] [v2]   [0]

    const a_lambda = a - lambda;
    const d_lambda = d - lambda;

    let v1, v2;

    // Try using first row: (a-λ)v1 + b*v2 = 0
    if (Math.abs(b) > 1e-10) {
      v2 = 1;
      v1 = -b / a_lambda;
    }
    // Try using second row: c*v1 + (d-λ)v2 = 0
    else if (Math.abs(c) > 1e-10) {
      v1 = 1;
      v2 = -c / d_lambda;
    }
    // Try using first column
    else if (Math.abs(a_lambda) > 1e-10) {
      v2 = 1;
      v1 = 0;
    }
    // Try using second column
    else if (Math.abs(d_lambda) > 1e-10) {
      v1 = 1;
      v2 = 0;
    }
    // Degenerate case
    else {
      v1 = 1;
      v2 = 0;
    }

    // Normalize
    const magnitude = Math.sqrt(v1 * v1 + v2 * v2);
    return [v1 / magnitude, v2 / magnitude];
  };

  const multiplyMatrixVector = (mat, vec) => {
    return [
      mat[0][0] * vec[0] + mat[0][1] * vec[1],
      mat[1][0] * vec[0] + mat[1][1] * vec[1]
    ];
  };

  const calculateEigenvectors = () => {
    const { eigenvalue1, eigenvalue2 } = calculateEigenvalues(matrix);

    if (eigenvalue1.isComplex) {
      setResult({
        error: true,
        message: "Complex eigenvalues detected. Eigenvectors for complex eigenvalues require complex arithmetic."
      });
      return;
    }

    const eigenvector1 = calculateEigenvector(matrix, eigenvalue1.value);
    const eigenvector2 = calculateEigenvector(matrix, eigenvalue2.value);

    // Verify: Av = λv
    const Av1 = multiplyMatrixVector(matrix, eigenvector1);
    const lambdav1 = [eigenvalue1.value * eigenvector1[0], eigenvalue1.value * eigenvector1[1]];

    const Av2 = multiplyMatrixVector(matrix, eigenvector2);
    const lambdav2 = [eigenvalue2.value * eigenvector2[0], eigenvalue2.value * eigenvector2[1]];

    setResult({
      error: false,
      eigenvalue1: eigenvalue1.value,
      eigenvalue2: eigenvalue2.value,
      eigenvector1,
      eigenvector2,
      verification1: { Av: Av1, lambdav: lambdav1 },
      verification2: { Av: Av2, lambdav: lambdav2 },
      matrix
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Eigenvalues & Eigenvectors Calculator
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Matrix Size:</span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2">2 × 2</option>
            </select>
          </div>

          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-300">
            <p className="text-sm text-amber-800 text-center">
              ⚠️ Currently supports 2×2 matrices only. For larger matrices, use NumPy: np.linalg.eig(A)
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-center">
              <div className="grid gap-2 grid-cols-2">
                {matrix.map((row, i) =>
                  row.map((cell, j) => (
                    <input
                      key={`${i}-${j}`}
                      type="text"
                      inputMode="numeric"
                      value={cell}
                      onChange={(e) => handleChange(i, j, e.target.value)}
                      className="w-[80px] h-[80px] border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <button
            onClick={calculateEigenvectors}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate Eigenvalues & Eigenvectors
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Results</h3>

            {result.error ? (
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-500">
                <p className="text-xl text-center text-red-800 font-bold">{result.message}</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Eigenvalue 1 */}
                  <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-500">
                    <h4 className="text-xl font-semibold text-center mb-4 text-blue-800">
                      Eigenvalue λ₁
                    </h4>
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-blue-900">
                        {result.eigenvalue1.toFixed(4)}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-center mb-3 text-blue-800">
                      Eigenvector v₁
                    </h4>
                    <div className="flex justify-center mb-4">
                      <div className="grid grid-rows-2 gap-2">
                        <div className="w-24 h-16 border-2 border-blue-600 bg-white rounded flex items-center justify-center font-bold text-blue-700">
                          {result.eigenvector1[0].toFixed(4)}
                        </div>
                        <div className="w-24 h-16 border-2 border-blue-600 bg-white rounded flex items-center justify-center font-bold text-blue-700">
                          {result.eigenvector1[1].toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
                      <p className="font-semibold mb-2">Solving (A - λ₁I)v₁ = 0:</p>
                      <p>
                        [{(result.matrix[0][0] - result.eigenvalue1).toFixed(2)}{" "}
                        {result.matrix[0][1].toFixed(2)}] [v₁] = [0]
                      </p>
                      <p>
                        [{result.matrix[1][0].toFixed(2)}{" "}
                        {(result.matrix[1][1] - result.eigenvalue1).toFixed(2)}] [v₂]   [0]
                      </p>
                    </div>
                  </div>

                  {/* Eigenvalue 2 */}
                  <div className="p-6 bg-green-50 rounded-lg border-2 border-green-500">
                    <h4 className="text-xl font-semibold text-center mb-4 text-green-800">
                      Eigenvalue λ₂
                    </h4>
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-green-900">
                        {result.eigenvalue2.toFixed(4)}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-center mb-3 text-green-800">
                      Eigenvector v₂
                    </h4>
                    <div className="flex justify-center mb-4">
                      <div className="grid grid-rows-2 gap-2">
                        <div className="w-24 h-16 border-2 border-green-600 bg-white rounded flex items-center justify-center font-bold text-green-700">
                          {result.eigenvector2[0].toFixed(4)}
                        </div>
                        <div className="w-24 h-16 border-2 border-green-600 bg-white rounded flex items-center justify-center font-bold text-green-700">
                          {result.eigenvector2[1].toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-green-700 bg-green-100 p-3 rounded">
                      <p className="font-semibold mb-2">Solving (A - λ₂I)v₂ = 0:</p>
                      <p>
                        [{(result.matrix[0][0] - result.eigenvalue2).toFixed(2)}{" "}
                        {result.matrix[0][1].toFixed(2)}] [v₁] = [0]
                      </p>
                      <p>
                        [{result.matrix[1][0].toFixed(2)}{" "}
                        {(result.matrix[1][1] - result.eigenvalue2).toFixed(2)}] [v₂]   [0]
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-center mb-4 text-gray-800">
                    Verification: Av = λv
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Verify 1 */}
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-300">
                      <h5 className="font-semibold text-purple-800 mb-3 text-center">λ₁ = {result.eigenvalue1.toFixed(4)}</h5>
                      <div className="flex justify-center items-center gap-4">
                        <div>
                          <p className="text-sm text-purple-700 text-center mb-2">Av₁</p>
                          <div className="grid grid-rows-2 gap-2">
                            <div className="w-20 h-12 border border-purple-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification1.Av[0].toFixed(3)}
                            </div>
                            <div className="w-20 h-12 border border-purple-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification1.Av[1].toFixed(3)}
                            </div>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">≈</span>
                        <div>
                          <p className="text-sm text-purple-700 text-center mb-2">λ₁v₁</p>
                          <div className="grid grid-rows-2 gap-2">
                            <div className="w-20 h-12 border border-purple-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification1.lambdav[0].toFixed(3)}
                            </div>
                            <div className="w-20 h-12 border border-purple-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification1.lambdav[1].toFixed(3)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verify 2 */}
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                      <h5 className="font-semibold text-orange-800 mb-3 text-center">λ₂ = {result.eigenvalue2.toFixed(4)}</h5>
                      <div className="flex justify-center items-center gap-4">
                        <div>
                          <p className="text-sm text-orange-700 text-center mb-2">Av₂</p>
                          <div className="grid grid-rows-2 gap-2">
                            <div className="w-20 h-12 border border-orange-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification2.Av[0].toFixed(3)}
                            </div>
                            <div className="w-20 h-12 border border-orange-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification2.Av[1].toFixed(3)}
                            </div>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-orange-600">≈</span>
                        <div>
                          <p className="text-sm text-orange-700 text-center mb-2">λ₂v₂</p>
                          <div className="grid grid-rows-2 gap-2">
                            <div className="w-20 h-12 border border-orange-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification2.lambdav[0].toFixed(3)}
                            </div>
                            <div className="w-20 h-12 border border-orange-500 bg-white rounded flex items-center justify-center text-sm font-semibold">
                              {result.verification2.lambdav[1].toFixed(3)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Understanding Eigenvalues & Eigenvectors</h4>
                  <div className="text-blue-700 text-sm space-y-2">
                    <p><strong>Definition:</strong> If Av = λv for non-zero vector v, then λ is an eigenvalue and v is its eigenvector.</p>
                    <p><strong>Geometric Meaning:</strong> When matrix A transforms vector v, the result is just v scaled by λ (no rotation, only stretching/compression).</p>
                    <p><strong>Finding Eigenvectors:</strong> Solve (A - λI)v = 0 for each eigenvalue λ. This gives a homogeneous system where non-trivial solutions are eigenvectors.</p>
                    <p><strong>Normalization:</strong> Eigenvectors shown here are normalized (length = 1) for convenience.</p>
                    <p><strong>Applications:</strong> Principal Component Analysis (PCA), vibration analysis, quantum mechanics, Google PageRank, image compression, stability analysis.</p>
                    <p><strong>Properties:</strong></p>
                    <ul className="list-disc ml-6">
                      <li>Eigenvectors with different eigenvalues are linearly independent</li>
                      <li>Sum of eigenvalues = trace of matrix</li>
                      <li>Product of eigenvalues = determinant of matrix</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eigenvectors;
