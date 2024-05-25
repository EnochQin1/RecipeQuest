export const deleteProfile = async (email) => {
    await fetch('/api/users/email/' + email, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}