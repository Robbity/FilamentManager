import React from "react";
import FilamentControl from "./FilamentControl";

const App = () => {
  const filamentId = 1;

  return (
    <div className="App">
      <FilamentControl filamentId={filamentId} />
    </div>
  );
};

export default App;
