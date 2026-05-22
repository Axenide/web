+++
title = "Ax-Shell"
date = 2025-03-03
weight = 1
description = "Una shell -hackeable- para Hyprland, impulsada por Fabric."
path = "/es/ax-shell"

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
  
Una shell modificable para [Hyprland](https://hyprland.org/), impulsada por [Fabric](https://ffpy.org/).

</div>

{{ carousel(start=1, end=15, interval=3000, style="margin: -2rem 0 0 0") }}

<div align="center">
  {{ styled_button(icon="coffee", label="Ko-Fi", link="https://ko-fi.com/Axenide", width="24px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(icon="github-logo", label="GitHub", link="https://github.com/Axenide/Ax-Shell", width="24px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(icon="discord-logo", label="Discord", link="/es/discord", width="24px", effect="zoom rotate", rotate="-15") }}
</div>

## Instalación

> [!NOTE]
> Necesitas una instalación funcional de Hyprland.
> Esto también habilitará NetworkManager si aún no está activo.

### Arch Linux

> [!TIP]
> ¡Este comando también sirve para actualizar una instalación existente!

**Ejecuta el siguiente comando en tu terminal una vez hayas iniciado sesión en Hyprland:**
```bash
curl -fsSL get.axeni.de/ax-shell | bash
```

**Alternativa:**
```bash
curl -fsSL https://raw.githubusercontent.com/Axenide/Ax-Shell/main/install.sh | bash
```

### NixOS
[poogas](https://github.com/poogas) ha creado un flake para Ax-Shell.
👉 [¡Pruébalo!](https://github.com/poogas/Ax-Shell) 👈

### Instalación Manual
1. Instala las dependencias:
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
- Dependencias de Python:
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
- Fuentes (automatizado en la primera ejecución):
    - Zed Sans
    - Tabler Icons

2. Descarga y ejecuta Ax-Shell:
```bash
git clone https://github.com/Axenide/Ax-Shell.git ~/.config/Ax-Shell
uwsm -- app python ~/.config/Ax-Shell/main.py > /dev/null 2>&1 & disown
```

## Hoja de ruta
- [x] Lanzador de aplicaciones (App Launcher)
- [x] Gestor de Bluetooth
- [x] Calculadora
- [x] Calendario
- [x] Gestor de Portapapeles
- [x] Selector de Color
- [x] Interfaz de usuario personalizable
- [x] Dashboard
- [x] Dock
- [x] Selector de Emojis
- [x] Tablero Kanban
- [x] Gestor de Red
- [x] Notificaciones
- [x] OCR
- [x] Pines
- [x] Gestor de Energía
- [x] Menú de Apagado
- [x] Grabador de Pantalla
- [x] Captura de Pantalla
- [x] Ajustes
- [x] Bandeja del Sistema
- [x] Terminal
- [x] Gestor de Sesiones Tmux
- [x] Verificador de actualizaciones
- [x] Diseño Vertical
- [x] Selector de Fondos de Pantalla
- [x] Vista previa de áreas de trabajo
- [x] Soporte para múltiples monitores
- [ ] Asistente de IA Multimodal
- [ ] OSD
- [ ] Gestor de OTP
