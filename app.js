// ===== APP.JS - Main Application Logic =====

// ===== DATA STORE =====
let currentUser = null;
let currentServer = 'cse3';
let currentChannel = 'announcements';
let membersVisible = true;

// Sample Messages Data
const channelMessages = {
    announcements: [
        {
            id: 1,
            author: 'Prof. Sharma',
            role: 'professor',
            avatar: 'PS',
            text: '📢 Important: Tomorrow\'s Data Structures class is shifted to Room 302. Please be on time at 10:00 AM.',
            category: 'academic',
            time: 'Today at 9:30 AM',
            pinned: true,
            urgent: false
        },
        {
            id: 2,
            author: 'Admin Office',
            role: 'office',
            avatar: 'AO',
            text: '⚠️ Last date for fee submission is 30th December 2024. Late fee of ₹500 will be charged after that. Visit Account Section, Ground Floor.',
            category: 'academic',
            time: 'Today at 8:15 AM',
            pinned: true,
            urgent: true
        },
        {
            id: 3,
            author: 'Prof. Gupta',
            role: 'professor',
            avatar: 'PG',
            text: 'Assignment 5 on DBMS (Normalization) is uploaded on the portal. Submission deadline: 28th December. No late submissions accepted.',
            category: 'academic',
            time: 'Yesterday at 4:30 PM',
            pinned: false,
            urgent: false
        },
        {
            id: 4,
            author: 'Event Committee',
            role: 'office',
            avatar: 'EC',
            text: '🎉 Annual Technical Fest "TechNova 2025" registrations are now OPEN! Events: Hackathon, Coding Contest, Robotics, Paper Presentation. Register at: technova.college.edu',
            category: 'non-academic',
            time: 'Yesterday at 2:00 PM',
            pinned: true,
            urgent: false
        },
        {
            id: 5,
            author: 'Rahul Sharma',
            role: 'student',
            avatar: 'RS',
            text: 'Has anyone received the mid-sem marks for Operating Systems? The portal is showing error for me.',
            category: 'academic',
            time: 'Yesterday at 11:20 AM',
            pinned: false,
            urgent: false
        }
    ],
    important: [
        {
            id: 6,
            author: 'Admin Office',
            role: 'office',
            avatar: 'AO',
            text: '🚨 URGENT: College will remain closed on 26th December (Thursday) due to maintenance work. All labs and library will be inaccessible.',
            category: 'general',
            time: 'Today at 7:00 AM',
            pinned: true,
            urgent: true
        },
        {
            id: 7,
            author: 'Exam Cell',
            role: 'office',
            avatar: 'EX',
            text: '📋 End Semester Exam Schedule Released!\n\n📌 25 Jan - Data Structures\n📌 28 Jan - DBMS\n📌 30 Jan - Operating Systems\n📌 2 Feb - Computer Networks\n📌 5 Feb - Discrete Maths\n\nTime: 10:00 AM - 1:00 PM | Venue: Exam Hall Block A & B',
            category: 'academic',
            time: 'Yesterday at 3:00 PM',
            pinned: true,
            urgent: true
        }
    ],
    syllabus: [
        {
            id: 8,
            author: 'Prof. Sharma',
            role: 'professor',
            avatar: 'PS',
            text: '📚 Updated Syllabus for Data Structures (CSE301):\n\nUnit 1: Arrays, Linked Lists\nUnit 2: Stacks, Queues\nUnit 3: Trees, BST, AVL\nUnit 4: Graphs, BFS, DFS\nUnit 5: Sorting, Hashing\n\nReference Books: Cormen (CLRS), Sahni',
            category: 'academic',
            time: '3 days ago',
            pinned: true,
            urgent: false
        }
    ],
    exams: [
        {
            id: 9,
            author: 'Exam Cell',
            role: 'office',
            avatar: 'EX',
            text: '📝 Mid Semester Exam Results declared for CSE 3rd Year.\n\nCheck results on the student portal. For any discrepancy, contact Exam Cell within 3 days.',
            category: 'academic',
            time: '2 days ago',
            pinned: false,
            urgent: false
        },
        {
            id: 10,
            author: 'Prof. Verma',
            role: 'professor',
            avatar: 'PV',
            text: 'DBMS Lab Viva will be held on 2nd January 2025. Come prepared with all experiments. Viva will cover ER Diagrams, SQL Queries, Normalization, and Transactions.',
            category: 'academic',
            time: '2 days ago',
            pinned: true,
            urgent: false
        }
    ],
    assignments: [
        {
            id: 11,
            author: 'Prof. Gupta',
            role: 'professor',
            avatar: 'PG',
            text: '📝 Assignment 5 - DBMS Normalization\n\nTopics: 1NF, 2NF, 3NF, BCNF\nQuestions: 10 (attached PDF)\nDeadline: 28th December 2024\nSubmission: Online Portal\n\n⚠️ Plagiarism will result in ZERO marks.',
            category: 'academic',
            time: '3 days ago',
            pinned: false,
            urgent: false,
            attachment: { name: 'DBMS_Assignment5.pdf', size: '245 KB' }
        },
        {
            id: 12,
            author: 'Prof. Sharma',
            role: 'professor',
            avatar: 'PS',
            text: '📝 DS Assignment - Implement Binary Search Tree with Insert, Delete, Search, Inorder, Preorder, Postorder operations in C/C++.\n\nDeadline: 30th December\nSubmission: GitHub Link on Portal',
            category: 'academic',
            time: '5 days ago',
            pinned: false,
            urgent: false
        }
    ],
    materials: [
        {
            id: 13,
            author: 'Prof. Sharma',
            role: 'professor',
            avatar: 'PS',
            text: '📖 Study Material uploaded for Unit 4 - Graphs\n\nTopics covered:\n- Graph Representation\n- BFS & DFS\n- Shortest Path (Dijkstra)\n- Minimum Spanning Tree\n\nDownload from portal or check attached.',
            category: 'academic',
            time: '4 days ago',
            pinned: false,
            urgent: false,
            attachment: { name: 'DS_Unit4_Graphs.pdf', size: '1.2 MB' }
        }
    ],
    events: [
        {
            id: 14,
            author: 'Event Committee',
            role: 'office',
            avatar: 'EC',
            text: '🎉 TechNova 2025 - Annual Technical Fest!\n\n📅 Date: 15-17 January 2025\n📍 Venue: Main Campus\n\n🏆 Events:\n• 24hr Hackathon (Prize: ₹50,000)\n• Competitive Coding\n• Robotics War\n• Paper Presentation\n• Tech Quiz\n• UI/UX Design Challenge\n\n🔗 Register: technova.college.edu\n⏰ Last Date: 10th January',
            category: 'non-academic',
            time: '2 days ago',
            pinned: true,
            urgent: false
        },
        {
            id: 15,
            author: 'Cultural Committee',
            role: 'office',
            avatar: 'CC',
            text: '🎭 Cultural Night Auditions!\n\nDance, Singing, Drama, Stand-up Comedy\n📅 Date: 5th January\n📍 Venue: Auditorium\n⏰ Time: 4:00 PM onwards\n\nAll students are welcome! Show your talent! 🌟',
            category: 'non-academic',
            time: '3 days ago',
            pinned: false,
            urgent: false
        }
    ],
    sports: [
        {
            id: 16,
            author: 'Sports Committee',
            role: 'office',
            avatar: 'SC',
            text: '⚽ Inter-Department Cricket Tournament 2025\n\n📅 Starts: 8th January\n📍 College Ground\n\nTeam Registration: Max 15 players per department\nRegistration Fee: ₹200/team\n\nContact: Sports Secretary - Vikash (9876543210)\n\n🏆 Winner Prize: ₹10,000 + Trophy',
            category: 'non-academic',
            time: '4 days ago',
            pinned: false,
            urgent: false
        }
    ],
    clubs: [
        {
            id: 17,
            author: 'Coding Club',
            role: 'student',
            avatar: 'CC',
            text: '💻 Weekly Coding Contest #15\n\nPlatform: Codeforces\n📅 Saturday 8 PM\nDuration: 2 hours\nDifficulty: Div 2\n\nJoin our Discord for discussion. Link in bio!\n\nPractice problems uploaded on our GitHub repo.',
            category: 'non-academic',
            time: '5 days ago',
            pinned: false,
            urgent: false
        }
    ],
    placements: [
        {
            id: 18,
            author: 'Placement Cell',
            role: 'office',
            avatar: 'PC',
            text: '💼 TCS - Campus Placement Drive\n\n📅 Date: 20th January 2025\n📍 Venue: Seminar Hall\n\n✅ Eligibility:\n• B.Tech CSE/IT/ECE\n• 60% throughout (No backlogs)\n• 2025 Batch\n\n💰 Package: 3.36 - 7 LPA\n\n📋 Rounds:\n1. Online Test (Aptitude + Coding)\n2. Technical Interview\n3. HR Interview\n\n🔗 Register on placement portal by 15th January\n\n⚠️ Carry: Resume (3 copies), College ID, Passport Photos',
            category: 'non-academic',
            time: '1 day ago',
            pinned: true,
            urgent: true
        },
        {
            id: 19,
            author: 'Placement Cell',
            role: 'office',
            avatar: 'PC',
            text: '🎯 Infosys InfyTQ Certification Results are out!\n\n15 students from CSE qualified. Congratulations! 🎉\n\nQualified students will be eligible for Infosys SP role (5 LPA).\n\nList is posted on Placement Notice Board.',
            category: 'non-academic',
            time: '3 days ago',
            pinned: false,
            urgent: false
        }
    ],
    general: [
        {
            id: 20,
            author: 'Priya Kumar',
            role: 'student',
            avatar: 'PK',
            text: 'Hey everyone! Does anyone have notes for Computer Networks Unit 3 (Transport Layer)? I missed the last two classes.',
            category: 'general',
            time: 'Today at 10:45 AM',
            pinned: false,
            urgent: false
        },
        {
            id: 21,
            author: 'Amit Joshi',
            role: 'student',
            avatar: 'AJ',
            text: 'The library has extended its timing during exams! Now open till 10 PM. Great for group study. 📚',
            category: 'general',
            time: 'Today at 9:00 AM',
            pinned: false,
            urgent: false
        },
        {
            id: 22,
            author: 'Neha Singh',
            role: 'student',
            avatar: 'NS',
            text: 'The new canteen menu is 🔥! They added South Indian options. Dosa and Idli are amazing!',
            category: 'general',
            time: 'Yesterday at 1:30 PM',
            pinned: false,
            urgent: false
        }
    ]
};

