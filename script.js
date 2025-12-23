// Email form handling
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const whatsappSection = document.getElementById('whatsappSection');
    const whatsappLink = document.getElementById('whatsappLink');

    // Check if email was already submitted
    const savedEmail = localStorage.getItem('submittedEmail');
    if (savedEmail) {
        if (whatsappLink) {
            whatsappLink.href = 'https://chat.whatsapp.com/HJYnXgmCIOSB71rmLA7OzR';
        }
        showWhatsAppLink();
    }

    // Handle form submission
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Get referral code from URL parameters if present
                const urlParams = new URLSearchParams(window.location.search);
                const referralCode = urlParams.get('ref') || undefined;
                
                // Disable form while submitting
                const submitButton = emailForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = '...';
                }
                
                // Call API to subscribe
                fetch('https://hypeloop.app/api/subscribe/api-key', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        apiKey: 'efe08ab385f7ba24a0911c1d9d3f95a2',
                    }),
                    redirect: 'follow' // Follow redirects
                })
                .then(async response => {
                    // Check if response is ok
                    if (!response.ok) {
                        // Try to get error message
                        let errorData;
                        try {
                            errorData = await response.json();
                        } catch (e) {
                            errorData = { error: 'Network error' };
                        }
                        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    
                    // Save email to localStorage on success
                    localStorage.setItem('submittedEmail', email);
                    
                    // Hide form and show WhatsApp link
                    emailForm.style.display = 'none';
                    showWhatsAppLink();
                    
                    // Set the WhatsApp community link
                    const whatsappCommunityLink = 'https://chat.whatsapp.com/HJYnXgmCIOSB71rmLA7OzR';
                    if (whatsappLink) {
                        whatsappLink.href = whatsappCommunityLink;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // If it's a CORS error, proceed anyway (API is for tracking)
                    // The email is already validated client-side
                    if (error.message.includes('CORS') || error.message.includes('NetworkError') || error.name === 'TypeError') {
                        console.warn('CORS error, proceeding anyway...');
                        
                        // Save email to localStorage
                        localStorage.setItem('submittedEmail', email);
                        
                        // Hide form and show WhatsApp link
                        emailForm.style.display = 'none';
                        showWhatsAppLink();
                        
                        // Set the WhatsApp community link
                        const whatsappCommunityLink = 'https://chat.whatsapp.com/HJYnXgmCIOSB71rmLA7OzR';
                        if (whatsappLink) {
                            whatsappLink.href = whatsappCommunityLink;
                        }
                    } else {
                        // For other errors, show alert
                        alert('Error al procesar tu email. Por favor, intenta de nuevo.');
                        
                        // Re-enable form on error
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = '→';
                        }
                    }
                });
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

