const vscode = require('vscode');

function activate(context) {

    var getStringArray = function (text) {
        var str = [],
            lastPos = 0;

        for (var i = 0; i < text.length; i++) {
            if (/[\s\-_A-Z]/.test(text.charAt(i))) {
                var s = text.substring(lastPos, i).replace(/[\s\-_]/, "");
                if (s.length > 0) {
                    str.push(s.toLowerCase());
                }
                lastPos = i;
            }
        }

        if (lastPos < text.length) {
            var s = text.substring(lastPos, i).replace(/[\s\-_]/, "");
            if (s.length > 0) {
                str.push(s.toLowerCase());
            }
        }

        return str;
    };

    var textTransform = function (separator) {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            if (!editor.selections || editor.selections.length === 0) {
                vscode.window.showInformationMessage('There is no selected text!');
                return;
            }

            editor.edit(function (edit) {
                for (var i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        var text = editor.document.getText(range);

                        text = getStringArray(text).join(separator);
                        edit.replace(range, text);
                    }
                }
            });
        } else {
            vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
    };

    console.log('Congratulations, your extension "text-transformer" is now active!');

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
                for (var i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        var text = editor.document.getText(range).toUpperCase();
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
                for (var i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        var text = editor.document.getText(range).toLowerCase();
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
                for (var i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        var text = editor.document.getText(range);
                        var str = [];

                        for (var i = 0; i < text.length; i++) {
                            var s = text.charAt(i);
                            str.push(s.toLowerCase() == s ? s.toUpperCase() : s.toLowerCase());
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
                for (var i = 0; i < editor.selections.length; i++) {
                    let selection = editor.selections[i];

                    if (!selection.isEmpty) {
                        let range = new vscode.Range(selection.start, selection.end);
                        var text = getStringArray(editor.document.getText(range)).join('-');
                        text = text.replace(/(\-[a-z])/g, function (w) {
                            return w.toUpperCase().replace(/\-/, "");
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
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;