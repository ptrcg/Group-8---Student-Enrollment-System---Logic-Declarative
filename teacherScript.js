document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addStudentBtn").addEventListener("click", () => {
    window.location.href = "addStudent.html";
  });

  document.getElementById("searchStudentBtn").addEventListener("click", () => {
    const studentId = document.getElementById("studentIdInput").value.trim();
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find((s) => s.studentId === studentId);

    if (student) {
      displayStudentDetails(student);
      displayStudentCourses(student);
    } else {
      alert("Student not found.");
    }
  });
});
function displayStudentDetails(student) {
  const detailsContainer = document.getElementById("studentDetails");
  detailsContainer.innerHTML = `
        <h2>Student Details</h2>
        <p><strong>ID:</strong> ${student.studentId}</p>
        <p><strong>Name:</strong> ${student.studentName}</p>
        <p><strong>Course:</strong> ${student.course}</p>
        <p><strong>Year Level:</strong> ${student.yearLevel}</p>
        <p><strong>Status:</strong> ${
          student.transferee === "yes" ? "Irregular" : "Regular"
        }</p>
        <p><strong>Gender:</strong> ${student.gender}</p>
        <p><strong>Phone Number:</strong> ${student.phoneNumber}</p>
        <button id="editDetailsBtn">Edit Details</button>
    `;
  document
    .getElementById("editDetailsBtn")
    .addEventListener("click", function () {
      editStudentDetails(student);
    });
}

function displayStudentCourses(student) {
  const container = document.getElementById("courseDetails");
  const coursesHtml = window.courses
    .map((course) => {
      const grade = student.grades && student.grades[course.courseCode];
      return `
            <tr>
                <td>${course.courseCode}</td>
                <td>${course.title}</td>
                <td>${course.units}</td>
                <td class="grade" data-coursecode="${course.courseCode}">${
        grade || ""
      }</td>
            </tr>
        `;
    })
    .join("");

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
        <button id="editGradesBtn">Edit Grades</button>
        <button id="saveGradesBtn" style="display:none;">Save Grades</button>
    `;

  attachGradeEditListeners();
}

function attachGradeEditListeners() {
  document.getElementById("editGradesBtn").addEventListener("click", () => {
    document.querySelectorAll(".grade").forEach((td) => {
      const courseCode = td.getAttribute("data-coursecode");
      const currentValue = td.innerText;
      td.innerHTML = `<input type="text" value="${currentValue}" class="grade-input" data-coursecode="${courseCode}">`;
    });
    document.getElementById("editGradesBtn").style.display = "none";
    document.getElementById("saveGradesBtn").style.display = "inline-block";
  });

  document.getElementById("saveGradesBtn").addEventListener("click", () => {
    const studentId = document.getElementById("studentIdInput").value.trim();
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentIndex = students.findIndex((s) => s.studentId === studentId);

    if (studentIndex !== -1) {
      students[studentIndex].grades = students[studentIndex].grades || {};
      document.querySelectorAll(".grade-input").forEach((input) => {
        const courseCode = input.dataset.coursecode;
        const grade = input.value.trim();
        students[studentIndex].grades[courseCode] = grade;
      });

      localStorage.setItem("students", JSON.stringify(students));
      displayStudentCourses(students[studentIndex]);
      document.getElementById("editGradesBtn").style.display = "inline-block";
      document.getElementById("saveGradesBtn").style.display = "none";
    }
  });
}

function displayStudentCourses(student) {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const container = document.getElementById("courseDetails");

  const coursesHtml = courses
    .map((course) => {
      const grade = student.grades && student.grades[course.courseCode];
      return `
            <tr>
                <td>${course.courseCode}</td>
                <td>${course.title}</td>
                <td>${course.units}</td>
                <td class="grade" data-coursecode="${course.courseCode}">${
        grade || ""
      }</td>
            </tr>
        `;
    })
    .join("");

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
        <button id="editGradesBtn">Edit Grades</button>
        <button id="saveGradesBtn" style="display:none;">Save Grades</button>
    `;

  attachGradeEditListeners();
}

function editStudentDetails(student) {
  const detailsContainer = document.getElementById("studentDetails");
  detailsContainer.innerHTML = `
        <h2>Edit Student Details</h2>
        <div style="display: flex; justify-content: space-between"><label>ID: <input type="text" id="editStudentId" value="${
          student.studentId
        }" disabled></label></div>
        <div<label>Name: <input type="text" id="editStudentName" value="${
          student.studentName
        }"></label></div>
        <div><label>Course: <input type="text" id="editCourse" value="${
          student.course
        }"></label></div>

        <div><label>Year Level: <input type="number" id="editYearLevel" value="${
          student.yearLevel
        }"></label></div>
        
        <div><label>Status: <select id="editStatus"><option value="Regular" ${
          student.transferee === "no" ? "selected" : ""
        }>Regular</option><option value="Irregular" ${
    student.transferee === "yes" ? "selected" : ""
  }>Irregular</option></select></label></div>
        
        <div><label>Gender: <input type="text" id="editGender" value="${
          student.gender
        }"></label></div>
        
        <div><label>Phone Number: <input type="text" id="editPhoneNumber" value="${
          student.phoneNumber
        }"></label></div>
        
        <div><button id="saveDetailsBtn">Save Details</button></div>
        
    `;

  document
    .getElementById("saveDetailsBtn")
    .addEventListener("click", function () {
      saveStudentDetails(student.studentId);
    });
}

function saveStudentDetails(studentId) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  let studentIndex = students.findIndex((s) => s.studentId === studentId);

  if (studentIndex !== -1) {
    students[studentIndex].studentName =
      document.getElementById("editStudentName").value;
    students[studentIndex].course = document.getElementById("editCourse").value;
    students[studentIndex].yearLevel =
      document.getElementById("editYearLevel").value;
    students[studentIndex].transferee =
      document.getElementById("editStatus").value === "Irregular"
        ? "yes"
        : "no";
    students[studentIndex].gender = document.getElementById("editGender").value;
    students[studentIndex].phoneNumber =
      document.getElementById("editPhoneNumber").value;

    localStorage.setItem("students", JSON.stringify(students));
    alert("Student details updated successfully.");
    displayStudentDetails(students[studentIndex]);
  } else {
    alert("An error occurred. Please try again.");
  }
}
