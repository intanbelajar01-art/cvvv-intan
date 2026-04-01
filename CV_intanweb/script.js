/* ============================================
   CV INTAN - SCRIPT.JS
   Fitur: Smooth Scrolling, Animations, Upload
   Cross-Browser Compatible
   ============================================ */

// Polyfill untuk IntersectionObserver (IE11 support)
if (!('IntersectionObserver' in window)) {
    window.IntersectionObserver = function(callback, options) {
        this.callback = callback;
        this.options = options || {};
        this.observe = function(element) {
            element.classList.add('visible');
        };
        this.unobserve = function() {};
    };
}

// Polyfill untuk smooth scroll
if (!('scrollBehavior' in document.documentElement.style)) {
    window.scrollTo = function(options) {
        if (typeof options === 'object' && options.top !== undefined) {
            var start = window.pageYOffset;
            var target = options.top;
            var distance = target - start;
            var duration = 500;
            var startTime = null;
            
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = timestamp - startTime;
                var percent = Math.min(progress / duration, 1);
                window.scrollTo(0, start + distance * percent);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }
    };
}

// ==================== NAVIGATION ====================
// Toggle hamburger menu untuk mobile
var hamburger = document.getElementById('hamburger');
var navMenu = document.querySelector('.nav-menu');
var navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Tutup menu saat link diklik (mobile)
if (navLinks.length > 0) {
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    }
}

// ==================== NAVBAR SCROLL EFFECT ====================
// Tambahkan efek shadow pada navbar saat scroll
var navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== SMOOTH SCROLLING ====================
// Smooth scroll untuk semua link yang mengarah ke section
var anchorLinks = document.querySelectorAll('a[href^="#"]');

