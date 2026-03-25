import React, { useState, useEffect } from 'react';

const INITIAL_FORM = { name: '', email: '', course: '', grade: '' };

function AddStudent({ onSave, onCancel, editingStudent }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
        grade: editingStudent.grade,
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Enter a valid email';
    if (!form.course.trim()) newErrors.course = 'Course is required';
    const g = parseInt(form.grade, 10);
    if (isNaN(g) || g < 1 || g > 10) newErrors.grade = 'Grade must be between 1 and 10';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ ...form, grade: parseInt(form.grade, 10) });
    setForm(INITIAL_FORM);
  };

  return (
    <div className="form-card">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Alice Johnson"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. alice@example.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              name="course"
              type="text"
              value={form.course}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              className={errors.course ? 'input-error' : ''}
            />
            {errors.course && <span className="error-msg">{errors.course}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade (1–10)</label>
            <input
              id="grade"
              name="grade"
              type="number"
              min="1"
              max="10"
              value={form.grade}
              onChange={handleChange}
              placeholder="1–10"
              className={errors.grade ? 'input-error' : ''}
            />
            {errors.grade && <span className="error-msg">{errors.grade}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
