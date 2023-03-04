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

export function Home() {

    const [items, setItems] = useState(null)

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
    }, [])

    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(setUserRedux(null))
        }).then(() => {
            navigate('/login')
        }).catch((err) => {
            console.error('err - ', err)
        })
    }

    const addItem = () => {
        navigate('/addItem')
    }

    const deleteItem = async (id) => {
        if(!!userRedux) {
            await deleteDoc(doc(db, 'players', userRedux.uid, 'inventory', id))
        }
    }

    return(
        <div style={classes.component}>
            <NvBar funcBefore={logOut} before='arrow' title='Inventário' after='addItem' funcAfter={addItem} />
            <Items deleteItem={deleteItem} items={items} />
        </div>
    )
}

const classes = {
    component: {
        backgroundImage: `url(${buttonBorder})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vw'
    }
}