document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchStudentBtn').addEventListener('click', () => {
        const studentId = document.getElementById('studentIdInput').value.trim();
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students.find(s => s.studentId === studentId);

        if (student) {
            displayStudentDetails(student);
            displayStudentCourses(student); 
        } else {
            alert('Student not found.');
        }
    });
});

function displayStudentDetails(student) {
    const detailsContainer = document.getElementById('studentDetails');
    detailsContainer.innerHTML = `
        <h2>Student Details</h2>
        <p><strong>ID:</strong> ${student.studentId}</p>
        <p><strong>Name:</strong> ${student.studentName}</p>
        <p><strong>Course:</strong> ${student.course}</p>
        <p><strong>Year Level:</strong> ${student.yearLevel}</p>
        <p><strong>Status:</strong> ${student.transferee === 'yes' ? 'Irregular' : 'Regular'}</p>
        <p><strong>Gender:</strong> ${student.gender}</p>
    `;
}

function displayStudentCourses(student) {
    const courses = JSON.parse(localStorage.getItem('courses')) || window.courses || [];
    const container = document.getElementById('courseDetails');
    const coursesHtml = courses.map(course => {
        const grade = student.grades && student.grades[course.courseCode];
        return `
            <tr>
                <td>${course.courseCode}</td>
                <td>${course.title}</td>
                <td>${course.units}</td>
                <td>${grade || 'N/A'}</td> <!-- Show 'N/A' if no grade is available -->
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <h2>Courses</h2>
        <table>
            <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Title</th>
                    <th>Units</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                ${coursesHtml}
            </tbody>
        </table>
    `;
}