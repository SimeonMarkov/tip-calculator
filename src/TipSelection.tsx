import Tip from "./Tip.tsx";
import './Tip.css';

export function TipSelection() {
    const tips = ['5%', '10%', '15%', '25%', '50%']
    return (
        <>
        <section className="tip-percentage-container">
            <h4>Select Tip %</h4>
            <div className="tip-percentage-grid">
            {tips.map(tip => (<Tip key={tip} className="tip-control predefined-tip-percentage" value={tip}/>))}
            <Tip className="tip-control custom-tip-control" contentEditable={true} value="Custom" />
            </div>
        </section>
            </>
    );
}