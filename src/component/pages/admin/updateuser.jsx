import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateUserPage = () => {
  const { national_id } = useParams();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    err: '',
    success: null,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/getUser/${national_id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('خطأ في جلب تفاصيل المستخدم:', error);
      }
    };

    fetchUserDetails();
  }, [national_id]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/admin/update/${national_id}`, user);

      setUser({
        email: '',
        password: '',
        name: '',
        err: null,
        success: 'تم تحديث المستخدم بنجاح!',
      });
    } catch (error) {
      setUser({
        ...user,
        success: null,
        err: 'حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا!',
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3>تحديث المستخدم</h3>

      {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}

      <Form onSubmit={updateUser}>
        <Form.Group className="mb-3">
         
          <Form.Control
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            placeholder="بريد المستخدم"
          />
        </Form.Group>

        <Form.Group className="mb-3">
         
          <Form.Control
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="كلمة المرور"
          />
        </Form.Group>

        <Form.Group className="mb-3">
        
          <Form.Control
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            placeholder="اسم المستخدم"
          />
        </Form.Group>

        <Button className="btn btn main-bg-color text-white " variant="info" type="submit">
          تحديث المستخدم
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUserPage;
