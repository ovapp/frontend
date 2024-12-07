import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
apiKey: "AIzaSyAzI3GYyBXepCt3fzJ8HknEs2leyz4y33Q",
authDomain: "openvoice-823aa.firebaseapp.com",
projectId: "openvoice-823aa",
storageBucket: "openvoice-823aa.firebasestorage.app",
messagingSenderId: "403136487269",
appId: "1:403136487269:web:4c5abbcedaae0061350b8c",
measurementId: "G-L8GZENB2RS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
