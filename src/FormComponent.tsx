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

    const handleChange = <T,>(e: React.ChangeEvent<HTMLInputElement>, setFunction: React.Dispatch<React.SetStateAction<T>>, transform: (value: string) => T) => {
        setFunction(transform(e.currentTarget.value));
    }

    const handleTipSelect = (e: React.MouseEvent<HTMLSpanElement>) => {
        document.querySelector('.selected')?.classList.remove("selected");
        e.currentTarget.classList.add("selected");

        setTipSelected(Number(e.currentTarget.innerText.replace('%', '')));
    }

    const handleReset = () => {
        if (customTipRef.current) {
            customTipRef.current.value = 'Custom';
        }

        if (tipPerPersonRef.current) {
            tipPerPersonRef.current.innerText = '$0.00';
        }

        if (totalPerPersonRef.current) {
            totalPerPersonRef.current.innerText = '$0.00';
        }

        setBill('0.00');
        setNumberOfPeople(0);
        setTipSelected(0);
        document.querySelector('.selected')?.classList.remove("selected");
    }

    return (
        <form>
            <section className="editable-info">
                <div className="bill-container">
                    <label htmlFor="bill-amount">Bill</label>
                    <div className="bill-container-grid">
                        <input type="number" className="bill-amount" id="bill-amount" value={bill}
                               onChange={e => handleChange(e, setBill, String)}/>
                    </div>
                </div>

                <div className="tip-percentage-container">
                    <h4>Select Tip %</h4>
                    <div className="tip-percentage-grid">
                        {tips.map(tip => (<span key={tip}
                                                className={`tip-control predefined-tip-percentage ${tipSelected === Number(tip.slice(0, tip.length - 1)) ? 'selected' : ''}`}
                                                onClick={handleTipSelect}>{tip}</span>))}
                        <input className={`tip-control custom-tip-control ${
                            !tips.includes(`${tipSelected}%`) && tipSelected !== 0 ? 'selected' : ''
                        }`} size={4} placeholder="Custom" ref={customTipRef}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTipSelected(Number(e.currentTarget.value))}/>
                    </div>
                </div>

                <div className="people-container">
                    <label htmlFor="people-number">Number of people</label>
                    <div className="people-container-grid">
                        <input type="number" className="people-number" id="people-number" value={numberOfPeople}
                               onChange={(e) => handleChange(e, setNumberOfPeople, Number)}/>
                    </div>
                </div>
            </section>
            <section className="total-summary">
                <div className="summary-rows">
                    <div className="summary-row">
                        <div>Tip Amount<span className="per-person"></span></div>
                        <span className="money-amount"
                              ref={tipPerPersonRef}>&#36;{numberOfPeople ? (Number(bill) * tipSelected / 100 / numberOfPeople).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="summary-row">
                        <div>Total<span className="per-person"></span></div>
                        <span className="money-amount"
                              ref={totalPerPersonRef}>&#36;{numberOfPeople ? ((Number(bill) * (1 + tipSelected / 100)) / numberOfPeople).toFixed(2) : '0.00'}</span>
                    </div>
                </div>
                <span className="btn" onClick={handleReset}>Reset</span>
            </section>
        </form>
    )
}