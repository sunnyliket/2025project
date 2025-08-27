document.addEventListener('click', function(event) {
    const isVoiceEnabled = localStorage.getItem('voiceGuideEnabled') === 'true';
    if (!isVoiceEnabled) {
        return;
    }
    const targetElement = event.target.closest('a, button, .attraction-item, .spinBtn, .help-button');
    if (targetElement) {
        let textToSpeak = targetElement.textContent.trim();
        if (targetElement.getAttribute('aria-label')) {
            textToSpeak = targetElement.getAttribute('aria-label');
        }
        if (textToSpeak) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'ko-KR';
            window.speechSynthesis.speak(utterance);
        }
    }
});
