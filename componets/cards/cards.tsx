interface cardssProps {
    hall: number;
    title: string;
    typeGame: string;
    status: boolean;
    numberOfPlayer: number;
    // img: React.ReactNode;
}

const cards: React.FC<cardssProps> = ({ hall, title, typeGame, status, numberOfPlayer }) => {
    return (
        <div>
            <div>
                <p>{hall}</p>
                <h6>{title}</h6>
            </div>
            <div>
                <span>{typeGame}</span>
                <span>{status}</span>
                <span>{numberOfPlayer}</span>
            </div>
        </div>
    )
}

export default cards;