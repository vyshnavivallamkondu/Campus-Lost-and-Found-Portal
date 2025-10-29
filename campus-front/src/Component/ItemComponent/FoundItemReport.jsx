import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllFoundItems,
  getFoundItemsByUser,
} from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaPalette,
  FaEnvelope,
} from "react-icons/fa";
import "../../LostItemReport.css";

const FoundItemReport = () => {
  const [itemList, setItemList] = useState([]);
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
      const fetchData =
        currentUser.role === "Admin" ? getAllFoundItems : getFoundItemsByUser;
      fetchData()
        .then((response) => setItemList(response.data))
        .catch((error) => console.error("Error fetching found items:", error))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  const returnBack = () => {
    navigate(currentUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  if (loading)
    return (
      <div className="text-center mt-5 fs-6 text-muted">
        Loading found items...
      </div>
    );

  const pageTitle =
    currentUser?.role === "Admin"
      ? "📦 Found Items Report"
      : "📦 My Found Items";

  const pageDescription =
    currentUser?.role === "Admin"
      ? "All items that have been reported as found."
      : "Items you have reported as found.";

  return (
    <div className="lost-item-page">
      <div className="lost-item-header">
        <FaBoxOpen size={40} className="text-success mb-2" />
        <h2 className="fw-bold text-success">{pageTitle}</h2>
        <p className="text-secondary">{pageDescription}</p>
      </div>

      {itemList.length === 0 ? (
        <div className="text-center py-5">
          <FaBoxOpen size={50} className="text-muted mb-3" />
          <h6 className="fw-semibold text-secondary mb-2">
            No Found Items Available
          </h6>
          <p className="text-muted small">
            There are currently no items marked as found.
          </p>
        </div>
      ) : (
        <div className="lost-item-grid">
          {itemList.map((item) => (
            <div key={item.foundItemId} className="lost-item-card-glow">
              <h4 className="item-title">{item.itemName}</h4>
              <p className="item-id">#{item.foundItemId}</p>

              <div className="item-tags">
                <span className="tag category">
                  <FaTag /> {item.category}
                </span>
                <span className="tag color">
                  <FaPalette /> {item.color}
                </span>
              </div>

              <p>
                <FaMapMarkerAlt className="icon" /> <strong>Found at:</strong>{" "}
                {item.location}
              </p>
              <p>
                <FaCalendarAlt className="icon" /> <strong>Found on:</strong>{" "}
                {item.foundDate}
              </p>
              <p>
                <FaUser className="icon" /> <strong>Reported by:</strong>{" "}
                {item.username}
              </p>
              <p>
                <FaEnvelope className="icon" /> <strong>Email:</strong>{" "}
                {item.userEmail}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-end mt-4">
        <button
          onClick={returnBack}
          className="btn btn-success btn-sm fw-semibold px-3 py-1"
        >
          RETURN
        </button>
      </div>
    </div>
  );
};

export default FoundItemReport;
