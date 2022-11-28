const vscode = require('vscode');
const say = require('say')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let folderName = vscode.workspace.name;
	let msg = `Is the code ready for the project ${folderName}?`;
	function speak() {
		say.speak(msg);
	}
	function showInformationMessage() {
		let msgVcode = vscode.window.showInformationMessage(msg, "Yes", "No")
		.then(answer => {
			if (answer === "Yes") {
				vscode.window.showInformationMessage("Are you sure?", "Yes")
				.then(answer => {
					if (answer === "Yes") {
						vscode.window.showInformationMessage("It was about time!")
					} 
				  })
			} else {
				vscode.window.showInformationMessage("Go back to work")
			}
		  })
		;
		context.subscriptions.push(msgVcode);
	}
	let max = 2;
	function startRandomizer(){
		let ran = Math.floor(Math.random() * max) + 1;
		switch(ran) {
			case 1:
				showInformationMessage();
			  break;
			case 2:
				speak()
			  break;
			default:
				showInformationMessage();
		  }	
	  } 
	  setInterval(startRandomizer, Math.random() * 100000 + 100);
}
function deactivate(context) {
	let msgVcode = vscode.window.showInformationMessage("how you dare to remove me. you can't be productive if I don't ask you all the time if you did your job!")
	context.subscriptions.push(msgVcode);
}
module.exports = {
	activate,
	deactivate
}