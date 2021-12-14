import * as vscode from "vscode";

function activate(context: vscode.ExtensionContext) {
    function transformString<D extends boolean>(transformFunction: (input: D extends true | undefined ? string[] : string) => string, destructured: D): void;
    function transformString(transformFunction: (input: string | string[]) => string, destructured: boolean): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("There is no activeTextEditor!");
            return;
        }

        if (!editor.selections || editor.selections.length === 0) {
            vscode.window.showInformationMessage("There is no selected text!");
            return;
        }

        editor.edit(function (edit) {
            editor.selections.forEach((selection) => {
                if (!selection.isEmpty) {
                    const range = new vscode.Range(selection.start, selection.end);
                    let text: string | string[] = editor.document.getText(range);
                    if (destructured) {
                        text = getStringArray(text);
                    }
                    edit.replace(range, transformFunction(text));
                }
            });
        });
    }

    function getStringArray(text: string): string[] {
        // Regex explaination and tests: https://regex101.com/library/zT4rM9
        const textGroupsMatcher = /([^\s\-_A-Z]+)|([A-Z]+[^\s\-_A-Z]*)/g;
        return text.match(textGroupsMatcher) || [];
    }

    function toKebabCase(input: string[]): string {
        return input.join("-").toLowerCase();
    }

    function toSnakeCase(input: string[]): string {
        return input.join("_").toLowerCase();
    }

    function toUpperCase(input: string): string {
        return input.toUpperCase();
    }

    function toLowerCase(input: string): string {
        return input.toLowerCase();
    }

    function toReverse(input: string): string {
        return Array.from(input).map(char => char.toLowerCase() === char ? char.toUpperCase() : char.toLowerCase()).join();
    }

    function toCamelCase(input: string[]) {
        const pascalInput = toPascalCase(input);
        return pascalInput.charAt(0).toLowerCase() + pascalInput.slice(1);
    }

    function toCamelSpaceCase(input: string[]) {
        return input
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    function toPascalCase(input: string[]) {
        return input.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    }

    function registerCommand(name: string, transformFunction: () => void) {
        const command = vscode.commands.registerCommand(`text-transformer.${name}`, transformFunction);

        context.subscriptions.push(command);
    }

    registerCommand('dashed', () => transformString(toKebabCase, true));
    registerCommand('underline', () => transformString(toSnakeCase, true));
    registerCommand('upper', () => transformString(toUpperCase, false));
    registerCommand('lower', () => transformString(toLowerCase, false));
    registerCommand('reverse', () => transformString(toReverse, false));
    registerCommand('camel', () => transformString(toCamelCase, true));
    registerCommand('camel_space', () => transformString(toCamelSpaceCase, true));
    registerCommand('pascal', () => transformString(toPascalCase, true));
}

module.exports = {
    activate,
};
