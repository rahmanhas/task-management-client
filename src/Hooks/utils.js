export const saveUser = user => {
  const currentUser = {
    email: user.email,
    name: user.name,
  }

  console.log(currentUser);
  fetch(`http://localhost:3000/users/${user?.email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then(res => res.json())
    .then(data => console.log(data))
}