// Channel descriptions
const channelDescriptions = {
    announcements: 'All general announcements for the class',
    important: 'Critical notices - fees, exams, closures',
    syllabus: 'Syllabus updates and curriculum changes',
    exams: 'Exam schedules, results, and viva dates',
    assignments: 'Assignment postings and deadlines',
    materials: 'Study materials, notes, and resources',
    events: 'College events, fests, and workshops',
    sports: 'Sports events and tournaments',
    clubs: 'Club activities and meetups',
    placements: 'Placement drives and opportunities',
    general: 'General discussion - anything goes!'
};

// Channel icons
const channelIcons = {
    announcements: 'fa-bullhorn',
    important: 'fa-exclamation-triangle',
    syllabus: 'fa-book',
    exams: 'fa-file-alt',
    assignments: 'fa-tasks',
    materials: 'fa-download',
    events: 'fa-calendar-alt',
    sports: 'fa-trophy',
    clubs: 'fa-users',
    placements: 'fa-briefcase',
    general: 'fa-comments'
};

// Server names
const serverNames = {
    home: '🎓 CampusConnect',
    cse3: '💻 CSE 3rd Year',
    'cse-dept': '🏛️ CSE Department',
    college: '🏫 College Main',
    events: '🎉 Events & Fests'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Set user info
    updateUserPanel();
    
    // Load default channel
    loadChannel('announcements');
    
    // Show welcome toast
    setTimeout(() => {
        showToast(`Welcome back, ${currentUser.name}! 👋`);
    }, 1000);

    // Simulate new notifications
    setTimeout(() => {
        showToast('📢 New announcement from Prof. Sharma!');
    }, 5000);
});

