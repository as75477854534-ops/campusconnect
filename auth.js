// ================= AUTHENTICATION =================

// Show or hide password
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Change registration fields based on role
function handleRoleChange() {
    const roleElement = document.getElementById("regRole");

    if (!roleElement) return;

    const role = roleElement.value;

    const yearGroup = document.getElementById("yearGroup");
    const sectionGroup = document.getElementById("sectionGroup");
    const rollGroup = document.getElementById("rollGroup");

    const yearInput = document.getElementById("regYear");
    const sectionInput = document.getElementById("regSection");

    if (role === "student") {
        if (yearGroup) yearGroup.style.display = "block";
        if (sectionGroup) sectionGroup.style.display = "block";

        if (yearInput) yearInput.required = true;
        if (sectionInput) sectionInput.required = true;

        if (rollGroup) {
            rollGroup.querySelector("label").innerHTML =
                '<i class="fas fa-id-card"></i> Roll Number';
        }
    } else {
        if (yearGroup) yearGroup.style.display = "none";
        if (sectionGroup) sectionGroup.style.display = "none";

        // Important fix for Professor and Office registration
        if (yearInput) {
            yearInput.required = false;
            yearInput.value = "";
        }

        if (sectionInput) {
            sectionInput.required = false;
            sectionInput.value = "";
        }

        if (rollGroup) {
            const label = rollGroup.querySelector("label");

            if (role === "professor") {
                label.innerHTML =
                    '<i class="fas fa-id-card"></i> Faculty ID';
            } else {
                label.innerHTML =
                    '<i class="fas fa-id-card"></i> Employee ID';
            }
        }
    }
}

// Register user
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document
        .getElementById("regEmail")
        .value.trim()
        .toLowerCase();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;
    const department = document.getElementById("regDepartment").value;

    const yearElement = document.getElementById("regYear");
    const sectionElement = document.getElementById("regSection");
    const rollElement = document.getElementById("regRoll");

    const year = yearElement ? yearElement.value : "";
    const section = sectionElement ? sectionElement.value : "";
    const rollNumber = rollElement ? rollElement.value.trim() : "";

    if (!name || !email || !password || !role || !department) {
        alert("Please fill all required fields.");
        return;
    }

    if (password.length < 4) {
        alert("Password must contain at least 4 characters.");
        return;
    }

    if (role === "student" && (!year || !section)) {
        alert("Please select year and section.");
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        role: role,
        department: department,
        year: role === "student" ? year : "",
        section: role === "student" ? section : "",
        rollNumber: rollNumber,
        joinedAt: new Date().toISOString()
    };

    let users = [];

    try {
        users = JSON.parse(localStorage.getItem("campusUsers") || "[]");
    } catch (error) {
        users = [];
    }

    const alreadyRegistered = users.some(function (user) {
        return user.email === email;
    });

    if (alreadyRegistered) {
        alert("This email is already registered. Please login.");
        return;
    }

    users.push(userData);

    localStorage.setItem("campusUsers", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(userData));

    alert("Registration successful!");
    window.location.href = "dashboard.html";
}

// Login user
function handleLogin(event) {
    event.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value.trim()
        .toLowerCase();

    const password = document.getElementById("loginPassword").value;
    const role = document.getElementById("loginRole").value;

    let users = [];

    try {
        users = JSON.parse(localStorage.getItem("campusUsers") || "[]");
    } catch (error) {
        users = [];
    }

    const user = users.find(function (item) {
        return (
            item.email === email &&
            item.password === password &&
            item.role === role
        );
    });

    if (!user) {
        alert("Invalid email, password or role.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login successful!");
    window.location.href = "dashboard.html";
}

// Demo login
function demoLogin(role) {
    const demoUsers = {
        student: {
            name: "Rahul Sharma",
            email: "rahul@college.edu",
            password: "demo",
            role: "student",
            department: "CSE",
            year: "3",
            section: "A",
            rollNumber: "CSE2021045"
        },

        professor: {
            name: "Prof. Anil Kumar",
            email: "anil.kumar@college.edu",
            password: "demo",
            role: "professor",
            department: "CSE",
            year: "",
            section: "",
            rollNumber: "FAC001"
        },

        office: {
            name: "Admin Office",
            email: "admin@college.edu",
            password: "demo",
            role: "office",
            department: "Administration",
            year: "",
            section: "",
            rollNumber: "ADM001"
        }
    };

    localStorage.setItem(
        "currentUser",
        JSON.stringify(demoUsers[role])
    );

    window.location.href = "dashboard.html";
}
