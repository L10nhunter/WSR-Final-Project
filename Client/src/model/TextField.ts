import data from "@/data/textfields.json";
export interface TextField {
    uid?: number;
    label: string;
    value?: string;
    type : string;
    placeholder?: string;
    autocomplete?: string;
    for?: string;
}

export function getTextFields(): TextField[] {
    return data.items;
}
export function getTextFieldsFromLabels(labels: String[]): TextField[] {
    return getTextFields().filter(field => labels.includes(field?.for ?? field.label));
}
/*export function getTextField(label: string): TextField | undefined{
    return getTextFields().find(field => field?.for ?? field.label === label);
}*/
export function forAndId(textField: TextField): string {
    return textField?.for ?? textField.label;
}