
const confirmation = async (event) => {
    event.preventDefault();

    const code = document.querySelector('#code').value.trim();
    const password = document.querySelector('#password').value.trim();
    const passwordconfirm = document.querySelector('#passwordConf').value.trim();
    if (password == passwordconfirm) {
        const response = await fetch(`/api/recovery/${code}`, {
            method: 'POST',
            body: JSON.stringify({ password, passwordconfirm }),
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (response.ok) {
            document.location.replace(`password`);
        } else {
            alert(response.message || 'Confirmation Failed');
        }

    } else {
        alert(response.message || 'Password do not match');
    }
}

document.querySelector('#recover').addEventListener('click', confirmation);