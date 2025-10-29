import React, { useEffect, useState } from "react";
import {
  deleteStudentByUsername,
  getAllStudents,
} from "../../Services/LoginService";
import "../../DeleteStudent.css";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaUserGraduate,
  FaEnvelope,
  FaIdBadge,
} from "react-icons/fa";

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res.data ?? []);
    } catch (e) {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;
    setDeleting(true);
    try {
      await deleteStudentByUsername(selectedStudent.username);
      setStudents((prev) =>
        prev.filter((s) => s.username !== selectedStudent.username)
      );
      setShowModal(false);
    } catch (e) {
      setError("Failed to delete student. Try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleReturn = () => {
    navigate("/AdminMenu");
  };

  return (
    <div className="delete-student-container py-5">
      <div className="header-section text-center mb-4">
        <FaUserGraduate size={40} className="text-primary mb-2" />
        <h3 className="fw-bold text-primary header-title">Remove Students</h3>
        <p className="text-secondary small header-subtitle">
          Manage and remove student accounts from the system.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger text-center py-2 small">{error}</div>
      )}

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted small">Loading students...</p>
        </div>
      ) : students.length === 0 ? (
        <p className="text-center text-muted mt-4">No students found.</p>
      ) : (
        <div className="student-grid-container">
          {students.map((s) => (
            <div key={s.username} className="student-card fade-in">
              <div className="student-card-content">
                <h6 className="fw-semibold text-primary">{s.personName}</h6>
                <p className="small text-muted mb-1">
                  <FaIdBadge className="icon" /> {s.username}
                </p>
                <p className="small mb-1">
                  <FaEnvelope className="icon" /> {s.email}
                </p>
                <span className="badge bg-info text-dark">{s.role}</span>
              </div>

              <button
                className="btn btn-outline-danger btn-xs mt-2 delete-btn-small"
                onClick={() => confirmDelete(s)}
              >
                <FaTrashAlt className="me-2" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button
          onClick={handleReturn}
          className="btn btn-secondary fw-semibold rounded-pill px-3 py-1 return-btn-small"
        >
          ← Return
        </button>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        className="fade-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold">
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <p className="text-muted mb-0">
              Are you sure you want to delete{" "}
              <strong>{selectedStudent.username}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleting}
            className="px-4"
          >
            {deleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteStudent;
