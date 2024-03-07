const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context)
{
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

        // Define your regex pattern
        const regex = /<!--!Font Awesome(.*?)-->/gm;

        // Get the entire text from the editor
        const text = editor.document.getText();

        // Find and replace occurrences using regex
        const newText = text.replace(regex, '');

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

        // Define your regex pattern
        const regex = /<svg (.*?) viewBox=/gm;
        

        // Get the entire text from the editor
        const text = editor.document.getText();

        // Find and replace occurrences using regex
        const newText = text.replace(regex, 'class="w-6 h-6" fill="currentColor" ');

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
