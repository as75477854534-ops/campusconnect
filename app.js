// ================= CAMPUSCONNECT APP =================

let currentUser = null;
let currentServer = "cse3";
let currentChannel = "announcements";
let membersVisible = true;

// ================= SAMPLE MESSAGES =================

const channelMessages = {
    announcements: [
        {
            id: 1,
            author: "Prof. Sharma",
            role: "professor",
            avatar: "PS",
            text: "📢 Important: Tomorrow's Data Structures class is shifted to Room 302. Please be on time at 10:00 AM.",
            category: "academic",
            time: "Today at 9:30 AM",
            pinned: true,
            urgent: false
        },
        {
            id: 2,
            author: "Admin Office",
            role: "office",
            avatar: "AO",
            text: "⚠️ Last date for fee submission is 30th December 2024. Late fee of ₹500 will be charged after that. Visit Account Section, Ground Floor.",
            category: "academic",
            time: "Today at 8:15 AM",
            pinned: true,
            urgent: true
        },
        {
            id: 3,
            author: "Prof. Gupta",
            role: "professor",
            avatar: "PG",
            text: "Assignment 5 on DBMS Normalization is uploaded on the portal. Submission deadline: 28th December.",
            category: "academic",
            time: "Yesterday at 4:30 PM",
            pinned: false,
            urgent: false
        },
        {
            id: 4,
            author: "Event Committee",
            role: "office",
            avatar: "EC",
            text: "🎉 Annual Technical Fest TechNova 2025 registrations are now open. Register at technova.college.edu",
            category: "non-academic",
            time: "Yesterday at 2:00 PM",
            pinned: true,
            urgent: false
        }
    ],

    important: [
        {
            id: 5,
            author: "Admin Office",
            role: "office",
            avatar: "AO",
            text: "🚨 URGENT: College will remain closed on 26th December due to maintenance work.",
            category: "general",
            time: "Today at 7:00 AM",
            pinned: true,
            urgent: true
        },
        {
            id: 6,
            author: "Exam Cell",
            role: "office",
            avatar: "EX",
            text: "📋 End Semester Exam Schedule: Data Structures - 25 January, DBMS - 28 January, Operating Systems - 30 January.",
            category: "academic",
            time: "Yesterday at 3:00 PM",
            pinned: true,
            urgent: true
        }
    ],

    syllabus: [
        {
            id: 7,
            author: "Prof. Sharma",
            role: "professor",
            avatar: "PS",
            text: "📚 Updated syllabus for Data Structures: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs and Sorting.",
            category: "academic",
            time: "3 days ago",
            pinned: true,
            urgent: false
        }
    ],

    exams: [
        {
            id: 8,
            author: "Exam Cell",
            role: "office",
            avatar: "EX",
            text: "📝 Mid Semester Exam Results have been declared. Check the student portal.",
            category: "academic",
            time: "2 days ago",
            pinned: false,
            urgent: false
        }
    ],

    assignments: [
        {
            id: 9,
            author: "Prof. Gupta",
            role: "professor",
            avatar: "PG",
            text: "📝 DBMS Assignment: 1NF, 2NF, 3NF and BCNF. Deadline: 28th December 2024.",
            category: "academic",
            time: "3 days ago",
            pinned: false,
            urgent: false,
            attachment: {
                name: "DBMS_Assignment.pdf",
                size: "245 KB"
            }
        }
    ],

    materials: [
        {
            id: 10,
            author: "Prof. Sharma",
            role: "professor",
            avatar: "PS",
            text: "📖 Study material uploaded for Unit 4 - Graphs, BFS, DFS and Dijkstra Algorithm.",
            category: "academic",
            time: "4 days ago",
            pinned: false,
            urgent: false
        }
    ],

    events: [
        {
            id: 11,
            author: "Event Committee",
            role: "office",
            avatar: "EC",
            text: "🎉 TechNova 2025: 24-hour Hackathon, Coding Contest, Robotics War and UI/UX Challenge. Last date to register: 10th January.",
            category: "non-academic",
            time: "2 days ago",
            pinned: true,
            urgent: false
        }
    ],

    sports: [
        {
            id: 12,
            author: "Sports Committee",
            role: "office",
            avatar: "SC",
            text: "⚽ Inter-Department Cricket Tournament starts from 8th January. Team registration is open.",
            category: "non-academic",
            time: "4 days ago",
            pinned: false,
            urgent: false
        }
    ],

    clubs: [
        {
            id: 13,
            author: "Coding Club",
            role: "student",
            avatar: "CC",
            text: "💻 Weekly Coding Contest will be held on Saturday at 8 PM.",
            category: "non-academic",
            time: "5 days ago",
            pinned: false,
            urgent: false
        }
    ],

    placements: [
        {
            id: 14,
            author: "Placement Cell",
            role: "office",
            avatar: "PC",
            text: "💼 TCS Campus Placement Drive will be held on 20th January. Eligibility: 60% throughout and no active backlogs.",
            category: "non-academic",
            time: "1 day ago",
            pinned: true,
            urgent: true
        }
    ],

    general: [
        {
            id: 15,
            author: "Priya Kumar",
            role: "student",
            avatar: "PK",
            text: "Does anyone have notes for Computer Networks Unit 3?",
            category: "general",
            time: "Today at 10:45 AM",
            pinned: false,
            urgent: false
        },
        {
            id: 16,
            author: "Amit Joshi",
            role: "student",
            avatar: "AJ",
            text: "The library is open till 10 PM during examinations.",
            category: "general",
            time: "Today at 9:00 AM",
            pinned: false,
            urgent: false
        }
    ]
};

