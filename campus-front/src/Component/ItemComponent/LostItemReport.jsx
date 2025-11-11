// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllLostItems,
//   getLostItemsByUser,
// } from "../../Services/LostFoundItemService";
// import { getUserDetails } from "../../Services/LoginService";
// import {
//   FaSearch,
//   FaRegSadTear,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaUser,
//   FaTag,
//   FaPalette,
// } from "react-icons/fa";
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
//     <div className="lost-item-page">
//       <div className="lost-item-header">
//         <FaSearch size={40} className="text-primary mb-2" />
//         <h2 className="fw-bold text-primary">🔍 Lost & Found</h2>
//         <p className="text-secondary">Browse and manage reported lost items</p>
//       </div>

//       {lostItems.length === 0 ? (
//         <div className="text-center py-5">
//           <FaRegSadTear size={50} className="text-muted mb-3" />
//           <h6 className="fw-semibold text-secondary mb-2">
//             No Lost Items Found
//           </h6>
//           <p className="text-muted small">
//             There are currently no lost item reports.
//           </p>
//         </div>
//       ) : (
//         <div className="lost-item-grid">
//           {lostItems.map((item) => (
//             <div key={item.lostItemId} className="lost-item-card-glow">
//               <h4 className="item-title">{item.itemName}</h4>
//               <p className="item-id">#{item.lostItemId}</p>

//               <div className="item-tags">
//                 <span className="tag category">
//                   <FaTag /> {item.category}
//                 </span>
//                 <span className="tag color">
//                   <FaPalette /> {item.color}
//                 </span>
//               </div>

//               <p>
//                 <FaMapMarkerAlt className="icon" /> <strong>Lost at:</strong>{" "}
//                 {item.location}
//               </p>
//               <p>
//                 <FaCalendarAlt className="icon" /> <strong>Lost on:</strong>{" "}
//                 {item.lostDate}
//               </p>
//               <p>
//                 <FaUser className="icon" /> <strong>Reported by:</strong>{" "}
//                 {item.username}
//               </p>

//               {currentUser?.role === "Student" && (
//                 <button
//                   onClick={() => handleFoundSubmission(item.lostItemId)}
//                   className="btn btn-primary btns fw-semibold"
//                 >
//                   Mark as Found
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="text-end mt-4">
//         <button
//           onClick={returnBack}
//           className="btn btn-primary btn-sm fw-semibold px-3 py-1"
//         >
//           RETURN
//         </button>
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
  getPotentialMatches,
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
  FaHandshake,
} from "react-icons/fa";
import "../../LostItemReport.css";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [matches, setMatches] = useState({});
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

  const toggleMatches = async (itemId) => {
    if (expandedItemId === itemId) {
      setExpandedItemId(null);
      return;
    }
    try {
      const res = await getPotentialMatches(itemId);
      setMatches((prev) => ({ ...prev, [itemId]: res.data }));
      setExpandedItemId(itemId);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
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
                <>
                  <button
                    onClick={() => handleFoundSubmission(item.lostItemId)}
                    className="bns1"
                  >
                    Mark as Found
                  </button>
                  <button
                    onClick={() => toggleMatches(item.lostItemId)}
                    className="bns2"
                  >
                    <FaHandshake className="me-2" />
                    View Potential Matches
                  </button>
                </>
              )}

              {/* Potential Matches Section */}
              {expandedItemId === item.lostItemId &&
                matches[item.lostItemId] && (
                  <div className="potential-matches mt-3">
                    <h6 className="text-primary fw-bold mb-2">
                      Possible Matches Found
                    </h6>
                    {matches[item.lostItemId].length === 0 ? (
                      <p className="text-muted small">
                        No similar found items.
                      </p>
                    ) : (
                      matches[item.lostItemId].map((match) => (
                        <div
                          key={match.foundItemId}
                          className="match-card border rounded p-2 mb-2 bg-light"
                        >
                          <p className="mb-1">
                            <strong>Item:</strong> {match.itemName} (
                            {match.color})
                          </p>
                          <p className="mb-1">
                            <strong>Found at:</strong> {match.location}
                          </p>
                          <p className="mb-1">
                            <strong>Reported by:</strong> {match.username}
                          </p>
                          <p className="contact-info">
                            📧 Contact: {match.userEmail}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
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
