import './People.css'

export function PeopleComponent() {
    return (
        <>
            <h4>Number of people</h4>
            <div className="people-container">
                <img src="images/icon-person.svg" alt="Person sign" />
                <span className="people-number" contentEditable={true}>5</span>
            </div>
        </>
    );
}