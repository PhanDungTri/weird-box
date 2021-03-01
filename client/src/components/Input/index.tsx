import "./Input.scss";

type InputProps = {
  default?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps): JSX.Element => {
  return (
    <div className="input">
      <input defaultValue={props.default} placeholder={props.placeholder} onChange={props.onChange} />
    </div>
  );
};

export default Input;
