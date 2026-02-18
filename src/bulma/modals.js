// ============================================
// BULMA MODALS REFERENCE
// ============================================

// --- Basic Modal (with <dialog> element) ---
// const myDialog = useRef()
//
// // Open:  myDialog.current.showModal()
// // Close: myDialog.current.close()
//
// <dialog ref={myDialog}>
//   <div className="modal is-active">
//     <div className="modal-background" onClick={() => myDialog.current.close()}></div>
//     <div className="modal-content">
//       <div className="box">
//         <p>Modal content here.</p>
//       </div>
//     </div>
//     <button className="modal-close is-large" aria-label="close"
//       onClick={() => myDialog.current.close()}></button>
//   </div>
// </dialog>

// --- Modal Card (with header/body/footer) ---
// <dialog ref={myDialog}>
//   <div className="modal is-active">
//     <div className="modal-background" onClick={() => myDialog.current.close()}></div>
//     <div className="modal-card">
//       <header className="modal-card-head">
//         <p className="modal-card-title">Modal Title</p>
//         <button className="delete" aria-label="close"
//           onClick={() => myDialog.current.close()}></button>
//       </header>
//       <section className="modal-card-body">
//         <p>Body content here.</p>
//       </section>
//       <footer className="modal-card-foot">
//         <button className="button is-success">Confirm</button>
//         <button className="button" onClick={() => myDialog.current.close()}>Cancel</button>
//       </footer>
//     </div>
//   </div>
// </dialog>

// --- Using the ConfirmDialog Design Component ---
// import { ConfirmDialog } from "../design"
//
// const dialogRef = useRef()
//
// <button onClick={() => dialogRef.current.showModal()}>Open</button>
//
// <ConfirmDialog
//   dialogRef={dialogRef}
//   title="Delete Item"
//   message="Are you sure you want to delete this?"
//   onConfirm={() => handleDelete()}
//   onCancel={() => {}}
// />
