// Email form handling
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const whatsappSection = document.getElementById('whatsappSection');
    const whatsappLink = document.getElementById('whatsappLink');

    // Check if email was already submitted
    const savedEmail = localStorage.getItem('submittedEmail');
    if (savedEmail) {
        showWhatsAppLink();
    }

    // Handle form submission
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Save email to localStorage
                localStorage.setItem('submittedEmail', email);
                
                // Here you could also send the email to a backend server
                // For example: sendEmailToServer(email);
                
                // Hide form and show WhatsApp link
                emailForm.style.display = 'none';
                showWhatsAppLink();
                
                // You can set the WhatsApp community link here
                // Replace with your actual WhatsApp community link
                const whatsappCommunityLink = 'https://chat.whatsapp.com/YOUR_COMMUNITY_LINK';
                if (whatsappLink) {
                    whatsappLink.href = whatsappCommunityLink;
                }
            } else {
                alert('Por favor, ingresa un email válido');
            }
        });
    }

    function showWhatsAppLink() {
        if (whatsappSection) {
            whatsappSection.classList.remove('hidden');
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

