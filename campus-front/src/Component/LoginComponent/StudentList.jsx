import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../Services/LoginService";
import { getUserDetails } from "../../Services/LoginService";
import {
  FaUserGraduate,
  FaEnvelope,
  FaIdBadge,
  FaUserTag,
} from "react-icons/fa";
import "../../StudentList.css";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // fetchStudents must be declared before the useEffect that calls it
  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    getUserDetails()
      .then((response) => setCurrentUser(response.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5 fs-6 text-muted">
        Loading students...
      </div>
    );

  if (students.length === 0)
    return (
      <div className="text-center mt-5 fs-6 text-muted">No students found.</div>
    );

  const returnBack = () => {
    navigate(currentUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  return (
    <div className="student-list-page">
      <div className="student-header">
        <FaUserGraduate size={45} className="text-info mb-2" />
        <h2 className="fw-bold text-info">🎓 Student Directory</h2>
        <p className="text-secondary">List of all registered students</p>
      </div>

      <div className="student-grid">
        {students.map((student) => (
          <div key={student.username} className="student-card-glow">
            <h4 className="student-name">{student.personName}</h4>
            <p className="student-username">
              <FaIdBadge className="icon" /> {student.username}
            </p>

            <div className="student-info">
              <p>
                <FaEnvelope className="icon" /> <strong>Email:</strong>{" "}
                {student.email}
              </p>
              <p>
                <FaUserTag className="icon" /> <strong>Role:</strong>{" "}
                {student.role}
              </p>
            </div>
          </div>
        ))}
      </div>

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

export default StudentList;
