// Loosely based on https://stackoverflow.com/questions/76448215/programmatically-adding-a-file-in-a-github-repository-in-javascript-and-html/76472770#76472770

document.getElementById("github-token").addEventListener("blur", saveToken);

function saveToken() {
	const tokenInput = document.getElementById("github-token");
	const token = tokenInput.value.trim();

	if (!token) return;

	localStorage.setItem("githubToken", token);
}

const tokenInput = document.getElementById("github-token");
const toggleBtn = document.getElementById("show-token-btn");

toggleBtn.addEventListener("click", () => {
	if (tokenInput.type === "password") {
		tokenInput.type = "text";
	} else {
		tokenInput.type = "password";
	}
});

function slugify(text) {
	if (!text || typeof text !== "string") {
		return "";
	}

	return text
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function showAlert(message, type = "info") {
	const alertTypes = {
		success: "✓",
		error: "✗",
		warning: "⚠",
		info: "ℹ",
	};

	const prefix = alertTypes[type] || alertTypes.info;
	alert(`${prefix} ${message}`);
}

function validateInputs(content, token) {
	const errors = [];

	if (!token) {
		errors.push("No GitHub token saved! Please save your token first.");
	}

	if (!content) {
		errors.push("Post content cannot be empty!");
	}

	return errors;
}

function setLoadingState(isLoading) {
	const publishBtn = document.getElementById("publish-btn");
	const saveBtn = document.getElementById("save-token-btn");

	if (publishBtn) {
		publishBtn.textContent = isLoading ? "Publishing…" : "Publish Post";
		publishBtn.disabled = isLoading;
		publishBtn.classList.toggle("progress", isLoading);
	}

	if (saveBtn) {
		saveBtn.disabled = isLoading;
	}
}

async function upload() {
	const content = document.getElementById("post-content")?.value || "";
	const token = localStorage.getItem("githubToken");

	const errors = validateInputs(content, token);
	if (errors.length > 0) {
		showAlert(errors.join("\n"), "error");
		return;
	}

	// CHANGE THESE TO YOUR REPO
	const owner = "Axenide";
	const repo = "web";

	const now = new Date();
	const date = now.toISOString().slice(0, 19) + "Z";

	const markdown = `+++\n+++\n\n${content}\n`;
	const message = `Nanolog: ${date}`;

	setLoadingState(true);

	try {
		const uploadFile = async (path, content) => {
			const res = await fetch(
				`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
				{
					method: "PUT",
					headers: {
						Accept: "application/vnd.github+json",
						Authorization: `Bearer ${token}`,
						"X-GitHub-Api-Version": "2022-11-28",
					},
					body: JSON.stringify({
						message: message,
						content: btoa(unescape(encodeURIComponent(content))),
					}),
				},
			);
			return res.json();
		};

		console.log("Uploading EN...");
		const enResult = await uploadFile(`content/nanolog/${date}.md`, markdown);
		console.log("EN result:", enResult);

		console.log("Uploading ES...");
		const esResult = await uploadFile(`content/nanolog/${date}.es.md`, markdown);
		console.log("ES result:", esResult);

		if (enResult.content || esResult.content) {
			showAlert("Post published successfully!", "success");
			console.log("Both uploaded:", enResult, esResult);
			document.getElementById("post-content").value = "";
			document.getElementById("nanolog-modal").classList.remove("active");
		} else {
			let errorMessage = "Failed to publish post.";
			const errorResult = enResult.message ? enResult : (esResult.message ? esResult : null);
			if (errorResult) {
				if (errorResult.message.includes("Invalid") || errorResult.message.includes("expired")) {
					errorMessage = "Invalid or expired GitHub token. Please check your token.";
				} else if (errorResult.message.includes("Forbidden") || errorResult.message.includes("403")) {
					errorMessage = "Access denied. Check your token permissions.";
				} else if (errorResult.message.includes("Not Found") || errorResult.message.includes("404")) {
					errorMessage = "Repository not found. Check repository name and permissions.";
				} else {
					errorMessage = errorResult.message;
				}
			}

			showAlert(`Error: ${errorMessage}`, "error");
			console.error("GitHub API Error:", enResult, esResult);
		}
	} catch (error) {
		showAlert(`Network error: ${error.message}`, "error");
		console.error("Network Error:", error);
	} finally {
		setLoadingState(false);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	try {
		const storedToken = localStorage.getItem("githubToken");
		const tokenInput = document.getElementById("github-token");

		if (storedToken && tokenInput) {
			tokenInput.value = storedToken;
		}

		const saveTokenBtn = document.getElementById("save-token-btn");
		const publishBtn = document.getElementById("publish-btn");

		if (saveTokenBtn) {
			saveTokenBtn.addEventListener("click", saveToken);
		} else {
			console.warn("Save token button not found");
		}

		if (publishBtn) {
			publishBtn.addEventListener("click", upload);
		} else {
			console.warn("Publish button not found");
		}

		document.addEventListener("keydown", (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
				e.preventDefault();
				upload();
			}
		});
	} catch (error) {
		console.error("Initialization error:", error);
		showAlert("Error initializing the application", "error");
	}
});

const textarea = document.getElementById("post-content");
const counter = document.getElementById("char-count");
const limit = textarea.maxLength;

textarea.addEventListener("input", () => {
	const length = textarea.value.length;
	counter.textContent = `${length}/${limit}`;

	counter.classList.remove("half", "max");

	if (length >= limit) {
		counter.classList.add("max");
	} else if (length >= limit / 2) {
		counter.classList.add("half");
	}
});

var nanologModal = document.getElementById("nanolog-modal");
var nanologModalContent = document.getElementById("nanolog-modal-content");
var nanologInput = document.getElementById("post-content");
var nanologButton = document.getElementById("nanolog-button");

if (nanologButton) {
	nanologButton.addEventListener("click", function () {
		nanologModal.classList.add("active");
		nanologModal.addEventListener(
			"transitionend",
			function handler() {
				nanologInput.focus();
				nanologModal.removeEventListener("transitionend", handler);
			},
			{ once: true },
		);
	});
}

window.addEventListener("keydown", (event) => {
	if (
		event.key === "n" &&
		document.activeElement.tagName !== "INPUT" &&
		document.activeElement.tagName !== "TEXTAREA"
	) {
		event.preventDefault();
		nanologModal.classList.add("active");
		nanologModal.addEventListener(
			"transitionend",
			function handler() {
				nanologInput.focus();
				nanologModal.removeEventListener("transitionend", handler);
			},
			{ once: true },
		);
	}
});

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		nanologModal.classList.remove("active");
	}
});

nanologModal.addEventListener("click", function (e) {
	if (!nanologModalContent.contains(e.target)) {
		nanologModal.classList.remove("active");
	}
});

nanologModalContent.addEventListener("click", function (e) {
	e.stopPropagation();
});

let nanologClickCount = 0;
const nanologEnabled = localStorage.getItem("nanologEnabled");

document.getElementById("nanolog").addEventListener("click", function () {
	nanologClickCount++;

	if (nanologEnabled != "true" && nanologClickCount === 10) {
		console.log("Nanolog new post button revealed");
		localStorage.setItem("nanologEnabled", true);
		nanologButton.removeAttribute("hidden");
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (nanologEnabled === "true") {
		nanologButton.removeAttribute("hidden");
	}
});
