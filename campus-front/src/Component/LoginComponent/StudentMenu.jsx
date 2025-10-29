import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaSearch,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../../Dashboard.css";

const StudentMenu = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar - aligned with AdminMenu UI */}
      <Navbar expand="lg" className="glass-navbar px-4 py-2">
        <Navbar.Brand className="portal-title">
          <FaBoxOpen className="me-2" /> Lost & Found Student Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="student-navbar" />
        <Navbar.Collapse id="student-navbar">
          <Nav className="ms-auto">
            <NavDropdown title="Profile" className="nav-item">
              <NavDropdown.Item as={Link} to="/Personal">
                Personal Info
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Search" className="nav-item">
              <NavDropdown.Item href="/search">Search Item</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Lost Items" className="nav-item">
              <NavDropdown.Item as={Link} to="/LostSubmit">
                Lost Item Registration
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/LostReport">
                My Lost Items
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Found Items" className="nav-item">
              <NavDropdown.Item as={Link} to="/FoundSubmit">
                Found Item Submission
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/FoundReport">
                My Found Items
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/" className="logout-btn">
              <FaSignOutAlt className="me-1" /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* DASHBOARD CARDS */}
      <div className="cards-grid">
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaPlusCircle className="card-icon" />
          <h4>Lost Item Registration</h4>
          <p>Report your lost item</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaBoxOpen className="card-icon" />
          <h4>Found Item Submission</h4>
          <p>Submit items you found</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaSearch className="card-icon" />
          <h4>Lost Item Track</h4>
          <p>Track your lost items</p>
        </motion.div>
      </div>

      {/* WELCOME CARD */}
      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3>Welcome to Student Dashboard</h3>
        <p>
          Register lost items, submit found items, and track your belongings
          easily.
        </p>
      </motion.div>
    </div>
  );
};

export default StudentMenu;
