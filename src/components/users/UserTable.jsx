import { Link } from "react-router-dom";
import { Card, Tag, Button } from "../../design";

export const UserTable = ({ users, currentUser, pendingDemotionRequests, onToggleActive, onChangeRole, onCancelDemotionRequest }) => (
  <Card className="user-profiles-card">
    <div className="table-container">
      <table className="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Active Status</th>
            <th>Author or Admin</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>

              <td>
                {user.first_name} {user.last_name}
              </td>

              <td>
                <div
                  className="is-flex is-align-items-center"
                  style={{ gap: "0.75rem" }}
                >
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={!!user.active}
                      onChange={(e) => {
                        e.preventDefault();
                        onToggleActive(user);
                      }}
                    />
                    <span style={{ marginLeft: "0.5rem" }}>
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </label>

                  {user.active ? (
                    <Button
                      color="danger"
                      size="small"
                      onClick={() => onToggleActive(user)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      size="small"
                      onClick={() => onToggleActive(user)}
                    >
                      Activate
                    </Button>
                  )}
                </div>
              </td>

              <td>
                <div
                  className="is-flex is-align-items-center is-flex-wrap-wrap"
                  style={{ gap: "0.75rem" }}
                >
                  <Tag
                    className="user-role-tag"
                    color={user.is_staff ? "warning" : "info"}
                    light
                    rounded
                  >
                    {user.is_staff ? "👑 Admin" : "✍️ Author"}
                  </Tag>

                    {user.id !== currentUser.id && (
                      pendingDemotionRequests.some((req) => req.target_admin_id === user.id && req.initiator_id === currentUser.id) ? (
                        <Button
                          color="danger"
                          size="small"
                          onClick={() => {
                            const userPendingRequest = pendingDemotionRequests.find((req) => req.target_admin_id === user.id && req.initiator_id === currentUser.id);
                            onCancelDemotionRequest(userPendingRequest);
                          }}
                        >
                          Cancel Demotion Request
                        </Button>
                      ) : (
                        <Button
                          color="warning"
                          size="small"
                          onClick={() => onChangeRole(user)}
                        >
                          {user.is_staff ? "Demote to Author" : "Promote to Admin"}
                        </Button>
                      )
                    )}
                  </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
