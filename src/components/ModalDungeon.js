import Modal from 'react-modal'
  
export function ModalDungeon(props) {
    const { modalIsOpen, closeModal } = props

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={classes}
                contentLabel="Modal dungeons"
            >
                <p style={classes.tittle}>Seu item foi adicionado ao inventário</p>
            </Modal>
        </div>
    );
}

const classes = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        background: 'linear-gradient(to bottom right, #ea6439 0%, #000000 100%)',
        transform: 'none',
        position: 'none',
        margin: '10px',
        padding: '5px'
    },
    tittle: {
        color: '#fff',
    }
};