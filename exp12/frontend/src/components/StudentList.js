import React from 'react';

function StudentList({ students, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading-state">Loading students...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students found. Add one above.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <h2>Student Records <span className="count-badge">{students.length}</span></h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <span className="course-badge">{student.course}</span>
                </td>
                <td>
                  <span className={`grade-badge grade-${gradeClass(student.grade)}`}>
                    {student.grade}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function gradeClass(grade) {
  if (grade >= 8) return 'high';
  if (grade >= 5) return 'mid';
  return 'low';
}

export default StudentList;
