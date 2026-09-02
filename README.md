# 🌿 Aaranya — Spiritual Wellness & Lifestyle Platform

Aaranya is a modern, dynamic web platform designed for a spiritual wellness and lifestyle brand. The platform provides visitors with an immersive experience where they can explore spiritual services, crystals and their benefits, and crystal accessories.

The system is designed with a **public-facing website** for visitors and a secure **Admin Dashboard** that allows administrators to manage all website content dynamically.

> **Rooted in Nature. Guided Within.** 🌿✨

---

## ✨ Features

### 🌐 Public Website

Visitors can explore the platform without creating an account or logging in.

* 🏠 Modern and responsive homepage
* 🔮 Explore spiritual and wellness services
* 🃏 Tarot reading information
* 🔢 Numerology services
* 💎 Crystal information and benefits
* 📿 Crystal accessories and product catalogue
* 📄 Detailed service pages
* 💠 Detailed crystal pages
* 🛍️ Product catalogue and product details
* 🌿 Indian-inspired, spiritual, earthy design
* 📱 Fully responsive user interface
* ✨ Subtle animations and interactive elements

---

### 🔐 Admin Dashboard

Only administrators are required to log in.

The Admin Dashboard allows administrators to dynamically manage the website content.

* 🔑 Secure Admin authentication
* 📊 Dashboard overview
* 🗂️ Manage service categories
* ✨ Add, edit, activate, and deactivate services
* 🔮 Manage spiritual and wellness services
* 💎 Add and manage crystals
* 🌱 Manage crystal benefits
* 📿 Manage products and accessories
* 🖼️ Manage product images
* 📝 Manage dynamic website content

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS
* Lucide React
* React Three Fiber / Three.js *(optional 3D experience)*

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Security
* JWT Authentication

### Database

* MySQL / PostgreSQL

### Other Tools

* Cloudinary for image storage
* Git & GitHub for version control

---

# 🏗️ System Architecture

```text
                        ┌───────────────────┐
                        │  PUBLIC VISITORS  │
                        │    No Login       │
                        └─────────┬─────────┘
                                  │
                                  ▼
                        ┌───────────────────┐
                        │   React Frontend  │
                        └─────────┬─────────┘
                                  │
                              REST APIs
                                  │
                                  ▼
                        ┌───────────────────┐
                        │   Spring Boot     │
                        │     Backend       │
                        └─────────┬─────────┘
                                  │
                                  ▼
                        ┌───────────────────┐
                        │     Database      │
                        │ MySQL/PostgreSQL  │
                        └───────────────────┘


                        ┌───────────────────┐
                        │      ADMIN        │
                        │    Login Required │
                        └─────────┬─────────┘
                                  │
                                  ▼
                        ┌───────────────────┐
                        │  Admin Dashboard  │
                        └─────────┬─────────┘
                                  │
                              JWT Auth
                                  │
                                  ▼
                           Spring Boot API
```

---

# 📁 Project Structure

```text
aaranya/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │
│   └── pom.xml
│
└── README.md
```

---

# 🗄️ Database Design

The system uses a relational database with the following main entities:

```text
ADMINS

CATEGORIES
    │
    └── SERVICES
          │
          └── SERVICE_BENEFITS

CRYSTALS
    │
    ├── CRYSTAL_BENEFITS
    │
    └── PRODUCTS
          │
          └── PRODUCT_IMAGES

WEBSITE_CONTENT
```

---

## 🔗 Entity Relationships

| Parent Entity | Relationship | Child Entity     |
| ------------- | ------------ | ---------------- |
| Categories    | One-to-Many  | Services         |
| Services      | One-to-Many  | Service Benefits |
| Crystals      | One-to-Many  | Crystal Benefits |
| Crystals      | One-to-Many  | Products         |
| Products      | One-to-Many  | Product Images   |

---

# 🔐 Authentication

Version 1 of Aaranya only requires authentication for administrators.

### Public Visitors

Visitors can:

* Browse the website
* Explore services
* View crystals
* View products

No login is required.

### Administrator

Administrators can:

* Log in securely
* Access the Admin Dashboard
* Manage website content

Authentication is implemented using:

* Spring Security
* JWT (JSON Web Token)
* Password encryption using BCrypt

---

# 🌐 API Structure

## Public APIs

Public APIs can be accessed without authentication.

```text
GET /api/categories

GET /api/services
GET /api/services/{slug}

GET /api/crystals
GET /api/crystals/{slug}

GET /api/products
GET /api/products/{slug}

GET /api/content
```

---

## 🔐 Admin APIs

Admin APIs require authentication.

```text
POST /api/auth/login

POST /api/admin/categories
PUT /api/admin/categories/{id}
DELETE /api/admin/categories/{id}

POST /api/admin/services
PUT /api/admin/services/{id}
DELETE /api/admin/services/{id}

POST /api/admin/crystals
PUT /api/admin/crystals/{id}
DELETE /api/admin/crystals/{id}

POST /api/admin/products
PUT /api/admin/products/{id}
DELETE /api/admin/products/{id}
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Java JDK
* Maven
* MySQL or PostgreSQL
* Git

---

## 💻 Clone the Repository

```bash
git clone <your-repository-url>
cd aaranya
```

---

# 🎨 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# ☕ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure your database connection inside:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/aaranya
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

# 🌱 Environment Variables

Create a `.env` file inside the frontend directory.

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Do not commit sensitive environment variables to GitHub.

---

# 🔮 Future Enhancements

The project is designed to support future expansion.

### 📅 Booking System

* Service enquiries
* Appointment scheduling
* Booking management
* Email notifications

### 👤 Customer Accounts

* Customer registration
* Customer login
* Role-based authentication
* Customer profiles
* Booking history

### 🛍️ E-Commerce

* Shopping cart
* Product orders
* Payment gateway integration
* Order tracking
* Purchase history

### ✨ Additional Features

* AI-powered spiritual guidance
* Personalized crystal recommendations
* Advanced search and filtering
* Wishlist
* Reviews and testimonials
* Multi-language support

---

# 🎯 Project Goals

The main goals of Aaranya are:

* Create a modern digital presence for a spiritual wellness brand.
* Allow administrators to dynamically manage website content.
* Provide visitors with an elegant and immersive browsing experience.
* Build a scalable full-stack architecture.
* Create a foundation for future booking and e-commerce functionality.

---

# 🌿 Brand Philosophy

**Aaranya** represents a journey toward nature, self-discovery, reflection, and inner connection.

The platform combines:

> 🌿 Nature
> 🔮 Spirituality
> 💎 Crystals
> ✨ Intuition
> 🪷 Self-Discovery

**Rooted in Nature. Guided Within.**

---

# 👩‍💻 Author

**Khevna Unakar**

MCA Student | Developer | Designer

---

# 📄 License

This project is currently developed for educational and portfolio purposes.

---

### 🌿✨ Aaranya — Rooted in Nature. Guided Within. ✨🌿
