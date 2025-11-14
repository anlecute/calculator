import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Linear Algebra Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive tool for matrix operations, determinants, eigenvalues, and solving systems of equations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Matrix Tools */}
          <Link
            to="/matrix-operations"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🔢</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Matrix Operations
            </h2>
            <p className="text-gray-600 text-sm">
              Add, subtract, multiply matrices with step-by-step solutions
            </p>
          </Link>

          <Link
            to="/transpose"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🔄</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Matrix Transpose
            </h2>
            <p className="text-gray-600 text-sm">
              Transpose matrices and visualize row-column swaps
            </p>
          </Link>

          <Link
            to="/determinant"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">📊</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Determinant
            </h2>
            <p className="text-gray-600 text-sm">
              Calculate determinants with cofactor expansion details
            </p>
          </Link>

          <Link
            to="/matrix-inverse"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">↩️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Matrix Inverse
            </h2>
            <p className="text-gray-600 text-sm">
              Find inverse matrices using Gauss-Jordan elimination
            </p>
          </Link>

          <Link
            to="/matrix-properties"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🔍</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Matrix Properties
            </h2>
            <p className="text-gray-600 text-sm">
              Analyze 12+ matrix properties (rank, trace, symmetry, etc.)
            </p>
          </Link>

          <Link
            to="/eigenvalues"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Eigenvalues
            </h2>
            <p className="text-gray-600 text-sm">
              Find eigenvalues using the characteristic equation
            </p>
          </Link>

          <Link
            to="/eigenvectors"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🎪</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Eigenvectors
            </h2>
            <p className="text-gray-600 text-sm">
              Calculate eigenvectors for each eigenvalue with verification
            </p>
          </Link>

          <Link
            to="/svd"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🎲</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              SVD
            </h2>
            <p className="text-gray-600 text-sm">
              Singular Value Decomposition: A = U Σ V^T
            </p>
          </Link>

          {/* Vector Tools */}
          <Link
            to="/vector"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">➡️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Vector Operations
            </h2>
            <p className="text-gray-600 text-sm">
              15+ operations: dot, cross, projection, magnitude, angle
            </p>
          </Link>

          <Link
            to="/vector-norms"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">📏</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Vector Norms
            </h2>
            <p className="text-gray-600 text-sm">
              Calculate L0, L1, L2, L∞, and Lp norms with comparisons
            </p>
          </Link>

          {/* Systems & Transformations */}
          <Link
            to="/system-equations"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">⚡</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Systems of Equations
            </h2>
            <p className="text-gray-600 text-sm">
              Solve linear systems with Gaussian elimination steps
            </p>
          </Link>

          <Link
            to="/geometric-transformations"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🔺</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Geometric Transformations
            </h2>
            <p className="text-gray-600 text-sm">
              Visualize rotation, scaling, shearing, reflection matrices
            </p>
          </Link>

          <a
            href="https://en.wikipedia.org/wiki/Linear_algebra"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">📚</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Learn More
            </h2>
            <p className="text-gray-600 text-sm">
              Read about linear algebra on Wikipedia
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
