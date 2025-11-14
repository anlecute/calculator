import { useState } from "react";

const SystemEquations = () => {
  const [numVars, setNumVars] = useState(2);
  const [coefficients, setCoefficients] = useState(Array(2).fill(0).map(() => Array(2).fill(0)));
  const [constants, setConstants] = useState(Array(2).fill(0));
  const [result, setResult] = useState(null);

  const initializeSystem = (n) => {
    setCoefficients(Array(n).fill(0).map(() => Array(n).fill(0)));
    setConstants(Array(n).fill(0));
    setResult(null);
  };

  const handleSizeChange = (newSize) => {
    setNumVars(newSize);
    initializeSystem(newSize);
  };

  const handleCoefficientChange = (i, j, value) => {
    const newCoeffs = coefficients.map((row, r) =>
      row.map((cell, c) => (r === i && c === j ? Number(value) || 0 : cell))
    );
    setCoefficients(newCoeffs);
  };

  const handleConstantChange = (i, value) => {
    const newConstants = constants.map((c, idx) => (idx === i ? Number(value) || 0 : c));
    setConstants(newConstants);
  };

  const solveSystem = () => {
    const n = numVars;
    const A = coefficients.map(row => [...row]);
    const b = [...constants];
    const steps = [];

    // Save initial state
    steps.push({
      description: "Initial System",
      matrix: A.map(row => [...row]),
      constants: [...b]
    });

    // Gaussian elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
          maxRow = k;
        }
      }
      
      // Swap rows if needed
      if (maxRow !== i) {
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];
        steps.push({
          description: `Swap Row ${i + 1} ↔ Row ${maxRow + 1}`,
          matrix: A.map(row => [...row]),
          constants: [...b]
        });
      }

      // Make all rows below this one 0 in current column
      for (let k = i + 1; k < n; k++) {
        if (A[i][i] === 0) continue;
        const factor = A[k][i] / A[i][i];
        if (factor === 0) continue;
        
        b[k] -= factor * b[i];
        for (let j = i; j < n; j++) {
          A[k][j] -= factor * A[i][j];
        }
        
        steps.push({
          description: `Row ${k + 1} = Row ${k + 1} - (${factor.toFixed(2)}) × Row ${i + 1}`,
          matrix: A.map(row => [...row]),
          constants: [...b]
        });
      }
    }

    // Back substitution
    const x = new Array(n);
    const backSteps = [];
    
    for (let i = n - 1; i >= 0; i--) {
      x[i] = b[i];
      let formula = `x${i + 1} = ${b[i].toFixed(4)}`;
      
      for (let j = i + 1; j < n; j++) {
        x[i] -= A[i][j] * x[j];
        formula += ` - (${A[i][j].toFixed(2)} × ${x[j].toFixed(4)})`;
      }
      x[i] /= A[i][i];
      formula += ` / ${A[i][i].toFixed(2)} = ${x[i].toFixed(4)}`;
      
      backSteps.push({
        variable: `x${i + 1}`,
        formula: formula,
        value: x[i]
      });
    }

    setResult({
      solution: x,
      steps: steps,
      backSubstitution: backSteps.reverse()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">System of Equations Calculator</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex gap-3 mb-6 justify-center items-center">
            <span className="text-lg font-semibold text-gray-700">Number of Variables:</span>
            <input
              type="number"
              min="2"
              max="5"
              value={numVars}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Enter System of Equations</h3>
            <div className="space-y-3">
              {coefficients.map((row, i) => (
                <div key={i} className="flex items-center gap-2 justify-center flex-wrap">
                  {row.map((cell, j) => (
                    <div key={`${i}-${j}`} className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cell}
                        onChange={(e) => handleCoefficientChange(i, j, e.target.value)}
                        className="w-16 h-12 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-600 font-medium">x{j + 1}</span>
                      {j < row.length - 1 && <span className="text-gray-500 mx-1">+</span>}
                    </div>
                  ))}
                  <span className="font-bold text-gray-700 mx-2">=</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={constants[i]}
                    onChange={(e) => handleConstantChange(i, e.target.value)}
                    className="w-16 h-12 border border-gray-300 rounded px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={solveSystem}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Solve System
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Solution</h3>
            <div className="grid gap-4 max-w-md mx-auto mb-8">
              {result.solution.map((x, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-500">
                  <span className="text-xl font-bold text-gray-700">x{i + 1} =</span>
                  <span className="text-2xl font-bold text-green-700">{x.toFixed(4)}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold text-center mb-4 text-gray-800">Step-by-Step Solution</h4>
              
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-3 text-blue-800">Forward Elimination (Gaussian Elimination)</h5>
                <div className="space-y-4">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                      <p className="font-semibold text-orange-800 mb-3">{step.description}</p>
                      <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                          {step.matrix.map((row, i) => (
                            <div key={i} className="flex items-center gap-2 mb-1 justify-center">
                              <span className="text-gray-500 w-8">R{i+1}:</span>
                              {row.map((cell, j) => (
                                <span key={j} className="inline-block w-20 text-center font-mono text-sm">
                                  {cell.toFixed(2)}
                                </span>
                              ))}
                              <span className="mx-2 font-bold">|</span>
                              <span className="inline-block w-20 text-center font-mono text-sm font-bold">
                                {step.constants[i].toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-3 text-green-800">Back Substitution</h5>
                <div className="space-y-3">
                  {result.backSubstitution.map((step, idx) => (
                    <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-300">
                      <p className="font-mono text-sm text-green-800">{step.formula}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Method:</h4>
              <p className="text-blue-700">
                Solved using Gaussian Elimination with back substitution. 
                This method transforms the coefficient matrix into upper triangular form, 
                then solves for variables starting from the last equation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemEquations;
