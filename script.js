document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");
	if (!form) {
		return;
	}

	const emailInput = form.querySelector("#email");
	const passwordInput = form.querySelector("#password");

	const message = document.createElement("div");
	message.className = "form-message";
	message.setAttribute("role", "status");
	message.setAttribute("aria-live", "polite");
	message.style.marginTop = "14px";
	message.style.fontSize = "0.95rem";
	message.style.minHeight = "1.2em";
	form.appendChild(message);

	const setMessage = (text, isError) => {
		message.textContent = text;
		message.style.color = isError ? "#b91c1c" : "#047857";
	};

	const isValidEmail = (value) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	};

	const clearValidity = () => {
		if (emailInput) {
			emailInput.setCustomValidity("");
		}
		if (passwordInput) {
			passwordInput.setCustomValidity("");
		}
		setMessage("", false);
	};

	if (emailInput) {
		emailInput.addEventListener("input", clearValidity);
	}

	if (passwordInput) {
		passwordInput.addEventListener("input", clearValidity);
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const emailValue = emailInput ? emailInput.value.trim() : "";
		const passwordValue = passwordInput ? passwordInput.value : "";

		if (!emailValue || !isValidEmail(emailValue)) {
			if (emailInput) {
				emailInput.setCustomValidity("Please enter a valid email address.");
				emailInput.reportValidity();
				emailInput.focus();
			}
			setMessage("Please enter a valid email address.", true);
			return;
		}

		if (!passwordValue || passwordValue.length < 8) {
			if (passwordInput) {
				passwordInput.setCustomValidity("Password must be at least 8 characters.");
				passwordInput.reportValidity();
				passwordInput.focus();
			}
			setMessage("Password must be at least 8 characters.", true);
			return;
		}

		clearValidity();
		setMessage("Signed in successfully (demo).", false);
	});
});clear