// ================= CHANNEL DATA =================

const channelNames = {
    announcements: "general-announcements",
    important: "important-notices",
    syllabus: "syllabus-updates",
    exams: "exam-schedule",
    assignments: "assignments",
    materials: "study-materials",
    events: "events",
    sports: "sports",
    clubs: "clubs-activities",
    placements: "placements",
    general: "general-discussion"
};

const channelDescriptions = {
    announcements: "All general announcements for the class",
    important: "Critical notices, fees, exams and closures",
    syllabus: "Syllabus updates and curriculum changes",
    exams: "Exam schedules, results and viva dates",
    assignments: "Assignment postings and deadlines",
    materials: "Study materials, notes and resources",
    events: "College events, fests and workshops",
    sports: "Sports events and tournaments",
    clubs: "Club activities and meetups",
    placements: "Placement drives and opportunities",
    general: "General discussion for students"
};

const channelIcons = {
    announcements: "fa-bullhorn",
    important: "fa-exclamation-triangle",
    syllabus: "fa-book",
    exams: "fa-file-alt",
    assignments: "fa-tasks",
    materials: "fa-download",
    events: "fa-calendar-alt",
    sports: "fa-trophy",
    clubs: "fa-users",
    placements: "fa-briefcase",
    general: "fa-comments"
};

const serverNames = {
    home: "🎓 CampusConnect",
    cse3: "💻 CSE 3rd Year",
    "cse-dept": "🏛️ CSE Department",
    college: "🏫 College Main",
    events: "🎉 Events and Fests"
};

// ================= LOCAL STORAGE =================

function saveMessages() {
    localStorage.setItem(
        "campusMessages",
        JSON.stringify(channelMessages)
    );
}

function loadSavedMessages() {
    const savedMessages = localStorage.getItem("campusMessages");

    if (!savedMessages) return;

    try {
        const parsedMessages = JSON.parse(savedMessages);

        Object.keys(parsedMessages).forEach(function (channel) {
            if (Array.isArray(parsedMessages[channel])) {
                channelMessages[channel] = parsedMessages[channel];
            }
        });
    } catch (error) {
        console.error("Messages could not be loaded:", error);
    }
}

// ================= INITIALIZATION =================

