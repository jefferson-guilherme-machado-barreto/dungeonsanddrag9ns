import { useState } from 'react'
import image from '../assets/image.png'
import shield from '../assets/shield.png'
import { Button } from '../components/Button'
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setUserRedux } from '../actions/user'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { doc, setDoc } from 'firebase/firestore'

export function Register() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validation = () => {
        if(pass === confirmPass) {
            return true
        } else {
            return false
        }
    }

    const register = () => {

        let valid = validation()

        if(valid === true) {

            createUserWithEmailAndPassword(auth, email, pass).then((credentials) => {
    
                const {
                    email,
                    uid
                } = credentials.user            
    
                const config = {
                    email: email,
                    uid: uid
                }
                dispatch(setUserRedux(config))
                return config
            }).then(async (config) => {
                
                await setDoc(doc(db, 'players', config.uid), {
                    active: true,
                    email: config.email
                  })
            }).then(() => {
                navigate('/')
            }).catch((err) => {
                console.error('error - ', err)
            })
        }
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
                    <p>Confirme a Senha:</p>
                    <input style={classes.inputs} type='password' onChange={((e) => setConfirmPass(e.target.value))}/>
                    <div onClick={(() => navigate('/login'))} style={classes.createAccount}>
                        <p style={classes.register}>Já possuo uma conta</p>
                    </div>
                    <Button func={register} name={'Cadastrar'}/>
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