// ============================================
// BULMA NAVBAR REFERENCE
// ============================================

// --- Basic Navbar ---
// <nav className="navbar" role="navigation" aria-label="main navigation">
//   <div className="navbar-brand">
//     <a className="navbar-item" href="/">
//       <strong>Brand</strong>
//     </a>
//   </div>
//   <div className="navbar-menu">
//     <div className="navbar-start">
//       <a className="navbar-item">Home</a>
//       <a className="navbar-item">About</a>
//     </div>
//     <div className="navbar-end">
//       <div className="navbar-item">
//         <div className="buttons">
//           <a className="button is-primary">Sign up</a>
//           <a className="button is-light">Log in</a>
//         </div>
//       </div>
//     </div>
//   </div>
// </nav>

// --- Navbar Colors ---
// <nav className="navbar is-primary">...</nav>
// <nav className="navbar is-link">...</nav>
// <nav className="navbar is-info">...</nav>
// <nav className="navbar is-success">...</nav>
// <nav className="navbar is-warning">...</nav>
// <nav className="navbar is-danger">...</nav>
// <nav className="navbar is-dark">...</nav>

// --- Navbar with Dropdown ---
// <div className="navbar-item has-dropdown is-hoverable">
//   <a className="navbar-link">More</a>
//   <div className="navbar-dropdown">
//     <a className="navbar-item">Option 1</a>
//     <a className="navbar-item">Option 2</a>
//     <hr className="navbar-divider" />
//     <a className="navbar-item">Report an issue</a>
//   </div>
// </div>

// --- Navbar with React Router Links ---
// import { Link } from "react-router-dom"
//
// <div className="navbar-start">
//   <Link to="/posts" className="navbar-item">Posts</Link>
//   <Link to="/categories" className="navbar-item">Categories</Link>
// </div>

// --- Hamburger Menu (mobile toggle) ---
// const navbar = useRef()
// const hamburger = useRef()
//
// const toggleMenu = () => {
//   hamburger.current.classList.toggle('is-active')
//   navbar.current.classList.toggle('is-active')
// }
//
// <a role="button" className="navbar-burger" ref={hamburger} onClick={toggleMenu}>
//   <span aria-hidden="true"></span>
//   <span aria-hidden="true"></span>
//   <span aria-hidden="true"></span>
// </a>
// ...
// <div className="navbar-menu" ref={navbar}>...</div>

// --- Fixed Navbar ---
// <nav className="navbar is-fixed-top">...</nav>
// (add className="has-navbar-fixed-top" to <html> or <body>)
