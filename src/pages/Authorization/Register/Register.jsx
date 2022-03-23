import cls from './Register.module.scss'
import { useState } from 'react'
import { Link , useHistory} from "react-router-dom"
import { registerNewUser, saveLogData } from '../../../API'
import { MdEmail as EmailIcon } from 'react-icons/md'
import { RiLockPasswordFill as PasswordIcon } from 'react-icons/ri'
import { FaMale as Male} from 'react-icons/fa'
import { FaFemale as Female } from 'react-icons/fa'
import { IoPerson as Human } from 'react-icons/io5'

const Register = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [nick , setNick] = useState('');
    const [gender , setGender] = useState('');
    const [loading , setLoading] = useState(false)
    const [errors, setErrors] = useState('')

    const history = useHistory()

    const signUp = e => {
        e.preventDefault()

        if(email && password && nick && gender){
            setLoading(true)
            registerNewUser({
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
                    saveLogData({
                        email,
                        nick,
                        gender
                    }, resp.user.localId)
                    .then(() => {
                        localStorage.setItem('user', JSON.stringify(resp.user));
                        setEmail('')
                        setPassword('')
                        setNick('')
                        setGender('')
                        setLoading(false)
                        history.push("/home")
                    })
                    .catch(err => {
                        console.error(err);
                    })
                }else{
                    setLoading(false);
                    playErrorSound();
                    setErrors(resp.message);
                }
            })
            .catch((err) => {
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
                        <h4>Registration</h4>
                        <label className={cls.label}>
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
                        <label className={cls.label}>
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
                        <label className={cls.label}>
                            <Human className={cls.icon} />
                            <input 
                                value={nick}
                                onChange={e => {
                                    setNick(e.target.value)
                                }}
                                type="text" 
                                placeholder="Nickname"
                            />
                        </label>
                        <div className={cls.labelDiff}>
                            <label className={cls.genderInput}>
                                <input 
                                    value="male"
                                    onChange={e => {
                                        setGender(e.target.value)
                                    }}
                                    name="gender" 
                                    type="radio"
                                /> Male <Male/>
                            </label>
                            <label className={cls.genderInput}>
                                <input
                                    value="female"
                                    onChange={e => {
                                        setGender(e.target.value)
                                    }}
                                    name="gender" 
                                    type="radio"
                                /> Female <Female/>
                            </label>
                        </div>
                        {errors && (
                            <p className={cls.errors}>{errors}</p>
                        )}
                        <button onClick={signUp} disabled={loading} className={cls.button}>Register</button>
                        <span>Already have account? <Link to="/login" className={cls.a}>Login</Link> </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register