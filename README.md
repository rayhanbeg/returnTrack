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
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    DATABASE_URL=mongodb://localhost:27017/retuntrack
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service_provider
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password
    ```

4. **Run the application**
    ```bash
    npm start
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

### Reset Password via Email
If a user forgets their password, they can reset it via email by following these steps:

1. **Forgot Password**: On the login page, click on the "Forgot Password" link.
2. **Enter Email**: The user is prompted to enter the email address associated with their account.
3. **Send Reset Link**: An email containing a password reset link is sent to the user’s registered email address. This is powered by an email service like [Nodemailer](https://nodemailer.com/) (configured using environment variables).
4. **Reset Password**: The user clicks on the reset link in the email, which redirects them to a page where they can enter a new password.
5. **Password Update**: After submitting the new password, the user can log in with the updated credentials.

The reset email typically contains a time-limited, one-time-use token to ensure security.

### Reports
Generate and download various reports such as:
- Asset Inventory Report
- Maintenance Schedule
- Depreciation Report

### User Management
Admin users can manage system users, assign roles, and set permissions.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or support, please contact us at [support@retuntrack.com](mailto:support@retuntrack.com).

---

Thank you for choosing RetunTrack for your asset management needs!
