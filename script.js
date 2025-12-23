// Email form handling - CORRECTED VERSION

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
                const referralCode = urlParams.get('ref') || null;
                
                // Disable form while submitting
                const submitButton = emailForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = '...';
                }
                
                // Prepare request body
                const requestBody = {
                    email: email,
                    apiKey: 'efe08ab385f7ba24a0911c1d9d3f95a2',
                };
                
                // Add referralCode only if it exists
                if (referralCode) {
                    requestBody.referralCode = referralCode;
                }
                
                // Call API to subscribe - Using /api/v1/subscribe endpoint to avoid redirects
                fetch('https://hypeloop.app/api/v1/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                .then(async response => {
                    // Check if response is ok
                    if (!response.ok) {
                        // Try to get error message
                        let errorData;
                        try {
                            errorData = await response.json();
                        } catch (e) {
                            errorData = { error: `HTTP error! status: ${response.status}` };
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
                    
                    // Show user-friendly error message
                    alert('Error al procesar tu email. Por favor, intenta de nuevo.');
                    
                    // Re-enable form on error
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = '→';
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

