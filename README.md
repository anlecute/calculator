# 🧮 Linear Algebra Calculator

An educational web calculator for linear algebra with 12 interactive tools. Built with React, Vite, and Tailwind CSS.

## ✨ Key Features

- **12 Calculators**: Matrices, vectors, eigenvalues, SVD, transformations
- **Step-by-step Solutions**: See every calculation step
- **Fraction Display**: Results shown as fractions (e.g., `1/2` not `0.5`)
- **Interactive UI**: Hover effects and real-time validation
- **Responsive**: Works on all devices

## 🧰 Available Tools

| Tool                    | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| **Matrix Operations**   | Add, subtract, multiply matrices (up to 10×10)          |
| **Matrix Transpose**    | Convert rows to columns                                 |
| **Matrix Inverse**      | Calculate A⁻¹ with Gauss-Jordan elimination (fractions) |
| **Matrix Properties**   | Analyze 12+ properties (rank, trace, symmetry, etc.)    |
| **Determinant**         | Calculate det(A) with cofactor expansion                |
| **Eigenvalues**         | Find eigenvalues for 2×2 matrices                       |
| **Eigenvectors**        | Calculate eigenvectors with verification                |
| **SVD**                 | Singular Value Decomposition (2×2 matrices)             |
| **System of Equations** | Solve linear systems (2-5 variables)                    |
| **Vector Operations**   | 15+ operations (dot, cross, projection, etc.)           |
| **Vector Norms**        | Calculate L0, L1, L2, L∞, Lp norms                      |
| **Transformations**     | Visualize 2D geometric transformations                  |

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/anlecute/calculator.git

# Install dependencies
cd Calculator/calculator
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` to use the calculator.

## 📦 Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎯 Highlights

### Fraction Display

All results shown as simplified fractions for mathematical accuracy:

- `1/2` instead of `0.5`
- `3/4` instead of `0.75`
- Automatic simplification using GCD

### Educational Features

- Step-by-step solutions for every operation
- Color-coded results (Green=success, Orange=steps, Red=errors)
- Interactive hover effects on matrix operations
- Detailed formula explanations

## 🛠️ Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4
- React Router DOM

## 📝 Examples

**Matrix Inverse:**

```
Input:  [2  1]
        [2  3]

Output: [1    -1/2]
        [-1/2  1/2]
```

**Vector Operations:**

```
u = (3, 4), v = (1, 2)
u · v = 11
||u|| = 5
```

## 📄 License

MIT License - feel free to use for educational purposes.

## 🤝 Contributing

Pull requests and issues are welcome!

---

**Built with React 19, Vite 7, and Tailwind CSS v4**

⭐ Star this repo if you find it helpful!
