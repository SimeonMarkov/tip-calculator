import './FormComponent.css';
import {useEffect, useState} from "react";
import * as React from "react";

export default function FormComponent() {

    const tips: string[] = ['5%', '10%', '15%', '25%', '50%']
    const [bill, setBill] = useState<string>('0.00');
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
    const [tipPerPerson, setTipPerPerson] = useState<string>('0.00');
    const [totalPerPerson, setTotalPerPerson] = useState<string>('0.00');
    const [tipSelected, setTipSelected] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setFunction: Function) => {
        setFunction(e.target.value);
    }

    const handleTipSelect = (e) => {
        document.querySelector('.selected')?.classList.remove("selected");
        e.target.classList.add("selected");

        setTipSelected(Number(e.target.innerText.replace('%', '')));
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            if (numberOfPeople) {

                setTipPerPerson((Number(bill) * tipSelected / 100 / numberOfPeople).toFixed(2));
                setTotalPerPerson(((Number(bill) * (1 + tipSelected / 100)) / numberOfPeople).toFixed(2));
            } else {
                setTipPerPerson('0.00');
                setTotalPerPerson('0.00');
            }
        }, 50);
        return () => clearTimeout(interval);
    }, [bill, numberOfPeople, tipSelected]);

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
                    {tips.map(tip => (<span key={tip} className="tip-control predefined-tip-percentage" onClick={handleTipSelect}>{tip}</span>))}
                    <input className="tip-control custom-tip-control" size="4" placeholder="Custom" onClick={handleTipSelect} onInput={(e) => setTipSelected(e.target.value)} />
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
                    <span className="money-amount">${tipPerPerson}</span>
                </div>
                <div className="summary-row">
                    <div>Total<span className="per-person"></span></div>
                    <span className="money-amount">${totalPerPerson}</span>
                </div>
                <span className="btn">Reset</span>
            </section>
        </form>
    )
}