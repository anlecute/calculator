import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [showMatrixDropdown, setShowMatrixDropdown] = useState(false);
  const [showVectorDropdown, setShowVectorDropdown] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
            Linear Algebra Calculator
          </Link>
          
          <nav className="flex items-center gap-6">
            {/* Matrix Operations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMatrixDropdown(true)}
              onMouseLeave={() => setShowMatrixDropdown(false)}
            >
              <button className="text-gray-600 hover:text-blue-600 transition font-medium">
                Matrix Tools ▾
              </button>
              {showMatrixDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-56 z-50">
                  <Link to="/matrix-operations" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Matrix Operations
                  </Link>
                  <Link to="/transpose" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Transpose
                  </Link>
                  <Link to="/determinant" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Determinant
                  </Link>
                  <Link to="/matrix-inverse" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Matrix Inverse
                  </Link>
                  <Link to="/matrix-properties" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Matrix Properties
                  </Link>
                  <Link to="/eigenvalues" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Eigenvalues
                  </Link>
                  <Link to="/eigenvectors" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Eigenvectors
                  </Link>
                  <Link to="/svd" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    SVD
                  </Link>
                </div>
              )}
            </div>

            {/* Vector Operations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowVectorDropdown(true)}
              onMouseLeave={() => setShowVectorDropdown(false)}
            >
              <button className="text-gray-600 hover:text-blue-600 transition font-medium">
                Vector Tools ▾
              </button>
              {showVectorDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-56 z-50">
                  <Link to="/vector" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Vector Operations
                  </Link>
                  <Link to="/vector-norms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Vector Norms
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/system-equations" 
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Systems of Equations
            </Link>

            <Link 
              to="/geometric-transformations" 
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Transformations
            </Link>
            
            <a 
              href="https://en.wikipedia.org/wiki/Linear_algebra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Learn More
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
