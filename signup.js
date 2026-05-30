Import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB86n79oAqZ1rNWtezWxZ-f0ngV2QJn1fw",
  authDomain: "poolcash-6692c.firebaseapp.com",
  projectId: "poolcash-6692c",
  storageBucket: "poolcash-6692c.firebasestorage.app",
  messagingSenderId: "866544389541",
  appId: "1:866544389541:web:2382c85a768da8c5bd6c4c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUpBtn = document.getElementById('signUpBtn');

if (signUpBtn) {
    signUpBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const username = document.getElementById('username').value.trim();
        
        const activeCountry = document.querySelector('.border-amber-500, .bg-amber-500\\/20'); 
        const country = activeCountry ? activeCountry.innerText.trim() : "غير محدد";

        if (!email || !password) {
            alert("المرجو ملء البريد الإلكتروني وكلمة المرور.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                localStorage.setItem('currentUser', JSON.stringify({
                    uid: user.uid,
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    country: country,
                    email: email
                }));

                alert("تم إنشاء الحساب بنجاح!");
                window.location.href = "dashboard.html"; 
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('هاد الإيميل ديجا مسجل بيه حساب آخر.');
                } else if (error.code === 'auth/weak-password') {
                    alert('كلمة المرور ضعيفة (دير 6 د الأرقام أو الأحرف على الأقل).');
                } else {
                    alert('حدث خطأ: ' + error.message);
                }
            });
    });
}
