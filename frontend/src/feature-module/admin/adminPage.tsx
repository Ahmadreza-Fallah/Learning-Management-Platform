import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import toast from "react-hot-toast";

const AdminPage = () => {
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const loadUsers = async () => {
    debugger;
    try {
      setLoading(true);
      const data = await userService.getUsers();
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const approveRequest = async (requestId: number) => {
    try {
      await userService.approveInstructorRequest(requestId);

      toast.success("Instructor request approved.");

      loadUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };
  const rejectRequest = async (requestId: number) => {
    try {
      await userService.rejectInstructorRequest(requestId);

      toast.success("Instructor request rejected.");

      loadUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Request Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Users?.map((user: any) => (
            <tr key={user.Id}>
              <td className="fw-semibold">
                {user.FirstName} {user.LastName}
              </td>

              <td>{user.UserName}</td>

              <td>{user.Email}</td>

              <td>
                <span className="badge bg-primary">
                  {user.Role_Id === 1
                    ? "Student"
                    : user.Role_Id === 2
                      ? "Teacher"
                      : "Admin"}
                </span>
              </td>

              <td>
                {user.IsActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>

              <td>
                {user.RequestStatus ? (
                  <span
                    className={`badge ${
                      user.RequestStatus === "Pending"
                        ? "bg-warning text-dark"
                        : user.RequestStatus === "Approved"
                          ? "bg-success"
                          : "bg-danger"
                    }`}
                  >
                    {user.RequestStatus}
                  </span>
                ) : (
                  "-"
                )}
              </td>

              <td>
                {user.RequestStatus === "Pending" && (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approveRequest(user.RequestId!)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => rejectRequest(user.RequestId!)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminPage;
