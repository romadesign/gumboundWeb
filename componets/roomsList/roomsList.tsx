import Cards from '../cards/cards'
import styles from '@/styles/page.module.css'

const roomsList = () => {
    return(
        <div className={styles.roomListContainer}>
            <Cards 
            hall={3}
            title={"mi sala"}
            typeGame={"score"}
            status={true}
            numberOfPlayer={1}
            />
        </div>
    )
}

export default roomsList;