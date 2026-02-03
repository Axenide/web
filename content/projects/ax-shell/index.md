+++
title = "Ax-Shell"
date = 2025-03-03
weight = 1
description = "A hackable shell for Hyprland, powered by Fabric. "
path = "/ax-shell"

[taxonomies]
tags = ["dev", "wip"]
[extra]
no_header = true
banner = "1.png"
hide_banner = true
accent_color = "hsl(349.22, 100%, 40.39%)"
[extra.meta]
favicon = "favicon.svg"
+++

<img src="./ax-shell-banner.png" alt="Ambxst Logo" class="transparent drop-shadow no-hover" style="width: 100%;" />

<div align="center">
  
A hackable shell for [Hyprland](https://hyprland.org/), powered by [Fabric](https://ffpy.org/).

</div>

{{ carousel(start=1, end=15, interval=3000, style="margin: -2rem 0 0 0") }}

<div align="center">
  {{ styled_button(image="/social-icons/16x/kofi_icon_bg.png", link="https://ko-fi.com/Axenide", width="32px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(image="/social-icons/16x/github_icon_bg.png", link="https://github.com/Axenide/Ax-Shell", width="32px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(image="/social-icons/16x/discord_icon_bg.png", link="https://discord.com/invite/gHG9WHyNvH", width="32px", effect="zoom rotate", rotate="-15") }}
</div>

## Installation

> [!NOTE]
> You need a functioning Hyprland installation.
> This will also enable NetworkManager if it is not already enabled.

### Arch Linux

> [!TIP]
> This command also works for updating an existing installation!

**Run the following command in your terminal once logged into Hyprland:**
```bash
curl -fsSL get.axeni.de/ax-shell | bash
```

**Alternative:**
```bash
curl -fsSL https://raw.githubusercontent.com/Axenide/Ax-Shell/main/install.sh | bash
```

### NixOS
[poogas](https://github.com/poogas) has created a flake for Ax-Shell.
👉 [Try it out!](https://github.com/poogas/Ax-Shell) 👈

### Manual Installation
1. Install dependencies:
- [Fabric](https://github.com/Fabric-Development/fabric)
- [fabric-cli](https://github.com/Fabric-Development/fabric-cli)
- [Gray](https://github.com/Fabric-Development/gray)
- [Matugen](https://github.com/InioX/matugen)
- `awww`
- `brightnessctl`
- `cava`
- `cliphist`
- `ddcutil`
- `gnome-bluetooth-3.0`
- `gobject-introspection`
- `gpu-screen-recorder`
- `grimblast`
- `hypridle`
- `hyprlock`
- `hyprpicker`
- `hyprshot`
- `hyprsunset`
- `imagemagick`
- `libnotify`
- `networkmanager`
- `network-manager-applet`
- `nm-connection-editor`
- `noto-fonts-emoji`
- `nvtop`
- `playerctl`
- `swappy`
- `tesseract`
- `tesseract-data-eng`
- `tesseract-data-spa`
- `tmux`
- `unzip`
- `upower`
- `uwsm`
- `vte3`
- `webp-pixbuf-loader`
- `wl-clipboard`
- Python dependencies:
    - PyGObject
    - ijson
    - numpy
    - pillow
    - psutil
    - pywayland
    - requests
    - setproctitle
    - toml
    - watchdog
- Fonts (automated on first run):
    - Zed Sans
    - Tabler Icons

2. Download and run Ax-Shell:
```bash
git clone https://github.com/Axenide/Ax-Shell.git ~/.config/Ax-Shell
uwsm -- app python ~/.config/Ax-Shell/main.py > /dev/null 2>&1 & disown
```

## Roadmap
- [x] App Launcher
- [x] Bluetooth Manager
- [x] Calculator
- [x] Calendar
- [x] Clipboard Manager
- [x] Color Picker
- [x] Customizable UI
- [x] Dashboard
- [x] Dock
- [x] Emoji Picker
- [x] Kanban Board
- [x] Network Manager
- [x] Notifications
- [x] OCR
- [x] Pins
- [x] Power Manager
- [x] Power Menu
- [x] Screen Recorder
- [x] Screenshot
- [x] Settings
- [x] System Tray
- [x] Terminal
- [x] Tmux Session Manager
- [x] Update checker
- [x] Vertical Layout
- [x] Wallpaper Selector
- [x] Workspaces Overview
- [x] Multi-monitor support
- [ ] Multimodal AI Assistant
- [ ] OSD
- [ ] OTP Manager
