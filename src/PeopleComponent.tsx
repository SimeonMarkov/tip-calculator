import './People.css'

export function PeopleComponent() {
    return (
        <>
            <div className="people-container">
                <h4>Number of people</h4>
                <div className="people-container-grid">
                    <img src="images/icon-person.svg" alt="Person sign"/>
                    <span className="people-number" contentEditable={true}>5</span>
                </div>
            </div>
        </>
    );
}