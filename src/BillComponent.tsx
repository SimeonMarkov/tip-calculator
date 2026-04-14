import './BillComponent.css'

export function BillComponent() {
    return (
        <>
            <div className="bill-container">
                <h4>Bill</h4>
                <div className="bill-container-grid">
                    <img src="images/icon-dollar.svg" alt="Dollar sign"/>
                    <span className="bill-amount" contentEditable={true}>142.55</span>
                </div>
            </div>
        </>
    );
}