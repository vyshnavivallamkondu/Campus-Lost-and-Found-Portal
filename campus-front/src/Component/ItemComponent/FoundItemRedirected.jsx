import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLostItemById,
  deleteLostItemById,
  foundItemSubmission,
} from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const FoundItemRedirected = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lostItem, setLostItem] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    Promise.all([getUserDetails(), getLostItemById(id)])
      .then(([userRes, itemRes]) => {
        setUser(userRes.data);
        setLostItem(itemRes.data);
      })
      .catch(() => alert("Failed to load item details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMarkAsFound = async () => {
    if (!lostItem || !user) return;

    const foundItem = {
      itemName: lostItem.itemName,
      category: lostItem.category,
      color: lostItem.color,
      brand: lostItem.brand,
      location: lostItem.location,
      username: user.username,
      userEmail: user.email,
      foundDate: today,
    };

    try {
      await foundItemSubmission(foundItem);
      await deleteLostItemById(lostItem.lostItemId);
      alert("Item marked as found successfully!");
      navigate(user.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
    } catch (error) {
      console.error(error);
      alert("Operation failed. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5 text-secondary fs-6">
        Loading item details...
      </div>
    );

  if (!lostItem)
    return (
      <div className="text-center mt-5 text-secondary fs-6">
        Item not found.
      </div>
    );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-4">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "28rem" }}>
        <div className="text-center mb-4">
          <FaCheckCircle size={50} className="text-success mb-3" />
          <h4 className="fw-bold text-primary mb-2">Mark Item as Found</h4>
          <p className="text-muted small">
            Review the item details before confirming.
          </p>
        </div>

        <div className="border rounded p-3 bg-white mb-3">
          <ul className="list-group list-group-flush small">
            <li className="list-group-item">
              <strong>Item Name:</strong> {lostItem.itemName}
            </li>
            <li className="list-group-item">
              <strong>Category:</strong> {lostItem.category}
            </li>
            <li className="list-group-item">
              <strong>Brand:</strong> {lostItem.brand}
            </li>
            <li className="list-group-item">
              <strong>Color:</strong> {lostItem.color}
            </li>
            <li className="list-group-item">
              <strong>Location Lost:</strong> {lostItem.location}
            </li>
            <li className="list-group-item">
              <strong>Reported By:</strong> {lostItem.username}
            </li>
            <li className="list-group-item">
              <strong>Lost Date:</strong> {lostItem.lostDate}
            </li>
            <li className="list-group-item">
              <strong>Found Date:</strong> {today}
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary fw-semibold d-flex align-items-center gap-2"
          >
            <FaArrowLeft /> Return
          </button>
          <button
            onClick={handleMarkAsFound}
            className="btn btn-success fw-semibold"
          >
            Confirm Found
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundItemRedirected;
