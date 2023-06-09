const logoutForm = document.getElementById('logoutForm')

if (logoutForm instanceof HTMLFormElement) {
    logoutForm.addEventListener('submit', e => {
        e.preventDefault()
        fetch('/api/sessions/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                if (result.status === 200) {
                    window.location.replace('/')
                }
            })
    })
}