let loggedUser;

async function login() {
    let username = $('form_username');
    let password = $('form_password');
    let data = $('#login_form').serializeArray();

    console.log('username: ', data[0].value);
    console.log('password: ', data[1].value);

    if (data[0].value && data[1].value) {
        await callLoginRoute(data[0].value, data[1].value);
    }

    console.log('User set: ', loggedUser);
}

async function callLoginRoute(username, password) {
    console.log('USAO');

    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/users/credentials/${username}/${password}`,
        success: function(response) {
            if (response) {
                console.log('Response ', response);
                localStorage.setItem('status', 'loggedIn');
                console.log('ls ', localStorage.getItem('status'));

                successfulLogin(username);
            } else {
                console.log('Neuspesno logovanje ');
                $('#login_info').html('Enter valid username and password!');
            }
        },
        error: function(response) {
            console.log('Error ', response);
        }
    });
}

function successfulLogin(username) {
    loggedUser = username;
    $('#spinner_div').html('<div uk-spinner></div>');
    setTimeout(() => {
        window.location.replace(
            'http://localhost/e-drogerie/e-drogerie-front/admin.html'
        );
    }, 2000);
}

function allowUserToAdminPage() {
    window.location.replace(
        'http://localhost/e-drogerie/e-drogerie-front/admin.html'
    );
}

function logout() {
    localStorage.removeItem('status');
    window.location.replace(
        'http://localhost/e-drogerie/e-drogerie-front/login.html'
    );
}