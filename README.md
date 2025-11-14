# 🧮 Linear Algebra Calculator

A comprehensive, educational web-based linear algebra calculator built with React, Vite, and Tailwind CSS. Features 12+ interactive tools for matrix operations, vector calculations, eigenvalue analysis, SVD, geometric transformations, and more—all with **step-by-step solutions** and **fraction display**.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Highlights

- 🎯 **12 Powerful Tools**: Matrix operations, vectors, systems, eigenvalues, SVD, transformations
- 📚 **Educational Focus**: Step-by-step solutions with detailed explanations
- 🔢 **Fraction Display**: All results shown as fractions (e.g., `1/2` instead of `0.5`)
- 🎨 **Interactive UI**: Hover effects, real-time validation, color-coded results
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Modern**: Built with React 19 and Vite for instant updates

## 🚀 Features

### 1. Matrix Operations

**Path:** `/matrix-operations`

Interactive matrix calculator supporting:

- **Addition (A + B)**: Add two matrices of the same dimensions
- **Subtraction (A - B)**: Subtract two matrices of the same dimensions
- **Multiplication (A × B)**: Multiply matrices where columns of A = rows of B

**Key Features:**

- Dynamic matrix sizing (up to 10×10)
- Real-time validation of matrix dimensions
- Step-by-step calculation details displayed in orange boxes
- Interactive hover highlighting:
  - **Addition/Subtraction**: Highlights corresponding cells in both matrices
  - **Multiplication**: Highlights entire row from A and column from B
- Auto-hide results when matrix dimensions change
- Responsive design with horizontal scroll for small screens

### 2. Matrix Transpose

**Path:** `/transpose`

Transpose matrix calculator that converts rows into columns.

**Features:**

- Input matrix with customizable dimensions (up to 10×10)
- Visual comparison: Original matrix → Transposed matrix
- Explanation of transpose operation
- Element position mapping: [i][j] → [j][i]

### 3. System of Equations Solver

**Path:** `/system-equations`

Solves systems of linear equations using Gaussian Elimination.

**Features:**

- Support for 2-5 variables
- Input coefficient matrix and constants
- Equation format: `a₁x₁ + a₂x₂ + ... = b`
- **Step-by-step solution:**
  - Forward Elimination (Gaussian Elimination)
    - Row swapping operations
    - Row reduction steps with detailed formulas
    - Matrix state after each operation
  - Back Substitution
    - Calculation formulas for each variable
    - Progressive solving from last to first variable
- Solution displayed with 4 decimal precision

### 4. Determinant Calculator

**Path:** `/determinant`

Calculate matrix determinants with detailed explanations.

**Features:**

- Square matrices (2×2 up to 10×10)
- **2×2 Matrices**: Direct formula (ad - bc)
- **Larger Matrices**: Cofactor expansion along first row
- **Detailed steps showing:**
  - Minor matrices for each element
  - Cofactor calculations with signs
  - Step-by-step computation
  - Final determinant value

### 5. Eigenvalues Calculator

**Path:** `/eigenvalues`

Find eigenvalues of matrices (currently supports 2×2 matrices).

**Features:**

- Input square matrix
- **Step-by-step solution:**
  - Characteristic equation: det(A - λI) = 0
  - Matrix A - λI formation
  - Determinant expansion
  - Quadratic equation derivation
  - Discriminant calculation
  - Real or complex eigenvalue solutions
- Support for both real and complex conjugate eigenvalues
- Solutions displayed with 4 decimal precision

### 6. Eigenvectors Calculator

**Path:** `/eigenvectors`

Calculate eigenvectors for 2×2 matrices corresponding to each eigenvalue.

**Features:**

- Input square matrix (2×2)
- **Step-by-step solution:**
  - Calculate eigenvalues λ₁ and λ₂
  - Solve (A - λI)v = 0 for each eigenvalue
  - Show the homogeneous system for each eigenvector
  - Normalized eigenvectors (unit length)
- **Verification**: Shows Av = λv for both eigenvectors
- Detailed explanation of eigenvector meaning and applications
- Error handling for complex eigenvalues

### 7. Matrix Inverse ⭐

**Path:** `/matrix-inverse`

Calculate matrix inverse using Gauss-Jordan elimination with **fraction display**.

**Features:**

