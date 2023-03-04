import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../components/Button'
import { NvBar } from '../components/NvBar'
import { useNavigate } from 'react-router-dom'

export function AddItem() {

    const [label, setLabel] = useState('')
    const [quant, setQuant] = useState(0)

    const userRedux = useSelector((state) => state.user.userData)

    const navigate = useNavigate()

    const addItem = async () => {
        const docRef = await addDoc(collection(db, 'players', userRedux.uid, 'inventory'), {
            label: label,
            quant: quant
        })

        setLabel('')
        setQuant(0)
    }

    const goBack = () => {
        navigate('/')
    }

    return(
        <div>
            <NvBar funcBefore={goBack} before='arrow' title='Adicionar Item' />
            <div style={classes.form}>
                <p>Nome:</p>
                <input style={classes.inputs} type='string' onChange={((e) => setLabel(e.target.value))} />
                <p>Quantidade:</p>
                <input style={classes.inputs} type='number' onChange={((e) => setQuant(e.target.value))} />
                <Button func={addItem} name={'Adicionar'}/>
            </div>
        </div>
    )
}

const classes = {
    form: {
        display: 'grid',
        justifyContent: 'center'
    },
    inputs: {
        width: '200px',
        height: '40px'
    }
}