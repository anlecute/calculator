import { useState, useEffect } from "react";

const MatrixProperties = () => {
  const [rows, setRows] = useState("3");
  const [cols, setCols] = useState("3");
  const [matrix, setMatrix] = useState(Array(3).fill(0).map(() => Array(3).fill(0)));
  const [result, setResult] = useState(null);

  useEffect(() => {
    const r = Number(rows);
    const c = Number(cols);
    if (r > 0 && c > 0 && r <= 10 && c <= 10) {
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

  const calculateRank = (mat) => {
    const m = mat.length;
    const n = mat[0].length;
    const temp = mat.map(row => [...row]);
    let rank = 0;

    for (let col = 0; col < n && rank < m; col++) {
      let pivot = rank;
      for (let row = rank + 1; row < m; row++) {
        if (Math.abs(temp[row][col]) > Math.abs(temp[pivot][col])) {
          pivot = row;
        }
      }

      if (Math.abs(temp[pivot][col]) < 1e-10) continue;

      [temp[rank], temp[pivot]] = [temp[pivot], temp[rank]];

      for (let row = rank + 1; row < m; row++) {
        const factor = temp[row][col] / temp[rank][col];
        for (let c = col; c < n; c++) {
          temp[row][c] -= factor * temp[rank][c];
        }
      }
      rank++;
    }
    return rank;
  };

  const analyzeMatrix = () => {
    const m = matrix.length;
    const n = matrix[0].length;
    const properties = {};

    // 1. Square Matrix
    properties.isSquare = m === n;

    // 2. Trace (only for square)
    if (properties.isSquare) {
      properties.trace = matrix.reduce((sum, row, i) => sum + row[i], 0);
    }

    // 3. Determinant (only for square)
    if (properties.isSquare) {
      properties.determinant = calculateDeterminant(matrix);
      properties.isSingular = Math.abs(properties.determinant) < 1e-10;
      properties.isInvertible = !properties.isSingular;
    }

    // 4. Rank
    properties.rank = calculateRank(matrix);
    properties.isFullRank = properties.rank === Math.min(m, n);

    // 5. Zero Matrix
    properties.isZero = matrix.every(row => row.every(cell => cell === 0));

    // 6. Identity Matrix (only for square)
    if (properties.isSquare) {
      properties.isIdentity = matrix.every((row, i) =>
        row.every((cell, j) => cell === (i === j ? 1 : 0))
      );
    }

    // 7. Diagonal Matrix (only for square)
    if (properties.isSquare) {
      properties.isDiagonal = matrix.every((row, i) =>
        row.every((cell, j) => i === j || cell === 0)
      );
    }

    // 8. Upper Triangular (only for square)
    if (properties.isSquare) {
      properties.isUpperTriangular = matrix.every((row, i) =>
        row.every((cell, j) => j >= i || cell === 0)
      );
    }

    // 9. Lower Triangular (only for square)
    if (properties.isSquare) {
      properties.isLowerTriangular = matrix.every((row, i) =>
        row.every((cell, j) => j <= i || cell === 0)
      );
    }

    // 10. Symmetric (only for square)
    if (properties.isSquare) {
      properties.isSymmetric = matrix.every((row, i) =>
        row.every((cell, j) => Math.abs(cell - matrix[j][i]) < 1e-10)
      );
    }

    // 11. Orthogonal (only for square, A^T × A = I)
    if (properties.isSquare) {
      const transpose = matrix[0].map((_, j) => matrix.map(row => row[j]));
      const product = matrix.map((row, i) =>
        Array(n).fill(0).map((_, j) => {
          let sum = 0;
          for (let k = 0; k < n; k++) {
            sum += transpose[i][k] * matrix[k][j];
          }
          return sum;
        })
      );
      properties.isOrthogonal = product.every((row, i) =>
        row.every((cell, j) => Math.abs(cell - (i === j ? 1 : 0)) < 1e-6)
      );
    }

    // 12. Norms
    // Frobenius Norm
    properties.frobeniusNorm = Math.sqrt(
      matrix.reduce((sum, row) => sum + row.reduce((s, cell) => s + cell * cell, 0), 0)
    );

    // Max Norm
    properties.maxNorm = Math.max(...matrix.flat().map(Math.abs));

    setResult(properties);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Matrix Properties Analyzer</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Matrix Size:</span>
            <input
              type="number"
              min="2"
              max="10"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg font-bold text-gray-600">×</span>
            <input
              type="number"
              min="2"
              max="10"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            onClick={analyzeMatrix}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Analyze Properties
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Matrix Properties</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Basic Properties */}
              <PropertyCard
                title="Square Matrix"
                value={result.isSquare}
                description={`Matrix is ${matrix.length}×${matrix[0].length}`}
              />

              {result.trace !== undefined && (
                <PropertyCard
                  title="Trace"
                  value={result.trace.toFixed(4)}
                  description="Sum of diagonal elements"
                  isNumeric
                />
              )}

              {result.determinant !== undefined && (
                <PropertyCard
                  title="Determinant"
                  value={result.determinant.toFixed(4)}
                  description="det(A)"
                  isNumeric
                />
              )}

              <PropertyCard
                title="Rank"
                value={result.rank}
                description={`Full rank: ${result.isFullRank ? "Yes" : "No"}`}
                isNumeric
              />

              {result.isInvertible !== undefined && (
                <PropertyCard
                  title="Invertible"
                  value={result.isInvertible}
                  description={result.isInvertible ? "Inverse exists" : "Singular matrix"}
                />
              )}

              <PropertyCard
                title="Zero Matrix"
                value={result.isZero}
                description="All elements are zero"
              />

              {result.isIdentity !== undefined && (
                <PropertyCard
                  title="Identity Matrix"
                  value={result.isIdentity}
                  description="I (diagonal ones, rest zeros)"
                />
              )}

              {result.isDiagonal !== undefined && (
                <PropertyCard
                  title="Diagonal Matrix"
                  value={result.isDiagonal}
                  description="Non-zero only on diagonal"
                />
              )}

              {result.isUpperTriangular !== undefined && (
                <PropertyCard
                  title="Upper Triangular"
                  value={result.isUpperTriangular}
                  description="Zeros below diagonal"
                />
              )}

              {result.isLowerTriangular !== undefined && (
                <PropertyCard
                  title="Lower Triangular"
                  value={result.isLowerTriangular}
                  description="Zeros above diagonal"
                />
              )}

              {result.isSymmetric !== undefined && (
                <PropertyCard
                  title="Symmetric"
                  value={result.isSymmetric}
                  description="A = Aᵀ"
                />
              )}

              {result.isOrthogonal !== undefined && (
                <PropertyCard
                  title="Orthogonal"
                  value={result.isOrthogonal}
                  description="Aᵀ × A = I"
                />
              )}

              <PropertyCard
                title="Frobenius Norm"
                value={result.frobeniusNorm.toFixed(4)}
                description="||A||_F = √(Σa²ᵢⱼ)"
                isNumeric
              />

              <PropertyCard
                title="Max Norm"
                value={result.maxNorm.toFixed(4)}
                description="||A||_∞ = max(|aᵢⱼ|)"
                isNumeric
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Summary</h4>
              <div className="text-blue-700 text-sm space-y-1">
                <p>• Matrix Type: {matrix.length}×{matrix[0].length} {result.isSquare ? "(Square)" : "(Rectangular)"}</p>
                <p>• Rank: {result.rank} {result.isFullRank ? "(Full Rank)" : "(Rank Deficient)"}</p>
                {result.determinant !== undefined && (
                  <p>• Determinant: {result.determinant.toFixed(4)} → {result.isInvertible ? "Invertible ✓" : "Singular ✗"}</p>
                )}
                {result.isSymmetric !== undefined && result.isSymmetric && <p>• Special: Symmetric Matrix</p>}
                {result.isOrthogonal !== undefined && result.isOrthogonal && <p>• Special: Orthogonal Matrix</p>}
                {result.isDiagonal && <p>• Special: Diagonal Matrix</p>}
                {result.isIdentity && <p>• Special: Identity Matrix</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ title, value, description, isNumeric = false }) => {
  const isBool = typeof value === "boolean";
  const bgColor = isBool ? (value ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500") : "bg-blue-50 border-blue-500";
  const textColor = isBool ? (value ? "text-green-800" : "text-red-800") : "text-blue-800";
  const valueDisplay = isBool ? (value ? "✓ Yes" : "✗ No") : value;

  return (
    <div className={`p-4 rounded-lg border-2 ${bgColor}`}>
      <h4 className={`font-semibold ${textColor} mb-1`}>{title}</h4>
      <p className={`text-2xl font-bold ${textColor} mb-1`}>{valueDisplay}</p>
      <p className={`text-sm ${textColor} opacity-80`}>{description}</p>
    </div>
  );
};

export default MatrixProperties;
