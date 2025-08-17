/**
 * Represents configuration options for a Button component
 */
interface ButtonOptions {
    id: string;
    name: string;
    type: string;
    value: string; // The text in the button
    disabled: boolean;
}

/**
 * Renders a button component with the ListBuddy color palette and styling
 * 
 * @param buttonOptions Options for configuring this component
 * @returns React button component
 */
function Button(buttonOptions: ButtonOptions) {
  const {
    id,
    name,
    type,
    value,
    disabled
  } = buttonOptions;

  return (
    <div className="mb-6">
      <input
        id={id}
        name={name}
        className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        type={type || 'button'}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

export { Button };