import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import { foundItemSubmission } from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import "../../LostItemReport.css";

const FoundItemSubmit = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campusUser, setCampusUser] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const [foundDate, setFoundDate] = useState(today);

  const [item, setItem] = useState({
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
    foundDate: "",
    status: false,
  });

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
    if (!foundDate)
      (tempErrors.foundDate = "Found Date required"), (valid = false);

    if (!valid) {
      setErrors(tempErrors);
      setIsSubmitting(false);
      return;
    }

    const finalItem = {
      ...item,
      username: campusUser.username,
      userEmail: campusUser.email,
      foundDate,
    };

    foundItemSubmission(finalItem)
      .then(() => {
        alert("Found Item Submitted Successfully!");
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
          <FaBox size={40} className="text-primary mb-2" />
          <h4 className="fw-semibold text-primary">Found Item Submission</h4>
          <p className="text-sec">Report an item you have found on campus.</p>
        </div>

        <form onSubmit={validateAndSubmit}>
          <div className="row g-4">
            {/* Left */}
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
                <label className="form-label">Found Date *</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.foundDate ? "is-invalid" : ""
                  }`}
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                />
                {errors.foundDate && (
                  <div className="invalid-feedback">{errors.foundDate}</div>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="col-md-6">
              {["itemName", "category", "color", "brand", "location"].map(
                (field) => (
                  <div key={field} className="mb-3">
                    <label className="form-label text-capitalize">
                      {field === "itemName"
                        ? "Item Name *"
                        : field === "location"
                        ? "Location Where It Was Found *"
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
              {isSubmitting ? "Submitting..." : "Submit Found Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundItemSubmit;