- Support for 2×2 to 5×5 matrices
- **Determinant check** for invertibility (displayed as fraction)
- **Augmented matrix method**: [A | I] → [I | A⁻¹]
- **Step-by-step row operations with fractions:**
  - Each step shows row operations with fraction coefficients
  - Pivot selection and row swapping
  - Scaling operations: `Row i = Row i / (fraction)`
  - Row elimination: `Row i = Row i - (fraction) × Row j`
  - Each cell in augmented matrix has individual border for clarity
- **Fraction results**: All matrix elements shown as simplified fractions
  - Examples: `1/2`, `3/4`, `-5/2`, `2/3`
  - Automatic fraction simplification using GCD
- **Verification**: Shows A × A⁻¹ = I (with fractions)
- **Enhanced spacing**: Larger gaps between steps and cells for better readability
- Error messages for singular (non-invertible) matrices

### 8. Matrix Properties Analyzer

**Path:** `/matrix-properties`

Comprehensive analysis of matrix properties.

**Properties Analyzed (12+):**

- **Square Matrix**: Check if rows = columns
- **Trace**: Sum of diagonal elements
- **Determinant**: det(A) calculation
- **Invertibility**: Check if det(A) ≠ 0
- **Rank**: Number of linearly independent rows/columns
- **Full Rank**: Check if rank = min(rows, cols)
- **Zero Matrix**: All elements are zero
- **Identity Matrix**: Diagonal ones, rest zeros
- **Diagonal Matrix**: Non-zero only on diagonal
- **Upper Triangular**: Zero below diagonal
- **Lower Triangular**: Zero above diagonal
- **Symmetric**: A = Aᵀ
- **Orthogonal**: AᵀA = I (for square matrices)
- **Frobenius Norm**: ||A||\_F = √(Σᵢⱼ aᵢⱼ²)
- **Max Norm**: ||A||\_∞ = max absolute value

**Features:**

- Color-coded property cards
- Visual organization by category
- Summary section with key properties
- Works with rectangular and square matrices

### 9. Vector Norms Calculator

**Path:** `/vector-norms`

Calculate various vector norms and analyze vector properties.

**Norms Supported:**

- **L⁰ Norm (Sparsity)**: Count of non-zero elements
- **L¹ Norm (Manhattan)**: Sum of absolute values: Σ|xᵢ|
- **L² Norm (Euclidean)**: Standard length: √(Σxᵢ²)
- **L^∞ Norm (Max)**: Maximum absolute value: max|xᵢ|
- **Lᵖ Norms**: Generalized norms for p=3,4,5: (Σ|xᵢ|ᵖ)^(1/p)

**Additional Features:**

- **Unit Vector**: Normalized vector (length = 1)
- **Zero Vector Check**: All components zero
- **Unit Vector Check**: Length equals 1
- Visual comparison chart of different norms
- Detailed norm explanations and use cases

### 10. Singular Value Decomposition (SVD)

**Path:** `/svd`

Decompose matrices into U, Σ, and V^T components.

**Features:**

- Currently supports 2×2 matrices
- **Decomposition**: A = U × Σ × V^T
- **U Matrix**: Left singular vectors (orthogonal)
- **Σ Matrix**: Diagonal matrix of singular values
- **V^T Matrix**: Right singular vectors (orthogonal)
- **Singular values display**: σ₁, σ₂
- **Verification**: Reconstructs original matrix
- **Geometric interpretation**: Rotation + Scaling + Rotation
- Explanation of applications (PCA, compression, etc.)

### 11. Geometric Transformations Visualizer

**Path:** `/geometric-transformations`

Interactive 2D transformation visualizer with real-time canvas rendering.

**Transformation Types:**

- **Rotation**: Rotate by angle θ (0-360°)
  - Matrix: [cos θ, -sin θ; sin θ, cos θ]
  - Preserves distances and angles
- **Scaling**: Scale by factors sₓ and sᵧ
  - Matrix: [sₓ, 0; 0, sᵧ]
  - Uniform if sₓ = sᵧ
- **Shearing**: Slant parallel to axes
  - Matrix: [1, kₓ; kᵧ, 1]
  - Preserves area, distorts angles
- **Reflection**: Mirror across axes or diagonal
  - X-axis: [1, 0; 0, -1]
  - Y-axis: [-1, 0; 0, 1]
  - Diagonal: [0, 1; 1, 0]

