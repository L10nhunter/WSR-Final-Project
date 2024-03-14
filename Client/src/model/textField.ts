import data from "@/data/textfields.json";
export interface TextField {
    label: string;
    value?: string;
    type : string;
    placeholder?: string;
    autocomplete?: string;
    for?: string;
    icon?: string;
}

export function getTextFields(): TextField[] {
    return data.items;
}
export function getTextField(label: string): TextField{
    return getTextFields().find(field => (field?.for ?? field.label) === label) ?? {label: label, type: "text"};
}
export function forAndId(textField: TextField): string {
    return textField?.for ?? textField.label;
}