const registerForm = document.getElementById('registerForm')

if (registerForm instanceof HTMLFormElement) {
    registerForm.addEventListener('submit', async e => {
        e.preventDefault()

        const input_email = document.querySelector('#email')
        const input_password = document.querySelector('#password')
        const input_first_name = document.querySelector('#first_name')
        const input_last_name = document.querySelector('#last_name')
        const input_age = document.querySelector('#age')
        const select_role = document.querySelector('#role')

        if (
            !(input_email instanceof HTMLInputElement)
            || !(input_password instanceof HTMLInputElement)
            || !(input_first_name instanceof HTMLInputElement)
            || !(input_last_name instanceof HTMLInputElement)
            || !(input_age instanceof HTMLInputElement)
            || !(select_role instanceof HTMLSelectElement)
        ) return

        const data = {
            email: input_email.value,
            password: input_password.value,
            first_name: input_first_name.value,
            last_name: input_last_name.value,
            age: input_age.value,
            role: select_role.value
        }

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 201) {
            window.location.replace('/')
        }
    })
}