+++
title = "Ambxst"
date = 2025-12-31
weight = 1
description = "Una shell Axtremadamente personalizable."
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
    # { url = "@/projects/_index.md", name = "Características", icon = "sparkle" },
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

Una shell ***Ax**tremadamente* personalizable.

</div>

{{<carousel start={1} end={10} interval={3000} style="margin: -2rem 0 -2rem 0"/>}}

<div align="center" style="position: relative; margin-top: 4rem; margin-bottom: 4rem;">
  <div class="desktop-only" style="position: absolute; right: calc(50% + 90px); top: 10px; width: max-content;">
    {{<arrow_note text="¡Apoya el proyecto!" target="kofi-btn" color="text" font_size="1.25rem" stroke_width="2" head_size="10" amplitude="50" ease_out="20" ease_in="-20" start_dir="bottom" end_dir="bottom"/>}}
  </div>

  <div class="desktop-only" style="position: absolute; left: calc(50% + 90px); top: 10px; width: max-content;">
    {{<arrow_note text="¡Únete al servidor!" target="discord-btn" color="text" font_size="1.25rem" stroke_width="2" head_size="10" amplitude="50" ease_out="-20" ease_in="20" start_dir="top" end_dir="top"/>}}
  </div>
  
  {{<styled_button id="kofi-btn" icon="coffee" label="Ko-Fi" link="https://ko-fi.com/Axenide" width="24px" effect="zoom rotate" rotate="-15" config={config}/>}}
  {{<styled_button icon="github-logo" label="GitHub" link="https://github.com/Axenide/Ambxst" width="24px" effect="zoom rotate" rotate="-15" config={config}/>}}
  {{<styled_button id="discord-btn" icon="discord-logo" label="Discord" link="/es/discord" width="24px" effect="zoom rotate" rotate="-15" config={config}/>}}
</div>

## Instalación

<div style="margin:0 auto; text-align:center; margin-bottom: 2rem; margin-top: 2rem;">

```bash
curl -fsSL get.axeni.de/ambxst | sh
```

</div>

Esto instalará Ambxst y sus dependencias. Tendrás disponible el comando `ambxst` en tu terminal para iniciar la shell.

### Hyprland (¡más compositores próximamente!)

1. Ejecuta el comando de instalación anterior.

2. Ejecuta `ambxst install hyprland` para agregar la configuración de Ambxst a Hyprland. Esto va a importar un archivo que aplica las configuraciones de Ambxst. Si usas `hyprland.lua`, o si todavía no existe una configuración de Hyprland, se verá así:

```lua
-- Ambxst
loadfile(os.getenv("HOME") .. "/.local/share/ambxst/hyprland.lua")()

-- OVERRIDES
-- Down here you can write or source anything that you want to override from Ambxst's settings.
```

Si solo tienes `hyprland.conf`, Ambxst seguirá usando el import legacy ahí por compatibilidad:

```bash
# Ambxst
source = ~/.local/share/ambxst/hyprland.conf

# OVERRIDES
# Down here you can write or source anything that you want to override from Ambxst's settings.
```

Como se indicó, cualquier cosa que quieras sobreescribir de las configuraciones de Ambxst debe escribirse debajo de la sección "OVERRIDES".

3. Inicia Ambxst ejecutando `ambxst` en tu terminal. Si quieres que siga funcionando sin la ventana de la terminal abierta, puedes usar `ambxst & disown`. Esto será necesario solo para tu primera prueba, ya que Ambxst iniciará automáticamente luego del paso 2.

Ambxst actualmente es compatible con **Arch**, **Fedora** y **NixOS**. Esto incluye tanto las distribuciones base como las derivadas.

> [!IMPORTANT]
> El único requisito previo es tener Hyprland instalado.

> [!NOTE]
> Para usuarios de NixOS, la utilidad de grabación de pantalla `gpu-screen-recorder` solo podrá usar el backend `portal` hasta que se agregue `programs.gpu-screen-recorder.enable = true;` a `configuration.nix` o **home-manager**.

### NixOS + home-manager (Hyprland ≥0.56 Lua)

Cuando ejecutes Ambxst en NixOS con [home-manager](https://github.com/nix-community/home-manager), **no** configures Hyprland mediante `wayland.windowManager.hyprland.settings` con variables como `$mod` / `$terminal`. Hyprland 0.56 espera un punto de entrada en Lua (`hl.config(...)`, `hl.bind(...)`, `hl.exec_cmd(...)`), no la sintaxis legacy `bind = "$mod, Return, exec, $terminal"`. El módulo de home-manager genera `hyprland.lua` literalmente a partir de `settings`, por lo que el archivo resultante es Lua inválido.

En su lugar, usa un `xdg.configFile` declarativo y hazle hacer `loadfile()` del archivo que Ambxst escribe:

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

Notas:

- `ambxst install hyprland` detecta los archivos gestionados por home-manager (symlinks hacia `/nix/store`) e imprime una guía en lugar de intentar añadir contenido; nunca romperá el symlink ni escribirá a través de él.
- `~/.local/share/ambxst/hyprland.lua` es regenerado por el demonio `axctl` en cada cambio de tema/gaps/binds. Los ajustes cosméticos **no** requieren `nixos-rebuild`; solo los cambios estructurales (nuevos binds, cambio de layout) requieren un `home-manager switch`.

## ¿Cambiará esto mi configuración?

¡Para nada! Exceptuando el bloque de importación de Ambxst en tu `hyprland.conf` o `hyprland.lua`, Ambxst está diseñado para ser no intrusivo. No modificará ninguna de tus configuraciones existentes.

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
- [x] [Gestor de mods con integración nativa en Settings](https://github.com/Axenide/Ambxst/tree/main/docs/mods)
- [x] Compatibilidad con otros compositores Wayland

## ¡Necesito ayuda!

Si estás teniendo problemas o tienes preguntas:
- Puedes preguntar lo que sea en [Discord](/discord) o en las [discusiones de GitHub](https://github.com/Axenide/Ambxst/discussions).
- Puedes abrir un issue en el [repositorio de GitHub](https://github.com/Axenide/Ambxst/issues).
- La configuración principal se encuentra en `~/.config/ambxst/`.
