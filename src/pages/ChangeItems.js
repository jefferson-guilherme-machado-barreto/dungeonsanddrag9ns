import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NvBar } from '../components/NvBar'
import { Items } from '../components/Items'
import { auth, db } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { setUserRedux } from '../actions/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import buttonBorder from '../assets/buttonBorder.png'
import { Button } from '../components/Button'

export function ChangeItems(props) {

    const [items, setItems] = useState(null)
    const [label, setLabel] = useState(props.label)
    const [quant, setQuant] = useState(props.quant)
    const [isDeleted, setIsDeleted] = useState(false)
    console.log('props', props)

    const userRedux = useSelector((state) => state.user.userData)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if(!!userRedux) {
            const q = query(collection(db, 'players', userRedux.uid, 'inventory'))
            let data = []
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    data.push(Object.assign({}, change.doc.data(), {
                        id: change.doc.id
                    }))
                })

                setItems(data)
            })
        }

        setIsDeleted(false)

    }, [isDeleted])

    const goBackHome = () => {
        navigate('/')
    }

    const addItem = () => {
        // navigate('/addItem')
    }

    const ChangeItem = async (id) => {
        if(!!userRedux) {
            await deleteDoc(doc(db, 'players', userRedux.uid, 'inventory', id))
            setIsDeleted(true)
        }
    }

    return(
        <div style={classes.component}>
            <NvBar funcBefore={goBackHome} before='arrow' title='Atualizar Item' />
            {/* <Items ChangeItem={ChangeItem} items={items} /> */}
            <div style={classes.form}>
                <p>Nome:</p>
                <input style={classes.inputs} type='text' value={label} onChange={((e) => setLabel(e.target.value))} />
                <p>Quantidade:</p>
                <input style={classes.inputs} type='number' value={quant} onChange={((e) => setQuant(e.target.value))} />
                <Button func={addItem} name={'Salvar'}/>
            </div>
        </div>
    )
}

const classes = {
    component: {
        backgroundImage: `url(${buttonBorder})`,
        backgroundSize: 'cover',
    },
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