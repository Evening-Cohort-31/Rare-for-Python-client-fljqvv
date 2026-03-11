// Component for displaying all user profiles.
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  updateUser,
  getPendingDemotionQueueByInitiatorId,
  getPendingDemotionQueueByTargetId,
  createDemotionQueueEntry,
  updateDemotionQueueEntry,
  deleteDemotionQueueEntry,
} from "../../services/index.js";
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
  const [pendingDemotionRequests, setPendingDemotionRequests] = useState([]);
  const [selectedDemotionRequest, setSelectedDemotionRequest] = useState(null);
  const cancelDemotionDialogRef = useRef();
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
        const pendingRequests = await getPendingDemotionQueueByInitiatorId(
          currentUser.id,
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
          setAllUsers(
            allUsersData.map((u) => ({ ...u, active: Boolean(u.active) })),
          );
          setPendingDemotionRequests(pendingRequests);
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
  }, [activeFilter, refreshKey, currentUser.id]);

  // Handle activate/deactivate user. Shows confirmation dialog first, then calls API to update user status if confirmed.
  const handleToggleActive = (user) => {
    setSelectedUser(user);
    dialogRef.current.showModal();
  };

  // After confirming activate/deactivate, call API to update user and refresh list. Also handles errors.
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

  // Cancel activate/deactivate action, just close dialog and reset selected user.
  const handleCancelToggle = () => {
    setSelectedUser(null);
  };

  // Handle change role button click. Shows change role modal with current role pre-selected.
  const handleCancelRoleChange = () => {
    setSelectedRoleUser(null);
    setSelectedUserType("");
    setRoleSubmitError("");
  };

  // Handle click on "Cancel Demotion Request" button in the UI. This allows an admin to cancel their own pending demotion request for a user, which will remove the request from the queue and prevent the demotion from being approved by another admin.
  const handleRequestCancelDemotion = (queueEntry) => {
    setSelectedDemotionRequest(queueEntry);
    cancelDemotionDialogRef.current?.showModal();
  };

  //only change role if not changing own role and if not demoting last admin
  //if demoting admin, add to demotion queue and it requires two admin approvals to be fully demoted.
  // If the target user is already in the demotion queue, update demotion queue with approver_id and status = "approved" then update the user info with new role.
  // If the target user is not in the demotion queue, create a new entry with initiator_id, target_admin_id, and status = "pending".
  const handleChangeRole = (user) => {
    setNotification("");
    setRoleSubmitError("");

    // Get the current count of admin users to enforce the rule that there must always be at least one admin.
    const adminCount = allUsers.filter((u) => u.is_staff).length;

    // Prevent changing own role to avoid accidentally locking oneself out of admin privileges.
    if (user.id === currentUser.id) {
      setNotification("You cannot change your own user type.");
      return;
    }

    // If demoting an admin, check if they are the last admin. If so, prevent the action and show a notification.
    if (user.is_staff && adminCount === 1) {
      setNotification(
        "This is the last Admin. Please promote another user to Admin before demoting this user.",
      );
      return;
    }

    // Open the change role modal and set the selected user and their current role (admin or author).
    setSelectedRoleUser(user);
    setSelectedUserType(user.is_staff ? "admin" : "author");
    roleDialogRef.current?.showModal();
  };

  // After confirming role change, this function handles the logic for promoting an author to admin immediately
  // For demoting an admin, it requires checking the demotion queue and potentially adding to it.
  // It also handles error cases and updates the UI with notifications.
  const handleConfirmRoleChange = async () => {
    if (!selectedRoleUser) return;

    setRoleSubmitError("");
    setNotification("");

    // Get the current count of admin users to enforce the rule that there must always be at least one admin.
    const adminCount = allUsers.filter((u) => u.is_staff).length;
    // Check if the action is demoting an admin to author, which has special rules around the demotion queue and requires two admin approvals.
    const isDemotingAdmin =
      selectedRoleUser.is_staff && selectedUserType === "author";

    // Prevent changing own role to avoid accidentally locking oneself out of admin privileges.
    if (selectedRoleUser.id === currentUser.id) {
      setRoleSubmitError("You cannot change your own user type.");
      return;
    }

    // If demoting an admin, check if they are the last admin. If so, prevent the action and show an error message.
    if (isDemotingAdmin && adminCount === 1) {
      setRoleSubmitError(
        "This is the last Admin. Please promote another user to Admin before demoting this user.",
      );
      return;
    }

    // Try block to handle the asynchronous API calls for updating user roles and managing the demotion queue.
    // This includes error handling to show appropriate messages if something goes wrong.
    try {
      // If demoting an admin, we need to check the demotion queue to see if there is already a pending entry for this user.
      if (isDemotingAdmin) {
        const pendingEntries = await getPendingDemotionQueueByTargetId(
          selectedRoleUser.id,
        );

        // If there is a pending entry, it means another admin has already initiated a demotion request for this user.
        // We need to check if the current user is the initiator of that request. If so, we cannot approve it ourselves and must show an error message.
        // If the current user is not the initiator, then we can approve the pending request, which will update the queue entry and then update the user's role to complete the demotion.
        if (pendingEntries && pendingEntries.length > 0) {
          const pendingEntry = pendingEntries[0];

          if (pendingEntry.initiator_id === currentUser.id) {
            setRoleSubmitError(
              "You already submitted this demotion request. A different admin must approve it.",
            );
            return;
          }

          // Second admin approval: approve queue entry, then demote user
          await updateDemotionQueueEntry(pendingEntry.id, {
            ...pendingEntry,
            approver_id: currentUser.id,
            status: "approved",
          });

          // Now that the demotion request has been approved by a second admin, update the user's role to complete the demotion.
          await updateUser(selectedRoleUser.id, {
            ...selectedRoleUser,
            is_staff: false,
          });

          setNotification(
            `Demotion approved. ${selectedRoleUser.first_name} ${selectedRoleUser.last_name} has been changed from Admin to Author.`,
          );
        } else {
          // First admin request: queue only, no role change yet
          await createDemotionQueueEntry({
            action: "demote_admin",
            target_admin_id: selectedRoleUser.id,
            initiator_id: currentUser.id,
            status: "pending",
          });

          setNotification(
            `Demotion for ${selectedRoleUser.first_name} ${selectedRoleUser.last_name} was added to the queue. A second Admin is required to complete it.`,
          );
        }
      } else {
        // Promote Author -> Admin immediately
        await updateUser(selectedRoleUser.id, {
          ...selectedRoleUser,
          is_staff: selectedUserType === "admin",
        });

        setNotification(
          `${selectedRoleUser.first_name} ${selectedRoleUser.last_name} has been promoted to Admin.`,
        );
      }

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

  // Handle confirming the cancellation of a pending demotion request. This will call the API to delete the demotion queue entry, which effectively cancels the request and prevents it from being approved by another admin.
  const handleConfirmCancelDemotion = async () => {
    if (!selectedDemotionRequest || !currentUser) return;

    try {
      await deleteDemotionQueueEntry(
        selectedDemotionRequest.id,
        currentUser.id,
      );

      setNotification("Pending demotion request canceled.");
      setSelectedDemotionRequest(null);
      setRefreshKey((prev) => prev + 1);

      if (cancelDemotionDialogRef.current?.open) {
        cancelDemotionDialogRef.current.close();
      }
    } catch (error) {
      console.error("Failed to cancel demotion request:", error);
      setNotification("Failed to cancel demotion request. Please try again.");
    }
  };

  // Handle canceling the cancellation of a pending demotion request, which just closes the confirmation dialog and resets the selected demotion request state.
  const handleCancelDemotionDialog = () => {
    setSelectedDemotionRequest(null);
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
        pendingDemotionRequests={pendingDemotionRequests}
        onToggleActive={handleToggleActive}
        onChangeRole={handleChangeRole}
        onCancelDemotionRequest={handleRequestCancelDemotion}
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

      <ConfirmDialog
        dialogRef={cancelDemotionDialogRef}
        title="Cancel Demotion Request"
        message={
          selectedDemotionRequest
            ? "Are you sure you want to cancel this pending demotion request?"
            : ""
        }
        confirmText="Yes, Cancel Request"
        confirmColor="is-danger"
        onConfirm={handleConfirmCancelDemotion}
        onCancel={handleCancelDemotionDialog}
      />
    </Container>
  );
};
