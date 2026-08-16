const API_URL = "/students";

async function loadStudents() {

    try {

        const response = await fetch(API_URL);

        const students = await response.json();

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        if (students.length === 0) {
            studentList.innerHTML =
                "<p>No students found. Add your first student.</p>";
            return;
        }

        students.forEach(student => {

            const div = document.createElement("div");

            div.className = "student";

            div.innerHTML = `
                <h3>${student.name}</h3>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Course:</strong> ${student.course}</p>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            `;

            studentList.appendChild(div);
        });

    } catch (error) {

        document.getElementById("studentList").innerHTML =
            "<p>Unable to load students.</p>";

        console.error(error);
    }
}


document
    .getElementById("studentForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const student = {

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            course: document.getElementById("course").value
        };

        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            });

            if (!response.ok) {
                throw new Error("Failed to add student");
            }

            document.getElementById("studentForm").reset();

            loadStudents();

        } catch (error) {

            alert("Failed to add student");

            console.error(error);
        }
    });


async function deleteStudent(id) {

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadStudents();

    } catch (error) {

        console.error(error);
    }
}


loadStudents();