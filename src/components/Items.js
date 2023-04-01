import trash from '../assets/trash.png'
import { useNavigate } from 'react-router-dom'

export function Items(props) {

    const { items, deleteItem } = props
    const navitage = useNavigate()

    const changeItem = () => {
        navitage('/changeItem')
    }

    return(
        <div style={classes.element}>
            {!!items && items.map((item) => {
                console.log('item', item)
                return(
                    <div style={classes.components}>
                        <div style={classes.trash}>
                            <img onClick={(() => deleteItem(item.id))} src={trash} />
                        </div>
                        <div style={classes.content}>
                            <div onClick={(() => changeItem())}>
                                <p>{item.label}</p>
                            </div>
                            <div>
                                <p>x{item.quant}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const classes = {
    element: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    components: {
        display: 'grid',
        flex: '1 1 150px',
        background: 'gray',
        margin: '10px',
        background: 'linear-gradient(to bottom left, #39AAEA 0%, #000000 100%)'
    },
    trash: {
        display: 'flex',
        justifyContent: 'end',
        margin: '5px'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}