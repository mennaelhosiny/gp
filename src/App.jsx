// Inside App.js
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import Layout from './component/pages/Layout/Layout';
import Home from './component/pages/Home/Home';
import Signin from './component/pages/Signin/Signin';
import AppointmentA from './component/pages/Appointment/AppointmentA/AppointmentA';
import Appointment_hu from './component/pages/Appointment/Appointment_hu/Appointment_hu';
import Requests from './component/pages/employee/Requests';
import Penalty from './component/pages/admin/Penalty';
import AddPenalty from './component/pages/admin/AddPenalty';
import ManagePenalties from './component/pages/admin/managepenalty';
import Guidelines_hu from './component/pages/admin/Guidelines_hu';
import Guidelines from './component/pages/admin/Guidelines';
import AddUserPage from './component/pages/admin/adduser';
import UpdateUserPage from './component/pages/admin/updateuser';
import BlockUserPage from './component/pages/admin/blockuser';
import ManageUsers from './component/pages/admin/manage';
import AdmissionRequestsPage from './component/pages/employee/acceptrequest';
import Appointment from './component/pages/student/Appointment/Appointment';
import EditJoinRequest from './component/pages/student/EditJoinRequest/EditJoinRequest';
import Instruction from './component/pages/student/Instruction/Instruction';
import JoinRequest from './component/pages/student/JoinRequest/JoinRequest';
import Old from './component/pages/student/Old/Old';
import Enquiry from './component/pages/student/Enquiry/Enquiry';
import New from './component/pages/student/New/New';
import EditNew from './component/pages/student/EditNew/EditNew';
import EditOld from './component/pages/student/EditOld/EditOld';
import HousingPage from './component/pages/admin/housing';
import Managehousing from './component/pages/admin/housing';
import Managebuilding from './component/pages/admin/managebuilding';
import UpdateRoomPage from './component/pages/admin/updateroom';
import AddRoomPage from './component/pages/admin/addroom';
import ChatBot from './component/chatbot/chatbot';

const myRouter = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "signin", element: <Signin /> },
  {
    path: "/", element: <Layout />, children: [
      { path: "appointment", element: <Appointment /> },
      { path: "enquiry", element: <Enquiry /> },
      { path: "updateroom/:id", element: <UpdateRoomPage/>},
      { path: "adduser", element: <AddUserPage /> },
      { path: "updateuser/:national_id", element: <UpdateUserPage /> },
      { path: "requests", element: <Requests/> },
      { path: "blockuser", element: <BlockUserPage /> },
      { path: "AppointmentA", element: <AppointmentA /> },
      { path: "Appointment_hu", element: <Appointment_hu /> },
      { path: "Penalty", element: <Penalty/> },
      { path: "add-penalty/:userId/:userName", element: <AddPenalty /> },
      { path: "managepenalty", element: <ManagePenalties/> },
      { path: "manage", element: <ManageUsers /> },
      { path: "acceptrequest", element: <AdmissionRequestsPage /> },
      { path: "Guidelines", element: <Guidelines/> },
      { path: "housing", element: <Managehousing/> },
      { path: "building", element: <Managebuilding/>},
      { path: "chatbot", element: <ChatBot/>},
      { path: "addroom/:id", element: <AddRoomPage/>},
      { path: "Guidelines_hu", element: <Guidelines_hu/> },
      { path: "editjoinrequest", element: <EditJoinRequest />,
     
       
        children: [
          { path: 'editOld', element: <EditNew /> },
          { path: 'editNew', element: <EditOld /> }
        ]
      },
      { path: "instruction", element: <Instruction /> },
      {
        path: "joinrequest", element: <JoinRequest />, children: [
          { path: "old", element: <Old /> },
          { path: "new", element: <New /> },
        ]
      },
      { outlet: 'nested', element: <Outlet /> }, // Render nested routes within the layout
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
