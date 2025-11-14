import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import MatrixOperations from "./pages/MatrixOperations";
import Determinant from "./pages/Determinant";
import SystemEquations from "./pages/SystemEquations";
import Eigenvalues from "./pages/Eigenvalues";
import Transpose from "./pages/Transpose";
import Vector from "./pages/Vector";
import MatrixInverse from "./pages/MatrixInverse";
import MatrixProperties from "./pages/MatrixProperties";
import VectorNorms from "./pages/VectorNorms";
import SVD from "./pages/SVD";
import Eigenvectors from "./pages/Eigenvectors";
import GeometricTransformations from "./pages/GeometricTransformations";

function App() {
  return (
    <Router>
      <div className="w-full">
        <div className="mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matrix-operations" element={<MatrixOperations />} />
            <Route path="/transpose" element={<Transpose />} />
            <Route path="/determinant" element={<Determinant />} />
            <Route path="/system-equations" element={<SystemEquations />} />
            <Route path="/eigenvalues" element={<Eigenvalues />} />
            <Route path="/eigenvectors" element={<Eigenvectors />} />
            <Route path="/vector" element={<Vector />} />
            <Route path="/matrix-inverse" element={<MatrixInverse />} />
            <Route path="/matrix-properties" element={<MatrixProperties />} />
            <Route path="/vector-norms" element={<VectorNorms />} />
            <Route path="/svd" element={<SVD />} />
            <Route path="/geometric-transformations" element={<GeometricTransformations />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
