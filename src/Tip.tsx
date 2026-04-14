export default function Tip (props) {

    return (
        <>
            <span className={props.className} contentEditable={props.contentEditable} onClick={props.handleSelect}>{props.value}</span>
        </>
    )
}