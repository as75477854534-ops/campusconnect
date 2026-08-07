function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function handleRoleChange() {
    const role = document.getElementById('regRole').value;
    const yearGroup = document.getElementById('yearGroup');
    const sectionGroup = document.getElementById('sectionGroup');
    const yearInput = document.getElementById('regYear');
    const sectionInput = document.getElementById('regSection');

    if (role === 'student') {
        if (yearGroup) yearGroup.style.display = 'block';
        if (sectionGroup) sectionGroup.style.display = 'block';
        if (yearInput) yearInput.required = true;
        if (sectionInput) sectionInput.required = true;
    } else {
        if (yearGroup) yearGroup.style.display = 'none';
        if (sectionGroup) sectionGroup.style.display = 'none';
        if (yearInput) { yearInput.required = false; yearInput.value = ''; }
        if (sectionInput) { sectionInput.required = false; sectionInput.value = ''; }
    }
}

// Firebase Registration
function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        role: document.getElementById('regRole').value,
        department: document.getElementById('regDepartment').value,
        year: document.getElementById('regYear') ? document.getElementById('regYear').value : '',
        section: document.getElementById('regSection') ? document.getElementById('regSection').value : '',
        rollNumber: document.getElementById('regRoll') ? document.getElementById('regRoll').value : ''
    };

    if (!window.db) {
        alert('Firebase not loaded!');
        return;
    }

    // Check if email exists
    window.db.ref('users').orderByChild('email').equalTo(userData.email).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert('Email already registered!');
            } else {
                // Save to Firebase
                window.db.ref('users').push(userData)
                    .then(() => {
                        alert('Registration Successful!');
                        window.location.href = 'login.html';
                    });
            }
        });
}

// Firebase Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    if (!window.db) {
        alert('Firebase not loaded!');
        return;
    }

    window.db.ref('users').orderByChild('email').equalTo(email).once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                alert('User not found!');
                return;
            }

            let userFound = null;
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.password === password && userData.role === role) {
                    userFound = userData;
                }
            });

            if (userFound) {
                localStorage.setItem('currentUser', JSON.stringify(userFound));
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid password or role!');
            }
        });
}

// Demo Login
function demoLogin(role) {
    const demoUsers = {
        student: {
            name: 'Rahul Sharma',
            email: 'rahul@college.edu',
            password: 'demo123',
            role: 'student',
            department: 'CSE'
        },
        professor: {
            name: 'Prof. Anil Kumar',
            email: 'anil@college.edu',
            password: 'demo123',
            role: 'professor',
            department: 'CSE'
        },
        office: {
            name: 'Admin Office',
            email: 'admin@college.edu',
            password: 'demo123',
            role: 'office',
            department: 'Admin'
        }
    };

    const demoUser = demoUsers[role];
    
    // Save demo user to Firebase if not exists
    window.db.ref('users').orderByChild('email').equalTo(demoUser.email).once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                window.db.ref('users').push(demoUser);
            }
            localStorage.setItem('currentUser', JSON.stringify(demoUser));
            window.location.href = 'dashboard.html';
        });
}
