import Buttons from './buttons'
import Styles from '@/styles/navbar/navbar.module.css'

const navbar = () => {
    return (
        <div className={Styles.content}>
            <Buttons title={"ALL"} />
            <Buttons title={"WAIT"} />
            <Buttons title={"CREATE"} />
            <Buttons title={"ROM NUMBERS"} />
            <Buttons title={"QUICK PLAYER"} />
            <Buttons title={"MY INFO"} />
            <Buttons title={"SHOP"} />
            <Buttons title={"CHARGE"} />
            <Buttons title={"DAILY FREE CASH"} />
            <Buttons title={"4 HOURS FREE CASH"} />
        </div>)
}

export default navbar;