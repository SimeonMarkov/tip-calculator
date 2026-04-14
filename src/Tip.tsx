export default function Tip (props) {

    const handleSelect = (e) => {
        document.querySelector('.predefined-tip-percentage.selected')?.classList.remove("selected");
        e.target.classList.add("selected");
    }

    return (
        <>
            <span className={props.className} contentEditable={props.contentEditable} onClick={handleSelect}>{props.value}</span>
        </>
    )
}