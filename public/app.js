// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail,  signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAzI3GYyBXepCt3fzJ8HknEs2leyz4y33Q",
authDomain: "openvoice-823aa.firebaseapp.com",
projectId: "openvoice-823aa",
storageBucket: "openvoice-823aa.firebasestorage.app",
messagingSenderId: "403136487269",
appId: "1:403136487269:web:4c5abbcedaae0061350b8c",
measurementId: "G-L8GZENB2RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore();
const db = getFirestore(app);

// Obtendo os elementos do formulário
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('current-password');
const usernameInput = document.getElementById('username');
const providerButton = document.getElementById('provider-button');

// Quando o formulário for enviado
signupForm.onsubmit = async (event) => {
    event.preventDefault(); // Impede o envio padrão do usuário

    const email = emailInput.value;
    const password = passwordInput.value;
    const username = usernameInput.value;

    try {
        
        // Verifica se o email já está em uso
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if(signInMethods.length > 0 ){
            alert("Este email já está em uso. Tente outro.");
            return;
        }

        // Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Salva o nome de usuário no Firestore
        await setDoc(doc(firestore, "users", user.uid), {
            username: username,
            email: email,
        });

        console.log('Usuário criado e salvo: ', user);

        // Redireciona o usuário para a página de login
        window.location.href = '/onboarding.html';
    } catch (error) {
        console.error("Erro ao criar a conta: ", error.message);
        alert('Erro ao criar a conta: ' + error.message);
    }
};

// Função para gerar uma senha aleatória
function gerarSenha(){
    const caracters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let senha = "";
    for (let i = 0; i < 12; i++){
        senha += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }
    return senha;
}

// Criação de conta com o Google
providerButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();

    try {
        // Realiza o login com Google
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const email = user.email;
        const username = user.displayName || email.split("@")[0];

        const password = gerarSenha();

        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(firestore, "users", user.uid), {
            username: username,
            email: email,
            password: password,
        });

        console.log("Usuário autenticado com Google e criado no Firestore");
        window.location.href = "/homepage.html";
    } catch (error) {
        console.error("Erro ao autenticar ou criar a conta: ", error.message);
        alert("Erro ao autenticar com Google: " + error.message);
    }
});