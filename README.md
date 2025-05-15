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
npm run start
```

Create .env file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blocktrack
```

3️⃣ Setup Frontend (React.js)
```
cd ../frontend
npm install
npm run dev
```

## 💡 Future Enhancements
🔗 Integrate with Smart Contracts for decentralized ownership

🔐 User roles and login (manufacturer, verifier, user)

📱 QR Code verification system

🛰️ Real-time data sync with WebSockets

☁️ Cloud file storage (e.g., AWS S3)

🌐 IPFS or Arweave for decentralized document hosting


