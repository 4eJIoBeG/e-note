import { useState } from "react";
import "./Button.css";

const Button = () => {
  const [text, setText] = useState("Сохранить");
  const clicked = () => {
    setText("Готово");
    console.log(setText);
  };
  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  );
};

export default Button;
