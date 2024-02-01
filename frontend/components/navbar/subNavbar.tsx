import Buttons from './buttons'
const subNavbar = () => {
    return (
        <div data-testid="subnavbar" >
            <Buttons title={"Friends show"} />
            <Buttons title={"Guild show"} />
            <Buttons title={"Mod normal"} />
            <Buttons title={"Mod boss"} />
            <Buttons title={"Mod same"} />
            <Buttons title={"Mod Score"} />


        </div>
    )
}

export default subNavbar;