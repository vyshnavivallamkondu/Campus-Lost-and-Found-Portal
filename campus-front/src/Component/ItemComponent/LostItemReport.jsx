// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllLostItems,
//   getLostItemsByUser,
// } from "../../Services/LostFoundItemService";
// import { getUserDetails } from "../../Services/LoginService";
// import { FaSearch, FaRegSadTear } from "react-icons/fa";
// import "../../LostItemReport.css";

// const LostItemReport = () => {
//   const [lostItems, setLostItems] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUserDetails()
//       .then((response) => setCurrentUser(response.data))
//       .catch((error) => {
//         console.error("Error fetching user details:", error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (currentUser) {
//       const fetchItems =
//         currentUser.role === "Admin" ? getAllLostItems : getLostItemsByUser;
//       fetchItems()
//         .then((response) => setLostItems(response.data))
//         .catch((error) => console.error("Error fetching lost items:", error))
//         .finally(() => setLoading(false));
//     }
//   }, [currentUser]);

//   const handleFoundSubmission = (itemId) => {
//     navigate(`/Found-Redirected/${itemId}`);
//   };

//   const returnBack = () => {
//     navigate(currentUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
//   };

//   if (loading)
//     return (
//       <div className="text-center mt-5 fs-6 text-muted">Loading items...</div>
//     );

//   return (
//     <div className="lost-item-page d-flex justify-content-center align-items-start py-5">
//       <div className="card shadow-sm p-4 lost-item-card w-75">
//         <div className="text-center mb-4">
//           <FaSearch size={40} className="text-primary mb-2" />
//           <h4 className="fw-semibold text-primary">Lost Item Report</h4>
//           <p className="text-secondary small">
//             Items currently reported as lost.
//           </p>
//         </div>

//         {lostItems.length === 0 ? (
//           <div className="text-center py-5">
//             <FaRegSadTear size={50} className="text-muted mb-3" />
//             <h6 className="fw-semibold text-secondary mb-2">
//               No Lost Items Found
//             </h6>
//             <p className="text-muted small">
//               There are currently no lost item reports.
//             </p>
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <table className="table table-sm table-striped table-hover align-middle text-center">
//               <thead className="table-primary small">
//                 <tr>
//                   <th>Item ID</th>
//                   <th>Item Name</th>
//                   <th>Category</th>
//                   <th>Brand</th>
//                   <th>Color</th>
//                   <th>Location Lost</th>
//                   <th>Lost Date</th>
//                   <th>Reported By</th>
//                   {currentUser?.role === "Student" && <th>Action</th>}
//                 </tr>
//               </thead>
//               <tbody>
//                 {lostItems.map((item) => (
//                   <tr key={item.lostItemId}>
//                     <td>{item.lostItemId}</td>
//                     <td>{item.itemName}</td>
//                     <td>{item.category}</td>
//                     <td>{item.brand}</td>
//                     <td>{item.color}</td>
//                     <td>{item.location}</td>
//                     <td>{item.lostDate}</td>
//                     <td>{item.username}</td>
//                     {currentUser?.role === "Student" && (
//                       <td>
//                         <button
//                           onClick={() => handleFoundSubmission(item.lostItemId)}
//                           className="btn btn-success btn-sm fw-semibold"
//                         >
//                           Mark
//                         </button>
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="text-end mt-4">
//           <button
//             onClick={returnBack}
//             className="btn btn-primary btn-sm fw-semibold px-3 py-1"
//           >
//             Return
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LostItemReport;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLostItems,
  getLostItemsByUser,
} from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import {
  FaSearch,
  FaRegSadTear,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaPalette,
} from "react-icons/fa";
import "../../LostItemReport.css";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails()
      .then((response) => setCurrentUser(response.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchItems =
        currentUser.role === "Admin" ? getAllLostItems : getLostItemsByUser;
      fetchItems()
        .then((response) => setLostItems(response.data))
        .catch((error) => console.error("Error fetching lost items:", error))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  const handleFoundSubmission = (itemId) => {
    navigate(`/Found-Redirected/${itemId}`);
  };

  const returnBack = () => {
    navigate(currentUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  if (loading)
    return (
      <div className="text-center mt-5 fs-6 text-muted">Loading items...</div>
    );

  return (
    <div className="lost-item-page">
      <div className="lost-item-header">
        <FaSearch size={40} className="text-primary mb-2" />
        <h2 className="fw-bold text-primary">🔍 Lost & Found</h2>
        <p className="text-secondary">Browse and manage reported lost items</p>
      </div>

      {lostItems.length === 0 ? (
        <div className="text-center py-5">
          <FaRegSadTear size={50} className="text-muted mb-3" />
          <h6 className="fw-semibold text-secondary mb-2">
            No Lost Items Found
          </h6>
          <p className="text-muted small">
            There are currently no lost item reports.
          </p>
        </div>
      ) : (
        <div className="lost-item-grid">
          {lostItems.map((item) => (
            <div key={item.lostItemId} className="lost-item-card-glow">
              <h4 className="item-title">{item.itemName}</h4>
              <p className="item-id">#{item.lostItemId}</p>

              <div className="item-tags">
                <span className="tag category">
                  <FaTag /> {item.category}
                </span>
                <span className="tag color">
                  <FaPalette /> {item.color}
                </span>
              </div>

              <p>
                <FaMapMarkerAlt className="icon" /> <strong>Lost at:</strong>{" "}
                {item.location}
              </p>
              <p>
                <FaCalendarAlt className="icon" /> <strong>Lost on:</strong>{" "}
                {item.lostDate}
              </p>
              <p>
                <FaUser className="icon" /> <strong>Reported by:</strong>{" "}
                {item.username}
              </p>

              {currentUser?.role === "Student" && (
                <button
                  onClick={() => handleFoundSubmission(item.lostItemId)}
                  className="btn btn-primary btns fw-semibold"
                >
                  Mark as Found
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-end mt-4">
        <button
          onClick={returnBack}
          className="btn btn-primary btn-sm fw-semibold px-3 py-1"
        >
          RETURN
        </button>
      </div>
    </div>
  );
};

export default LostItemReport;