for (var j = 0; j < anchorLinks.length; j++) {
    anchorLinks[j].addEventListener('click', function(e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        var target = document.querySelector(href);
        if (target && navbar) {
            var navbarHeight = navbar.offsetHeight;
            var targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
// Animasi fade in saat scroll
var fadeElements = document.querySelectorAll('.skill-card, .portfolio-item, .timeline-item, .about-content, .contact-content');

// Tambahkan class fade-in ke elemen
for (var k = 0; k < fadeElements.length; k++) {
    fadeElements[k].classList.add('fade-in');
}

// Intersection Observer untuk animasi scroll (dengan fallback)
if ('IntersectionObserver' in window) {
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        for (var m = 0; m < entries.length; m++) {
            if (entries[m].isIntersecting) {
                entries[m].target.classList.add('visible');
            }
        }
    }, observerOptions);

    for (var n = 0; n < fadeElements.length; n++) {
        observer.observe(fadeElements[n]);
    }
} else {
    // Fallback untuk browser lama
    for (var p = 0; p < fadeElements.length; p++) {
        fadeElements[p].classList.add('visible');
    }
}

// ==================== SKILLS PROGRESS BAR ANIMATION ====================
// Animasi progress bar saat section skills terlihat
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            // Animasi setiap progress bar
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, { threshold: 0.3 });

skillsObserver.observe(skillsSection);

// ==================== PORTFOLIO DYNAMIC GENERATOR ====================
// Data portfolio - MUDAH DIEDIT: Tambahkan item baru di sini
const portfolioData = {
    1: {
        title: 'Poster Parfum Delina Exclusif',
        desc: 'Desain poster parfum mewah dengan konsep elegan dan feminin. Menggunakan Adobe Photoshop untuk menciptakan efek visual yang mewah dengan komposisi warna pink yang lembut.',
        img: './images/poster-parfum.jpg',
        placeholder: 'https://via.placeholder.com/800x600/f093fb/ffffff?text=Poster+Parfum'
    },
    2: {
        title: 'Poster Isra Miraj',
        desc: 'Poster peringatan Isra Miraj 27 Rajab 1446 H dengan ilustrasi Ka\'bah dan unta. Menggunakan teknik flat design dengan warna-warna hangat untuk menciptakan suasana spiritual.',
        img: './images/poster-isra-miraj.jpg',
        placeholder: 'https://via.placeholder.com/800x600/667eea/ffffff?text=Poster+Isra+Miraj'
    },
    3: {
        title: 'Poster Energy Drink',
        desc: 'Desain poster minuman energi "Hendrix Hawkins" dengan konsep dinamis dan energik. Menggunakan Adobe Photoshop untuk menciptakan efek visual yang menarik perhatian.',
        img: './images/poster-energy-drink.jpg',
        placeholder: 'https://via.placeholder.com/800x600/ff6b6b/ffffff?text=Poster+Energy+Drink'
    },
    4: {
        title: 'Poster KFC Grand Opening',
        desc: 'Poster promosi Grand Opening KFC dengan diskon 50%. Desain menarik dengan efek api dan komposisi warna merah yang eye-catching untuk menarik perhatian konsumen.',
        img: './images/poster-kfc.jpg',
        placeholder: 'https://via.placeholder.com/800x600/f6d365/ffffff?text=Poster+KFC'
    }
    // TAMBAHKAN KARYA BARU DI SINI:
    // ,5: {
    //     title: 'Judul Karya Baru',
    //     desc: 'Deskripsi karya baru...',
    //     img: './images/karya5.jpg',
    //     placeholder: 'https://via.placeholder.com/800x600/667eea/ffffff?text=Karya+5'
    // }
};

// Fungsi untuk generate portfolio grid secara dinamis
function generatePortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Clear existing content
    
    Object.keys(portfolioData).forEach(id => {
        const item = portfolioData[id];
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.onclick = () => openModal(id);
        
        // Check if item is video or image
        const isVideo = item.type === 'video' || item.img.match(/\.(mp4|webm|mov)$/i);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-img">
                ${isVideo ? `
                    <video src="${item.img}" muted poster="${item.placeholder}"></video>
                    <div class="video-badge"><i class="fas fa-play"></i></div>
                ` : `
                    <img src="${item.img}" alt="${item.title}" 
                         onerror="this.src='${item.placeholder}'">
                `}
            </div>
            <div class="portfolio-overlay">
                <h4>${item.title}</h4>
                <p>${item.desc.substring(0, 50)}...</p>
                <i class="fas ${isVideo ? 'fa-play-circle' : 'fa-search-plus'}"></i>
            </div>
        `;
        
        grid.appendChild(portfolioItem);
    });
    
    // Re-attach fade-in animation untuk item baru
    const newItems = grid.querySelectorAll('.portfolio-item');
    newItems.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Generate portfolio saat halaman load
document.addEventListener('DOMContentLoaded', function() {
    generatePortfolio();
    initUploadFeatures();
});

// Inisialisasi semua fitur upload
function initUploadFeatures() {
    initProfileUpload();
    initPortfolioUpload();
}

// Buka modal dengan support image dan video
function openModal(id) {
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('modalImg');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalType = document.getElementById('modalType');
    
    const data = portfolioData[id];
    
    // Set konten modal
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    // Check if item is video
    const isVideo = data.type === 'video' || data.img.match(/\.(mp4|webm|mov)$/i);
    
    if (isVideo) {
        // Show video, hide image
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = data.img;
        modalType.textContent = 'Video';
        
        // Auto play video
        modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
    } else {
        // Show image, hide video
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalType.textContent = 'Gambar';
        
        // Cek apakah gambar asli ada, jika tidak gunakan placeholder
        const img = new Image();
        img.onload = function() {
            modalImg.src = data.img;
        };
        img.onerror = function() {
            modalImg.src = data.placeholder;
        };
        img.src = data.img;
    }
    
    // Tampilkan modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Tutup modal
function closeModal() {
    const modal = document.getElementById('portfolioModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
    
    // Pause video if playing
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
}

// Tutup modal saat klik di luar konten
window.addEventListener('click', (e) => {
    const modal = document.getElementById('portfolioModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==================== ACTIVE NAV LINK ====================
// Highlight nav link sesuai section yang sedang aktif
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== TYPING EFFECT (OPTIONAL) ====================
// Efek mengetik untuk tagline (bisa diaktifkan jika diinginkan)
/*
const tagline = document.querySelector('.hero-tagline');
const text = tagline.textContent;
tagline.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Jalankan typing effect saat halaman load
window.addEventListener('load', typeWriter);
*/

// ==================== PRELOADER (OPTIONAL) ====================
// Preloader sederhana (bisa ditambahkan jika diinginkan)
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

// ==================== FORM VALIDATION (JIKA ADA FORM) ====================
// Validasi form kontak (bisa ditambahkan jika ada form)
/*
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validasi input
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Mohon isi semua field!');
            return;
        }
        
        // Proses pengiriman form
        alert('Pesan berhasil dikirim!');
        contactForm.reset();
    });
}
*/

// ==================== BACK TO TOP BUTTON (OPTIONAL) ====================
// Tombol kembali ke atas (bisa ditambahkan jika diinginkan)
/*
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    font-size: 1.2rem;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
*/

// ==================== PROFILE UPLOAD ====================
// Fitur upload foto profil dengan preview
let tempProfileImage = null;

function initProfileUpload() {
    const profileUpload = document.getElementById('profileUpload');
    const heroProfileImg = document.getElementById('heroProfileImg');
    const heroProfilePlaceholder = document.getElementById('heroProfilePlaceholder');
    const profileUploadControls = document.getElementById('profileUploadControls');
    const profilePreview = document.getElementById('profilePreview');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelProfileBtn = document.getElementById('cancelProfileBtn');

    if (!profileUpload) return;

    // Check if profile image exists
    function checkProfileImage() {
        if (!heroProfileImg) return;
        const img = new Image();
        img.onload = function() {
            heroProfileImg.style.display = 'block';
            if (heroProfilePlaceholder) heroProfilePlaceholder.style.display = 'none';
        };
        img.onerror = function() {
            heroProfileImg.style.display = 'none';
            if (heroProfilePlaceholder) heroProfilePlaceholder.style.display = 'flex';
        };
        img.src = heroProfileImg.src;
    }

    // Initialize profile image check
    checkProfileImage();

    // Handle profile file selection
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Mohon pilih file gambar (JPG, PNG, GIF)', 'error');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Ukuran file terlalu besar (maks 5MB)', 'error');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            tempProfileImage = e.target.result;
            if (profilePreview) profilePreview.src = tempProfileImage;
            if (profileUploadControls) profileUploadControls.style.display = 'block';
            const wrapper = document.querySelector('.profile-image-wrapper');
            if (wrapper) wrapper.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    // Save profile image
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            if (tempProfileImage && heroProfileImg) {
                heroProfileImg.src = tempProfileImage;
                heroProfileImg.style.display = 'block';
                if (heroProfilePlaceholder) heroProfilePlaceholder.style.display = 'none';
                cancelProfileUpload();
                showNotification('Foto profil berhasil diperbarui!', 'success');
            }
        });
    }

    // Cancel profile upload
    if (cancelProfileBtn) {
        cancelProfileBtn.addEventListener('click', cancelProfileUpload);
    }

    function cancelProfileUpload() {
        tempProfileImage = null;
        if (profileUploadControls) profileUploadControls.style.display = 'none';
        const wrapper = document.querySelector('.profile-image-wrapper');
        if (wrapper) wrapper.style.display = 'block';
        profileUpload.value = '';
    }
}

// ==================== PORTFOLIO UPLOAD ====================
// Fitur upload foto dan video ke portfolio
let tempPortfolioItems = [];

function initPortfolioUpload() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const uploadPanels = document.querySelectorAll('.upload-panel');
    const imageDropzone = document.getElementById('imageDropzone');
    const videoDropzone = document.getElementById('videoDropzone');
    const portfolioImageUpload = document.getElementById('portfolioImageUpload');
    const portfolioVideoUpload = document.getElementById('portfolioVideoUpload');
    const savePortfolioBtn = document.getElementById('savePortfolioBtn');
    const cancelPortfolioBtn = document.getElementById('cancelPortfolioBtn');

    if (!portfolioImageUpload && !portfolioVideoUpload) return;

    // Tab switching
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tab = this.dataset.tab;
                
                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update active panel
                uploadPanels.forEach(panel => panel.classList.remove('active'));
                const panelEl = document.getElementById(tab + 'UploadPanel');
                if (panelEl) panelEl.classList.add('active');
            });
        });
    }

    // Setup dropzones
    setupDropzone(imageDropzone, portfolioImageUpload, 'image');
    setupDropzone(videoDropzone, portfolioVideoUpload, 'video');

    // Save portfolio items
    if (savePortfolioBtn) {
        savePortfolioBtn.addEventListener('click', function() {
            if (tempPortfolioItems.length === 0) return;

            // Add items to portfolio data
            let nextId = Object.keys(portfolioData).length + 1;
            
            tempPortfolioItems.forEach(item => {
                portfolioData[nextId] = {
                    title: item.name.split('.')[0],
                    desc: item.type === 'video' 
                        ? `Video karya - Durasi ${item.duration} detik`
                        : 'Karya desain',
                    img: item.src,
                    type: item.type,
                    placeholder: item.src
                };
                nextId++;
            });

            // Regenerate portfolio grid
            generatePortfolio();

            // Clear preview
            tempPortfolioItems = [];
            updatePreview();
            if (portfolioImageUpload) portfolioImageUpload.value = '';
            if (portfolioVideoUpload) portfolioVideoUpload.value = '';

            showNotification(`${tempPortfolioItems.length} karya berhasil ditambahkan!`, 'success');
        });
    }

    // Cancel portfolio upload
    if (cancelPortfolioBtn) {
        cancelPortfolioBtn.addEventListener('click', function() {
            tempPortfolioItems = [];
            updatePreview();
            if (portfolioImageUpload) portfolioImageUpload.value = '';
            if (portfolioVideoUpload) portfolioVideoUpload.value = '';
        });
    }
}

// Drag and drop handlers
function setupDropzone(dropzone, input, type) {
    if (!dropzone || !input) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        handleFiles(files, type);
    }, false);

    dropzone.addEventListener('click', () => {
        input.click();
    });

    input.addEventListener('change', (e) => {
        handleFiles(e.target.files, type);
    });
}

// Handle files
function handleFiles(files, type) {
    if (type === 'image') {
        Array.from(files).forEach(file => processImageFile(file));
    } else if (type === 'video') {
        if (files.length > 0) processVideoFile(files[0]);
    }
}

// Process image file
function processImageFile(file) {
    // Validate type
    if (!file.type.startsWith('image/')) {
        showNotification(`"${file.name}" bukan file gambar`, 'error');
        return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showNotification(`"${file.name}" terlalu besar (maks 10MB)`, 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        tempPortfolioItems.push({
            type: 'image',
            src: e.target.result,
            name: file.name
        });
        updatePreview();
    };
    reader.readAsDataURL(file);
}

// Process video file
function processVideoFile(file) {
    // Validate type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
        showNotification('Format video tidak didukung (gunakan MP4, WebM, atau MOV)', 'error');
        return;
    }

    // Validate size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
        showNotification('Ukuran video terlalu besar (maks 50MB)', 'error');
        return;
    }

    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);

    video.onloadedmetadata = function() {
        URL.revokeObjectURL(objectUrl);

        // Check duration (max 30 seconds)
        if (video.duration > 30) {
            showNotification('Durasi video maksimal 30 detik', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            tempPortfolioItems.push({
                type: 'video',
                src: e.target.result,
                name: file.name,
                duration: Math.round(video.duration)
            });
            updatePreview();
        };
        reader.readAsDataURL(file);
    };

    video.src = objectUrl;
}

// Update preview area
function updatePreview() {
    const portfolioPreviewArea = document.getElementById('portfolioPreviewArea');
    const previewContainer = document.getElementById('previewContainer');
    
    if (!portfolioPreviewArea || !previewContainer) return;
    
    if (tempPortfolioItems.length === 0) {
        portfolioPreviewArea.style.display = 'none';
        return;
    }

    portfolioPreviewArea.style.display = 'block';
    previewContainer.innerHTML = '';

    tempPortfolioItems.forEach((item, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';

        if (item.type === 'image') {
            previewItem.innerHTML = `
                <img src="${item.src}" alt="${item.name}">
                <button class="remove-preview" onclick="removePreviewItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
                <span class="file-name">${item.name}</span>
            `;
        } else {
            previewItem.innerHTML = `
                <video src="${item.src}" muted></video>
                <div class="video-badge"><i class="fas fa-play"></i></div>
                <button class="remove-preview" onclick="removePreviewItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
                <span class="file-name">${item.name} (${item.duration}s)</span>
            `;
        }

        previewContainer.appendChild(previewItem);
    });
}

// Remove preview item
function removePreviewItem(index) {
    tempPortfolioItems.splice(index, 1);
    updatePreview();
}

// ==================== NOTIFICATION ====================
// Sistem notifikasi untuk user feedback
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.upload-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `upload-notification upload-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.95rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #48bb78; color: white;' : 
          type === 'error' ? 'background: #f56565; color: white;' : 
          'background: #667eea; color: white;'}
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Console log untuk debugging
console.log('CV Intan - Website loaded successfully!');
console.log('Features: Smooth scrolling, Animations, Modal, Mobile responsive, Upload Profile & Portfolio');
