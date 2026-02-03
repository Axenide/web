+++
title = "Ambxst"
date = 2025-12-31
weight = 1
description = "Una shell ***Ax**tremadamente* personalizable."
path = "/es/ambxst"

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
	{ name = "Acerca de", category = [
    { url = "@/projects/_index.md", name = "Características", icon = "sparkle" },
    { url = "@/projects/ambxst/changelog/_index.md", name = "Changelog", icon = "clock-counter-clockwise" },
	] },
    { name = "Links", category = [
    { url = "https://github.com/Axenide/Ambxst", name = "GitHub", icon = "github-logo" },
    { url = "https://discord.com/invite/gHG9WHyNvH", name = "Discord", icon = "discord-logo" },
    { url = "https://ko-fi.com/Axenide", name = "Donate ❤️", icon = "coffee" },
    ] },
]

+++

<img src="ambxst-logo.svg" alt="Ambxst Logo" class="transparent drop-shadow no-hover" style="max-width: 400px; width: 100%;" />

<div align="center">

Una shell ***Ax**tremadamente* personalizable.

</div>

{{ carousel(images=["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"], interval=3000, style="margin: -2rem 0 -2rem 0") }}

<div align="center" style="position: relative; margin-top: 4rem; margin-bottom: 4rem;">
  <div class="desktop-only" style="position: absolute; right: calc(50% + 90px); top: 10px; width: max-content;">
    {{ arrow_note(text="¡Apoya el proyecto!", target="kofi-btn", color="text", font_size="1.25rem", stroke_width="2", head_size="10", amplitude="50", ease_out="20", ease_in="-20", start_dir="bottom", end_dir="bottom") }}
  </div>

  <div class="desktop-only" style="position: absolute; left: calc(50% + 90px); top: 10px; width: max-content;">
    {{ arrow_note(text="¡Únete al servidor!", target="discord-btn", color="text", font_size="1.25rem", stroke_width="2", head_size="10", amplitude="50", ease_out="-20", ease_in="20", start_dir="top", end_dir="top") }}
  </div>
  
  {{ styled_button(id="kofi-btn", image="/social-icons/16x/kofi_icon_bg.png", link="https://ko-fi.com/Axenide", width="32px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(image="/social-icons/16x/github_icon_bg.png", link="https://github.com/Axenide/Ambxst", width="32px", effect="zoom rotate", rotate="-15") }}
  {{ styled_button(id="discord-btn", image="/social-icons/16x/discord_icon_bg.png", link="https://discord.com/invite/gHG9WHyNvH", width="32px", effect="zoom rotate", rotate="-15") }}
</div>

## Instalación

{% crt() %}
```bash
curl -L get.axeni.de/ambxst | sh
```
{% end %}

Ambxst actualmente es compatible con **Arch**, **Fedora** y **NixOS**. Esto incluye tanto las distribuciones base como las derivadas.

> [!IMPORTANT]
> El único requisito previo es tener Hyprland instalado.

> [!NOTE]
> Para usuarios de NixOS, la utilidad de grabación de pantalla `gpu-screen-recorder` solo podrá usar el backend `portal` hasta que se agregue `programs.gpu-screen-recorder.enable = true;` a `configuration.nix` o **home-manager**.

## ¿Cambiará esto mi configuración?

Nope! Ambxst está diseñado para ser no intrusivo. No modificará ninguna de tus configuraciones existentes.

Aplica sus propias configuraciones solo cuando se ejecuta, via IPC. Esto significa que puedes volver a tu configuración anterior simplemente cerrando Ambxst.

## Características
- [x] Componentes personalizables
- [x] Temas
- [x] Integración con el sistema
- [x] Lanzador de aplicaciones
- [x] Gestor de portapapeles
- [x] Notas rápidas (y no tan rápidas)
- [x] Gestor de wallpapers
- [x] Selector de emojis
- [x] Gestor de sesiones de [tmux](https://github.com/tmux/tmux)
- [x] Monitor del sistema
- [x] Control multimedia
- [x] Sistema de notificaciones
- [x] Gestor de Wi-Fi
- [x] Gestor de Bluetooth
- [x] Mezclador de audio
- [x] Integración con [EasyEffects](https://github.com/wwmm/easyeffects)
- [x] Captura de pantalla
- [x] Grabación de pantalla
- [x] Selector de color
- [x] OCR
- [x] Escáner de códigos QR y códigos de barras
- [x] "Espejo" (webcam)
- [x] Modo juego
- [x] Modo noche
- [x] Gestor de perfiles de energía
- [x] Asistente de IA
- [x] Clima
- [x] Calendario
- [x] Menú de apagado
- [x] Gestión de espacios de trabajo
- [x] Soporte para diferentes layouts (dwindle, master, scrolling, etc.)
- [x] Soporte para múltiples monitores
- [x] Atajos de teclado personalizables
- [ ] Sistema de plugins y extensiones
- [ ] Compatibilidad con otros compositores Wayland

## ¡Necesito ayuda!

Si estás teniendo problemas o tienes preguntas:
- Puedes preguntar lo que sea en [Discord](https://discord.com/invite/gHG9WHyNvH) o en las [discusiones de GitHub](https://github.com/Axenide/Ambxst/discussions).
- Puedes abrir un issue en el [repositorio de GitHub](https://github.com/Axenide/Ambxst/issues).
- La configuración principal se encuentra en `~/.config/Ambxst/`.