document.addEventListener("DOMContentLoaded", function () {
    try {
        currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );
    } catch (error) {
        currentUser = null;
    }

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    loadSavedMessages();
    updateUserPanel();
    loadChannel(currentChannel);

    setTimeout(function () {
        showToast("Welcome back, " + currentUser.name + "!");
    }, 700);
});

// ================= USER PANEL =================

function updateUserPanel() {
    const userAvatar = document.getElementById("userAvatar");
    const userName = document.getElementById("userName");
    const userRole = document.getElementById("userRole");

    if (!currentUser) return;

    const initials = currentUser.name
        .split(" ")
        .map(function (name) {
            return name.charAt(0);
        })
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const roleNames = {
        student: "🎓 Student",
        professor: "👨‍🏫 Professor",
        office: "🏢 Office Staff"
    };

    userAvatar.textContent = initials;
    userName.textContent = currentUser.name;
    userRole.textContent = roleNames[currentUser.role] || currentUser.role;

    const roleColors = {
        student: "linear-gradient(135deg, #6c5ce7, #a855f7)",
        professor: "linear-gradient(135deg, #00b894, #00cec9)",
        office: "linear-gradient(135deg, #fdcb6e, #f39c12)"
    };

    userAvatar.style.background =
        roleColors[currentUser.role] || roleColors.student;

    const categorySelect = document.getElementById("msgCategory");

    if (categorySelect && currentUser.role === "student") {
        categorySelect.style.display = "none";
    }
}

// ================= SERVER =================

