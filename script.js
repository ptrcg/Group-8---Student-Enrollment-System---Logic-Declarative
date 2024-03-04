document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('teacherBtn').addEventListener('click', function() {
        window.location.href = 'teacherPage.html'; 
    });

    document.getElementById('studentBtn').addEventListener('click', function() {
        window.location.href = 'studentPage.html'; 
    });
    document.getElementById('adminBtn').addEventListener('click', function() {
        window.location.href = 'adminPage.html'; 
    });
});
