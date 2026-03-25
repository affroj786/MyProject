import React, { useState, useEffect, useCallback } from 'react';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/studentService';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch {
      showNotification('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSave = async (formData) => {
    try {
      if (editingStudent) {
        const res = await updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? res.data : s))
        );
        setEditingStudent(null);
        showNotification('Student updated successfully');
      } else {
        const res = await createStudent(formData);
        setStudents((prev) => [...prev, res.data]);
        showNotification('Student added successfully');
      }
    } catch (err) {
      const msg = err.response?.data || 'Operation failed';
      showNotification(msg, 'error');
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showNotification('Student deleted successfully');
    } catch {
      showNotification('Failed to delete student', 'error');
    }
  };

  const handleCancel = () => {
    setEditingStudent(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Management System</h1>
        <p>React + Spring Boot CRUD Application</p>
      </header>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="app-main">
        <AddStudent
          onSave={handleSave}
          onCancel={handleCancel}
          editingStudent={editingStudent}
        />
        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

      <footer className="app-footer">
        <p>Experiment 12 — Full Stack CRUD | React + Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;
