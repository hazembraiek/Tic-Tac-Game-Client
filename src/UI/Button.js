import "./Button.css";

function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`glow-on-hover ${props.className}`}
      id={props.id}
    >
      {props.children}
    </button>
  );
}

export default Button;
