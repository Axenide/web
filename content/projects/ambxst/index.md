+++
title = "Ambxst"
date = 2025-12-31
weight = 1
description = "An Axtremely customizable shell."
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

[extra.nav]
links = [
	{ name = "About", category = [
    # { url = "@/projects/_index.md", name = "Features", icon = "sparkle" },
    { url = "@/ambxst/changelog/_index.md", name = "Changelog", icon = "clock-counter-clockwise" },
	] },
    { name = "Links", category = [
    { url = "https://github.com/Axenide/Ambxst", name = "GitHub", icon = "github-logo" },
    { url = "https://axeni.de/discord", name = "Discord", icon = "discord-logo" },
    { url = "https://ko-fi.com/Axenide", name = "Donate ❤️", icon = "coffee" },
    ] },
]

+++

<img src="ambxst-logo.svg" alt="Ambxst Logo" class="transparent drop-shadow no-hover" style="max-width: 400px; width: 100%;" />

<div align="center">

<mark>An ***Ax**tremely* customizable shell.</mark>

</div>

{{<carousel start={1} end={10} interval={3000} style="margin: -2rem 0 -2rem 0"/>}}

<div align="center" style="position: relative; margin-top: 4rem; margin-bottom: 4rem;">
  <div class="desktop-only" style="position: absolute; right: calc(50% + 90px); top: 10px; width: max-content;">
    {{<arrow_note text="Support the project!" target="kofi-btn" color="text" font_size="1.25rem" stroke_width="2" head_size="10" amplitude="50" ease_out="20" ease_in="-20" start_dir="bottom" end_dir="bottom"/>}}
  </div>

  <div class="desktop-only" style="position: absolute; left: calc(50% + 90px); top: 10px; width: max-content;">
    {{<arrow_note text="Join the server!" target="discord-btn" color="text" font_size="1.25rem" stroke_width="2" head_size="10" amplitude="50" ease_out="-20" ease_in="20" start_dir="top" end_dir="top"/>}}
  </div>
  
  {{<styled_button id="kofi-btn" icon="coffee" label="Ko-Fi" link="https://ko-fi.com/Axenide" width="24px" effect="zoom rotate" rotate="-15" config={config}/>}}
  {{<styled_button icon="github-logo" label="GitHub" link="https://github.com/Axenide/Ambxst" width="24px" effect="zoom rotate" rotate="-15" config={config}/>}}
  {{<styled_button id="discord-btn" icon="discord-logo" label="Discord" link="/discord" width="24px" effect="zoom rotate" rotate="-15" config={config}/>}}
</div>

## Installation

<div style="margin:0 auto; text-align:center; margin-bottom: 2rem; margin-top: 2rem;">

```bash
curl -fsSL get.axeni.de/ambxst | sh
```

</div>

This will install Ambxst and its dependencies. You will have the `ambxst` command available in your terminal, which you can use to start the shell.

### Hyprland (more compositors coming soon!)

1. Run the installation command above.

2. Run `ambxst install hyprland` to add Ambxst's configuration to Hyprland. This will source a config file that applies Ambxst's settings. If you use `hyprland.lua`, or if no Hyprland config exists yet, it will look like this:

```lua
-- Ambxst
loadfile(os.getenv("HOME") .. "/.local/share/ambxst/hyprland.lua")()

-- OVERRIDES
-- Down here you can write or source anything that you want to override from Ambxst's settings.
```

If you only have `hyprland.conf`, Ambxst will keep using the legacy import there for compatibility:

```bash
# Ambxst
source = ~/.local/share/ambxst/hyprland.conf

# OVERRIDES
# Down here you can write or source anything that you want to override from Ambxst's settings.
```

As stated, anything you want to override from Ambxst's settings should be written under the "OVERRIDES" section.

3. Start Ambxst by running `ambxst` in your terminal. If you want to keep it running without having the terminal window open, you can run `ambxst & disown`. This will be only necessary for your first test run, as Ambxst will start automatically on login after step 2.

Ambxst is currently supported on **Arch**, **Fedora**, and **NixOS**. This means both based and derivative distributions.

> [!IMPORTANT]
> The only pre-requisite is having Hyprland installed.

> [!NOTE]
> For NixOS users, the screen recording utility `gpu-screen-recorder` will only be able to use the `portal` backend until you add `programs.gpu-screen-recorder.enable = true;` to your `configuration.nix` or **home-manager**.

### NixOS + home-manager (Hyprland ≥0.56 Lua)

When you run Ambxst on NixOS with [home-manager](https://github.com/nix-community/home-manager), **do not** configure Hyprland via `wayland.windowManager.hyprland.settings` with `$mod` / `$terminal` variables. Hyprland 0.56 expects a Lua entrypoint (`hl.config(...)`, `hl.bind(...)`, `hl.exec_cmd(...)`), not the legacy `bind = "$mod, Return, exec, $terminal"` syntax. The home-manager module generates `hyprland.lua` verbatim from `settings`, so the resulting file is invalid Lua.

Use a declarative `xdg.configFile` instead and let it `loadfile()` the file Ambxst writes:

```nix
# home.nix
{ lib, ... }: {
  wayland.windowManager.hyprland.enable = false;

  xdg.configFile."hypr/hyprland.lua".text = ''
    -- Import the config axctl/ambxst writes to ~/.local/share/ambxst/
    loadfile(os.getenv("HOME") .. "/.local/share/ambxst/hyprland.lua")()

    -- OVERRIDES (hl.* API, Hyprland >=0.56)
    hl.config({ input = { kb_layout = "latam", follow_mouse = 1 } })
    hl.monitor({ output = "", mode = "preferred", scale = 1 })
    hl.bind("SUPER + Return", hl.dsp.exec_cmd("kitty"))
    hl.bind("SUPER + Q",     hl.dsp.window.close())
  '';

  home.activation.fixHyprlandAmbxst = lib.hm.dag.entryAfter ["writeBoundary"] ''
    if [ -f "$HOME/.config/hypr/hyprland.conf" ] \
       && [ ! -L "$HOME/.config/hypr/hyprland.conf" ]; then
      mv "$HOME/.config/hypr/hyprland.conf" \
         "$HOME/.config/hypr/hyprland.conf.bak.$(date +%F-%H%M)"
    fi
    mkdir -p "$HOME/.local/share/ambxst"
    [ -f "$HOME/.local/share/ambxst/hyprland.lua" ] \
      || echo '-- placeholder' > "$HOME/.local/share/ambxst/hyprland.lua"
  '';
}
```

Notes:

- `ambxst install hyprland` detects home-manager-managed files (symlinks into `/nix/store`) and prints a guide instead of trying to append — it will never break the symlink or write through it.
- `~/.local/share/ambxst/hyprland.lua` is regenerated by the `axctl` daemon on every theme/gaps/binds change. Cosmetic tweaks do **not** require `nixos-rebuild`; only structural changes (new binds, layout switch) need a `home-manager switch`.

## Will this change my config?

Nope! Besides the Ambxst import block in your `hyprland.conf` or `hyprland.lua`, Ambxst is designed to be non-intrusive. It won't modify any of your existing configurations.

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
- [x] [Mod manager with native Settings integration](https://github.com/Axenide/Ambxst/tree/main/docs/mods)
- [x] Compatibility with other Wayland compositors

## I need help!

If you are having trouble or have any questions:
- You can ask anything on [Discord](/discord) or in the [GitHub discussions](https://github.com/Axenide/Ambxst/discussions).
- You can open an issue on the [GitHub repository](https://github.com/Axenide/Ambxst/issues).
- The main configuration is located at `~/.config/ambxst`.
