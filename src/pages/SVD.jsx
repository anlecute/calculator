import { useState, useEffect } from "react";

const SVD = () => {
  const [rows, setRows] = useState("2");
  const [cols, setCols] = useState("2");
  const [matrix, setMatrix] = useState(Array(2).fill(0).map(() => Array(2).fill(0)));
  const [result, setResult] = useState(null);

  useEffect(() => {
    const r = Number(rows);
    const c = Number(cols);
    if (r > 0 && c > 0 && r <= 5 && c <= 5) {
      const newMatrix = Array(r).fill(0).map(() => Array(c).fill(0));
      setMatrix(newMatrix);
      setResult(null);
    }
  }, [rows, cols]);

  const handleChange = (i, j, value) => {
    const newMatrix = matrix.map((row, r) =>
      row.map((cell, c) => (r === i && c === j ? Number(value) || 0 : cell))
    );
    setMatrix(newMatrix);
  };

  // Simplified SVD for 2x2 matrices
  const calculateSVD2x2 = (mat) => {
    const [[a, b], [c, d]] = mat;
    
    // Calculate A^T * A
    const ATA = [
      [a*a + c*c, a*b + c*d],
      [a*b + c*d, b*b + d*d]
    ];
    
    // Calculate A * A^T
    const AAT = [
      [a*a + b*b, a*c + b*d],
      [a*c + b*d, c*c + d*d]
    ];
    
    // Eigenvalues of A^T * A
    const traceATA = ATA[0][0] + ATA[1][1];
    const detATA = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];
    const disc = Math.sqrt(traceATA * traceATA - 4 * detATA);
    const lambda1 = (traceATA + disc) / 2;
    const lambda2 = (traceATA - disc) / 2;
    
    // Singular values
    const sigma1 = Math.sqrt(Math.max(0, lambda1));
    const sigma2 = Math.sqrt(Math.max(0, lambda2));
    
    // Eigenvectors of A^T * A (for V)
    let v1, v2;
    if (Math.abs(ATA[0][1]) > 1e-10) {
      const v1x = lambda1 - ATA[1][1];
      const v1y = ATA[0][1];
      const len1 = Math.sqrt(v1x*v1x + v1y*v1y);
      v1 = [v1x/len1, v1y/len1];
      
      const v2x = lambda2 - ATA[1][1];
      const v2y = ATA[0][1];
      const len2 = Math.sqrt(v2x*v2x + v2y*v2y);
      v2 = [v2x/len2, v2y/len2];
    } else {
      v1 = [1, 0];
      v2 = [0, 1];
    }
    
    // Calculate u1 = Av1/sigma1, u2 = Av2/sigma2
    const Av1 = [
      a * v1[0] + b * v1[1],
      c * v1[0] + d * v1[1]
    ];
    const Av2 = [
      a * v2[0] + b * v2[1],
      c * v2[0] + d * v2[1]
    ];
    
    const u1 = sigma1 > 1e-10 ? [Av1[0]/sigma1, Av1[1]/sigma1] : [1, 0];
    const u2 = sigma2 > 1e-10 ? [Av2[0]/sigma2, Av2[1]/sigma2] : [0, 1];
    
    // U matrix
    const U = [
      [u1[0], u2[0]],
      [u1[1], u2[1]]
    ];
    
    // Sigma matrix
    const Sigma = [
      [sigma1, 0],
      [0, sigma2]
    ];
    
    // V^T matrix
    const VT = [
      [v1[0], v1[1]],
      [v2[0], v2[1]]
    ];
    
    return { U, Sigma, VT, singularValues: [sigma1, sigma2] };
  };

  const multiplyMatrices = (A, B) => {
    const result = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < B[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < B.length; k++) {
          sum += A[i][k] * B[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  const calculateSVD = () => {
    const m = matrix.length;
    const n = matrix[0].length;

    if (m !== 2 || n !== 2) {
      setResult({
        error: true,
        message: "SVD calculation is currently only supported for 2×2 matrices. For larger matrices, use numerical libraries like NumPy."
      });
      return;
    }

    const { U, Sigma, VT, singularValues } = calculateSVD2x2(matrix);
    
    // Verify: U * Sigma * V^T should equal original matrix
    const temp = multiplyMatrices(U, Sigma);
    const reconstructed = multiplyMatrices(temp, VT);

    setResult({
      error: false,
      U,
      Sigma,
      VT,
      singularValues,
      reconstructed,
      original: matrix
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Singular Value Decomposition (SVD)
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Matrix Size:</span>
            <input
              type="number"
              min="2"
              max="2"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg font-bold text-gray-600">×</span>
            <input
              type="number"
              min="2"
              max="2"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-300">
            <p className="text-sm text-amber-800 text-center">
              ⚠️ Currently supports 2×2 matrices only. For larger matrices, use NumPy: np.linalg.svd(A)
            </p>
          </div>

          {matrix.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-center">
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 60px)` }}>
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
            onClick={calculateSVD}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate SVD
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">SVD Result: A = U Σ V^T</h3>

            {result.error ? (
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-500">
                <p className="text-xl text-center text-red-800 font-bold">{result.message}</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* U Matrix */}
                  <div>
                    <h4 className="text-lg font-semibold text-center mb-3 text-blue-800">U (Left Singular Vectors)</h4>
                    <div className="flex justify-center">
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.U[0].length}, 90px)` }}>
                        {result.U.map((row, i) =>
                          row.map((cell, j) => (
                            <div
                              key={`u-${i}-${j}`}
                              className="w-[90px] h-[60px] border-2 border-blue-500 bg-blue-50 rounded flex items-center justify-center font-bold text-blue-700 text-sm"
                            >
                              {cell.toFixed(4)}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-center text-blue-600 mt-2">Orthogonal matrix</p>
                  </div>

                  {/* Sigma Matrix */}
                  <div>
                    <h4 className="text-lg font-semibold text-center mb-3 text-green-800">Σ (Singular Values)</h4>
                    <div className="flex justify-center">
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.Sigma[0].length}, 90px)` }}>
                        {result.Sigma.map((row, i) =>
                          row.map((cell, j) => (
                            <div
                              key={`s-${i}-${j}`}
                              className={`w-[90px] h-[60px] border-2 rounded flex items-center justify-center font-bold text-sm ${
                                i === j ? "border-green-500 bg-green-50 text-green-700" : "border-gray-300 bg-gray-50 text-gray-400"
                              }`}
                            >
                              {cell.toFixed(4)}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-center text-green-600 mt-2">Diagonal matrix</p>
                  </div>

                  {/* V^T Matrix */}
                  <div>
                    <h4 className="text-lg font-semibold text-center mb-3 text-purple-800">V^T (Right Singular Vectors)</h4>
                    <div className="flex justify-center">
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.VT[0].length}, 90px)` }}>
                        {result.VT.map((row, i) =>
                          row.map((cell, j) => (
                            <div
                              key={`v-${i}-${j}`}
                              className="w-[90px] h-[60px] border-2 border-purple-500 bg-purple-50 rounded flex items-center justify-center font-bold text-purple-700 text-sm"
                            >
                              {cell.toFixed(4)}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-center text-purple-600 mt-2">Orthogonal matrix</p>
                  </div>
                </div>

                {/* Singular Values */}
                <div className="mb-6 p-4 bg-orange-50 rounded-lg border-2 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2 text-center">Singular Values</h4>
                  <div className="flex justify-center gap-6">
                    {result.singularValues.map((sv, i) => (
                      <div key={i} className="text-center">
                        <p className="text-sm text-orange-700">σ{i + 1}</p>
                        <p className="text-2xl font-bold text-orange-800">{sv.toFixed(4)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-center mb-3 text-gray-800">Verification: U × Σ × V^T = A</h4>
                  <div className="flex justify-center gap-4 items-center">
                    <div>
                      <p className="text-sm text-center text-gray-600 mb-2">Original A</p>
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.original[0].length}, 70px)` }}>
                        {result.original.map((row, i) =>
                          row.map((cell, j) => (
                            <div
                              key={`orig-${i}-${j}`}
                              className="w-[70px] h-[50px] border border-gray-300 bg-gray-50 rounded flex items-center justify-center text-sm"
                            >
                              {cell.toFixed(2)}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <span className="text-2xl font-bold text-gray-600">≈</span>

                    <div>
                      <p className="text-sm text-center text-gray-600 mb-2">Reconstructed</p>
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.reconstructed[0].length}, 70px)` }}>
                        {result.reconstructed.map((row, i) =>
                          row.map((cell, j) => (
                            <div
                              key={`recon-${i}-${j}`}
                              className="w-[70px] h-[50px] border-2 border-green-500 bg-green-50 rounded flex items-center justify-center text-sm text-green-700 font-semibold"
                            >
                              {cell.toFixed(2)}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Understanding SVD</h4>
                  <div className="text-blue-700 text-sm space-y-2">
                    <p><strong>Geometric Interpretation:</strong> SVD decomposes any linear transformation into three simpler transformations:</p>
                    <ol className="list-decimal ml-6 space-y-1">
                      <li><strong>V^T:</strong> Rotation/reflection (changes basis to align with principal axes)</li>
                      <li><strong>Σ:</strong> Scaling along principal axes (by singular values σ₁, σ₂)</li>
                      <li><strong>U:</strong> Rotation/reflection (orients output space)</li>
                    </ol>
                    <p className="mt-3"><strong>Singular Values (σ₁, σ₂):</strong> Indicate how much the transformation stretches space in each principal direction. Larger values = more stretching.</p>
                    <p><strong>Applications:</strong> Image compression, noise reduction, dimensionality reduction (PCA), solving linear systems, recommendation systems.</p>
                    <p><strong>Matrix Rank:</strong> Number of non-zero singular values = rank of the matrix.</p>
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

export default SVD;
