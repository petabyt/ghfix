var ghfix = {
	main: function() {
		var forms = document.getElementsByTagName("form");
		for (var i = 0; i < forms.length; i++) {
			var action = forms[i].getAttribute("action");
			if (action == null) {
				continue;
			}

			var match = action.match("\/.+\/.+\/.+\/(.+)");
			if (match == null) {
				continue;
			}

			if (["archive", "unarchive", "set_visibility",
					"delete", "transfer"].includes(match[1])) {
				this.fixForm(forms[i]);
			}
		}
	},
	fixForm: function(e) {
		var match = window.location.href.match("github\.com\/(.+\/.+)\/settings")[1];

		var button = e.getElementsByTagName("BUTTON");
		for (var x = 0; x < button.length; x++) {
			button[x].disabled = false;
			button.innerText = "Yes, do the thing please"
		}

		// Github embeds input inside para elem
		var verify = e.getElementsByTagName("INPUT");
		for (var x = 0; x < verify.length; x++) {
			if (verify[x].name == "verify" || (
				verify[x].getAttribute("aria-label") != null &&
				verify[x].getAttribute("aria-label").startsWith("Type in the name"))) {
				verify[x].value = match;
			}
		}
	}
}

// Account for url switching stuff
ghfix.main();
setInterval(function() {
	ghfix.main();
}, 3000);
