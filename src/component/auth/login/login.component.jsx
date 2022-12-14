import './login.style.css';
import { useEffect, useRef } from 'react';

import { useContext } from 'react';
import { LoginContext } from '../../../context/login.context';
import { UserContext } from '../../../context/user.context';

import { getRedirectResult } from 'firebase/auth';
import Close from '../../../assets/buttons/x.svg';
import { 
    signInAuthWithEmailAndPassword,
    signInAuthWithGoogle, auth,
    signUpWithEmailAndPassword
} from '../../../util/firebase.js';

const Login = () => {
    const { loginActive, setLoginActive, setLoginPending } = useContext(LoginContext);
    const { setCurrentUser } = useContext(UserContext);

    const loginRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const activeHandler = () => {
        setLoginActive(false);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            await signInAuthWithEmailAndPassword(email, password);
            setLoginActive(false);
            e.target.reset();
        } catch(error) {
            alert(error)
        }
    }

    const googleSignIn =  async () => {
        setLoginPending(true);
        setLoginActive(false);
        await signInAuthWithGoogle();
        setLoginPending(false);
    }

    

    useEffect(() => {
        const asyncFn = async () => {
            const response = await getRedirectResult(auth);
            if(response) {
                setCurrentUser(response.user);
            }
        }
        asyncFn();
    }, []);

    // const signUpHandler = () => {
      
    // }

    return(
        <div className={`login-container ${loginActive ? 'active': ''}`}>
            <div className='login-form'>
                <div className='close-login' onClick={activeHandler}>
                    <img src={Close} alt='close form icon'/>
                </div>
                <section className='heading'>
                    <h3>Login to your account</h3>
                    <p>Don't have an account ? <a onClick={googleSignIn} className='sign-in' href='#sign-in'>Sign up!</a></p>
                </section>
                <form ref={loginRef} onSubmit={loginHandler} autoComplete='off'>
                    <input ref={emailRef} type='email' name='email' className='login_input'  placeholder='Email' required/>
                    <input ref={passwordRef} type='password' name='password' className='login_input' placeholder='Password' required/>
                    <div className='login_features'>
                        <div className='remember-me'>
                            <input type='checkbox' id='remember_user'/>
                            <label htmlFor='remember_user'>Remember me</label>
                        </div>
                        <a className='reset-password' href='#reset-password'>Lost password ?</a>
                    </div>
                    <button type='submit' className='login-submit'>Log in</button>
                </form>
                <div className='potentials'>
                    <h6>Log in using your account on:</h6>
                    <div>
                        <button className='potentials-btn' onClick={googleSignIn}>Google</button>
                        <button className='potentials-btn'>Microsoft</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;