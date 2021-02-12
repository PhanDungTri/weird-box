import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Trans.scss";

let counter = 0;

const Trans = (): JSX.Element => {
  const [list, setList] = useState<number[]>([]);

  return (
    <div>
      <button onClick={() => setList([...list, counter++])}>ADD</button>
      <TransitionGroup className="list">
        {list.map((el) => (
          <CSSTransition timeout={1000} classNames="li-item" key={el}>
            <div>
              {el} <span onClick={() => setList(list.filter((e) => el !== e))}>REMOVE</span>{" "}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Trans;
