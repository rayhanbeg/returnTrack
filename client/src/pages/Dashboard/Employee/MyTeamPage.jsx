import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const MyTeamPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const response = await axiosSecure.get(`/users/${user?.email}`);
          const fetchedCompanyEmail = response?.data?.companyEmail;

          // Fetch team members once we have the company email
          const teamResponse = await axiosSecure.get(`/employers/teamMembers/${fetchedCompanyEmail}`);
          setTeamMembers(teamResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [axiosSecure, user?.email]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Team</title>
      </Helmet>

      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-8 text-center text-white">
            <h1 className="text-4xl font-bold">Meet Our Team</h1>
            <p className="text-lg mt-2">Total Members: {teamMembers.length}</p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTeamPage;
