var SUPABASE_URL = 'https://bkvgwegujzazfdvthzeo.supabase.co'
var SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODc5MTQzNiwiZXhwIjoxOTU0MzY3NDM2fQ.0EKsmFqIj33hqsnR72RJLKoTHGUDgwqkk1J5Qj7Idqs'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

window.userToken = null

document.addEventListener('DOMContentLoaded', function (event) {
    var signUpForm = document.querySelector('#sign-up')
    if (signUpForm) signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)

    var signInForm = document.querySelector('#sign-in')
    if (signInForm) signInForm.onsubmit = signInSubmitted.bind(signInForm)

    var logoutButton = document.querySelector('#logout-button')
    if (logoutButton) logoutButton.onclick = logoutSubmitted.bind(logoutButton)
})


const signUpSubmitted = (event) => {
    event.preventDefault()
    const firstName = event.target[0].value
    const lastName = event.target[1].value
    const birthDate = event.target[2].value
    const country = event.target[3].value
    const email = event.target[4].value
    const username = event.target[5].value
    const password = event.target[6].value
    const passwordConfirm = event.target[7].value

    if (password !== passwordConfirm) {
        alert("Please check the password you typed")
        return;
    }


    supabase.auth
        .signUp({
            email,
            password
        })
        .then(async (response) => {
            if (response.error) alert(response.error.message);
            else {
                let profile = await supabase
                    .from('profile')
                    .insert([{
                        id: response.user.id,
                        first_name: firstName,
                        last_name: lastName,
                        birth_date: birthDate,
                        country,
                        username,
                    }]);
                if (profile) {
                    let challenges = await supabase
                        .from('challenges')
                        .insert([{
                            user: response.user.id,
                            high_score: '0',
                            total_score: '0',
                        }]);
                    if (!challenges) {
                        alert('Something went wrong!')
                    }
                    window.location.href = './pages/signin.html';
                } else {
                    alert('Something went wrong!')
                }
            }
        })
        .catch((err) => {
            alert(err.response.text)
        })
}

const signInSubmitted = (event) => {
    event.preventDefault()
    const email = event.target[0].value
    const password = event.target[1].value

    supabase.auth
        .signIn({
            email,
            password
        })
        .then(async (response) => {
            if (response.error) alert(response.error.message);
            else {
                setToken(response)
                window.location.href = './profile.html';
            }
        })
        .catch((err) => {
            alert(err.response.text)
        })
}

const logoutSubmitted = (event) => {
    event.preventDefault()

    supabase.auth
        .signOut()
        .then((_response) => {
            // alert('Logout successful')
            window.location.href = '/pages/landingpage.html'
        })
        .catch((err) => {
            alert(err.response.text)
        })
}


function setToken(response) {
    if (response.data.confirmation_sent_at && !response.data.access_token) {
        alert('Confirmation Email Sent')
    } else {
        alert('Logged in as ' + response.user.email)
    }
}

function formatJoinDate(date) {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    switch (monthIndex) {
        case 0:
            return 'January ' + year;
        case 1:
            return 'February ' + year;
        case 2:
            return 'March ' + year;
        case 3:
            return 'April ' + year;
        case 4:
            return 'May ' + year;
        case 5:
            return 'June ' + year;
        case 6:
            return 'July ' + year;
        case 7:
            return 'August ' + year;
        case 8:
            return 'September ' + year;
        case 9:
            return 'October ' + year;
        case 10:
            return 'November ' + year;
        case 11:
            return 'December ' + year;
    }
}

async function fetchProfile() {
    const user = supabase.auth.user();
    if (!user) return null;
    const {
        data: profileData
    } = await supabase.from('profile').select().eq('id', user.id);
    const {
        data: raceData
    } = await supabase.from('race').select().eq('user', user.id);
    const {
        data: paymentData
    } = await supabase.from('payment').select().eq('user', user.id);
    let winnings = 0;
    let payments = 0;
    raceData.map(race => winnings += race.score)
    let high_score = Math.max(...raceData.map(race => race.score))
    if (high_score == -Infinity) {
        high_score = 0
    }
    await supabase.from('challenges').update([{
        high_score: high_score,
        total_score: winnings
    }]).eq('user', user.id);
    paymentData.map(payment => payments += payment.amount)
    let trophies = document.querySelector('#user_trophies_score');
    let username = document.querySelector('#username_profile_handle');
    let joinDate = document.querySelector('#profile_join_date');
    if (trophies) trophies.innerHTML = winnings - payments;
    if (username) username.innerHTML = profileData[0].username;
    if (joinDate) joinDate.innerHTML = formatJoinDate(new Date(profileData[0].created_at));
}

fetchProfile();