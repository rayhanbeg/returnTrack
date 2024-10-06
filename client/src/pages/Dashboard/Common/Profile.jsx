import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from 'react-hot-toast';
import axios from "axios";

const Profile = () => {
  const { user, loading, updateUserProfile, resetPassword } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [email, setEmail] = useState(user?.email || "");  // Email from current user
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  if (loading || isUpdating) return <LoadingSpinner />;

  const handleImageChange = (event) => {
    event.preventDefault();
    setSelectedImage(event.target.files[0]);
  };

  const handleSaveClick = async () => {

    setIsUpdating(true);
    try {
      let newPhotoURL = photoURL;

      // Upload image if selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );

        newPhotoURL = data.data.url; // Get the URL of the uploaded image
      }

      await updateUserProfile(displayName, newPhotoURL);
      setPhotoURL(newPhotoURL);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      return toast.error('Please provide an email to reset your password.');
    }
    try {
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error("Error resetting password: ", error);
      toast.error('Failed to send password reset email.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <div className="relative">
          <div className="bg-[#35A6DE] h-28 rounded-t-2xl flex items-center justify-center">
            <p className="text-white text-lg font-semibold">Profile Information</p>
          </div>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              alt="profile"
              src={photoURL}
              className="rounded-full border-4 border-white shadow-xl w-24 h-24"
            />
          </div>
        </div>
        <div className="pt-16">
          <div className="flex flex-col items-center">
            {/* Name and Profile Photo */}
            <div className="w-full">
              <label className="block text-gray-700 text-sm mb-1">Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#35A6DE]"
              />
            </div>
            <div className="w-full mt-4">
              <label className="block text-gray-700 text-sm mb-1">Profile Photo</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full text-gray-700 border border-gray-300 rounded-lg py-2 px-3 file:bg-[#E0E7FF] file:text-gray-700 file:rounded-lg"
              />
            </div>

            {/* Save Changes Button */}
            <button
              onClick={handleSaveClick}
              className="mt-6 bg-[#35A6DE] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#2D8CD8] transition duration-300"
            >
              Save Changes
            </button>

            {/* Reset Password Section */}
            <div className="w-full mt-6">
              <h2 className="text-gray-700 font-semibold text-lg">Reset Password</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#35A6DE] mt-3"
              />
              <button
                onClick={handleResetPassword}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
              >
                Send Password Reset Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
