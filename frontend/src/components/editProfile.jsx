export const editProile = async (email, name, username, bio, image) => {
    var fields = {}
    if (name != null) {
        fields["Name"] = name
    }
    if (username != null) {
        fields["Username"] = username
    }
    if (bio != null) {
        fields["Bio"] = bio
    }
    if (image != null) {
        fields["Image"] = image
    }

    await fetch('api/users/email/' + email, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
    }).catch(error => {
        console.error('Error', error)
    })
}