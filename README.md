# RetunTrack - Asset Management System

## Overview
Welcome to RetunTrack, your go-to solution for efficient asset management. This MERN (MongoDB, Express, React, Node.js) stack web application is designed to streamline asset tracking, lifecycle management, and reporting processes. With RetunTrack, managing your organization's assets has never been easier.

## Features
- **Asset Tracking**: Real-time monitoring of asset status and location.
- **Lifecycle Management**: Complete control over asset lifecycle stages from acquisition to disposal.
- **Reporting and Analytics**: Generate detailed reports and gain valuable insights through analytics.
- **User Management**: Role-based access control for secure and personalized user experiences.
- **Inventory Management**: Efficiently manage inventory levels and track stock movements.
- **Maintenance Scheduling**: Schedule and track maintenance activities to ensure asset longevity.
- **Reset Password via Email**: Users can request a password reset, receive an email with a reset link, and securely update their password.


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)

### Installation
1. **Clone the repository**
    ```bash
    git clone https://github.com/rayhanbeg/returnTrack.git
    cd retuntrack
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create `.env.local` for the client and `.env` for the server with the following variables (replace with your actual keys):

   #### `.env.local` (Client-side):
   ```plaintext
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_measurementId=your_firebase_measurement_id
   VITE_IMGBB_API_KEY=your_imgbb_api_key
   VITE_API_URL=https://your-api-url.com
    ```
4. **Set up environment variables**
   Create `.env` for the server and `.env` for the server with the following variables (replace with your actual keys):

   #### `.env.local` (Client-side):
   ```plaintext
   DB_USER=your_db_user
   DB_PASS=your_db_password
   ACCESS_TOKEN_SECRET=your_access_token_secret
    ```

4. **Run the application**
    ```bash
    npm run dev
    ```

5. **Access the website**
    Open your browser and navigate to `http://localhost:5000`

## Usage

### Dashboard
The dashboard provides an overview of asset statuses, recent activities, and quick access to important functionalities.

### Asset Management
- **Add New Asset**: Easily add new assets with detailed information.
- **Edit Asset Details**: Update information about existing assets.
- **Asset History**: View the complete history of an asset including transfers, maintenance, and usage.


### User Management
Admin users can manage system users, assign roles, and set permissions.


## Contact
For any questions or support, please contact us at [support@retuntrack.com](mailto:support@retuntrack.com).

---

Thank you for choosing RetunTrack for your asset management needs!
