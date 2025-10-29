import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { lostItemSubmission } from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import "../../LostItemSubmit.css";

const LostItemSubmit = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campusUser, setCampusUser] = useState(null);

  const [item, setItem] = useState({
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
    lostDate: "",
    status: false,
  });

  const today = new Date().toISOString().slice(0, 10);
  const [lostDate, setLostDate] = useState(today);

  useEffect(() => {
    getUserDetails().then((response) => {
      const user = response.data;
      setCampusUser(user);
      setItem((prev) => ({
        ...prev,
        username: user.username,
        userEmail: user.email,
      }));
    });
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let tempErrors = {};
    let valid = true;

    if (!item.itemName.trim())
      (tempErrors.itemName = "Item Name required"), (valid = false);
    if (!item.category.trim())
      (tempErrors.category = "Category required"), (valid = false);
    if (!item.color.trim())
      (tempErrors.color = "Color required"), (valid = false);
    if (!item.brand.trim())
      (tempErrors.brand = "Brand required"), (valid = false);
    if (!item.location.trim())
      (tempErrors.location = "Location required"), (valid = false);
    if (!lostDate)
      (tempErrors.lostDate = "Lost Date required"), (valid = false);
    if (!valid) {
      setErrors(tempErrors);
      setIsSubmitting(false);
      return;
    }

    const finalItem = {
      ...item,
      username: campusUser.username,
      userEmail: campusUser.email,
      lostDate: lostDate,
    };

    lostItemSubmission(finalItem)
      .then(() => {
        alert("Lost Item Submitted Successfully!");
        navigate(campusUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
      })
      .catch((err) => {
        console.error(err);
        alert("Submission failed. Try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const returnBack = () =>
    navigate(campusUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");

  return (
    <div className="lost-item-page py-5">
      <div className="card shadow-sm p-4 lost-item-card w-75">
        <div className="text-center mb-4">
          <FaBoxOpen size={40} className="text-primary mb-2" />
          <h4 className="fw-semibold text-primary">Lost Item Submission</h4>
          <p className="text-sec">Report an item you have lost on campus</p>
        </div>

        <form onSubmit={validateAndSubmit}>
          <div className="row g-4">
            {/* Left side */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  className="form-control bg-light"
                  value={item.username}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">User Email</label>
                <input
                  className="form-control bg-light"
                  value={item.userEmail}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lost Date *</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.lostDate ? "is-invalid" : ""
                  }`}
                  value={lostDate}
                  onChange={(e) => setLostDate(e.target.value)}
                />
                {errors.lostDate && (
                  <div className="invalid-feedback">{errors.lostDate}</div>
                )}
              </div>
            </div>
            {/* Right side */}
            <div className="col-md-6">
              {["itemName", "category", "color", "brand", "location"].map(
                (field) => (
                  <div key={field} className="mb-3">
                    <label className="form-label text-capitalize">
                      {field === "itemName"
                        ? "Item Name *"
                        : field === "location"
                        ? "Location Where It Was Lost *"
                        : `${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                    </label>
                    <input
                      name={field}
                      value={item[field]}
                      onChange={onChangeHandler}
                      className={`form-control ${
                        errors[field] ? "is-invalid" : ""
                      }`}
                    />
                    {errors[field] && (
                      <div className="invalid-feedback">{errors[field]}</div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="lf-btn-group">
            <button
              type="button"
              onClick={returnBack}
              className="btn btn-secondary lf-btn-sm"
            >
              Return
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary lf-btn-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit Lost Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostItemSubmit;
