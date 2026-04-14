import Tip from "./Tip.tsx";
import './FormComponent.css';
import {useEffect, useState} from "react";
import * as React from "react";

export default function FormComponent() {

    const tips = ['5%', '10%', '15%', '25%', '50%']
    const [bill, setBill] = useState<string>('0.00');
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
    const [tipPerPerson, setTipPerPerson] = useState<string>('0.00');
    const [totalPerPerson, setTotalPerPerson] = useState<string>('0.00');
    const [tipSelected, setTipSelected] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setFunction: Function) => {
        setFunction(e.target.value);
    }

    const handleTipSelect = (e) => {
        console.log(`${e.target.innerText} clicked`);
        document.querySelector('.predefined-tip-percentage.selected')?.classList.remove("selected");
        e.target.classList.add("selected");
        setTipSelected(e.target.innerText);
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            if (numberOfPeople) {

                const selectedTipString = document.querySelector('.tip-control.selected')?.textContent;
                const selectedTipNumber = selectedTipString ? Number(selectedTipString?.slice(0, selectedTipString.length - 1)) : 0;

                setTipPerPerson((Number(bill) * selectedTipNumber / 100 / numberOfPeople).toFixed(2));
                setTotalPerPerson(((Number(bill) * (1 + selectedTipNumber / 100)) / numberOfPeople).toFixed(2));
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
                <label htmlFor="">Bill</label>
                <div className="bill-container-grid">
                    <img src="images/icon-dollar.svg" alt="Dollar sign"/>
                    <input className="bill-amount" value={bill} onChange={e => handleChange(e, setBill)}/>
                </div>
            </div>

            <section className="tip-percentage-container">
                <h4>Select Tip %</h4>
                <div className="tip-percentage-grid">
                    {tips.map(tip => (<Tip key={tip} className="tip-control predefined-tip-percentage" value={tip} handleSelect={handleTipSelect} />))}
                    <Tip className="tip-control custom-tip-control" value="Custom" handleSelect={handleTipSelect}/>
                </div>
            </section>

            <div className="people-container">
                <h4>Number of people</h4>
                <div className="people-container-grid">
                    <img src="images/icon-person.svg" alt="Person sign"/>
                    <input className="people-number" value={numberOfPeople}
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