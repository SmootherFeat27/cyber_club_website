// --- FORM REDIRECT CONFIGURATION ---
// Replace these sample links with your actual Google Form or MS Form URLs:
const formLinks = {
    'web-sec': 'https://forms.google.com/', 
    'ctf-nightfall': 'https://forms.office.com/' 
};

function redirectToForm(eventId) {
    const formUrl = formLinks[eventId];
    if (formUrl) {
        window.open(formUrl, '_blank'); // Opens Google/MS Form in new tab
    } else {
        alert('Registration form link coming soon!');
    }
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function submitComplaint(e) {
    e.preventDefault();
    alert('Thank you! Your feedback has been submitted anonymously.');
    document.getElementById('complaintForm').reset();
}

// Terminal logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            let response = '';

            switch(command) {
                case 'help':
                    response = 'Available commands: events, leaderboard, team, clear';
                    break;
                case 'events':
                    response = 'Upcoming: 1. Web Security Workshop, 2. CTF Nightfall';
                    break;
                case 'leaderboard':
                    response = 'Top Rank: 0xShadow (1240 pts)';
                    break;
                case 'team':
                    response = 'Leads: Arnav (Pres), Ishita (VP), Rohan (Tech), Mehak (CTF)';
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '';
                    this.value = '';
                    return;
                default:
                    response = `Command not recognized: '${command}'. Type 'help' for options.`;
            }

            const line = document.createElement('div');
            line.innerHTML = `<span style="color: var(--text-muted);">> ${this.value}</span><br><span>${response}</span>`;
            terminalOutput.appendChild(line);
            this.value = '';
        }
    });
}
