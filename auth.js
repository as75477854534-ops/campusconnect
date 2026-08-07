// ===== AUTH.JS - Firebase Authentication =====

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
    const rollGroup = document.getElementById('rollGroup');
    const yearInput = document.getElementById('regYear');
    const sectionInput = document.getElementById('regSection');

    if (role === 'student') {
        if (yearGroup) yearGroup.style.display = 'block';
        if (sectionGroup) sectionGroup.style.display = 'block';
        if (yearInput) yearInput.required = true;
        if (sectionInput) sectionInput.required = true;
        if (rollGroup) rollGroup.querySelector('label').innerHTML = '<i class="fas fa-id-card"></i> Roll Number';
    } else {
        if (yearGroup) yearGroup.style.display = 'none';
        if (sectionGroup) sectionGroup.style.display = 'none';
        if (yearInput) { yearInput.required = false; yearInput.value = ''; }
        if (sectionInput) { sectionInput.required = false; sectionInput.value = ''; }

        if (role === 'professor') {
            if (rollGroup) rollGroup.querySelector('label').innerHTML = '<i class="fas fa-id-card"></i> Faculty ID';
        } else if (role === 'office') {
            if (rollGroup) rollGroup.querySelector('label').innerHTML = '<i class="fas fa-id-card"></i> Employee ID';
        }
    }
}

// ===== FIREBASE REGISTRATION =====
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
        rollNumber: document.getElementById('regRoll') ? document.getElementById('regRoll').value : '',
        joinedAt: new Date().toISOString()
    };

    // Check if Firebase is ready
    if (!window.db) {
        alert('Firebase not loaded! Please refresh.');
        return;
    }

    // Check if email already exists in Firebase
    window.db.ref('users').orderByChild('email').equalTo(userData.email).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert('⚠️ This email is already registered! Please login.');
            } else {
                // Save to Firebase
                const newUserRef = window.db.ref('users').push();
                newUserRef.set(userData)
                    .then(() => {
                        alert('✅ Registration Successful! Redirecting to Login...');
                        window.location.href = 'login.html';
                    })
                    .catch((error) => {
                        console.error('Registration error:', error);
                        alert('❌ Registration failed. Please try again.');
                    });
            }
        });
}

// ===== FIREBASE LOGIN =====
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    if (!window.db) {
        alert('Firebase not loaded! Please refresh.');
        return;
    }

    // Search user in Firebase by email
    window.db.ref('users').orderByChild('email').equalTo(email).once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                alert('❌ User not found! Please register first.');
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
                // Save current session to localStorage (for this device only)
                localStorage.setItem('currentUser', JSON.stringify(userFound));
                alert('✅ Login Successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert('❌ Invalid password or role!');
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('❌ Login failed. Please try again.');
        });
}

// ===== DEMO LOGIN (For Quick Testing) =====
function demoLogin(role) {
    const demoUsers = {
        student: {
            name: 'Rahul Sharma',
            email: 'rahul@college.edu',
            password: 'demo123',
            role: 'student',
            department: 'CSE',
            year: '3',
            section: 'A',
            rollNumber: 'CSE2021045'
        },
        professor: {
            name: 'Prof. Anil Kumar',
            email: 'anil.kumar@college.edu',
            password: 'demo123',
            role: 'professor',
            department: 'CSE',
            year: '',
            section: '',
            rollNumber: 'FAC001'
        },
        office: {
            name: 'Admin Office',
            email: 'admin@college.edu',
            password: 'demo123',
            role: 'office',
            department: 'Admin',
            year: '',
            section: '',
            rollNumber: 'ADM001'
        }
    };

    const demoUser = demoUsers[role];

    // First, save demo user to Firebase (if not exists)
    window.db.ref('users').orderByChild('email').equalTo(demoUser.email).once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                // Create demo user in Firebase
                const newUserRef = window.db.ref('users').push();
                return newUserRef.set(demoUser);
            }
        })
        .then(() => {
            // Login with demo user
            localStorage.setItem('currentUser', JSON.stringify(demoUser));
            window.location.href = 'dashboard.html';
        });
}
