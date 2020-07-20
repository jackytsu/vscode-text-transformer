import * as vscode from "vscode";

function activate(context: vscode.ExtensionContext) {
    const getStringArray = function (text: string) {
        const str = [];
        let lastPos = 0,
            i;

        for (i = 0; i < text.length; i++) {
            if (/[\s\-_A-Z]/.test(text.charAt(i))) {
                const s = text.substring(lastPos, i).replace(/[\s\-_]/, "");
                if (s.length > 0) {
                    str.push(s.toLowerCase());
                }
                lastPos = i;
            }
        }

        if (lastPos < text.length) {
            const s = text.substring(lastPos, i).replace(/[\s\-_]/, "");
            if (s.length > 0) {
                str.push(s.toLowerCase());
            }
        }

        return str;
    };

    const textTransform = function (separator: string) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage("There is no selected text!");
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    const selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        const range = new vscode.Range(selection.start, selection.end);
                        let text = editor.document.getText(range);

                        text = getStringArray(text).join(separator);
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage("There is no activeTextEditor!");
        }
    };

    // console.log('Congratulations, your extension "text-transformer" is now active!');

    const dashed = vscode.commands.registerCommand("text-transformer.dashed", function () {
        textTransform("-");
    });
    context.subscriptions.push(dashed);

    const underline = vscode.commands.registerCommand("text-transformer.underline", function () {
        textTransform("_");
    });
    context.subscriptions.push(underline);

    const upper = vscode.commands.registerCommand("text-transformer.upper", function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage("There is no selected text!");
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    const selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        const range = new vscode.Range(selection.start, selection.end);
                        const text = editor.document.getText(range).toUpperCase();
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage("There is no activeTextEditor!");
        }
    });
    context.subscriptions.push(upper);

    const lower = vscode.commands.registerCommand("text-transformer.lower", function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage("There is no selected text!");
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    const selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        const range = new vscode.Range(selection.start, selection.end);
                        const text = editor.document.getText(range).toLowerCase();
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage("There is no activeTextEditor!");
        }
    });
    context.subscriptions.push(lower);

    const reverse = vscode.commands.registerCommand("text-transformer.reverse", function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage("There is no selected text!");
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    const selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        const range = new vscode.Range(selection.start, selection.end);
                        const text = editor.document.getText(range);
                        const str = [];

                        for (i = 0; i < text.length; i++) {
                            const s = text.charAt(i);
                            str.push(s.toLowerCase() === s ? s.toUpperCase() : s.toLowerCase());
                        }
                        edit.replace(range, str.join(""));
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage("There is no activeTextEditor!");
        }
    });
    context.subscriptions.push(reverse);

    const camel = vscode.commands.registerCommand("text-transformer.camel", function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage("There is no selected text!");
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    const selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        const range = new vscode.Range(selection.start, selection.end);
                        let text = getStringArray(editor.document.getText(range)).join("-");
                        text = text.replace(/(-[a-z])/g, function (w) {
                            return w.toUpperCase().replace(/-/, "");
                        });
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage("There is no activeTextEditor!");
        }
    });
    context.subscriptions.push(camel);
}

module.exports = {
    activate,
};
