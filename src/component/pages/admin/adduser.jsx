import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
const AddUserPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    national_id: '',  // إضافة national_id إلى الحالة
    err: '',
    success: null,
  });

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/', user);
      
      setUser({
        email: '',
        password: '',
        name: '',
        role: '',
        national_id: '',  // إعادة تعيين national_id بعد الإرسال
        err: null,
        success: 'تم إنشاء المستخدم بنجاح!',
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
      <h3>إضافة مستخدم جديد</h3>

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

      <Form onSubmit={addUser}>
        <Form.Group className="mb-3">
          <Form.Control
            className='w-50'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            required
            placeholder="بريد المستخدم"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            className='w-50'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            required
            placeholder="كلمة المرور"
          />
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Control
            value={user.name}
            className='w-50'
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            required
            placeholder="اسم المستخدم"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
           className='w-50'
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            type="text"
            required
            placeholder="الدور"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
          className='w-50'
            value={user.national_id}
            onChange={(e) => setUser({ ...user, national_id: e.target.value })}
            type="text"
            required
            placeholder="الرقم الوطني"
          />
        </Form.Group>

        <Button className="btn btn main-bg-color text-white " variant="info" type="submit">
          إضافة مستخدم جديد
        </Button>
      </Form>
    </div>
  );
};

export default AddUserPage;