**Features:**

- **Interactive controls**: Sliders and numeric inputs
- **Real-time visualization**: Canvas-based rendering
- **Grid and axes**: For spatial reference
- **Before/after display**: Blue (original) vs Red (transformed)
- **Transformation matrix display**: Shows current matrix
- **Educational explanations**: How each transformation works
- **Composition info**: How to combine transformations

### 12. Vector Operations

**Path:** `/vector`

Comprehensive vector calculator supporting 2D to 10D vectors.

**Vector-Vector Operations:**

- **u + v**: Vector addition
- **u - v**: Vector subtraction
- **u · v**: Dot product (scalar result)
- **u × v**: Cross product (3D vectors only)
- **Distance**: Calculate distance between two vectors
- **Angle**: Find angle between vectors (in degrees)
- **Parallel Check**: Determine if vectors are parallel
- **Orthogonal Check**: Determine if vectors are perpendicular
- **Projection**: Project vector u onto vector v
- **Scalar Projection**: Scalar component of u along v

**Vector-Scalar Operations:**

- **k × u**: Scalar multiplication
- **-u**: Negate vector

**Single Vector Operations:**

- **||u||**: Calculate magnitude (length)
- **Normalize**: Create unit vector
- **Zero Check**: Verify if vector is zero vector

**Features:**

- Dimension selection (2D - 10D)
- Input components: u₁, u₂, ..., uₙ
- Conditional input fields (only shows v when needed, only shows scalar k when needed)
- Detailed formulas for each operation
- Color-coded results:
  - Green: Vector results
  - Blue: Scalar results
  - Green/Red: Boolean results (TRUE/FALSE)

## 🛠️ Technology Stack

- **React 19.2.0**: UI framework with functional components and hooks
- **Vite 7.2.2**: Fast build tool and development server
- **Tailwind CSS v4.1.17**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **PostCSS**: CSS processing

## 📦 Quick Start

```bash
# Clone the repository
git clone <repository-url>

# Navigate to calculator directory
cd Calculator/calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173` 🚀

## 🎯 Usage

### Development

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Example Usage

1. **Matrix Inverse**:

   - Input a 3×3 matrix
   - Click "Calculate Inverse"
   - View step-by-step Gauss-Jordan elimination with fractions
   - See verification: A × A⁻¹ = I

2. **Vector Operations**:

   - Choose dimension (2D to 10D)
   - Select operation (dot product, cross product, etc.)
   - Input vectors u and v
   - Get instant results with formulas

3. **Geometric Transformations**:
   - Select transformation type (rotation, scaling, etc.)
   - Adjust parameters with sliders
   - Watch real-time visualization
   - See transformation matrix

## 📁 Project Structure

```
calculator/
├── src/
│   ├── components/
│   │   └── common/
│   │       └── Header.jsx                  # Navigation header with dropdowns
│   ├── pages/
│   │   ├── Home.jsx                        # Landing page with feature cards
│   │   ├── MatrixOperations.jsx           # Matrix add/subtract/multiply
│   │   ├── Transpose.jsx                   # Matrix transpose
│   │   ├── Determinant.jsx                 # Determinant calculator
│   │   ├── MatrixInverse.jsx              # Matrix inverse (Gauss-Jordan)
│   │   ├── MatrixProperties.jsx           # Matrix property analyzer
│   │   ├── SystemEquations.jsx            # System solver (Gaussian elimination)
│   │   ├── Eigenvalues.jsx                # Eigenvalue calculator
│   │   ├── Eigenvectors.jsx               # Eigenvector calculator
│   │   ├── SVD.jsx                        # Singular Value Decomposition
│   │   ├── Vector.jsx                     # Vector operations (15+)
│   │   ├── VectorNorms.jsx                # Vector norms (L0, L1, L2, L∞, Lp)
│   │   └── GeometricTransformations.jsx   # 2D transformation visualizer
│   ├── App.jsx                            # Router configuration
│   ├── main.jsx                           # Application entry
│   └── index.css                          # Global styles
├── public/                                # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.cjs
```

## 🎨 Design Philosophy

### UI/UX Highlights

