import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import Banner from '../../components/Banner/Banner';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import AboutUs from '../../components/About/AboutUs';
import Packages from '../../components/Packages/Packages';
import useRole from '../../hooks/useRole';
import MyPendingRequests from '../../components/Home/MyPendingRequests'
import NoticeBoard from '../../components/Home/NoticeBoard';
import PendingRequests from '../../components/Home/manager/PendingRequests';

const Home = () => {
  const [role] = useRole();
  const { user, loading } = useAuth(); // Assume useAuth provides a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  return (
    <div>
      <Helmet>
        <title>ReturnTrack | Home</title>
      </Helmet>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner/>
        </div>
      ) : (
        <>
          {!user && (<>
            <Banner />
            <AboutUs/>
            <Packages/>
          </>)}
            
            {
              role === 'employer' && (<> 
              <MyPendingRequests/> 
              {/* <MyMonthlyRequests/> */}
               <NoticeBoard/> </>)
            }
            {
              role === 'manager' && (<> 
               <PendingRequests/>
              
                </>)
            }

        </>
      )}
    </div>
  );
};

export default Home;
