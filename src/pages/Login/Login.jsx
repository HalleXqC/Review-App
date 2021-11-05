import { useState } from "react"
import { Link , useHistory} from "react-router-dom"
import cls from "./Login.module.scss"
import { signIn } from "../../API"
import { MdEmail as EmailIcon } from 'react-icons/md'
import { RiLockPasswordFill as PasswordIcon } from 'react-icons/ri'

const Login = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const history = useHistory();

    const logIn = e => {
        e.preventDefault()

        if(email && password){
            setLoading(true)
            signIn({
                email,
                password,
                returnSecureToken: true
            })
            .then(res => res.json())
            .then(r => {
                if(r.localId){
                    return {
                        status: true,
                        user: r
                    }
                }else{
                    return {
                        status: false,
                        message: r.error.message
                    }
                }
            })
            .then(resp => {
                if(resp.status === true){
                    localStorage.setItem('user', JSON.stringify(resp.user));
                    setEmail('');
                    setPassword('');
                    setLoading(false);
                    history.push("/home");
                }else{
                    setLoading(false);
                    playErrorSound();
                    setErrors(resp.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            playErrorSound()
            setErrors('You should fill up the fields!')
        }
    }

    function playErrorSound(){
        const bleep = new Audio();
        bleep.src = "/sound/error.mp3"; 
        bleep.play();
    }

    return (
        <div className={cls.root}>
            <div className={cls.mainBlock}>
                <div className={cls.mainLeft}>
                    <img src="/img/review_bg.png" alt="review" />
                </div>
                <div className={cls.mainRight}>
                    <form>
                        <h4>Authorization</h4>
                        <label>
                            <EmailIcon className={cls.icon}/>
                            <input
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                }}
                                type="email" 
                                placeholder="Enter your email"
                            />
                        </label>
                        <label>
                            <PasswordIcon className={cls.icon}/>
                            <input
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                                type="password" 
                                placeholder="Password"
                            />
                        </label>
                        {errors && (
                            <p className={cls.errors}>{errors}</p>
                        )}
                        <button onClick={logIn} disabled={loading} className={cls.button}>Log In</button>
                        <span>Dont have an account yet? <Link to="/register" className={cls.a}>Register</Link> </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login