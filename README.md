# 🔗 BlockTrack - Equipment Tracking System Using Blockchain

**BlockTrack** is a decentralized equipment tracking system that helps manufacturers and organizations securely register, manage, and transfer ownership of physical equipment. By leveraging blockchain technology, BlockTrack ensures data immutability, traceability, and transparency throughout the equipment's lifecycle.

---

## 🌟 Key Features

- ✅ **Decentralized Ownership Tracking**  
  Record and verify equipment ownership on the blockchain.

- 📝 **Add & Manage Equipment**  
  Upload equipment details with images and associated documents.

- 🔄 **Ownership Transfer with History**  
  Track and display the complete ownership history of each item.

- 📂 **Document Upload**  
  Store documents like warranties, compliance certificates, and invoices.

- 🧠 **User-Friendly Dashboard**  
  Dark mode dashboard designed for manufacturers and equipment managers.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios (API Integration)

### 🔹 Backend
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- Multer (for file/document uploads)
- dotenv (for environment variable handling)

### 🔹 Blockchain
- Solana-based smart contract integration (optional/future enhancement)

---

## 🖥️ Manufacturer Dashboard Overview

- 🔧 Add Equipment via Form:
  - Name
  - Serial Number
  - Image Upload
  - Document Upload

- 📋 View All Equipment:
  - List with Name, Serial No, Current Owner, and Status
  - Links to view image and documents

- 🔁 Transfer Ownership:
  - Select new owner and execute transfer
  - History is stored and viewable per item


---

## 🔁 Control Flow

![control-flow](https://github.com/user-attachments/assets/103a7af1-9815-4a30-afac-96f4a5e09653)

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/blocktrack.git
cd blocktrack
```

### 2️⃣ Setup Backend (Node.js)
```
cd backend
npm install
npm run dev
```

Create .env file: (refer to example.env file)

```
# Server configuration
PORT=5000

# Bcrypt salt rounds for password hashing (number)
SALT_ROUND=10

# JWT secrets (use strong, random strings)
USER_JWT_SECRET="your_user_jwt_secret_here"
ADMIN_JWT_SECRET="your_admin_jwt_secret_here"
MANUFACTURER_JWT_SECRET="your_manufacturer_jwt_secret_here"

# MongoDB connection string
MONGO_URI="your_mongodb_connection_uri_here"

```

3️⃣ Setup Frontend (React.js)
```
cd ../frontend
npm install
npm run dev
```

## 💡 Future Enhancements

- 🔗 **Integrate with Smart Contracts for Decentralized Ownership**  
  Record equipment transfers directly on the blockchain using secure smart contracts.

- 🪙 **Mint Equipment as NFTs**  
  Represent each equipment item as a unique NFT on the blockchain, enabling verifiable ownership, authenticity, and traceable history. This also opens the door for resale, leasing, or collateralization in decentralized finance.

- 🔐 **User Roles and Authentication**  
  Implement roles like manufacturer, verifier, and regular user with secure login.

- 📱 **QR Code Verification System**  
  Generate QR codes for each item to quickly verify authenticity and track history.

- 🛰️ **Real-Time Data Sync**  
  Use WebSockets to sync equipment status and updates across devices.

- ☁️ **Cloud Storage Integration**  
  Allow storage of documents/images via AWS S3 or other cloud providers.

- 🌐 **Decentralized File Hosting**  
  Support IPFS or Arweave for immutable and decentralized document/image storage.


## 📸 UI Screenshots

> A glimpse of the BlockTrack interface

### 🏠 Landing Page  
![landing_page jpg](https://github.com/user-attachments/assets/b6e15b1e-bf5d-491d-bee4-2163c3dd035f)

### 🧍 User Signup Page  
![user_signup](https://github.com/user-attachments/assets/440b6f3f-936a-4eb4-bf3d-0e0b20b81434)

### 🏭 Manufacturer Signup Page  
![signup_manufacturer_1](https://github.com/user-attachments/assets/c8cb51f4-87fa-4703-9f1d-84a7fbd2831e)
![signup_manufacturer_2](https://github.com/user-attachments/assets/5f017c7f-bc61-47f5-a4e6-33d4ccf60301)

### 🔐 Login Page  
![login_page](https://github.com/user-attachments/assets/ba693ec3-1e32-495e-b93c-a79f01fa5630)

### 🧑‍💼 User Dashboard  
![user_dashboard](https://github.com/user-attachments/assets/c980077c-aacf-4fc7-b752-3b61e041ecf4)

### 🏗️ Manufacturer Dashboard 
![manufacturer_dashboard](https://github.com/user-attachments/assets/5df824f0-83a7-4183-bfd3-d5fcccfe84c1)

### ➕ Add Equipment Form  
![add_equipment](https://github.com/user-attachments/assets/244b6af1-6a80-4d5a-9710-f5d46421e5b0)

### 🔁 Transfer Equipment Form
![transfer_equipment](https://github.com/user-attachments/assets/5f770763-9efc-4bce-906c-69a78f994374)

