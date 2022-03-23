import cls from './EditProfilePage.module.scss'
import Nav from '../../Components/Nav/Nav'
import { editUser, getUser } from '../../API'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { IoMdReturnLeft as Return } from 'react-icons/io'

const EditProfilePage = () => {

    const {register, handleSubmit} = useForm();
    const user = JSON.parse(localStorage.getItem('user'));
    const [localUser, setLocalUser] = useState(null);
    const [errors, setErrors] = useState(null)
    const [useEffectUpdate, setUseEffectUpdate] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isChangeImage, setIsChangeImage] = useState(false)

    useEffect(() => {
        getUser(user.localId)
        .then(r => r.json())
        .then(re => {
            setLocalUser(re)
        })
        .catch(err => {
            console.error(err);
        })
    }, [useEffectUpdate, user.localId])

    function onSubmit(data, e){
        setErrors('')
        setLoading(true)
        editUser(data, user.localId)
        .then(r => r.json())
        .then(re => {
            setLoading(false)
            e.target.reset()
            setUseEffectUpdate({re, e})
        })
    }

    function onError(err){
        playErrorSound()
        const errors = Object.entries(err).map(item => {
            return {
                ...item[1]
            }
        })
        setErrors(errors)
    }

    function playErrorSound(){
        const bleep = new Audio();
        bleep.src = "/sound/error.mp3"; 
        bleep.play();
    }

    return (
        <div className={cls.root}>
            <Nav/>
            {localUser ? (
                <div className={cls.main}>
                    <div className={cls.image}>
                        {localUser.image ? (
                            <div 
                                className={cls.img}
                                onClick={() => setIsChangeImage(!isChangeImage)} 
                                title="Change profile pic"
                                style={isChangeImage === true ? {background: `url("${localUser.image}") center / cover`, transform: "translateX(-150%)"} : {background: `url("${localUser.image}") center / cover`}}
                            ></div>
                        ) : (
                            <div 
                                className={cls.img}
                                onClick={() => setIsChangeImage(!isChangeImage)} 
                                title="Change profile pic"
                                style={isChangeImage === true ? {background: 'url("/img/user.png") center / cover', transform: "translateX(-150%)"} : {background: 'url("/img/user.png") center / cover'}}
                            ></div>
                        )}
                        <label 
                            className={cls.imageLabel} 
                            style={isChangeImage === false ? {transition: "0.3s", visibility: "hidden", opacity: "0"} : isChangeImage === true ? {transition: "1s", visibility: "visible", opacity: "1"} : null}
                        >
                            <h3>New image link:</h3>
                            <input 
                                form="editProfileForm"
                                type="text"
                                placeholder="http://"
                                defaultValue={localUser?.image}
                                {
                                    ...register("image")
                                }
                            />
                        </label>
                    </div>
                    <form id="editProfileForm" className={cls.form} onSubmit={handleSubmit(onSubmit, onError)}>
                        <label>
                            <h3>Email:</h3>
                            <input 
                                type="text"
                                placeholder="EMAIL"
                                defaultValue={localUser.email}
                                {
                                    ...register("email", {
                                        required: {
                                            value: true,
                                            message: 'email is required'
                                        }
                                    })
                                }
                            />
                        </label>
                        <label>
                            <h3>Nickname:</h3>
                            <input 
                                type="text"
                                placeholder="NICKNAME"
                                defaultValue={localUser.nick}
                                {
                                    ...register("nick", {
                                        required: {
                                            value: true,
                                            message: 'nick is required'
                                        }
                                    })
                                }
                            />
                        </label>
                        <hr />
                        <label>
                            <h3>Name:</h3>
                            <input 
                                type="text"
                                placeholder="NAME"
                                defaultValue={localUser?.name}
                                {
                                    ...register("name")
                                }
                            />
                        </label>
                        <label>
                            <h3>About you:</h3>
                            <textarea
                                type="text"
                                placeholder="ABOUT YOU"
                                className={cls.textarea}
                                defaultValue={localUser?.bio}
                                {
                                    ...register("bio")
                                }
                            ></textarea>
                        </label>
                        <div className={cls.errors}>
                            {errors && errors.map((item, i) => (
                                <span key={i}>{item.message}; &nbsp;</span>
                            ))}
                        </div>
                        <div className={cls.buttons}>
                            <input type="submit" value="Submit" className={cls.submit} disabled={loading}/>
                            <input type="reset" value="Reset" className={cls.reset} onClick={() => setErrors('')} disabled={loading}/>
                        </div>
                    </form>
                    <Link className={cls.returnBtn} to="/profile">Return&nbsp;<Return className={cls.returnIcon}/></Link>
                </div>
            ) : null}
        </div>
    )
}

export default EditProfilePage