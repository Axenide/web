// Loosely based on https://stackoverflow.com/questions/76448215/programmatically-adding-a-file-in-a-github-repository-in-javascript-and-html/76472770#76472770

// ── Persistence ──────────────────────────────────────────────

document.getElementById("github-token").addEventListener("blur", saveToken);
document.getElementById("gemini-key").addEventListener("blur", saveGeminiKey);

function saveToken() {
	const token = document.getElementById("github-token").value.trim();
	if (!token) return;
	localStorage.setItem("githubToken", token);
}

function saveGeminiKey() {
	const key = document.getElementById("gemini-key").value.trim();
	if (!key) return;
	localStorage.setItem("geminiApiKey", key);
}

// ── Show/hide token ──────────────────────────────────────────

const tokenInput = document.getElementById("github-token");
const toggleBtn = document.getElementById("show-token-btn");

toggleBtn.addEventListener("click", () => {
	tokenInput.type = tokenInput.type === "password" ? "text" : "password";
});

// ── Helpers ──────────────────────────────────────────────────

function slugify(text) {
	if (!text || typeof text !== "string") return "";

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

	alert(`${alertTypes[type] || alertTypes.info} ${message}`);
}

function validateInputs(enContent, esContent, token) {
	const errors = [];

	if (!token) {
		errors.push("No GitHub token saved! Please save your token first.");
	}

	if (!enContent && !esContent) {
		errors.push("Post content cannot be empty in at least one language!");
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

// ── Language tabs ────────────────────────────────────────────

let activeLang = "en";
const tabs = document.querySelectorAll(".lang-tab");
const textareas = {
	en: document.getElementById("post-content-en"),
	es: document.getElementById("post-content-es"),
};

function switchTab(lang) {
	activeLang = lang;

	tabs.forEach((tab) => {
		tab.classList.toggle("active", tab.dataset.lang === lang);
	});

	Object.entries(textareas).forEach(([key, textarea]) => {
		textarea.classList.toggle("active", key === lang);
	});

	updateCharCount();
}

tabs.forEach((tab) => {
	tab.addEventListener("click", () => switchTab(tab.dataset.lang));
});

// ── Character counter ────────────────────────────────────────

const counter = document.getElementById("char-count");

function updateCharCount() {
	const textarea = textareas[activeLang];
	const length = textarea.value.length;
	const limit = textarea.maxLength;
	counter.textContent = `${length}/${limit}`;

	counter.classList.remove("half", "max");

	if (length >= limit) {
		counter.classList.add("max");
	} else if (length >= limit / 2) {
		counter.classList.add("half");
	}
}

Object.values(textareas).forEach((textarea) => {
	textarea.addEventListener("input", updateCharCount);
});

// ── Gemini Translation ───────────────────────────────────────

const translateBtn = document.getElementById("translate-btn");

function setTranslatingState(isTranslating) {
	const span = translateBtn.querySelector("span");
	if (span) {
		span.textContent = isTranslating ? "Translating…" : "Translate";
	}
	translateBtn.disabled = isTranslating;
	translateBtn.classList.toggle("progress", isTranslating);
}

async function translate() {
	const apiKey = localStorage.getItem("geminiApiKey");
	if (!apiKey) {
		showAlert("No Gemini API key saved! Please enter your key first.", "error");
		return;
	}

	const sourceText = textareas[activeLang].value.trim();
	if (!sourceText) {
		showAlert("Nothing to translate! Write something first.", "warning");
		return;
	}

	const targetLang = activeLang === "en" ? "es" : "en";
	const sourceName = activeLang === "en" ? "English" : "Spanish";
	const targetName = targetLang === "en" ? "English" : "Spanish";

	setTranslatingState(true);

	try {
		const res = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text: `Translate the following text from ${sourceName} to ${targetName}. Return ONLY the translated text, nothing else. Preserve all formatting, markdown, and special syntax exactly as-is (like {{ shortcodes }}).\n\n${sourceText}`,
								},
							],
						},
					],
				}),
			},
		);

		const data = await res.json();

		if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
			const translated = data.candidates[0].content.parts[0].text.trim();
			textareas[targetLang].value = translated;
			showAlert(`Translated to ${targetName}!`, "success");
		} else {
			const errorMsg =
				data.error?.message || "Unknown error from Gemini API";
			showAlert(`Translation failed: ${errorMsg}`, "error");
			console.error("Gemini API Error:", data);
		}
	} catch (error) {
		showAlert(`Translation error: ${error.message}`, "error");
		console.error("Translation Network Error:", error);
	} finally {
		setTranslatingState(false);
	}
}

translateBtn.addEventListener("click", translate);

// ── Publishing ───────────────────────────────────────────────

