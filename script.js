function openSubject(subjectName) {
    hideAllViews();
    document.getElementById('detailsView').style.display = 'block';
    setActiveNav('navHome');
    window.scrollTo({ top: 380, behavior: 'smooth' });
}

function showSubjectsView() {
    hideAllViews();
    document.getElementById('subjectsView').style.display = 'block';
    setActiveNav('navHome');
}

function showAboutView() {
    hideAllViews();
    document.getElementById('aboutView').style.display = 'block';
    setActiveNav('navAbout');
    window.scrollTo({ top: 380, behavior: 'smooth' });
}

function showContactView() {
    hideAllViews();
    document.getElementById('contactView').style.display = 'block';
    setActiveNav('navContact');
    window.scrollTo({ top: 380, behavior: 'smooth' });
}

function hideAllViews() {
    document.getElementById('subjectsView').style.display = 'none';
    document.getElementById('detailsView').style.display = 'none';
    document.getElementById('contactView').style.display = 'none';
    document.getElementById('aboutView').style.display = 'none';
}

function setActiveNav(elementId) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (document.getElementById(elementId)) {
        document.getElementById(elementId).classList.add('active');
    }
}

// قراءة وتحديث بيانات المستخدم عند تحميل الصفحة (عرض فوري من الكاش المحلي)
// ملاحظة: يتم تحديث هذه القيم لاحقاً وبشكل موثوق من داخل الوحدة (module) الخاصة بـ Firebase في index.html
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('alphaUser');

    if (savedUser) {
        const user = JSON.parse(savedUser);

        const firstInitial = (user.firstName || user.fullName || user.email || '?').trim().charAt(0);
        const lastInitial = (user.lastName || '').trim().charAt(0);
        const initials = (firstInitial + (lastInitial || '')).toUpperCase();

        // تحديث عناصر الصفحة ببيانات الطالب
        if (document.getElementById('userNameDisplay')) {
            document.getElementById('userNameDisplay').textContent = user.fullName || (user.email ? user.email.split('@')[0] : 'طالب');
        }
        if (document.getElementById('userEmailDisplay')) {
            document.getElementById('userEmailDisplay').textContent = user.email || '';
        }
        if (document.getElementById('userAvatar')) {
            document.getElementById('userAvatar').textContent = initials;
        }
    }
});