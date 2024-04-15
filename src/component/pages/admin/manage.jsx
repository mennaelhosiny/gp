import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('0'); // تغيير القيمة الافتراضية لتكون نصًا بدلاً من رقم

  useEffect(() => {
    fetchUsersByRole();
  }, [selectedRole]);

  const fetchUsersByRole = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/get/${selectedRole}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users by role:", error);
    }
  };

  const blockUser = async (nationalId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/block/${nationalId}`);
      // Refresh the user list after blocking
      fetchUsersByRole();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (nationalId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/unblock/${nationalId}`);
      // Refresh the user list after unblocking
      fetchUsersByRole();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
   <div className="container">
     <div className=" manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center">إدارة المستخدمين</h3>
        <Link to={"/adduser"} className="btn btn main-bg-color text-white">
          إضافة مستخدم جديد +
        </Link>
      </div>

      <label htmlFor="roleSelect">اختر الدور:</label>
      <select
        className="form-control mb-2 w-25"
        id="roleSelect"
        onChange={(e) => setSelectedRole(e.target.value)}
        value={selectedRole}
      >
        <option value="0">طالب</option>
        <option value="1">موظف</option>
      </select>

     <div className="row">
  <div className="col table-responsive">
  <Table className="table table-striped" responsive='sm' >
        <thead>
          <tr>
            <th>الرقم</th>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الدور</th>
            <th>الرقم الوطني</th>
            <th>محظور</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.national_id}</td>
              <td>{user.blocked ? "نعم" : "لا"}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => blockUser(user.national_id)}
                >
                  حظر
                </button>

                <button
                  className="btn btn-sm btn-success mx-2"
                  onClick={() => unblockUser(user.national_id)}
                >
                  رفع الحظر
                </button>

                <Link
                  to={`/updateuser/${user.national_id}`}
                  className="btn btn-sm btn gold-bg-color text-white mx-2"
                >
                  تعديل
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  </div>
     </div>
    </div>
   </div>
  );
};

export default UserManagementPage;
