const vscode = require("vscode");

function activate(context) {

    const getStringArray = function (text) {
        let str = [], lastPos = 0, i;

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

    const textTransform = function (separator) {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage('There is no selected text!');
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        let text = editor.document.getText(range);

                        text = getStringArray(text).join(separator);
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
    };

    // console.log('Congratulations, your extension "text-transformer" is now active!');

    let dashed = vscode.commands.registerCommand('text-transformer.dashed', function () {
        textTransform('-');
    });
    context.subscriptions.push(dashed);

    let underline = vscode.commands.registerCommand('text-transformer.underline', function () {
        textTransform('_');
    });
    context.subscriptions.push(underline);

    let upper = vscode.commands.registerCommand('text-transformer.upper', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage('There is no selected text!');
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        const text = editor.document.getText(range).toUpperCase();
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
    });
    context.subscriptions.push(upper);

    let lower = vscode.commands.registerCommand('text-transformer.lower', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage('There is no selected text!');
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        const text = editor.document.getText(range).toLowerCase();
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
    });
    context.subscriptions.push(lower);

    let reverse = vscode.commands.registerCommand('text-transformer.reverse', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage('There is no selected text!');
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        const text = editor.document.getText(range);
                        const str = [];

                        for (i = 0; i < text.length; i++) {
                            const s = text.charAt(i);
                            str.push(s.toLowerCase() === s ? s.toUpperCase() : s.toLowerCase());
                        }
                        edit.replace(range, str.join(''));
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
    });
    context.subscriptions.push(reverse);

    let camel = vscode.commands.registerCommand('text-transformer.camel', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage('There is no selected text!');
                return;
            }

            editor.edit(function (edit) {
                for (let i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        let text = getStringArray(editor.document.getText(range)).join('-');
                        text = text.replace(/(-[a-z])/g, function (w) {
                            return w.toUpperCase().replace(/-/, "");
                        });
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
    });
    context.subscriptions.push(camel);
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
};
