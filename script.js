var SUPABASE_URL = 'https://bkvgwegujzazfdvthzeo.supabase.co'
var SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODc5MTQzNiwiZXhwIjoxOTU0MzY3NDM2fQ.0EKsmFqIj33hqsnR72RJLKoTHGUDgwqkk1J5Qj7Idqs'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

window.userToken = null

document.addEventListener('DOMContentLoaded', function (event) {
    var signUpForm = document.querySelector('#sign-up')
    signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)
})

const signUpSubmitted = (event) => {
    event.preventDefault()
    const firstName = event.target[0].value
    const lastName = event.target[1].value
    const birthDate = event.target[2].value
    const country = event.target[3].value
    const email = event.target[4].value
    const emailConfirm = event.target[5].value
    const password = event.target[6].value
    const passwordConfirm = event.target[7].value

    if (email !== emailConfirm) {
        alert("Please check the email you typed")
        return;
    }

    if (password !== passwordConfirm) {
        alert("Please check the password you typed")
        return;
    }

    supabase.auth
        .signUp({ email, password })
        .then(async (response) => {
            if (response.error) alert(response.error.message);
            else {
                let profile = await supabase
                    .from('profile')
                    .insert([
                        {
                            id: response.user.id,
                            first_name: firstName,
                            last_name: lastName,
                            birth_date: birthDate,
                            country: country
                        }
                    ]);
                if(profile) {
                    alert('SignUp completed')
                }
            }
        })
        .catch((err) => {
            alert(err.response.text)
        })
}

