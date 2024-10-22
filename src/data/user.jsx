const usernames = [
    {user : 'user',
     pass : 'pass',
     role : 'admin',
     token : 'user'
    },
]


export function checkUser(username, password) {
    
    const userInfo = usernames.find((u) => u.user === username && u.pass === password) 
    return userInfo ? {token: userInfo.token, role: userInfo.role} : null
}