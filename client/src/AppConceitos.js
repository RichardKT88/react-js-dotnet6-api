import React, {useState} from "react";
import Header from "./Header";

export default function App() {
  const [counter, setCounter] = useState(0);

  //Array [value, changeValueFunction]

  function increment(){
    setCounter(counter + 1);
  }
  return (
    // <Header title="Client REST Udemy Via Props"/>
    // <Header>
    //     Client REST Udemy Via Children
    // </Header>
    <div>
      <Header>
        Counter: {counter}
      </Header>
      <button onClick={increment}>Add</button>
    </div>
  );
}