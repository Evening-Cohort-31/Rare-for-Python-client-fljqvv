import { useRef } from "react";

export const Loading = () => (
  <div className="has-text-centered p-6">
    <button className="button is-loading is-large is-ghost">Loading</button>
  </div>
);

export const PageHeader = ({ title, subtitle }) => (
  <section className="hero is-link mb-5">
    <div className="hero-body">
      <p className="title">{title}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  </section>
);

export const Container = ({ children }) => (
  <div className="container p-4">{children}</div>
);

export const Card = ({ title, children }) => (
  <div className="card">
    {title && (
      <header className="card-header">
        <p className="card-header-title">{title}</p>
      </header>
    )}
    {children && (
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    )}
  </div>
);

export const Notification = ({ type, message, onClose }) => (
  <div className={`notification is-${type}`}>
    {onClose && <button className="delete" onClick={onClose}></button>}
    {message}
  </div>
);

export const FormField = ({ label, type = "text", inputRef, placeholder }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className="input"
        type={type}
        placeholder={placeholder || label}
        ref={inputRef}
      />
    </div>
  </div>
);

export const FormTextarea = ({ label, placeholder, inputRef }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <textarea
        className="textarea"
        placeholder={placeholder || label}
        ref={inputRef}
      ></textarea>
    </div>
  </div>
);

export const ConfirmDialog = ({ dialogRef, title, message, onConfirm, onCancel }) => (
  <dialog ref={dialogRef}>
    <div className="modal is-active">
      <div className="modal-background" onClick={() => dialogRef.current.close()}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              dialogRef.current.close();
              onCancel?.();
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>{message}</p>
        </section>
        <footer className="modal-card-foot">
          {onConfirm && (
            <button
              className="button is-success"
              onClick={() => {
                dialogRef.current.close();
                onConfirm();
              }}
            >
              Confirm
            </button>
          )}
          <button
            className="button"
            onClick={() => {
              dialogRef.current.close();
              onCancel?.();
            }}
          >
            {onConfirm ? "Cancel" : "OK"}
          </button>
        </footer>
      </div>
    </div>
  </dialog>
);
