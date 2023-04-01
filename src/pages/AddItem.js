import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../components/Button'
import { NvBar } from '../components/NvBar'
import { useNavigate } from 'react-router-dom'
import { ModalDungeon } from '../components/ModalDungeon'
import buttonBorder from '../assets/buttonBorder.png'

export function AddItem() {

    const [label, setLabel] = useState('')
    const [quant, setQuant] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const userRedux = useSelector((state) => state.user.userData)

    const navigate = useNavigate()

    const addItem = async () => {
        const docRef = await addDoc(collection(db, 'players', userRedux.uid, 'inventory'), {
            label: label,
            quant: quant
        })

        openModal()
        setLabel('')
        setQuant(0)
    }

    const goBack = () => {
        navigate('/')
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <div>
            <NvBar funcBefore={goBack} before='arrow' title='Adicionar Item' />
            <ModalDungeon modalIsOpen={modalIsOpen} closeModal={closeModal} />
            <div style={classes.form}>
                <p>Nome:</p>
                <input style={classes.inputs} type='string' value={label} onChange={((e) => setLabel(e.target.value))} />
                <p>Quantidade:</p>
                <input style={classes.inputs} type='number' value={quant} onChange={((e) => setQuant(e.target.value))} />
                <Button func={addItem} name={'Adicionar'}/>
            </div>
        </div>
    )
}

const classes = {
    form: {
        display: 'grid',
        justifyContent: 'center',
        backgroundImage: `url(${buttonBorder})`,
        backgroundSize: 'cover',
    },
    inputs: {
        width: '200px',
        height: '40px'
    }
}