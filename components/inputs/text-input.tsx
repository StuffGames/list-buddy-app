/**
 * Represents configuration options for a Text Input field
 */
interface TextInputOptions {
    label: string;
    id: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    onChange?: (event: any) => void;
}

/**
 * Renders a Text Input Field using the ListBuddy styling
 * 
 * @param textInputOptions Options to configure this component
 * @returns React Text Input field component
 */
function TextInput(textInputOptions: TextInputOptions) {
  const {
    label,
    id,
    placeholder,
    type,
    required,
    disabled,
    onChange
  } = textInputOptions;
  let {
    value
  } = textInputOptions;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-500"
      >
        {label}
      </label>
      <input
        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type || 'text'}
        style={{ color: 'black' }}
        id={id}
        name={id}
        placeholder={placeholder || 'Enter your username'}
        value={value}
        // onChange={(e) => setUsername(e.target.value)}
        onChange={onChange || ((e) => {value = e.target.value;})}
        required={required || false}
        disabled={disabled || false}
      />
    </div>
  );
}

export { TextInput };