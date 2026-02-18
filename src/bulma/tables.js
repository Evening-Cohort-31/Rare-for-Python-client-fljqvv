// ============================================
// BULMA TABLES REFERENCE
// ============================================

// --- Basic Table ---
// <table className="table">
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Email</th>
//       <th>Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>Jane Doe</td>
//       <td>jane@example.com</td>
//       <td><button className="button is-small">Edit</button></td>
//     </tr>
//   </tbody>
// </table>

// --- Table Modifiers ---
// <table className="table is-bordered">...</table>
// <table className="table is-striped">...</table>
// <table className="table is-narrow">...</table>
// <table className="table is-hoverable">...</table>
// <table className="table is-fullwidth">...</table>

// --- Combined Modifiers ---
// <table className="table is-fullwidth is-striped is-hoverable">
//   ...
// </table>

// --- Scrollable Table ---
// <div className="table-container">
//   <table className="table">...</table>
// </div>

// --- Dynamic Table from Array ---
// <table className="table is-fullwidth is-striped">
//   <thead>
//     <tr>
//       <th>Title</th>
//       <th>Category</th>
//     </tr>
//   </thead>
//   <tbody>
//     {items.map(item => (
//       <tr key={item.id}>
//         <td>{item.title}</td>
//         <td>{item.category}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