- **Consistent Design**: Unified visual language across all 12 calculators
- **Fraction-First Display**: All numerical results shown as simplified fractions for mathematical precision
- **Responsive Layout**: Optimized for desktop (primary), tablet, and mobile devices
- **Interactive Elements**:
  - Hover effects on matrix cells during operations
  - Real-time validation feedback
  - Color-coded results for instant understanding
- **Enhanced Spacing**:
  - Large gaps between calculation steps
  - Individual borders for each matrix cell
  - Clear visual hierarchy
- **Step-by-Step Solutions**: Educational focus with detailed explanations at every step
- **Color Coding System**:
  - 🔵 **Blue**: Primary actions, input fields, informational boxes
  - 🟢 **Green**: Results, success states, correct values
  - 🟠 **Orange**: Calculation steps, intermediate results, detailed explanations
  - 🔴 **Red**: Errors, invalid operations, warnings
  - 🟣 **Purple**: Verification, comparisons

### Accessibility & Usability

- ✅ Numeric input mode on mobile devices
- ✅ Focus rings for keyboard navigation
- ✅ Clear, descriptive error messages
- ✅ Responsive grid layouts with horizontal scroll
- ✅ High contrast borders for cell separation
- ✅ Large touch targets (60px+ height)
- ✅ Font size optimization for readability

### Fraction Display Benefits

- **Mathematical Accuracy**: Exact values without floating-point errors
- **Educational Value**: Students see precise rational numbers
- **Cleaner Results**: `1/3` is more intuitive than `0.3333...`
- **Automatic Simplification**: `6/8` becomes `3/4`

## 🧮 Mathematical Methods

### Gauss-Jordan Elimination (Matrix Inverse)

1. Create augmented matrix [A | I]
2. Use row operations to transform left side to identity matrix
3. Right side becomes A⁻¹
4. **Fraction arithmetic**: All operations preserve exact fractions
5. GCD simplification for clean results

**Example Row Operation:**

```
Row 2 = Row 2 - (3/4) × Row 1
```

### Gaussian Elimination (Systems)

1. Forward elimination to create upper triangular matrix
2. Partial pivoting for numerical stability
3. Back substitution to find solutions

### Cofactor Expansion (Determinant)

- Recursive calculation for n×n matrices
- Expansion along first row
- Sign pattern: (-1)^(i+j)
- Formula: det(A) = Σⱼ aᵢⱼ × Cᵢⱼ

### Characteristic Equation (Eigenvalues)

- det(A - λI) = 0
- Quadratic formula solution for 2×2
- Handles real and complex eigenvalues
- For 2×2: λ = (trace ± √discriminant) / 2

### Vector Algebra

- **Dot product**: u·v = Σ(uᵢ × vᵢ)
- **Cross product**: u×v (3D only)
- **Projection**: proj_v(u) = ((u·v)/||v||²) × v
- **Magnitude**: ||u|| = √(Σuᵢ²)
- **Angle**: θ = arccos((u·v) / (||u|| × ||v||))

### Fraction Conversion Algorithm

```javascript
// Converts decimal to simplified fraction
toFraction(0.5)    → "1/2"
toFraction(0.333)  → "1/3"
toFraction(-2.5)   → "-5/2"
toFraction(2.0)    → "2"
```

- Uses GCD (Greatest Common Divisor) for simplification
- Searches denominators up to 1000
- Tolerance: 1e-6 for floating point comparison

## 🔧 Configuration

### Tailwind CSS v4

The project uses the latest Tailwind CSS v4 with PostCSS plugin:

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

### Vite Configuration

Hot Module Replacement (HMR) enabled for fast development.

## 🛠️ Technical Implementation

### Fraction Arithmetic

- **GCD Algorithm**: Euclidean algorithm for fraction simplification
- **Precision**: Tolerance of 1e-6 for decimal-to-fraction conversion
- **Search Space**: Denominators up to 1000 for accurate representation
- **Fallback**: Falls back to 4 decimal places if no simple fraction found

### Performance Optimizations

- **React 19**: Latest features including improved rendering
- **Vite HMR**: Instant hot module replacement during development
- **Tailwind JIT**: Just-in-time compilation for minimal CSS bundle
- **Lazy Loading**: Route-based code splitting

### Matrix Operations

- **Gaussian Elimination**: O(n³) time complexity
- **Determinant (Cofactor)**: O(n!) recursive algorithm
- **Matrix Multiplication**: O(n³) with visual feedback
- **Eigenvalue (2×2)**: Closed-form quadratic solution

