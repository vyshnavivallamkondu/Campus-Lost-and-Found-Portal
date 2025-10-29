// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../../Services/LoginService";
// import "../../Personal.css";
// import { Spinner, Card } from "react-bootstrap";

// const Personal = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUserDetails()
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to fetch your details.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-2 fw-semibold text-muted">
//           Loading your details...
//         </span>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center mt-5 text-danger fw-semibold fs-5">
//         {error}
//       </div>
//     );

//   return (
//     <div className="profile-page d-flex justify-content-center align-items-center py-5">
//       <Card className="profile-card shadow-lg p-4 animate-rise">
//         <div className="text-center mb-3">
//           <div className="profile-pic mx-auto mb-3">
//             <i className="bi bi-person-circle text-primary fs-1"></i>
//           </div>
//           <h3 className="fw-bold text-black">{user.personName}</h3>
//           <span className="badge rounded-pill bg-gradient text-green px-3 py-2 mt-1">
//             {user.role}
//           </span>
//         </div>

//         <hr className="opacity-50" />

//         <div className="details-section">
//           <div className="detail-row">
//             <strong>👤 Username:</strong> <span>{user.username}</span>
//           </div>
//           <div className="detail-row">
//             <strong>📧 Email:</strong> <span>{user.email}</span>
//           </div>
//           <div className="detail-row">
//             <strong>🎓 Role:</strong> <span>{user.role}</span>
//           </div>
//         </div>

//         <div className="text-center mt-2">
//           <button
//             onClick={() =>
//               navigate(user.role === "Admin" ? "/AdminMenu" : "/StudentMenu")
//             }
//             className="return-btn"
//           >
//             ← Back to Menu
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Personal;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../Services/LoginService";
import "../../Personal.css";
import { Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaGraduationCap } from "react-icons/fa";

const Personal = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch your details.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="loader-container">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2 text-muted fw-semibold">
          Loading your details...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-danger fw-semibold fs-5">
        {error}
      </div>
    );

  return (
    <div className="profile-wrapper">
      <div className="profile-card floating-card">
        <div className="profile-header">
          <div className="profile-pic"></div>
          <h2 className="profile-name">{user.personName}</h2>
          <span className="role-badge">{user.role}</span>
        </div>

        <div className="profile-details">
          <div className="detail-block">
            <div className="detail-label">
              <FaUser className="detail-icon" />
              USERNAME
            </div>
            <div className="detail-value">{user.username}</div>
          </div>

          <div className="detail-block">
            <div className="detail-label">
              <FaEnvelope className="detail-icon" />
              EMAIL
            </div>
            <div className="detail-value">{user.email}</div>
          </div>
        </div>

        <button
          onClick={() =>
            navigate(user.role === "Admin" ? "/AdminMenu" : "/StudentMenu")
          }
          className="back-btn"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Personal;