function switchServer(serverId, element) {
    currentServer = serverId;

    document.querySelectorAll(".server-icon").forEach(function (icon) {
        icon.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    const serverName = document.getElementById("serverName");

    if (serverName) {
        serverName.textContent = serverNames[serverId] || serverId;
    }

    currentChannel = "announcements";
    loadChannel(currentChannel);

    showToast("Switched to " + (serverNames[serverId] || serverId));
}

// ================= CHANNEL =================

function switchChannel(channelId, element) {
    currentChannel = channelId;

    document.querySelectorAll(".channel").forEach(function (channel) {
        channel.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");

        const badge = element.querySelector(".unread-badge");

        if (badge) {
            badge.remove();
        }
    }

    loadChannel(channelId);
}

function loadChannel(channelId) {
    const nameElement = document.getElementById("channelName");
    const descElement = document.getElementById("channelDesc");
    const inputElement = document.getElementById("messageInput");
    const welcomeIcon = document.querySelector(".welcome-icon i");
    const welcomeTitle = document.querySelector(".channel-welcome h2");
    const welcomeDescription = document.querySelector(".channel-welcome p");
    const headerIcon = document.querySelector(".channel-icon");

    const displayName = channelNames[channelId] || channelId;
    const description = channelDescriptions[channelId] || "";

    if (nameElement) nameElement.textContent = displayName;
    if (descElement) descElement.textContent = description;
    if (inputElement) inputElement.placeholder = "Message #" + displayName;

    const iconClass = channelIcons[channelId] || "fa-hashtag";

    if (welcomeIcon) {
        welcomeIcon.className = "fas " + iconClass;
    }

    if (welcomeTitle) {
        welcomeTitle.textContent = "Welcome to #" + displayName;
    }

    if (welcomeDescription) {
        welcomeDescription.textContent = description;
    }

    if (headerIcon) {
        headerIcon.className = "fas " + iconClass + " channel-icon";
    }

    renderMessages(channelMessages[channelId] || []);
}

// ================= SAFE HTML =================

function escapeHTML(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatMessageText(value) {
    return escapeHTML(value).replace(/\n/g, "<br>");
}

// ================= MESSAGES =================

function renderMessages(messages) {
    const messagesList = document.getElementById("messagesList");

    if (!messagesList) return;

    messagesList.innerHTML = "";

    if (!messages.length) {
        messagesList.innerHTML = `
            <div style="text-align:center;padding:40px;color:#777;">
                <i class="fas fa-inbox" style="font-size:2.5rem;"></i>
                <p>No messages yet.</p>
            </div>
        `;
        return;
    }

    messagesList.innerHTML = `
        <div class="date-divider">
            <span>📅 Recent Messages</span>
        </div>
    `;

    messages.forEach(function (message) {
        messagesList.innerHTML += createMessageHTML(message);
    });
}

function createMessageHTML(message) {
    const roleLabels = {
        student: "Student",
        professor: "Professor",
        office: "Office Staff"
    };

    const tagLabels = {
        academic: "📚 Academic",
        "non-academic": "🎯 Non-Academic",
        urgent: "🚨 Urgent",
        general: "💬 General"
    };

    const role = message.role || "student";
    const category = message.category || "general";

    let attachmentHTML = "";

    if (message.attachment) {
        attachmentHTML = `
            <div class="message-attachment">
                <i class="fas fa-file attachment-icon"></i>
                <div class="attachment-info">
                    <span class="attachment-name">
                        ${escapeHTML(message.attachment.name)}
                    </span>
                    <span class="attachment-size">
                        ${escapeHTML(message.attachment.size)}
                    </span>
                </div>
            </div>
        `;
    }

    return `
        <div class="message ${message.urgent ? "urgent" : ""} ${message.pinned ? "pinned" : ""}"
             data-id="${escapeHTML(message.id)}"
             data-category="${escapeHTML(category)}">

            <div class="message-avatar avatar-${escapeHTML(role)}">
                ${escapeHTML(message.avatar)}
            </div>

            <div class="message-content">
                <div class="message-header">
                    <span class="message-author author-${escapeHTML(role)}">
                        ${escapeHTML(message.author)}
                    </span>

                    <span class="message-role role-${escapeHTML(role)}">
                        ${escapeHTML(roleLabels[role] || role)}
                    </span>

                    <span class="message-time">
                        ${escapeHTML(message.time)}
                    </span>
                </div>

                <div class="message-text">
                    ${formatMessageText(message.text)}
                </div>

                <span class="message-tag tag-${escapeHTML(category)}">
                    ${escapeHTML(tagLabels[category] || category)}
                </span>

                ${
                    message.pinned
                        ? `<div class="message-pinned">
                               <i class="fas fa-thumbtack"></i> Pinned Message
                           </div>`
                        : ""
                }

                ${attachmentHTML}
            </div>
        </div>
    `;
}

// ================= SEND MESSAGE =================

function sendMessage() {
    const input = document.getElementById("messageInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    // Students can post in general discussion only
    if (
        currentUser &&
        currentUser.role === "student" &&
        currentChannel !== "general"
    ) {
        showToast("Students can post in General Discussion only.");
        return;
    }

    const categorySelect = document.getElementById("msgCategory");
    const category =
        categorySelect && categorySelect.value
            ? categorySelect.value
            : "general";

    const initials = currentUser.name
        .split(" ")
        .map(function (name) {
            return name.charAt(0);
        })
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const newMessage = {
        id: Date.now(),
        author: currentUser.name,
        role: currentUser.role,
        avatar: initials,
        text: text,
        category: category,
        time: "Just now",
        pinned: false,
        urgent: category === "urgent"
    };

    if (!channelMessages[currentChannel]) {
        channelMessages[currentChannel] = [];
    }

    channelMessages[currentChannel].push(newMessage);

    // Save message
    saveMessages();

    renderMessages(channelMessages[currentChannel]);

    input.value = "";

    const messagesArea = document.getElementById("messagesArea");

    if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    showToast("Message sent successfully!");
}

function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// ================= SEARCH =================

function searchMessages() {
    const input = document.getElementById("searchInput");
    const query = input ? input.value.toLowerCase().trim() : "";

    if (query.length < 2) {
        loadChannel(currentChannel);
        return;
    }

    const messages = channelMessages[currentChannel] || [];

    const filteredMessages = messages.filter(function (message) {
        return (
            message.text.toLowerCase().includes(query) ||
            message.author.toLowerCase().includes(query)
        );
    });

    renderMessages(filteredMessages);
}

function searchInChannel(query) {
    query = String(query || "").toLowerCase().trim();

    if (query.length < 2) {
        loadChannel(currentChannel);
        return;
    }

    const messages = channelMessages[currentChannel] || [];

    const filteredMessages = messages.filter(function (message) {
        return (
            message.text.toLowerCase().includes(query) ||
            message.author.toLowerCase().includes(query)
        );
    });

    renderMessages(filteredMessages);
}

// ================= CATEGORY FILTER =================

function filterCategory(category, element) {
    document.querySelectorAll(".tab").forEach(function (tab) {
        tab.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    const messages = channelMessages[currentChannel] || [];

    if (category === "all") {
        renderMessages(messages);
        return;
    }

    const filteredMessages = messages.filter(function (message) {
        return message.category === category;
    });

    renderMessages(filteredMessages);
}

// ================= PINNED PANEL =================

function togglePinned() {
    const panel = document.getElementById("pinnedPanel");

    if (!panel) return;

    if (panel.style.display === "block") {
        panel.style.display = "none";
        return;
    }

    const pinnedMessages = (channelMessages[currentChannel] || []).filter(
        function (message) {
            return message.pinned;
        }
    );

    const pinnedContainer = document.getElementById("pinnedMessages");

    if (pinnedContainer) {
        if (!pinnedMessages.length) {
            pinnedContainer.innerHTML =
                '<p style="padding:20px;color:#777;">No pinned messages.</p>';
        } else {
            pinnedContainer.innerHTML = pinnedMessages
                .map(createMessageHTML)
                .join("");
        }
    }

    panel.style.display = "block";
}

// ================= MEMBERS =================

function toggleMembers() {
    const panel = document.getElementById("membersPanel");

    if (!panel) return;

    membersVisible = !membersVisible;
    panel.style.display = membersVisible ? "block" : "none";
}

// ================= FILE UPLOAD =================

function handleFileUpload(input) {
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];

    const fileSize =
        file.size < 1024 * 1024
            ? (file.size / 1024).toFixed(1) + " KB"
            : (file.size / (1024 * 1024)).toFixed(1) + " MB";

    const initials = currentUser.name
        .split(" ")
        .map(function (name) {
            return name.charAt(0);
        })
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const fileMessage = {
        id: Date.now(),
        author: currentUser.name,
        role: currentUser.role,
        avatar: initials,
        text: "📎 Shared a file: " + file.name,
        category: "academic",
        time: "Just now",
        pinned: false,
        urgent: false,
        attachment: {
            name: file.name,
            size: fileSize
        }
    };

    if (!channelMessages[currentChannel]) {
        channelMessages[currentChannel] = [];
    }

    channelMessages[currentChannel].push(fileMessage);
    saveMessages();
    renderMessages(channelMessages[currentChannel]);

    showToast("File shared successfully!");
}

// ================= MODALS =================

function showCreateServer() {
    const modal = document.getElementById("createServerModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function showSettings() {
    const modal = document.getElementById("settingsModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.style.display = "none";
    }
}

function createServer() {
    const nameInput = document.getElementById("newServerName");

    if (!nameInput || !nameInput.value.trim()) {
        alert("Please enter a server name.");
        return;
    }

    const name = nameInput.value.trim();
    const serverId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    serverNames[serverId] = name;

    const sidebar = document.querySelector(".server-sidebar");
    const addButton = document.querySelector(".add-server");

    if (sidebar && addButton) {
        const icon = document.createElement("div");

        icon.className = "server-icon";
        icon.title = name;
        icon.innerHTML = "<span>" + name.slice(0, 3).toUpperCase() + "</span>";

        icon.addEventListener("click", function () {
            switchServer(serverId, icon);
        });

        sidebar.insertBefore(icon, addButton);
    }

    closeModal("createServerModal");
    showToast("Server created successfully!");
}

function toggleDarkMode() {
    showToast("Theme settings updated.");
}

// ================= TOAST =================

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// ================= LOGOUT =================

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
}

// ================= MODAL CLOSE =================

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-overlay")) {
        event.target.style.display = "none";
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal-overlay").forEach(function (modal) {
            modal.style.display = "none";
        });
    }

    if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();

        const searchInput = document.getElementById("searchInput");

        if (searchInput) {
            searchInput.focus();
        }
    }
});

