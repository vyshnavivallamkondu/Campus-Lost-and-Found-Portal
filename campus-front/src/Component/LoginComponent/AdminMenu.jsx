import { React, useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  findAllItems,
  getTotalFoundItem,
} from "../../Services/LostFoundItemService";
import { getTotalStudents } from "../../Services/LoginService";
import "../../Dashboard.css";

const AdminMenu = () => {
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudentsCount = async () => {
      try {
        const response = await getTotalStudents();
        setStudentCount(response.data);
      } catch (error) {
        console.error("Error fectching Students count:", error);
      }
    };
    fetchStudentsCount();
  }, []);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await findAllItems();
        setLostCount(response.data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchLostItems();
  }, []);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await getTotalFoundItem();
        setFoundCount(response.data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar expand="lg" className="glass-navbar px-4 py-2">
        <Navbar.Brand className="portal-title">
          <FaBoxOpen className="me-2" /> Lost & Found Admin Portal
        </Navbar.Brand>
        <Nav className="ms-auto">
          <NavDropdown title="Students" className="nav-item">
            <NavDropdown.Item href="/Students">Student List</NavDropdown.Item>
            <NavDropdown.Item href="/DeleteStudent">
              Remove Student
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Search" className="nav-item">
            <NavDropdown.Item href="/search">Search Item</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Lost Items" className="nav-item">
            <NavDropdown.Item href="/lostReport">
              Lost Item List
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Found Items" className="nav-item">
            <NavDropdown.Item href="/foundReport">
              Found Item List
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/" className="logout-btn">
            <FaSignOutAlt className="me-1" /> Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* Dashboard Cards */}
      <div className="cards-grid">
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaUsers className="card-icon" />
          <h4>Total Students</h4>
          <p>{studentCount}</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaSearch className="card-icon" />
          <h4>Lost Items</h4>
          <p>{lostCount}</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaBoxOpen className="card-icon" />
          <h4>Found Items</h4>
          <p>{foundCount}</p>
        </motion.div>
      </div>

      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3>Welcome to Admin Dashboard</h3>
        <p>
          Manage students, track lost and found items, and generate reports.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminMenu;
