export function Button(props) {

    const { name, func } = props

    return(
        <div style={style.component}>
            <button onClick={(() => func())} style={style.button}>
                {name}
            </button>
        </div>
    )
}

const style = {
    component: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        width: '200px',
        height: '40px',
        color: 'orange',
        marginTop: '30px',
        background: 'linear-gradient(to bottom right, #ea6439 0%, #000000 100%)',
        borderRadius: '5px',
        border: 'none',
        color: '#000000'
    }
}