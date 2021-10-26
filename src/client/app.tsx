import * as React from "react";
import getUser from "./User";
import { Sidebar } from "./Components/Side";
import { Main } from "./Components/Main";

/* HOOK REACT EXAMPLE */
const App = () => {
  var x = getUser();
  return (
    <div className="is-tall">
      <section id="both" className="main-content columns is-tall">
        <aside id="aside" className="column is-2 is-narrow-mobile is-tall section is-hidden-mobile is-scrollable">
          <Sidebar />
        </aside>
        <div id="main" className="container column is-10">
          <div className="section">
            <Main />
          </div>
        </div>
      </section>
      <p>{JSON.stringify(x)}</p>
    </div>
  );
};

export default App;
