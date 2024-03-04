document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("courses")) {
    const initialCourses = [
      {
        courseCode: "CS101",
        title: "Introduction to Computer Science",
        units: 3,
      },
      { courseCode: "CS102", title: "Algorithms", units: 4 },
    ];
    localStorage.setItem("courses", JSON.stringify(initialCourses));
  }

  displayCourses();

  document.getElementById("saveCourseBtn").addEventListener("click", () => {
    const courseCode = document.getElementById("newCourseCode").value;
    const title = document.getElementById("newTitle").value;
    const units = parseInt(document.getElementById("newUnits").value, 10);

    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const existingCourseIndex = courses.findIndex(
      (course) => course.courseCode === courseCode
    );

    if (existingCourseIndex > -1) {
      courses[existingCourseIndex] = { courseCode, title, units };
    } else {
      courses.push({ courseCode, title, units });
    }

    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses();

    document.getElementById("newCourseCode").value = "";
    document.getElementById("newTitle").value = "";
    document.getElementById("newUnits").value = "";
  });
});

function displayCourses() {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const container = document.getElementById("courseDetails");
  let coursesHtml = courses
    .map(
      (course) => `
        <tr>
            <td>${course.courseCode}</td>
            <td>${course.title}</td>
            <td>${course.units}</td>
            <td class="table-btn-wrapper">
                <button onclick="editCourse('${course.courseCode}')">Edit</button>
                <button onclick="deleteCourse('${course.courseCode}')">Delete</button>
            </td>
        </tr>
    `
    )
    .join("");

  container.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Course Code</th>
                <th>Title</th>
                <th>Units</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${coursesHtml}
        </tbody>
    </table>
`;
}

function editCourse(courseCode) {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const courseIndex = courses.findIndex(
    (course) => course.courseCode === courseCode
  );
  if (courseIndex === -1) return;

  const courseToEdit = courses[courseIndex];
  const container = document
    .getElementById("courseDetails")
    .querySelector("tbody");
  const rows = container.querySelectorAll("tr");
  console.log(rows);
  const editingRow = Array.from(rows).find(
    (row) => row.querySelector("td").textContent.trim() === courseCode
  );
  console.log(editingRow);

  if (!editingRow) return;

  editingRow.innerHTML = `
        <td><input type="text" id="editCourseCode" value="${courseToEdit.courseCode}" disabled></td>
        <td><input type="text" id="editTitle" value="${courseToEdit.title}"></td>
        <td><input type="number" id="editUnits" value="${courseToEdit.units}"></td>
        <td class="table-btn-wrapper">
            <button onclick="saveEdit('${courseCode}')">Save</button>
            <button onclick="displayCourses()">Cancel</button>
        </td>
    `;
}

function saveEdit(courseCode) {
  const title = document.getElementById("editTitle").value;
  const units = parseInt(document.getElementById("editUnits").value, 10);
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  const courseIndex = courses.findIndex(
    (course) => course.courseCode === courseCode
  );

  if (courseIndex !== -1) {
    courses[courseIndex] = { ...courses[courseIndex], title, units };
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses();
  } else {
    alert("An error occurred. Please try again.");
  }
}

function deleteCourse(courseCode) {
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  courses = courses.filter((course) => course.courseCode !== courseCode);
  localStorage.setItem("courses", JSON.stringify(courses));
  displayCourses();
}
