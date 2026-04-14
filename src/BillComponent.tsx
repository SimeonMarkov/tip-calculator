import './BillComponent.css'

export function BillComponent() {
    return (
        <>
            <h4>Bill</h4>
            <div className="bill-container">
                <img src="images/icon-dollar.svg" alt="Dollar sign" />
                <span className="bill-amount" contentEditable={true}>142.55</span>
            </div>
        </>
    );
}