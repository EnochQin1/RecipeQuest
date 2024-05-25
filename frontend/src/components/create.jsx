

export const createUser = async (username, name, email, bio, googleAccount, verified) => {
  const form = {
    Username: username,
    Name: name,
    Email: email,
    Bio: bio,
    GoogleAccount: googleAccount,
    Password: verified,
  };
  await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .catch(error => {
      console.error('Error:', error);
      return;
    });
}

export const getData = async (email) => {
  try {
    //alert(email)
    const response = await fetch(`/api/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json()

    if (!(response.ok)) {
      alert(response.status)
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    alert("Recieved: \n" + JSON.stringify(data))
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return null; // Return a default value or handle the error appropriately.
  }
};