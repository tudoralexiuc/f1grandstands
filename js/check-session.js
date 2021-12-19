const user = supabase.auth.user();

const noauth = ['/pages/landingpage.html','/signup.html','/pages/signin.html']
console.log(user)
if(noauth.includes(window.location.pathname)) {
    if(user) window.location.href = '/pages/homepage.html'
}
else {
    if(!user) window.location.href = 'pages/landingpage.html';
}
