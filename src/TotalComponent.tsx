import './Total.css';

export function TotalComponent() {
    return (
        <section className="total-summary">
            <div className="summary-row">
                <div>Tip Amount<span className="per-person"></span></div>
                <span>$0.00</span>
            </div>
            <div className="summary-row">
                <div>Total<span className="per-person"></span></div>
                <span>$28.51</span>
            </div>
            <span className="btn">Reset</span>
        </section>
    );
}