type Props = {
  label: string;
  name: string;
  placeholder: string;
  type: "text" | "textarea" | "email" | "password";
  autoComplete?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
};

export const Input = (props: Props) => (
  <label>
    <fieldset>
      <legend>{props.label}</legend>
      {props.type === "textarea" ? (
        <textarea
          placeholder={props.placeholder}
          name={props.name}
          autoComplete={props.autoComplete}
          required={props.required}
          minLength={props.minLength}
          maxLength={props.maxLength}
          style={{
            height: "10em",
          }}
        />
      ) : (
        <input
          autoCorrect="on"
          placeholder={props.placeholder}
          name={props.name}
          type={props.type}
          autoComplete={props.autoComplete}
          required={props.required}
          minLength={props.minLength}
          maxLength={props.maxLength}
          min={props.min}
          max={props.max}
        />
      )}
    </fieldset>
  </label>
);
