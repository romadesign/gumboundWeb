import styles from '@/styles/page.module.css'

const character = () => {
    return (
        <div className={styles.characterContainer}>
            <div>
                <h6>Romacode</h6>
            </div>
            <div>
                <span>1300 Points</span>
                <span>1300 Cash</span>
                <span>423423 Gold</span>
            </div>
        </div>
    )
}

export default character;