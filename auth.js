// ===== AUTH.JS - Authentication Logic =====

// Toggle Password Visibility
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

// Handle Role Change (Register form)
function handleRoleChange() {
    const role = document.getElementById('regRole').value;
    const yearGroup = document.getElementById('yearGroup');
    const sectionGroup = document.getElementById('sectionGroup');
    const rollGroup = document.getElementById('rollGroup');
    const yearInput = document.getElementById('regYear');
    const sectionInput = document.getElementById('regSection');

    if (role === 'student') {
        yearGroup.style.display = 'block';
        sectionGroup.style.display = 'block';

        yearInput.required = true;
        sectionInput.required = true;

        rollGroup.querySelector('label').innerHTML =
            '<i class="fas fa-id-card"></i> Roll Number';
    } else {
        yearGroup.style.display = 'none';
        sectionGroup.style.display = 'none';

        // Hidden fields must not remain required
        yearInput.required = false;
        sectionInput.required = false;

        yearInput.value = '';
        sectionInput.value = '';

        if (role === 'professor') {
            rollGroup.querySelector('label').innerHTML =
                '<i class="fas fa-id-card"></i> Faculty ID';
        } else if (role === 'office') {
            rollGroup.querySelector('label').innerHTML =
                '<i class="fas fa-id-card"></i> Employee ID';
        }
    }
}

// Handle Registration
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

    // Save to localStorage (in real app, this would be a database)
    let users = JSON.parse(localStorage.getItem('campusUsers') || '[]');
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        alert('⚠️ This email is already registered! Please login.');
        return;
    }

    users.push(userData);
    localStorage.setItem('campusUsers', JSON.stringify(users));

    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(userData));

    alert('✅ Registration Successful! Redirecting to Dashboard...');
    window.location.href = 'dashboard.html';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    let users = JSON.parse(localStorage.getItem('campusUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password && u.role === role);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('✅ Login Successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('❌ Invalid credentials! Please check your email, password, and role.');
    }
}

// Demo Login
function demoLogin(role) {
    const demoUsers = {
        student: {
            name: 'Rahul Sharma',
            email: 'rahul@college.edu',
            role: 'student',
            department: 'CSE',
            year: '3',
            section: 'A',
            rollNumber: 'CSE2021045'
        },
        professor: {
            name: 'Prof. Anil Kumar',
            email: 'anil.kumar@college.edu',
            role: 'professor',
            department: 'CSE',
            year: '',
            section: '',
            rollNumber: 'FAC001'
        },
        office: {
            name: 'Admin Office',
            email: 'admin@college.edu',
            role: 'office',
            department: 'Admin',
            year: '',
            section: '',
            rollNumber: 'ADM001'
        }
    };

    localStorage.setItem('currentUser', JSON.stringify(demoUsers[role]));
    window.location.href = 'dashboard.html';
}
