import { createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    sendPasswordResetEmail, 
    onAuthStateChanged } from "firebase/auth";

import { addDoc, collection, waitForPendingWrites } from "firebase/firestore";
import { auth, db } from "./config";


const signupForm = document.querySelector("#sign-up");
const loginForm = document.querySelector("#log-in");
const phoneSignupForm = document.querySelector("#phone-signup");
const resetPwForm = document.querySelector("#reset-password");




// sign up user
// send email confirmation email
// add userinfo to database
// redirect to /  (quiz page)
const signUp = async () => {

    const fullname = signupForm.fullname.value;
    const username = signupForm.username.value
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const dateof = signupForm.dateofbirth.value;

    if(!fullname ||!email || !password || !username || !dateof ) {
        alert("please enter the required fields");
        return;
    }


    try {

        // sign up
        let creds = await createUserWithEmailAndPassword(auth, email, password);


        // add userinfo to database
        let usersColRef = collection(db, "users");

        await addDoc(usersColRef, {
            id: creds.user.uid,
            fullname: fullname,
            username: username,
            dateofbirth: dateofbirth,
            email,
            score: 0
        })

        
        // send confirmation email
        await sendEmailVerification(creds.user);
        

        alert("sign up with success")

        onAuthStateChanged(auth, async (user) => {
            if(user) {
                window.location = "/";
            }
        })


    }
    catch (e) {
        alert(e.message)
    }

}


// sign in user
// redirect to /  (quiz page)
const signin =  async () => {
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if(!email || !password) {
        alert("please enter the required fields");
        return;
    }


    // sign up
    await signInWithEmailAndPassword(auth, email, password);


    alert("sign in with success")



    onAuthStateChanged(auth, async (user) => {
        if(user) {
            window.location = "/";
        }
    })

}



const signUpWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider).then(result => {

        console.log(result.user);

        
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                window.location = "/";
            }
        })

    })
}

const captchaSettings = {
    'size': 'invisible',
};

let recaptchaVerifier = new RecaptchaVerifier("phone-btn", captchaSettings, auth)
let confirmationResult;

const signUpWithPhoneNumber = async () => {
    const number = phoneSignupForm.phone.value;

    if(!number) {
        alert("please enter the required fields");
        return;
    }


    try {

        confirmationResult = await signInWithPhoneNumber(auth, number, recaptchaVerifier );


        document.querySelector("#phone-btn-confirm").disabled = false;
        phoneSignupForm.code.disabled = false;


        onAuthStateChanged(auth, async (user) => {
            if(user) {
                window.location = "/";
            }
        })

    
    } catch (error) {
        alert(error.message)    
    }
}


const confirmVerificationCode = async () => {
    const code = phoneSignupForm.code.value;


    try {
        await confirmationResult.confirm(code);

        alert("confirmed")

        
        
    } catch (error) {
        alert(error.message)
    }


}


const resetPassword = async () => {
    const email = resetPwForm.email.value;

    if(!email) {
        alert("please enter the required fields");
        return;
    }


    try {
        await sendPasswordResetEmail(auth, email);

        alert("password reset mail was sent")
        
    } catch (error) {
        alert(error.message);
    }
    
}



document.getElementById("signup-btn").addEventListener("click", signUp);

document.getElementById("signin-btn").addEventListener("click", signin);

document.getElementById("google").addEventListener("click", signUpWithGoogle);

document.getElementById("phone-btn").addEventListener("click", signUpWithPhoneNumber);

document.getElementById("phone-btn-confirm").addEventListener("click", confirmVerificationCode);

document.getElementById("reset-pw-btn").addEventListener("click", resetPassword);