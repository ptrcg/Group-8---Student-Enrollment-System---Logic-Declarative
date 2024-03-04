document.getElementById('addStudentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const course = document.getElementById('course').value; 
    const yearLevel = document.getElementById('yearLevel').value; 
    const transferee = document.querySelector('input[name="transferee"]:checked').value;
    const studyMode = document.querySelector('input[name="studyMode"]:checked').value;
    const gender = document.getElementById('gender').value; 
    const phoneNumber = document.getElementById('phoneNumber').value;

    const student = {
        studentName,
        studentId,
        course,
        yearLevel,
        transferee,
        studyMode,
        gender,
        phoneNumber
    };

    const students = JSON.parse(localStorage.getItem('students')) || [];

    students.push(student);

    localStorage.setItem('students', JSON.stringify(students));

    alert('Student Added Successfully!');

});
