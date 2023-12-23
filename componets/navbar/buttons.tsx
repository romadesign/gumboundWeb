interface buttonsProps {
    title: React.ReactNode;
    // img: React.ReactNode;
}

const buttons: React.FC<buttonsProps> = ({ title }) => {
    return (
        <>
            <button>
                {title}
            </button>
        </>
    )
}

export default buttons;