async function upload() {
	let enContent = textareas.en.value.trim();
	let esContent = textareas.es.value.trim();
	const token = localStorage.getItem("githubToken");

	const errors = validateInputs(enContent, esContent, token);
	if (errors.length > 0) {
		showAlert(errors.join("\n"), "error");
		return;
	}

	// If one language is empty, duplicate from the other
	if (!enContent && esContent) enContent = esContent;
	if (!esContent && enContent) esContent = enContent;

	const owner = "Axenide";
	const repo = "web";

	const now = new Date();
	const date = now.toISOString().slice(0, 19) + "Z";

	const enMarkdown = `+++\n+++\n\n${enContent}\n`;
	const esMarkdown = `+++\n+++\n\n${esContent}\n`;
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
		const enResult = await uploadFile(
			`content/nanolog/${date}.md`,
			enMarkdown,
		);
		console.log("EN result:", enResult);

		console.log("Uploading ES...");
		const esResult = await uploadFile(
			`content/nanolog/${date}.es.md`,
			esMarkdown,
		);
		console.log("ES result:", esResult);

		if (enResult.content || esResult.content) {
			showAlert("Post published successfully!", "success");
			console.log("Both uploaded:", enResult, esResult);
			textareas.en.value = "";
			textareas.es.value = "";
			updateCharCount();
			document.getElementById("nanolog-modal").classList.remove("active");
		} else {
			let errorMessage = "Failed to publish post.";
			const errorResult = enResult.message
				? enResult
				: esResult.message
					? esResult
					: null;
			if (errorResult) {
				if (
					errorResult.message.includes("Invalid") ||
					errorResult.message.includes("expired")
				) {
					errorMessage =
						"Invalid or expired GitHub token. Please check your token.";
				} else if (
					errorResult.message.includes("Forbidden") ||
					errorResult.message.includes("403")
				) {
					errorMessage =
						"Access denied. Check your token permissions.";
				} else if (
					errorResult.message.includes("Not Found") ||
					errorResult.message.includes("404")
				) {
					errorMessage =
						"Repository not found. Check repository name and permissions.";
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

// ── Initialization ───────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
	try {
		const storedToken = localStorage.getItem("githubToken");
		const storedGeminiKey = localStorage.getItem("geminiApiKey");
		const tokenInput = document.getElementById("github-token");
		const geminiInput = document.getElementById("gemini-key");

		if (storedToken && tokenInput) tokenInput.value = storedToken;
		if (storedGeminiKey && geminiInput) geminiInput.value = storedGeminiKey;

		const publishBtn = document.getElementById("publish-btn");

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

// ── Modal ────────────────────────────────────────────────────

var nanologModal = document.getElementById("nanolog-modal");
var nanologModalWrapper = document.getElementById("nanolog-modal-wrapper");
var nanologButton = document.getElementById("nanolog-button");

function openModal() {
	nanologModal.classList.add("active");
	nanologModal.addEventListener(
		"transitionend",
		function handler() {
			textareas[activeLang].focus();
			nanologModal.removeEventListener("transitionend", handler);
		},
		{ once: true },
	);
}

if (nanologButton) {
	nanologButton.addEventListener("click", openModal);
}

window.addEventListener("keydown", (event) => {
	if (
		event.key === "n" &&
		document.activeElement.tagName !== "INPUT" &&
		document.activeElement.tagName !== "TEXTAREA"
	) {
		event.preventDefault();
		openModal();
	}
});

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		nanologModal.classList.remove("active");
	}
});

nanologModal.addEventListener("click", function (e) {
	if (!nanologModalWrapper.contains(e.target)) {
		nanologModal.classList.remove("active");
	}
});

nanologModalWrapper.addEventListener("click", function (e) {
	e.stopPropagation();
});

// ── Secret reveal (10-click easter egg) ──────────────────────

let nanologClickCount = 0;
let nanologEnabled = false;

document.getElementById("nanolog").addEventListener("click", function () {
	nanologClickCount++;

	if (!nanologEnabled && nanologClickCount === 10) {
		console.log("Nanolog new post button revealed");
		nanologEnabled = true;
		nanologButton.removeAttribute("hidden");
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (nanologEnabled) {
		nanologButton.removeAttribute("hidden");
	}

	const editLinks = document.querySelectorAll(".nanolog-edit-link");
	let editClickCount = 0;
	let editEnabled = false;

	const nanologListItems = document.querySelectorAll("#nanolog-list > li");
	nanologListItems.forEach((li) => {
		li.style.cursor = "pointer";
		li.addEventListener("click", function () {
			editClickCount++;

			if (!editEnabled && editClickCount === 10) {
				console.log("Nanolog edit links revealed");
				editEnabled = true;
				editLinks.forEach((link) => link.removeAttribute("hidden"));
			}
		});
	});

	if (editEnabled) {
		editLinks.forEach((link) => link.removeAttribute("hidden"));
	}
});
