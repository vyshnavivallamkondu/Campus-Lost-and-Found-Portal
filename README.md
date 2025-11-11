# Campus Lost And Found Portal

## 📌 Overview
The **Campus Lost And Found Portal** is a full-stack web application designed to simplify the process of reporting and retrieving lost or found items within a college campus.  
It provides a **centralized, secure, and automated platform** that connects students quickly through smart item-matching and verified listings.

---

## 🧠 Application Flow
1. **User Registration & Login:**  
   Users can sign up and log in securely to access the platform.  

2. **Post Lost/Found Items:**  
   Students can post details such as item name, description, date, location, and image of lost or found items.  

3. **Smart Matching & Search (Fuzzy Systems):**  
   The system automatically compares new posts with existing listings to suggest potential matches between lost and found items using keyword-based search.  

4. **Admin Verification:**  
   Admins verify posts to maintain authenticity and ensure that only valid items are listed.  

5. **User Contact:**  
   Once a potential match is identified, users can connect securely to return the found items.
   
6. **Broadcast Chat Box (Websocket)**
   The students can join the chat and post there messages about lost and found items.

7. **Future Flow (Planned):**  
   - Email/notification alerts when a match is found  
   - AI-based visual recognition for automatic image-based matching  
   - Mobile app integration for easier access  

---

## 🏗️ System Architecture
The system follows a **three-tier architecture**:

### 1. Frontend – React.js 
- Built using **React** for a dynamic and responsive UI.  
- Supports form validation, real-time search, and smooth navigation.  
- Communicates with backend APIs using **Axios** for data exchange.  

### 2. Backend – Spring Boot  
- Developed with **Spring Boot** to create RESTful APIs for handling user requests and business logic.  
- Manages authentication, CRUD operations, and admin verification.  
- Includes role-based access control for secure interaction.  

### 3. Database – MySQL  
- Stores all user data, posts, and matched results.  
- Integrated through **Spring Data JPA** for easy ORM mapping and query handling.  
- Ensures data consistency and efficient retrieval.  

---

## ⚙️ Tech Stack
| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React.js, CSS, BootStrap| For building responsive UI and handling user interactions |
| **Backend** | Spring Boot, Java , Spring Security | For business logic and API development |
| **Database** | MySQL | For storing and managing item and user data |
| **Communication** | RESTful APIs | To connect frontend and backend |
| **Version Control** | Git, GitHub | For code management and collaboration |
| **Testing Tools** | Postman | For testing REST APIs |

---

## 🚀 Key Features
- Post and Search Lost/Found Items  
- Auto-Matching Engine for Quick Results  
- Authentication and Role-Based Access  
- Admin Dashboard for Moderation  
- Simple User Interaction Flow
- Broadcast Chat Box 
- Responsive UI for All Devices  

---