// ================= SAME BROWSER TAB SYNC =================

window.addEventListener("storage", function (event) {
    if (event.key === "campusMessages") {
        loadSavedMessages();
        loadChannel(currentChannel);
        showToast("📢 New message received!");
    }
    // ================= FIREBASE REALTIME OVERRIDE =================
// This code makes messages work across different devices.

var activeFirebaseRef = null;

function isFirebaseReady() {
    return typeof window.db !== 'undefined' && window.db !== null;
}

// Override loadChannel with Firebase support
function loadChannel(channelId) {
    currentChannel = channelId;

    const channelName = document.getElementById('channelName');
    const channelDesc = document.getElementById('channelDesc');
    const messageInput = document.getElementById('messageInput');
    const welcomeIcon = document.querySelector('.welcome-icon i');
    const welcomeTitle = document.querySelector('.channel-welcome h2');
    const welcomeDesc = document.querySelector('.channel-welcome p');

    if (channelName) channelName.textContent = channelId;
    if (channelDesc) channelDesc.textContent = channelDescriptions[channelId] || '';
    if (messageInput) messageInput.placeholder = `Message #${channelId}`;

    const iconClass = channelIcons[channelId] || 'fa-hashtag';

    if (welcomeIcon) welcomeIcon.className = `fas ${iconClass}`;
    if (welcomeTitle) welcomeTitle.textContent = `Welcome to #${channelId}`;
    if (welcomeDesc) welcomeDesc.textContent = channelDescriptions[channelId] || 'Start of the channel';

    const headerIcon = document.querySelector('.channel-icon');
    if (headerIcon) {
        headerIcon.className = `fas ${iconClass} channel-icon`;
    }

    const sampleMessages = channelMessages[channelId] || [];

    // First show sample messages
    renderMessages(sampleMessages);

    // Stop previous Firebase listener
    if (activeFirebaseRef) {
        activeFirebaseRef.off();
    }

    // Firebase real-time listener
    if (isFirebaseReady()) {
        activeFirebaseRef = window.db.ref('messages/' + channelId);

        activeFirebaseRef.on('value', function(snapshot) {
            const data = snapshot.val();
            let firebaseMessages = [];

            if (data) {
                firebaseMessages = Object.keys(data).map(function(key) {
                    return {
                        firebaseKey: key,
                        ...data[key]
                    };
                });
            }

            const finalMessages = [...sampleMessages, ...firebaseMessages];

            finalMessages.sort(function(a, b) {
                return (a.id || 0) - (b.id || 0);
            });

            renderMessages(finalMessages);
        }, function(error) {
            console.error('Firebase listen error:', error);
            showToast('Firebase permission error!');
        });
    }
}

// Override sendMessage with Firebase support
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
        avatar: currentUser.name.split(' ').map(function(n) {
            return n[0];
        }).join('').toUpperCase().slice(0, 2),
        text: text,
        category: category,
        time: 'Just now',
        pinned: false,
        urgent: category === 'urgent',
        channel: currentChannel
    };

    // Save to Firebase
    if (isFirebaseReady()) {
        window.db.ref('messages/' + currentChannel).push(newMsg)
            .then(function() {
                input.value = '';
                showToast('Message sent! ✉️');
            })
            .catch(function(error) {
                console.error('Firebase message error:', error);
                showToast('Message failed! Check Firebase rules.');
            });
    } else {
        // Backup local save
        if (!channelMessages[currentChannel]) {
            channelMessages[currentChannel] = [];
        }

        channelMessages[currentChannel].push(newMsg);
        saveMessages();
        renderMessages(channelMessages[currentChannel]);

        input.value = '';
        showToast('Message sent locally! ✉️');
    }
}
});
