import './FormComponent.css';
import {useRef, useState} from "react";
import * as React from "react";

export default function FormComponent() {

    const tips: string[] = ['5%', '10%', '15%', '25%', '50%']
    const [bill, setBill] = useState<string>('0.00');
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
    const [tipSelected, setTipSelected] = useState<number>(0);

    const customTipRef = useRef<HTMLInputElement>(null);
    const tipPerPersonRef = useRef<HTMLSpanElement>(null);
    const totalPerPersonRef = useRef<HTMLSpanElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setFunction: React.SetStateAction<any>) => {
        setFunction(e.target.value);
    }

    const handleTipSelect = (e) => {
        document.querySelector('.selected')?.classList.remove("selected");
        e.target.classList.add("selected");

        setTipSelected(Number(e.target.innerText.replace('%', '')));
    }

    const handleReset = () => {
        customTipRef.current.value = 'Custom';
        tipPerPersonRef.current.innerText = '$0.00';
        totalPerPersonRef.current.innerText = '$0.00';

        setBill('0.00');
        setNumberOfPeople(0);
        setTipSelected(0);
        document.querySelector('.selected')?.classList.remove("selected");
    }

    return (
        <form>
            <div className="bill-container">
                <label htmlFor="bill-amount">Bill</label>
                <div className="bill-container-grid">
                    <input type="number" className="bill-amount" id="bill-amount" value={bill} onChange={e => handleChange(e, setBill)}/>
                </div>
            </div>

            <section className="tip-percentage-container">
                <h4>Select Tip %</h4>
                <div className="tip-percentage-grid">
                    {tips.map(tip => (<span key={tip} className={`tip-control predefined-tip-percentage ${tipSelected === Number(tip.slice(0, tip.length - 1)) ? 'selected' : ''}`} onClick={handleTipSelect}>{tip}</span>))}
                    <input className={`tip-control custom-tip-control ${
                        !tips.includes(`${tipSelected}%`) && tipSelected !== 0 ? 'selected' : ''
                    }`} size={4} placeholder="Custom" ref={customTipRef} onChange={(e) => setTipSelected(e.target.value)} />
                </div>
            </section>

            <div className="people-container">
                <label htmlFor="people-number">Number of people</label>
                <div className="people-container-grid">
                    <input type="number" className="people-number" id="people-number" value={numberOfPeople}
                           onChange={(e) => handleChange(e, setNumberOfPeople)}/>
                </div>
            </div>

            <section className="total-summary">
                <div className="summary-row">
                    <div>Tip Amount<span className="per-person"></span></div>
                    <span className="money-amount" ref={tipPerPersonRef}>&#36;{numberOfPeople ? (Number(bill) * tipSelected / 100 / numberOfPeople).toFixed(2) : '0.00'}</span>
                </div>
                <div className="summary-row">
                    <div>Total<span className="per-person"></span></div>
                    <span className="money-amount" ref={totalPerPersonRef}>&#36;{numberOfPeople ? ((Number(bill) * (1 + tipSelected / 100)) / numberOfPeople).toFixed(2) : '0.00'}</span>
                </div>
                <span className="btn" onClick={handleReset}>Reset</span>
            </section>
        </form>
    )
}