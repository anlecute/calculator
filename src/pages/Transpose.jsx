import { useState, useEffect } from "react";

const Transpose = () => {
  const [rows, setRows] = useState("2");
  const [cols, setCols] = useState("3");
  const [matrix, setMatrix] = useState([[0, 0, 0], [0, 0, 0]]);
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

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = matrix.map((row, rowIdx) =>
      row.map((cell, colIdx) => 
        rowIdx === i && colIdx === j ? Number(value) || 0 : cell
      )
    );
    setMatrix(newMatrix);
  };

  const handleTranspose = () => {
    // Chuyển vị: hàng thành cột, cột thành hàng
    const transposed = matrix[0].map((_, colIdx) => 
      matrix.map(row => row[colIdx])
    );
    setResult(transposed);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Matrix Transpose</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Matrix:</span>
            <input
              type="number"
              min="1"
              max="10"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg font-bold text-gray-600">×</span>
            <input
              type="number"
              min="1"
              max="10"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {matrix.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-center">
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 60px)` }}>
                  {matrix.map((row, i) =>
                    row.map((cell, j) => (
                      <input
                        key={`${i}-${j}`}
                        type="text"
                        inputMode="numeric"
                        value={cell}
                        onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                        className="w-[60px] h-[60px] border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleTranspose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Transpose Matrix
          </button>
        </div>

        {result && (
          <div className="w-full mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md mx-auto overflow-x-auto">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Result</h3>
              
              <div className="flex items-center justify-center gap-8 min-w-max mx-auto px-4">
                <div>
                  <p className="text-center text-sm font-semibold text-gray-600 mb-3">Original ({matrix.length}×{matrix[0].length})</p>
                  <div className="flex justify-center">
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 60px)` }}>
                      {matrix.map((row, i) =>
                        row.map((cell, j) => (
                          <div 
                            key={`orig-${i}-${j}`} 
                            className="w-[60px] h-[60px] border border-gray-300 bg-gray-50 rounded flex items-center justify-center font-medium"
                          >
                            {cell}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-3xl font-bold text-blue-600">→</div>

                <div>
                  <p className="text-center text-sm font-semibold text-gray-600 mb-3">Transposed ({result.length}×{result[0].length})</p>
                  <div className="flex justify-center">
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result[0].length}, 60px)` }}>
                      {result.map((row, i) =>
                        row.map((cell, j) => (
                          <div 
                            key={`result-${i}-${j}`} 
                            className="w-[60px] h-[60px] border-2 border-green-500 bg-green-50 rounded flex items-center justify-center font-bold text-green-700"
                          >
                            {cell}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">
                  Matrix transpose converts rows into columns and columns into rows. 
                  An element at position [i][j] in the original matrix moves to position [j][i] in the transposed matrix.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transpose;
