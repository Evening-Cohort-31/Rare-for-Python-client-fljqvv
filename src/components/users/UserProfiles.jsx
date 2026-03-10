// Component for displaying all user profiles.
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUser } from "../../services/index.js";
import {
  Loading,
  PageHeader,
  Container,
  ConfirmDialog,
  Notification,
} from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { UserFilterButtons } from "./UserFilterButtons.jsx";
import { UserTable } from "./UserTable.jsx";
import { ChangeUserTypeModal } from "./ChangeUserTypeModal.jsx";
import "./UserProfiles.css";

export const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [notification, setNotification] = useState("");
  const roleDialogRef = useRef();
  const [selectedRoleUser, setSelectedRoleUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [roleSubmitError, setRoleSubmitError] = useState("");
  const [loading, setLoading] = useState(true);

  // Incrementing this triggers the useEffect to re-fetch users after an update.
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const dialogRef = useRef();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setLoading(true);
      try {
        const allUsersData = await getAllUsers();
        let usersData;

        setAllUsers(
          allUsersData.map((u) => ({ ...u, active: Boolean(u.active) })),
        );

        if (activeFilter === "active") {
          usersData = allUsersData.filter((u) => u.active);
        } else if (activeFilter === "inactive") {
          usersData = allUsersData.filter((u) => !u.active);
        } else if (activeFilter === "authors") {
          usersData = allUsersData.filter((u) => !u.is_staff);
        } else if (activeFilter === "admins") {
          usersData = allUsersData.filter((u) => u.is_staff);
        } else {
          usersData = allUsersData;
        }

        if (isMounted) {
          setUsers(usersData.map((u) => ({ ...u, active: Boolean(u.active) })));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [activeFilter, refreshKey]);

  const handleToggleActive = (user) => {
    setSelectedUser(user);
    dialogRef.current.showModal();
  };

  const handleConfirmToggle = async () => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, {
        ...selectedUser,
        active: !selectedUser.active,
      });
      setSelectedUser(null);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleCancelToggle = () => {
    setSelectedUser(null);
  };

  const handleCancelRoleChange = () => {
    setSelectedRoleUser(null);
    setSelectedUserType("");
    setRoleSubmitError("");
  };

  const handleChangeRole = (user) => {
    setNotification("");
    setRoleSubmitError("");

    const adminCount = allUsers.filter((u) => u.is_staff).length;

    if (user.id === currentUser.id) {
      setNotification("You cannot change your own user type.");
      return;
    }

    if (user.is_staff && adminCount === 1) {
      setNotification(
        "This is the last Admin. Please promote another user to Admin before demoting this user.",
      );
      return;
    }

    setSelectedRoleUser(user);
    setSelectedUserType(user.is_staff ? "admin" : "author");
    roleDialogRef.current?.showModal();
  };

  const handleConfirmRoleChange = async () => {
    if (!selectedRoleUser) return;

    setRoleSubmitError("");

    const adminCount = allUsers.filter((u) => u.is_staff).length;

    if (selectedRoleUser.id === currentUser.id) {
      setRoleSubmitError("You cannot change your own user type.");
      return;
    }

    if (selectedRoleUser.is_staff && selectedUserType === "author" && adminCount === 1) {
      setRoleSubmitError(
        "This is the last Admin. Please promote another user to Admin before demoting this user.",
      );
      return;
    }

    try {
      await updateUser(selectedRoleUser.id, {
        ...selectedRoleUser,
        is_staff: selectedUserType === "admin",
      });

      setSelectedRoleUser(null);
      setSelectedUserType("");
      setRefreshKey((prev) => prev + 1);

      if (roleDialogRef.current?.open) {
        roleDialogRef.current.close();
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      setRoleSubmitError("Failed to update user role. Please try again.");
    }
  };

  // Access control: only staff users can view this page
  if (!currentUser || !currentUser.is_staff) {
    navigate("/access-denied", { replace: true });
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <PageHeader title="Users" centered />

      {notification ? (
        <div className="mb-4">
          <Notification
            type="warning"
            message={notification}
            onClose={() => setNotification("")}
          />
        </div>
      ) : null}

      <UserFilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <UserTable
        users={users}
        currentUser={currentUser}
        onToggleActive={handleToggleActive}
        onChangeRole={handleChangeRole}
      />

      <ConfirmDialog
        dialogRef={dialogRef}
        title={selectedUser?.active ? "Deactivate User" : "Activate User"}
        message={
          selectedUser?.active
            ? `Are you sure you want to deactivate ${selectedUser?.first_name} ${selectedUser?.last_name} (${selectedUser?.username})?`
            : `Are you sure you want to activate ${selectedUser?.first_name} ${selectedUser?.last_name} (${selectedUser?.username})?`
        }
        confirmText={selectedUser?.active ? "Yes, Deactivate" : "Yes, Activate"}
        confirmColor={selectedUser?.active ? "is-danger" : "is-success"}
        onConfirm={handleConfirmToggle}
        onCancel={handleCancelToggle}
      />

      <ChangeUserTypeModal
        dialogRef={roleDialogRef}
        selectedRoleUser={selectedRoleUser}
        selectedUserType={selectedUserType}
        onUserTypeChange={setSelectedUserType}
        onConfirm={handleConfirmRoleChange}
        onCancel={handleCancelRoleChange}
        roleSubmitError={roleSubmitError}
        onClearError={() => setRoleSubmitError("")}
      />
    </Container>
  );
};
