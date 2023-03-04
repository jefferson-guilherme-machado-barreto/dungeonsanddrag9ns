import arrow from '../assets/arrow.png'
import addItems from '../assets/addItems.png'

export function NvBar(props) {

    const {
        funcBefore,
        before,
        title,
        after,
        funcAfter
    } = props

    return (
        <nav>
            <ul style={classes.component}>
                {
                    before === 'arrow' ?
                    <li style={classes.li}>
                        <img onClick={(() => funcBefore())} src={arrow} />
                    </li> :
                    <div />
                }
                <li style={classes.li}>
                    <h1>{title}</h1>
                </li>
                {
                    after === 'addItem' ? 
                    <li style={classes.li}>
                        <img onClick={(() => funcAfter())} src={addItems} />
                    </li> :
                    <div />
                }
            </ul>
            <hr style={classes.divider}/>
        </nav>
    )
}

const classes = {
    component: {
        listStyleType: 'none',
        margin: '16px',
        padding: '0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    li: {
        display: 'inline'
    },
    divider: {
        borderTop: '3px solid #bbb',
        margin: '10px',
        borderRadius: '20px'
    }
}