## 🤝 Contributing

Contributions are welcome! Areas for contribution:

- 🆕 New calculator features (QR decomposition, LU factorization, etc.)
- 🐛 Bug fixes and performance improvements
- 📚 Documentation and examples
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌍 Internationalization (i18n)

Please feel free to submit a Pull Request or open an issue.

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Educational Purpose

This calculator is designed as a **comprehensive learning tool** for linear algebra:

### For Students

- ✏️ **Step-by-step solutions** help understand the process, not just the answer
- 📐 **Fraction display** teaches exact arithmetic and fraction operations
- 🎯 **Visual feedback** (hover effects, color coding) reinforces matrix/vector operations
- 📊 **Interactive visualizations** (geometric transformations) build intuition
- 💡 **Detailed explanations** accompany every calculation

### For Educators

- 🏫 Can be used as a **teaching aid** to demonstrate algorithms
- ✅ **Verification steps** show correctness of results
- 📝 Students can **check their homework** with detailed steps
- 🔄 Multiple examples can be generated quickly
- 🎨 Visual appeal keeps students engaged

### Mathematical Rigor

- **Exact arithmetic**: Fractions preserve mathematical precision
- **Algorithm transparency**: Every row operation is shown
- **Formula display**: Mathematical notation with actual values
- **Error handling**: Explains why operations fail (e.g., singular matrices)

## 🎯 Key Features Summary

| Feature                  | Description                                       | Fraction Support |
| ------------------------ | ------------------------------------------------- | ---------------- |
| **Matrix Operations**    | Add, subtract, multiply with hover highlighting   | ✅               |
| **Matrix Inverse**       | Gauss-Jordan elimination with detailed steps      | ✅ Full          |
| **Determinant**          | Cofactor expansion for any size                   | ✅               |
| **Matrix Properties**    | 12+ property checks (rank, trace, symmetry, etc.) | ✅               |
| **Eigenvalues/vectors**  | Characteristic equation solution                  | ✅               |
| **SVD**                  | Singular Value Decomposition (2×2)                | ✅               |
| **Vector Operations**    | 15+ operations (dot, cross, projection, etc.)     | ✅               |
| **Vector Norms**         | L0, L1, L2, L∞, Lp norms                          | ✅               |
| **Systems of Equations** | Gaussian elimination solver (2-5 variables)       | ✅               |
| **Transformations**      | Interactive 2D geometric visualizer               | ✅               |

## 🔮 Future Enhancements

Potential features for future versions:

- QR decomposition
- LU factorization
- Eigenvalue calculation for matrices larger than 2×2
- Matrix rank and nullspace calculator
- Gram-Schmidt orthogonalization
- 3D vector visualization
- Matrix power calculator (A^n)
- Jordan canonical form
- Export results to PDF/LaTeX
- Complex number matrix support

## 📊 Project Statistics

- **Total Calculators**: 12
- **Lines of Code**: ~4,000+
- **Components**: 13 (12 pages + 1 header)
- **Routes**: 13 (including home)
- **Supported Operations**: 30+
- **Matrix Sizes**: Up to 10×10
- **Vector Dimensions**: 2D to 10D

## 🌟 Showcase

### Matrix Inverse with Fractions

```
Input:  [2  1]     Output: [1    -1/2]
        [2  3]             [-1/2  1/2]

Steps shown with fractions:
Row 1 = Row 1 / 2
Row 2 = Row 2 - (1) × Row 1
...
```

### Geometric Transformations

```
Rotation (45°): [√2/2  -√2/2]
                [√2/2   √2/2]

Visual: Blue square → Rotated red square
```

### Vector Operations

```
u = (3, 4)
v = (1, 2)

u · v = 11 (scalar)
u × v = (not defined for 2D)
||u|| = 5
```

## 📧 Support

- 💬 **Issues**: Open an issue on GitHub
- 📖 **Documentation**: See this README
- 🐛 **Bug Reports**: Provide steps to reproduce
- 💡 **Feature Requests**: Describe your use case

---

<div align="center">

**Built with ❤️ using React 19, Vite 7, and Tailwind CSS v4**

⭐ Star this repo if you find it helpful!

[🏠 Home](/) • [📚 Docs](#) • [🐛 Issues](#) • [🤝 Contribute](#contributing)

</div>
