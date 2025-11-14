import { useState, useEffect } from "react";

const Eigenvalues = () => {
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

  const calculateEigenvalues = () => {
    const n = matrix.length;
    const steps = [];
    
    // Simple implementation for 2x2 matrices
    if (n === 2) {
      const a = matrix[0][0];
      const b = matrix[0][1];
      const c = matrix[1][0];
      const d = matrix[1][1];

      steps.push({
        description: "Characteristic Equation",
        formula: `det(A - λI) = 0`
      });

      steps.push({
        description: "Matrix A - λI",
        formula: `A - λI = |${a} - λ    ${b}   | = |a-λ    b  |`
      });

      const trace = a + d;
      const det = a * d - b * c;
      
      steps.push({
        description: "Determinant Calculation",
        formula: `det(A - λI) = (${a} - λ)(${d} - λ) - (${b})(${c})`
      });

      steps.push({
        description: "Expand",
        formula: `= λ² - (${a} + ${d})λ + (${a}×${d} - ${b}×${c})`
      });

      steps.push({
        description: "Quadratic Equation",
        formula: `λ² - ${trace}λ + ${det} = 0`
      });

      const discriminant = trace * trace - 4 * det;
      
      steps.push({
        description: "Discriminant",
        formula: `Δ = b² - 4ac = (${trace})² - 4(1)(${det}) = ${trace * trace} - ${4 * det} = ${discriminant}`
      });

      if (discriminant >= 0) {
        const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
        const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
        
        steps.push({
          description: "Solution (Real Eigenvalues)",
          formula: `λ = (${trace} ± √${discriminant}) / 2`
        });

        steps.push({
          description: "Eigenvalues",
          formula: `λ₁ = (${trace} + ${Math.sqrt(discriminant).toFixed(4)}) / 2 = ${lambda1.toFixed(4)}\nλ₂ = (${trace} - ${Math.sqrt(discriminant).toFixed(4)}) / 2 = ${lambda2.toFixed(4)}`
        });

        setResult({
          eigenvalues: [lambda1, lambda2],
          note: "Real eigenvalues",
          steps: steps
        });
      } else {
        const real = trace / 2;
        const imag = Math.sqrt(-discriminant) / 2;
        
        steps.push({
          description: "Solution (Complex Eigenvalues)",
          formula: `λ = (${trace} ± √${discriminant}) / 2 = (${trace} ± i√${-discriminant}) / 2`
        });

        steps.push({
          description: "Eigenvalues",
          formula: `λ₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i\nλ₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i`
        });

        setResult({
          eigenvalues: [`${real.toFixed(4)} + ${imag.toFixed(4)}i`, `${real.toFixed(4)} - ${imag.toFixed(4)}i`],
          note: "Complex conjugate eigenvalues",
          steps: steps
        });
      }
    } else {
      setResult({
        eigenvalues: [],
        note: "Eigenvalue calculation for matrices larger than 2×2 requires more advanced algorithms (QR algorithm, Power iteration, etc.)",
        steps: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Eigenvalues Calculator</h1>

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

          {Number(size) > 2 && (
            <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-300">
              <p className="text-sm text-amber-800 text-center">
                ⚠️ Full eigenvalue calculation is only implemented for 2×2 matrices
              </p>
            </div>
          )}

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
            onClick={calculateEigenvalues}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Calculate Eigenvalues
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Result</h3>
            
            {result.eigenvalues.length > 0 && (
              <div className="grid gap-4 max-w-md mx-auto mb-8">
                {result.eigenvalues.map((val, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <span className="text-xl font-bold text-gray-700">λ{i + 1} =</span>
                    <span className="text-2xl font-bold text-green-700">
                      {typeof val === 'number' ? val.toFixed(4) : val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {result.steps.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-bold text-center mb-4 text-gray-800">Step-by-Step Calculation</h4>
                <div className="space-y-3">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                      <p className="font-semibold text-orange-800 mb-2">{step.description}</p>
                      <p className="font-mono text-sm text-orange-700 whitespace-pre-line">{step.formula}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Method:</h4>
              <p className="text-blue-700">
                {result.note === "Real eigenvalues" || result.note === "Complex conjugate eigenvalues"
                  ? `For a 2×2 matrix, eigenvalues are found by solving the characteristic equation det(A - λI) = 0. 
                     This gives a quadratic equation which is solved using the quadratic formula. ${
                       result.note === "Complex conjugate eigenvalues" 
                       ? "When the discriminant is negative, the eigenvalues are complex conjugates." 
                       : ""
                     }`
                  : result.note
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eigenvalues;
