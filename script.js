const firebaseConfig = {
    apiKey: "AIzaSyBqpYS8WEvuJ76jidpoLwRYPGfsxAcRVlI",
    authDomain: "datos-js-practice.firebaseapp.com",
    projectId: "datos-js-practice",
    storageBucket: "datos-js-practice.appspot.com",
    messagingSenderId: "215656454342",
    appId: "1:215656454342:web:9623b87631203e751ddfc7",
    measurementId: "G-R4Q4P9W5SZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')
    
    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }


    // Validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introducí un mail válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }


    // Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres y no más de 15, números, mayúsculas y minúsculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // Si todos los campos son válidos, enviar formulario

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
        // BACKEND
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });


    }
 }
);