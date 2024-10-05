import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import JoinEmployer from '../pages/SignUp/JoinEmployer'
import PrivateRoute from './PrivateRoute'
import Profile from '../pages/Dashboard/Common/Profile'
import JoinManager from '../pages/SignUp/JoinManager'
import AddAsset from '../pages/Dashboard/Manager/AddAsset'
import MyEmployeeList from '../pages/Dashboard/Manager/MyEmployeeList'
import AssetsList from '../pages/Dashboard/Employee/AssetsList'
import MyAssets from '../pages/Dashboard/Employee/MyAssets'
import ManagerAssetsList from '../pages/Dashboard/Manager/ManagerAssetsList'
import AllRequests from '../pages/Dashboard/Manager/AllRequests'
import AddEmployees from '../pages/Dashboard/Manager/AddEmployee'
import MyTeamPage from '../pages/Dashboard/Employee/MyTeamPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
   
      {
        path: '/add-asset',
        element: <PrivateRoute>
          <AddAsset/>
        </PrivateRoute>
      },
      {
        path: '/profile',
        element: <PrivateRoute>
          <Profile/>
        </PrivateRoute>
      },
      {
        path: '/employeeList',
        element: <PrivateRoute>
          <MyEmployeeList/>
        </PrivateRoute>
      },
      {
        path: '/assetsList',
        element: <PrivateRoute>
          <AssetsList/>
        </PrivateRoute>
      },
      {
        path: '/my-assets',
        element: <PrivateRoute>
          <MyAssets/>
        </PrivateRoute>
      },
      {
        path: '/assets-list',
        element: <PrivateRoute>
          <ManagerAssetsList/>
        </PrivateRoute>
      },
      {
        path: '/all-requests',
        element: <PrivateRoute>
          <AllRequests/>
        </PrivateRoute>
      },
      {
        path: '/my-team',
        element: <PrivateRoute>
          <MyTeamPage/>
        </PrivateRoute>
      },
      {
        path: '/add-employee',
        element: <PrivateRoute>
          <AddEmployees/>
        </PrivateRoute>
      },
      
      { path: '/join-employ', element: <JoinEmployer /> },
      { path: '/join-manager', element: <JoinManager /> },
    ],
  },
  { path: '/login', element: <Login /> },
  
  
])
