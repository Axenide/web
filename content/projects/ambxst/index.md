+++
title = "Ambxst"
date = 2025-12-31
weight = 1
description = "An ***Ax**tremely* customizable shell."
path = "/ambxst"

[taxonomies]
tags = ["dev", "wip"]
[extra]
no_header = true
banner = "1.png"
hide_banner = true
hide_site_title = true
accent_color = "hsl(356, 100%, 67%)"
[extra.meta]
favicon = "favicon.svg"
+++

<img src="ambxst-logo.svg" alt="Ambxst Logo" class="transparent drop-shadow no-hover" style="max-width: 400px; width: 100%;" />

<div align="center">

<mark>An ***Ax**tremely* customizable shell.</mark>

</div>

{{ carousel(images=["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"], interval=3000, style="margin: -2rem 0 -2rem 0") }}

<div align="center" style="position: relative; margin-top: 4rem; margin-bottom: 4rem;">
  <div class="desktop-only" style="position: absolute; right: calc(50% + 90px); top: 10px; width: max-content;">
    {{ arrow_note(text="Support the project!", target="kofi-btn", color="text", font_size="1.25rem", stroke_width="2", head_size="10", amplitude="50", ease_out="20", ease_in="-20", start_dir="bottom", end_dir="bottom") }}
  </div>

  <div class="desktop-only" style="position: absolute; left: calc(50% + 90px); top: 10px; width: max-content;">
    {{ arrow_note(text="Join the server!", target="discord-btn", color="text", font_size="1.25rem", stroke_width="2", head_size="10", amplitude="50", ease_out="-20", ease_in="20", start_dir="top", end_dir="top") }}
  </div>
  
  {{ styled_button(id="kofi-btn", image="/social-icons/16x/kofi_icon_bg.png", link="https://ko-fi.com/Axenide", width="32px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(image="/social-icons/16x/github_icon_bg.png", link="https://github.com/Axenide/Ambxst", width="32px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(id="discord-btn", image="/social-icons/16x/discord_icon_bg.png", link="https://discord.com/invite/gHG9WHyNvH", width="32px", effect="zoom rotate", rotate="-15") }}
</div>

## Installation

{% crt() %}
```bash
curl -L get.axeni.de/ambxst | sh
```
{% end %}

> [!WARNING]
> Ambxst is currently in early development.

## Features
- [x] Customizable components
- [x] Themes
- [x] System integration
- [x] App launcher
- [x] Clipboard manager
- [x] Quick notes (and not so quick ones)
- [x] Wallpaper manager
- [x] Emoji picker
- [x] [tmux](https://github.com/tmux/tmux) session manager
- [x] System monitor
- [x] Media control
- [x] Notification system
- [x] Wi-Fi manager
- [x] Bluetooth manager
- [x] Audio mixer
- [x] [EasyEffects](https://github.com/wwmm/easyeffects) integration
- [x] Screen capture
- [x] Screen recording
- [x] Color picker
- [x] OCR
- [x] QR and barcode scanner
- [x] "Mirror" (webcam)
- [x] Game mode
- [x] Night mode
- [x] Power profile manager
- [x] AI Assistant
- [x] Weather
- [x] Calendar
- [x] Power menu
- [x] Workspace management
- [x] Support for different layouts (dwindle, master, scrolling, etc.)
- [x] Multi-monitor support
- [x] Customizable keybindings
- [ ] Plugin and extension system
- [ ] Compatibility with other Wayland compositors

## What about the *docs*?

I want to release this before the end of the year, so you'll have to wait a bit for the full documentation. u_u
However, the most important things you need to know are:
- The main configuration is located at `~/.config/Ambxst`.
- You can ask anything on the [Axenide Discord server](https://discord.com/invite/gHG9WHyNvH) or in the [GitHub discussions](https://github.com/Axenide/Ambxst/discussions).

> [!CAUTION]
> Packages installed via Nix will take priority over system ones. Keep this in mind if you run into version conflicts.
