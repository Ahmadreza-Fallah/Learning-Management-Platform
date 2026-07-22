import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApplicationConfiguration from "../../core/common/SendRequest/ApplicationConfiguration";
import { useAuth } from "../../context/AuthContext";
const LogoutButton = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${ApplicationConfiguration.BaseUrl}/home/LogOutApi`,
        { withCredentials: true },
      );

      if (response.data.IsSuccess && response.data.Result) {
        localStorage.removeItem("User");
        isAuthenticated(false);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger w-100">
      خروج
    </button>
  );
};

export default LogoutButton;
