import { useState, useEffect } from "react";

const MatrixInput = ({ label, rows, cols, matrix, onRowsChange, onColsChange, onMatrixChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg max-w-lg mx-auto">
      <div className="flex gap-3 mb-6 justify-center items-center">
        <span className="text-lg font-semibold text-gray-700">{label}:</span>
        <input
          type="number"
          min="1"
          max="5"
          value={rows}
          onChange={(e) => onRowsChange(e.target.value)}
          className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-lg font-bold text-gray-600">×</span>
        <input
          type="number"
          min="1"
          max="5"
          value={cols}
          onChange={(e) => onColsChange(e.target.value)}
          className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {matrix.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-center">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 54px)` }}>
              {matrix.map((row, i) =>
                row.map((cell, j) => (
                  <input
                    key={`${i}-${j}`}
                    type="text"
                    inputMode="numeric"
                    value={cell}
                    onChange={(e) => onMatrixChange(i, j, e.target.value)}
                    className="w-24 h-24 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MatrixOperations = () => {
  const [rowsA, setRowsA] = useState("2");
  const [colsA, setColsA] = useState("2");
  const [matrixA, setMatrixA] = useState([[0, 0], [0, 0]]);
  
  const [rowsB, setRowsB] = useState("2");
  const [colsB, setColsB] = useState("2");
  const [matrixB, setMatrixB] = useState([[0, 0], [0, 0]]);
  
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState("");
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    const r = Number(rowsA);
    const c = Number(colsA);
    
    if (r > 0 && c > 0 && r <= 10 && c <= 10) {
      const newMatrix = Array(r).fill(0).map(() => Array(c).fill(0));
      setMatrixA(newMatrix);
      setResult(null);
    }
  }, [rowsA, colsA]);

  useEffect(() => {
    const r = Number(rowsB);
    const c = Number(colsB);
    
    if (r > 0 && c > 0 && r <= 10 && c <= 10) {
      const newMatrix = Array(r).fill(0).map(() => Array(c).fill(0));
      setMatrixB(newMatrix);
      setResult(null);
    }
  }, [rowsB, colsB]);

  const handleMatrixAChange = (i, j, value) => {
    const newMatrix = matrixA.map((row, rowIdx) =>
      row.map((cell, colIdx) => 
        rowIdx === i && colIdx === j ? Number(value) || 0 : cell
      )
    );
    setMatrixA(newMatrix);
  };

  const handleMatrixBChange = (i, j, value) => {
    const newMatrix = matrixB.map((row, rowIdx) =>
      row.map((cell, colIdx) => 
        rowIdx === i && colIdx === j ? Number(value) || 0 : cell
      )
    );
    setMatrixB(newMatrix);
  };

  const handleOperation = (op) => {
    setOperation(op);
    let res;
    let details = [];
    
    if (op === "+" || op === "−") {
      // Kiểm tra điều kiện: cùng số hàng và cùng số cột
      if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert(`Phép ${op === "+" ? "cộng" : "trừ"} yêu cầu hai ma trận có cùng kích thước!\nMatrix A: ${matrixA.length}×${matrixA[0].length}\nMatrix B: ${matrixB.length}×${matrixB[0].length}`);
        setResult(null);
        return;
      }
      
      if (op === "+") {
        res = matrixA.map((row, i) => row.map((cell, j) => {
          const result = cell + matrixB[i][j];
          details.push({ i, j, formula: `${cell} + ${matrixB[i][j]} = ${result}` });
          return result;
        }));
      } else {
        res = matrixA.map((row, i) => row.map((cell, j) => {
          const result = cell - matrixB[i][j];
          details.push({ i, j, formula: `${cell} − ${matrixB[i][j]} = ${result}` });
          return result;
        }));
      }
    } else if (op === "×") {
      // Kiểm tra điều kiện: số cột của A = số hàng của B
      if (matrixA[0].length !== matrixB.length) {
        alert(`Phép nhân yêu cầu số cột của Matrix A = số hàng của Matrix B!\nMatrix A: ${matrixA.length}×${matrixA[0].length}\nMatrix B: ${matrixB.length}×${matrixB[0].length}\nCần: ${matrixA[0].length} = ${matrixB.length}`);
        setResult(null);
        return;
      }
      
      // Kết quả là ma trận m×q (m = số hàng A, q = số cột B)
      res = matrixA.map((row, i) =>
        Array(matrixB[0].length).fill(0).map((_, j) => {
          const terms = [];
          let sum = 0;
          for (let k = 0; k < matrixA[0].length; k++) {
            terms.push(`${matrixA[i][k]}×${matrixB[k][j]}`);
            sum += matrixA[i][k] * matrixB[k][j];
          }
          details.push({ i, j, formula: `${terms.join(' + ')} = ${sum}` });
          return sum;
        })
      );
    }
    
    setResult({ matrix: res, details });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className=" text-4xl font-bold text-center mb-8 text-gray-800">Matrix Transpose</h1>
      <div className="container flex bg-white rounded-lg shadow-md mx-auto p-6">
        <MatrixInput
          label="Matrix A"
          rows={rowsA}
          cols={colsA}
          matrix={matrixA}
          onRowsChange={setRowsA}
          onColsChange={setColsA}
          onMatrixChange={handleMatrixAChange}
        />
        
        <div className="flex flex-col gap-3 justify-center items-center px-6">
          <button 
            onClick={() => handleOperation("+")}
            className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            +
          </button>
          <button 
            onClick={() => handleOperation("−")}
            className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            −
          </button>
          <button 
            onClick={() => handleOperation("×")}
            className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            ×
          </button>
    
        </div>

        <MatrixInput
          label="Matrix B"
          rows={rowsB}
          cols={colsB}
          matrix={matrixB}
          onRowsChange={setRowsB}
          onColsChange={setColsB}
          onMatrixChange={handleMatrixBChange}
        />
      </div>

      {result && (
        <div className="container mx-auto mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto pb-15">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Result</h3>
            
            <div className="flex items-center justify-center gap-6 min-w-max px-4">
              <div className="flex justify-center">
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixA[0].length}, 60px)` }}>
                  {matrixA.map((row, i) =>
                    row.map((cell, j) => (
                      <div 
                        key={`result-a-${i}-${j}`} 
                        className={`w-[60px] h-[60px] border rounded flex items-center justify-center font-medium transition-colors ${
                          hoveredCell && hoveredCell.i === i && (operation === "×" || hoveredCell.j === j)
                            ? "border-blue-500 bg-blue-100 border-2"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600">{operation}</div>

              <div className="flex justify-center">
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixB[0].length}, 60px)` }}>
                  {matrixB.map((row, i) =>
                    row.map((cell, j) => (
                      <div 
                        key={`result-b-${i}-${j}`} 
                        className={`w-[60px] h-[60px] border rounded flex items-center justify-center font-medium transition-colors ${
                          hoveredCell && hoveredCell.j === j && (operation === "×" || hoveredCell.i === i)
                            ? "border-blue-500 bg-blue-100 border-2"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-600">=</div>

              <div className="flex justify-center">
                <div className="grid gap-y-2 gap-x-10" style={{ gridTemplateColumns: `repeat(${result.matrix[0].length}, 60px)` }}>
                  {result.details.map((detail, idx) => (
                    <div 
                      key={`detail-${idx}`} 
                      className="w-[72px] h-[60px] border border-orange-300 bg-orange-50 rounded flex items-center justify-center text-center text-xs font-medium text-orange-700 p-1 overflow-hidden cursor-pointer hover:bg-orange-100 hover:border-orange-400 transition-colors"
                      onMouseEnter={() => setHoveredCell(detail)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="wrap-break-word leading-tight">{detail.formula.split('=')[0].trim()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" ml-6 text-3xl font-bold text-gray-600">=</div>

              <div className="flex justify-center">
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.matrix[0].length}, 60px)` }}>
                  {result.matrix.map((row, i) =>
                    row.map((cell, j) => (
                      <div 
                        key={`result-${i}-${j}`} 
                        className={`w-[60px] h-[60px] border-2 rounded flex items-center justify-center font-bold transition-colors ${
                          hoveredCell && hoveredCell.i === i && hoveredCell.j === j
                            ? "border-green-600 bg-green-200 text-green-800"
                            : "border-green-500 bg-green-50 text-green-700"
                        }`}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixOperations;
