import { useEffect, useState } from 'react'
import image from '../assets/image.png'
import shield from '../assets/shield.png'
import { Button } from '../components/Button'
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { setUserRedux } from '../actions/user'
import { useNavigate } from 'react-router-dom'

export function Login() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = () => {
        signInWithEmailAndPassword(auth, email, pass).then((credentials) => {

            const {
                email,
                uid
            } = credentials.user            

            const config = {
                email: email,
                uid: uid
            }
            dispatch(setUserRedux(config))
        }).then(() => {
            navigate('/')
        }).catch((err) => {
            console.error('error - ', err)
        })
    }

    return(
        <div style={classes.component}>
            <div style={classes.header}>
                <p style={classes.name}>
                    Dungeons and Dragons
                </p>
            </div>
            <div style={classes.body}>
                <div style={classes.form}>
                    <p>Email:</p>
                    <input style={classes.inputs} type='email' onChange={((e) => setEmail(e.target.value))}/>
                    <p>Senha:</p>
                    <input style={classes.inputs} type='password' onChange={((e) => setPass(e.target.value))}/>
                    <div onClick={(() => navigate('/register'))} style={classes.createAccount}>
                        <p style={classes.register}>Ainda não possui uma conta?</p>
                    </div>
                    <Button func={login} name={'Entrar'}/>
                </div>
            </div>
        </div>
    )
}

const classes = {
    component: {
        display: 'grid',
        height: '100vh',
    },
    header: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'end'
    },
    name: {
        paddingLeft: '10px'
    },
    body: {
        backgroundImage: `url(${shield})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'grid',
        alignItems: 'center'
    },
    form: {
        display: 'grid',
        justifyContent: 'center'
    },
    inputs: {
        width: '200px',
        height: '40px'
    },
    createAccount: {
        display: 'flex',
        justifyContent: 'end'
    },
    register: {
        color: 'gray',
        fontSize: 'small',
        textDecoration: 'underline'
    }
}