/**
 * Represents configuration options for a Check Box input component
 */
interface CheckBoxOptions {
    id: string;
    name: string;
    label: string;
};

/**
 * Represents a checkbox input with a specific style
 * 
 * @param checkBoxOptions Configuration for the checkbox
 * @returns React checkbox element
 */
function CheckBox(checkBoxOptions: CheckBoxOptions) {
    const {
        id,
        name,
        label
    } = checkBoxOptions;

    return (
        <div className="flex items-center">
            <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id={id}
                name={name}
                // This is using state but rn this button does nothing
                // so we don't need to use state rn
                // checked={rememberMe}
                // onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor={id} className="text-sm text-slate-500">
                {label}
            </label>
        </div>    
    );
}

export { CheckBox };