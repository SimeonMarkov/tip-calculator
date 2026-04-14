import './App.css'
import {BillComponent} from "./BillComponent.tsx";
import {TipSelection} from "./TipSelection.tsx";
import {PeopleComponent} from "./PeopleComponent.tsx";
import {TotalComponent} from "./TotalComponent.tsx";

function App() {

  return (
      <>
          <h2 className="app-name">Splitter</h2>
      <main>
        <BillComponent />
        <TipSelection />
        <PeopleComponent />
        <TotalComponent />
      </main>
      </>
  )
}

export default App
