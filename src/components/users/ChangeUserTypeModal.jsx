import { Button, Notification, FormSelect } from "../../design";

export const ChangeUserTypeModal = ({
  dialogRef,
  selectedRoleUser,
  selectedUserType,
  onUserTypeChange,
  onConfirm,
  onCancel,
  roleSubmitError,
  onClearError,
}) => {
  const handleClose = () => {
    onCancel();
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
    >
      <div className="modal is-active">
        <div className="modal-background" onClick={handleClose}></div>

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Change User Type</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={handleClose}
            ></button>
          </header>

          <section className="modal-card-body">
            {selectedRoleUser ? (
              <>
                <p className="mb-4">
                  Update role for{" "}
                  <strong>
                    {selectedRoleUser.first_name} {selectedRoleUser.last_name}
                  </strong>{" "}
                  ({selectedRoleUser.username})
                </p>

                {roleSubmitError ? (
                  <Notification
                    type="warning"
                    message={roleSubmitError}
                    onClose={onClearError}
                  />
                ) : null}

                <FormSelect
                  label="Select User Type"
                  name="userType"
                  value={selectedUserType}
                  onChange={(e) => onUserTypeChange(e.target.value)}
                >
                  <option value="author">Author</option>
                  <option value="admin">Admin</option>
                </FormSelect>
              </>
            ) : null}
          </section>

          <footer className="modal-card-foot">
            <Button color="link" onClick={onConfirm}>
              Save Changes
            </Button>
            <Button className="is-light" onClick={handleClose}>
              Cancel
            </Button>
          </footer>
        </div>
      </div>
    </dialog>
  );
};
