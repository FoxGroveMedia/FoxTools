const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context)
{
    /*
    * Remvoe Fontawesome comments
    */
    let cleanEverything = vscode.commands.registerCommand('fox.clean-everything', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found.');
            return;
        }

        // Find and replace occurrences using regex
        const cleanedTxt = editor.document.getText()
            .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/gm, 'class="w-6 h-6" fill="currentColor"')
            .replace(/<!--!Font Awesome(.*?)-->/gm, '');

        // Replace the text in the editor
        editor.edit(editBuilder => {
            const documentStart = new vscode.Position(0, 0);
            const documentEnd = new vscode.Position(editor.document.lineCount + 1, 0);
            const documentRange = new vscode.Range(documentStart, documentEnd);
            editBuilder.replace(documentRange, cleanedTxt);
        });

        vscode.window.showInformationMessage('All Fontawesome SVGs have been cleaned successfully!');
    });

    context.subscriptions.push(cleanEverything);

    /*
    * Remvoe Fontawesome comments
    */
    let removeComment = vscode.commands.registerCommand('fox.remove-fontawesome-comments', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found.');
            return;
        }

        // Get the entire text from the editor
        const text = editor.document.getText();

        // Find and replace occurrences using regex
        const newText = text.replace(/<!--!Font Awesome(.*?)-->/gm, '');

        // Replace the text in the editor
        editor.edit(editBuilder => {
            const documentStart = new vscode.Position(0, 0);
            const documentEnd = new vscode.Position(editor.document.lineCount + 1, 0);
            const documentRange = new vscode.Range(documentStart, documentEnd);
            editBuilder.replace(documentRange, newText);
        });

        vscode.window.showInformationMessage('All Fontawesome comments removed successfully.');
    });

    context.subscriptions.push(removeComment);

    /*
    * Clean up Fontawesome svg tags
    */
    let cleanupSvg = vscode.commands.registerCommand('fox.cleanup-fontawesome-svg', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found.');
            return;
        }

        // Get the entire text from the editor
        const text = editor.document.getText();

        // Find and replace occurrences using regex
        const newText = text.replace(/(?<=<svg\s)xmlns="http:\/\/www\.w3\.org\/2000\/svg"(?=\sviewBox=)/gm, 'class="w-6 h-6" fill="currentColor"');

        // Replace the text in the editor
        editor.edit(editBuilder => {
            const documentStart = new vscode.Position(0, 0);
            const documentEnd = new vscode.Position(editor.document.lineCount + 1, 0);
            const documentRange = new vscode.Range(documentStart, documentEnd);
            editBuilder.replace(documentRange, newText);
        });

        vscode.window.showInformationMessage('All Fontawesome svg tags removed successfully.');
    });

    context.subscriptions.push(cleanupSvg);


}

function deactivate()
{
	//
}

module.exports = {
	activate,
	deactivate
}