// ===== USER PANEL =====
function updateUserPanel() {
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');

    if (currentUser) {
        const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        userAvatar.textContent = initials;
        userName.textContent = currentUser.name;
        
        const roleEmojis = { student: '🎓 Student', professor: '👨‍🏫 Professor', office: '🏢 Office Staff' };
        userRole.textContent = roleEmojis[currentUser.role] || currentUser.role;

        // Set avatar color based on role
        const roleColors = {
            student: 'linear-gradient(135deg, #6c5ce7, #a855f7)',
            professor: 'linear-gradient(135deg, #00b894, #00cec9)',
            office: 'linear-gradient(135deg, #fdcb6e, #f39c12)'
        };
        userAvatar.style.background = roleColors[currentUser.role];

        // Hide message category selector for students
        const categorySelect = document.getElementById('msgCategory');
        if (currentUser.role === 'student') {
            categorySelect.style.display = 'none';
        }
    }
}

// ===== SERVER SWITCHING =====
function switchServer(serverId) {
    currentServer = serverId;
    
    // Update active server icon
    document.querySelectorAll('.server-icon').forEach(icon => icon.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Update server name
    document.getElementById('serverName').textContent = serverNames[serverId] || serverId;
    
    // Load first channel
    loadChannel('announcements');
    
    showToast(`Switched to ${serverNames[serverId]}`);
}

// ===== CHANNEL SWITCHING =====
function switchChannel(channelId, element) {
    currentChannel = channelId;
    
    // Update active channel
    document.querySelectorAll('.channel').forEach(ch => ch.classList.remove('active'));
    if (element) element.classList.add('active');
    
    // Remove unread badge
    if (element) {
        const badge = element.querySelector('.unread-badge');
        if (badge) badge.remove();
    }
    
    // Load channel
    loadChannel(channelId);
}

function loadChannel(channelId) {
    const channelName = document.getElementById('channelName');
    const channelDesc = document.getElementById('channelDesc');
    const messageInput = document.getElementById('messageInput');
    const messagesList = document.getElementById('messagesList');
    const welcomeIcon = document.querySelector('.welcome-icon i');
    const welcomeTitle = document.querySelector('.channel-welcome h2');
    const welcomeDesc = document.querySelector('.channel-welcome p');

    // Update header
    channelName.textContent = channelId.replace(/-/g, '-');
    channelDesc.textContent = channelDescriptions[channelId] || '';
    messageInput.placeholder = `Message #${channelId}`;

    // Update welcome section
    const iconClass = channelIcons[channelId] || 'fa-hashtag';
    welcomeIcon.className = `fas ${iconClass}`;
    welcomeTitle.textContent = `Welcome to #${channelId}`;
    welcomeDesc.textContent = channelDescriptions[channelId] || 'Start of the channel';

    // Update header icon
    document.querySelector('.channel-icon').className = `fas ${iconClass} channel-icon`;

    // Load messages
    const messages = channelMessages[channelId] || [];
    renderMessages(messages);
}

// ===== RENDER MESSAGES =====
function renderMessages(messages) {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    if (messages.length === 0) {
        messagesList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #555;">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                <p>No messages yet. Be the first to post!</p>
            </div>
        `;
        return;
    }

    // Add date divider
    messagesList.innerHTML += `
        <div class="date-divider">
            <span>📅 Recent Messages</span>
        </div>
    `;

    messages.forEach(msg => {
        const messageHTML = createMessageHTML(msg);
        messagesList.innerHTML += messageHTML;
    });

    // Scroll to bottom
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function createMessageHTML(msg) {
    const avatarClass = `avatar-${msg.role}`;
    const authorClass = `author-${msg.role}`;
    const roleClass = `role-${msg.role}`;
    const roleLabels = { student: 'Student', professor: 'Professor', office: 'Office Staff' };
    
    let urgentClass = msg.urgent ? 'urgent' : '';
    let pinnedClass = msg.pinned ? 'pinned' : '';
    
    let tagHTML = '';
    if (msg.category) {
        const tagLabels = {
            academic: '📚 Academic',
            'non-academic': '🎯 Non-Academic',
            urgent: '🚨 Urgent',
            general: '💬 General',
            event: '🎉 Event'
        };
        tagHTML = `<span class="message-tag tag-${msg.category}">${tagLabels[msg.category] || msg.category}</span>`;
    }

    let pinnedHTML = '';
    if (msg.pinned) {
        pinnedHTML = `<div class="message-pinned"><i class="fas fa-thumbtack"></i> Pinned Message</div>`;
    }

    let attachmentHTML = '';
    if (msg.attachment) {
        attachmentHTML = `
            <div class="message-attachment">
                <i class="fas fa-file-pdf attachment-icon"></i>
                <div class="attachment-info">
                    <span class="attachment-name">${msg.attachment.name}</span>
                    <span class="attachment-size">${msg.attachment.size}</span>
                </div>
                <i class="fas fa-download" style="color: #6c5ce7; cursor: pointer; margin-left: 15px;"></i>
            </div>
        `;
    }

    // Format text with line breaks
    const formattedText = msg.text.replace(/\n/g, '<br>');

    return `
        <div class="message ${urgentClass} ${pinnedClass}" data-id="${msg.id}" data-category="${msg.category}">
            <div class="message-avatar ${avatarClass}">${msg.avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author ${authorClass}">${msg.author}</span>
                    <span class="message-role ${roleClass}">${roleLabels[msg.role]}</span>
                    <span class="message-time">${msg.time}</span>
                </div>
                <div class="message-text">${formattedText}</div>
                ${tagHTML}
                ${pinnedHTML}
                ${attachmentHTML}
            </div>
        </div>
    `;
}

// ===== SEND MESSAGE =====
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (!text) return;

    const categorySelect = document.getElementById('msgCategory');
    const category = categorySelect ? categorySelect.value : 'general';

    const newMsg = {
        id: Date.now(),
        author: currentUser.name,
        role: currentUser.role,
        avatar: currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        text: text,
        category: category,
        time: 'Just now',
        pinned: false,
        urgent: category === 'urgent'
    };

    // Add to data
    if (!channelMessages[currentChannel]) {
        channelMessages[currentChannel] = [];
    }
    channelMessages[currentChannel].push(newMsg);

    // Add to DOM
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML += createMessageHTML(newMsg);

    // Clear input
    input.value = '';

    // Scroll to bottom
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.scrollTop = messagesArea.scrollHeight;

    // Show toast
    showToast('Message sent! ✉️');
}

function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// ===== SEARCH =====
function searchMessages() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (query.length < 2) {
        loadChannel(currentChannel);
        return;
    }

    const messages = channelMessages[currentChannel] || [];
    const filtered = messages.filter(msg => 
        msg.text.toLowerCase().includes(query) || 
        msg.author.toLowerCase().includes(query)
    );

    renderMessages(filtered);
}

function searchInChannel(query) {
    if (query.length < 2) {
        loadChannel(currentChannel);
        return;
    }

    const messages = channelMessages[currentChannel] || [];
    const filtered = messages.filter(msg => 
        msg.text.toLowerCase().includes(query.toLowerCase()) || 
        msg.author.toLowerCase().includes(query.toLowerCase())
    );

    renderMessages(filtered);
}

// ===== FILTER BY CATEGORY =====
function filterCategory(category, element) {
    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    if (category === 'all') {
        loadChannel(currentChannel);
        return;
    }

    const messages = channelMessages[currentChannel] || [];
    const filtered = messages.filter(msg => msg.category === category);
    renderMessages(filtered);
}

// ===== TOGGLE PANELS =====
function togglePinned() {
    const panel = document.getElementById('pinnedPanel');
    const isVisible = panel.style.display !== 'none';
    
    if (isVisible) {
        panel.style.display = 'none';
    } else {
        // Load pinned messages
        const messages = channelMessages[currentChannel] || [];
        const pinned = messages.filter(m => m.pinned);
        const pinnedContainer = document.getElementById('pinnedMessages');
        pinnedContainer.innerHTML = '';
        
        if (pinned.length === 0) {
            pinnedContainer.innerHTML = '<p style="padding: 20px; color: #555; text-align: center;">No pinned messages</p>';
        } else {
            pinned.forEach(msg => {
                pinnedContainer.innerHTML += createMessageHTML(msg);
            });
        }
        
        panel.style.display = 'block';
    }
}

function toggleMembers() {
    const panel = document.getElementById('membersPanel');
    membersVisible = !membersVisible;
    panel.style.display = membersVisible ? 'block' : 'none';
}

// ===== FILE UPLOAD =====
function handleFileUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(1) + ' KB';

        const newMsg = {
            id: Date.now(),
            author: currentUser.name,
            role: currentUser.role,
            avatar: currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            text: `📎 Shared a file: ${fileName}`,
            category: 'academic',
            time: 'Just now',
            pinned: false,
            urgent: false,
            attachment: { name: fileName, size: fileSize }
        };

        if (!channelMessages[currentChannel]) {
            channelMessages[currentChannel] = [];
        }
        channelMessages[currentChannel].push(newMsg);

        const messagesList = document.getElementById('messagesList');
        messagesList.innerHTML += createMessageHTML(newMsg);

        const messagesArea = document.getElementById('messagesArea');
        messagesArea.scrollTop = messagesArea.scrollHeight;

        showToast(`File "${fileName}" uploaded! 📁`);
    }
}

// ===== MODALS =====
function showCreateServer() {
    document.getElementById('createServerModal').style.display = 'flex';
}

function showSettings() {
    document.getElementById('settingsModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function createServer() {
    const name = document.getElementById('newServerName').value;
    if (!name) {
        alert('Please enter a server name!');
        return;
    }

    const serverId = name.toLowerCase().replace(/\s+/g, '-');
    serverNames[serverId] = name;

    // Add server icon to sidebar
    const sidebar = document.querySelector('.server-sidebar');
    const addBtn = sidebar.querySelector('.add-server');
    
    const newIcon = document.createElement('div');
    newIcon.className = 'server-icon';
    newIcon.onclick = function() { switchServer(serverId); };
    newIcon.title = name;
    newIcon.innerHTML = `<span>${name.slice(0, 3).toUpperCase()}</span>`;
    
    sidebar.insertBefore(newIcon, addBtn.previousElementSibling);

    closeModal('createServerModal');
    showToast(`Server "${name}" created! 🎉`);
}

// ===== DARK MODE =====
function toggleDarkMode() {
    // Already in dark mode, this is a placeholder for light mode toggle
    showToast('Theme settings updated! 🎨');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== LOGOUT =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// ===== CLICK OUTSIDE MODAL TO CLOSE =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    // Ctrl+K for search
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
});
