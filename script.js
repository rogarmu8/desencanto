// Email form handling - Using Hypeloop Embed

document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const whatsappSection = document.getElementById('whatsappSection');
    const whatsappLink = document.getElementById('whatsappLink');
    const hypeloopWidget = document.getElementById('hypeloop-widget');

    // Check if email was already submitted
    const savedEmail = localStorage.getItem('submittedEmail');
    if (savedEmail) {
        if (whatsappLink) {
            whatsappLink.href = 'https://chat.whatsapp.com/HJYnXgmCIOSB71rmLA7OzR';
        }
        showWhatsAppLink();
    }

    // Function to find elements in the Hypeloop embed
    function findHypeloopElements() {
        if (!hypeloopWidget) return null;
        
        // Try to find input and submit button in the embed
        // The embed structure may vary, so we'll try multiple selectors
        const input = hypeloopWidget.querySelector('input[type="email"]') || 
                     hypeloopWidget.querySelector('input[type="text"]') ||
                     hypeloopWidget.querySelector('input');
        
        const submitButton = hypeloopWidget.querySelector('button[type="submit"]') ||
                            hypeloopWidget.querySelector('button') ||
                            hypeloopWidget.querySelector('input[type="submit"]');
        
        const form = hypeloopWidget.querySelector('form');
        
        return { input, submitButton, form };
    }

    // Wait for Hypeloop embed to load
    function waitForHypeloopEmbed(callback, maxAttempts = 50) {
        let attempts = 0;
        
        const checkInterval = setInterval(() => {
            attempts++;
            const elements = findHypeloopElements();
            
            if (elements && elements.input && (elements.submitButton || elements.form)) {
                clearInterval(checkInterval);
                callback(elements);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.warn('Hypeloop embed did not load in time');
                callback(null);
            }
        }, 100);
    }

    // Handle form submission
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Disable form while submitting
                const submitButton = emailForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = '...';
                }
                
                // Wait for embed and submit
                waitForHypeloopEmbed(function(elements) {
                    if (!elements || !elements.input) {
                        console.error('Could not find Hypeloop embed elements');
                        // Fallback: proceed anyway
                        handleSuccess(email);
                        return;
                    }
                    
                    // Set the email in the embed input
                    elements.input.value = email;
                    
                    // Trigger input event to ensure the embed recognizes the change
                    elements.input.dispatchEvent(new Event('input', { bubbles: true }));
                    elements.input.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    // Submit the embed form
                    if (elements.form) {
                        elements.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                    } else if (elements.submitButton) {
                        elements.submitButton.click();
                    }
                    
                    // Wait a bit and then proceed (embed handles submission asynchronously)
                    setTimeout(() => {
                        handleSuccess(email);
                    }, 500);
                });
            } else {
                alert('Por favor, ingresa un email válido');
            }
        });
    }

    function handleSuccess(email) {
        // Save email to localStorage
        localStorage.setItem('submittedEmail', email);
        
        // Hide form and show WhatsApp link
        if (emailForm) {
            emailForm.style.display = 'none';
        }
        showWhatsAppLink();
        
        // Set the WhatsApp community link
        const whatsappCommunityLink = 'https://chat.whatsapp.com/HJYnXgmCIOSB71rmLA7OzR';
        if (whatsappLink) {
            whatsappLink.href = whatsappCommunityLink;
        }
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

