# Caeras en el desencanto?

A simple website with a looping background video, email collection, and manifesto page.

## Setup

1. Add your background video file to `assets/video/`:
   - Name it `bg-video.mp4` (or `bg-video.webm`)
   - The video will loop automatically as the background

2. Update the WhatsApp community link:
   - Open `script.js`
   - Find the line: `const whatsappCommunityLink = 'https://chat.whatsapp.com/YOUR_COMMUNITY_LINK';`
   - Replace `YOUR_COMMUNITY_LINK` with your actual WhatsApp community link

3. Update the Manifesto text:
   - Open `manifesto.html`
   - Edit the content inside the `.manifesto-text` div

## Features

- **Background Video**: Looping video background on all pages
- **Email Collection**: Saves emails to localStorage (can be extended to send to a backend)
- **WhatsApp Link**: Shows after email submission
- **Falling Icons**: Animated falling icons for visual effect
- **Manifesto Page**: Separate page with the same video and custom text
- **Responsive Design**: Works on desktop and mobile devices

## File Structure

```
desencanto/
├── index.html          # Main page
├── manifesto.html      # Manifesto page
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/
    └── video/
        └── bg-video.mp4  # Your background video (add this)
```

## Browser Support

Works on all modern browsers that support:
- HTML5 video
- CSS3 animations
- LocalStorage API

