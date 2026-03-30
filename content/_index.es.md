+++
title = "Axenide"
insert_anchor_links = "left"
[extra]
scripts = ["js/home.js", "js/shy.js"]
no_header = true
socials = [
    { name = "YouTube", url = "https://www.youtube.com/@Axenide", icon = "/social-icons/16x/youtube_icon_bg.png" },
    { name = "Twitch", url = "https://www.twitch.tv/Axenide", icon = "/social-icons/16x/twitch_icon_bg.png" },
    { name = "X / Twitter", url = "https://x.com/Axenide", icon = "/social-icons/16x/xtwitter_icon_bg.png" },
    { name = "Instagram", url = "https://www.instagram.com/Axenide", icon = "/social-icons/16x/instagram_icon_bg.png" },
    { name = "Reddit", url = "https://www.reddit.com/user/Axenide", icon = "/social-icons/16x/reddit_icon_bg.png" },
    { name = "Bluesky", url = "https://bsky.app/profile/axeni.de", icon = "/social-icons/16x/bluesky_icon_bg.png" },
]
forges = [
    { name = "GitHub", url = "https://github.com/Axenide", icon = "/social-icons/16x/github_icon_bg.png" },
]
contacts = [
    { name = "Discord", url = "https://discord.com/invite/gHG9WHyNvH", icon = "/social-icons/16x/discord_icon_bg.png" },
    { name = "Email", url = "mailto:hi@axeni.de", icon = "/social-icons/16x/domain_icon_bg.png" },
]
badges = [
{ name = "axenide.gif", url = "https://axeni.de" },
{ name = "linux.gif", url = "https://kernel.org" },
{ name = "archlinux.gif", url = "https://archlinux.org" },
{ name = "godot.png", url = "https://godotengine.org" },
{ name = "neovim.png", url = "https://neovim.io" },
{ name = "python.png", url = "https://python.org" },
{ name = "ddg.gif", url = "https://duckduckgo.com" },
{ name = "ffmpeg.png", url = "https://ffmpeg.org" },
{ name = "firefox.gif", url = "https://getfirefox.com" },
{ name = "ublock-origin.webp", url = "https://github.com/gorhill/uBlock" },
{ name = "frutiger_aero_community.png", url = "https://frutigeraero.org" },
{ name = "minecraft.gif", url = "https://minecraft.net" },
{ name = "dark-mode.gif", url = "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" },
{ name = "mobilefriendly.gif", url = "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design" },
{ name = "discord.gif", url = "https://discord.com/invite/gHG9WHyNvH" },
{ name = "tr1xem.gif", url = "https://trix.is-a.dev" },
{ name = "sankalp.png", url = "https://sankalptharu.com.np" },
{ name = "daudix.gif", url = "https://daudix.one" },
{ name = "righttorepair.gif", url = "https://www.ifixit.com/Right-to-Repair" },
{ name = "bestviewed16bit.gif" },
{ name = "savewalterwhite.gif", url = "http://www.savewalterwhite.com" },
{ name = "portal.gif", url = "https://www.thinkwithportals.com" },
{ name = "aperturelabs.gif", url = "https://www.aperturescience.com" },
{ name = "neo-fedi.gif", url = "https://jointhefediverse.net" },
{ name = "smoke.gif" },
{ name = "yarrr.gif" },
{ name = "stardew-valley.gif", url = "https://www.stardewvalley.net" },
{ name = "88x31.gif", url = "https://88x31.nl" },
{ name = "98.gif" },
{ name = "000010.gif" },
{ name = "sourcemissing.gif" },
]
+++

<section class="snap-section hero-wrapper">
<div class="hero-container">
<div class="hero-content">
{{ retro_text(text="Axenide", tag="h1") }}
<p style="font-size: 1rem; margin-bottom: 2rem; line-height: 1.6;">
Soy <mark>Adriano Tisera</mark>, conocido en Internet como <mark>Axenide</mark>. Futuro ingeniero informático, tecnólogo y científico. Soy programador, hago videos, música, animación y videojuegos... Entre otras cosas.
</p>
</div>
    
{{ retro_avatar(src="/images/avatar.jpg", alt="Axenide") }}
</div>
<div id="scroll-target" style="position: absolute; bottom: 110px; left: 50%; width: 1px; height: 1px; z-index: -1;"></div>

<a class="scroll-indicator" href="#sobre-mi" style="position: absolute; bottom: 120px; left: 50%; margin-left: -120px; display: flex; align-items: flex-end; gap: 76px; pointer-events: auto; cursor: pointer; z-index: 10; text-decoration: none;">
<div style="width: 96px; height: 96px; z-index: 0; animation: svg-boil 0.3s infinite steps(1); flex-shrink: 0;">
<div class="axie-icon" style="width: 96px; height: 96px; background-color: var(--accent-color); -webkit-mask: url('/images/axie.svg') no-repeat center / contain; mask: url('/images/axie.svg') no-repeat center / contain; transition: background-color 0.3s ease;"></div>
</div>
<div style="margin-bottom: 28px; min-width: max-content;">
<div style="transform: rotate(5deg); display: inline-block; text-align: center;">
{{ arrow_note(text="Pssst...<br>Hay más.", target="scroll-target", start_dir="left", end_dir="top", color="accent", font_size="1rem", amplitude="30", spacing="10", stroke_width="2") }}
</div>
</div>
</a>
</section>

<script>
  // Handle Hover Effects via JS for robustness
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    const axie = scrollIndicator.querySelector('.axie-icon');
    // Note: arrow-note is created by shortcode, might need dynamic selection or it's available
    
    scrollIndicator.addEventListener('mouseenter', () => {
      // 1. Arrow (SVG)
      const paths = document.querySelectorAll('.arrow-path-boil');
      paths.forEach(p => {
          p.style.transition = 'stroke 0.3s ease';
          p.style.stroke = 'var(--fg-color)';
      });

      // 2. Axie Icon
      if (axie) axie.style.backgroundColor = 'var(--fg-color)';

      // 3. Text
      const note = scrollIndicator.querySelector('.arrow-note');
      if (note) {
        note.style.transition = 'color 0.3s ease';
        note.style.color = 'var(--fg-color)';
      }
    });
    
    scrollIndicator.addEventListener('mouseleave', () => {
      // 1. Arrow (SVG)
      const paths = document.querySelectorAll('.arrow-path-boil');
      paths.forEach(p => {
          p.style.stroke = 'var(--accent-color)';
      });

      // 2. Axie Icon
      if (axie) axie.style.backgroundColor = 'var(--accent-color)';

      // 3. Text
      const note = scrollIndicator.querySelector('.arrow-note');
      if (note) {
        note.style.color = 'var(--accent-color)';
      }
    });
  }
</script>

<section class="snap-section content-wrapper">
<div style="width: 100%;">

## Sobre mí

<ul class="masonry">
<!-- Card Start: Intro -->
<li>
<article>

<img src="/images/space.gif" style="height:128px; width:100%; object-fit:cover; object-position:center;">

**⚡ Soy un [polímata](https://es.wikipedia.org/wiki/Polímata).**

Soy de Mendoza, Argentina. Siempre me ha atraído la tecnología y la ciencia, y me encanta crear cosas como código, música, animaciones, videos y videojuegos. ᕙ(͡°‿ ͡°)ᕗ

**Tengo {{ age() }} años.**

2001, qué año. 12 de junio, fue un martes. Una noche muy fría en Mendoza...

Fui extraído con éxito, con los ojos bien abiertos, y mi primer pensamiento fue "la relatividad general y la mecánica cuántica aún no se han unificado, qué lástima". Y entonces lloré mucho. ¿Vos no lo harías? u_u

</article>

<article class="fancy-list">

**✨ Hiperfijaciones:**
- Rojo
- Open Source
- Astronomía
- Dibujos animados
- Frutiger Aero
- Pixel Art
- <button id="shy">Sans</button> (literalmente yo)

</article>

<article class="fancy-list">

{{ piano_embed() }}

**🎶 Toco algunos instrumentos:**
- Piano
- Guitarra
- Flauta
- Cajón peruano
- Mi papá tiene un violín, así que quizás un día.

</article>
</li>

<!-- Card Start: Tile Embed -->
<li>
<article>
{{ tile_embed() }}

**👾 Estudio ingeniería informática.**

Mi curiosidad por las computadoras me llevó a esto, combinando creatividad y tecnología.

</article>

<article>

{{ github_grid(color="#40c463") }}

Sinceramente disfruto programar y resolver problemas. Es como un rompecabezas que puedo resolver todos los días, y es muy satisfactorio ver mis ideas cobrar vida a través del código. :)

</article>

<article>

<img src="/images/computer.gif" style="width:100%;">

**🔧 Me gusta experimentar y crear herramientas.**

Me obsesiono con crear mis propias herramientas y flujos de trabajo. Dicen que no hay que reinventar la rueda, pero creo que  crear tus propias herramientas puede desbloquear libertad e innovación. Así como cada persona es única, sus herramientas también pueden serlo. :D

</article>

<article class="fancy-list games">

**🕹️ Kit de Procrastinación:**

{{ games() }}
</article>
</li>
</ul>

## IndieWeb

En pocas palabras, IndieWeb es cualquier cosa en la web que sea artesanal, se sienta personal y dé una sensación retro.

Acogedor y nostálgico, como en los primeros días de Internet. Desde que me convertí en adulto, sentí una fuerte necesidad de recrear esa sensación de asombro y emoción que tenía cuando exploraba la web por primera vez de niño.

Además, fue divertido mi propio botón de 88x31, ¡también deberías hacer uno! :)

{{ badges(note_text="Mi 88x31 acá") }}

</div>

## En línea

Dónde y cuándo encontrarme en línea.

<ul class="masonry">
<!-- Card Start -->
<li>
{{ now_playing() }}
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
<article class="online fancy-list">
<strong id="socials" class="title">Redes Sociales</strong>

{{ online(type="socials") }}

</article>
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
<article class="online fancy-list">
<strong id="forges" class="title">Código</strong>

{{ online(type="forges") }}

</article>
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
<article class="online fancy-list">
<strong id="contacts" class="title">Contacto</strong>

Para mí son las <time id="clock">00:00</time> <small>(UTC-3)</small> y estoy <span id="online-indicator"><i class="icon"></i><span id="online-indicator-text">Desconectado</span></span>.

¡Siéntete libre de contactarme por cualquiera de estos medios!

{{ online(type="contacts") }}

</article>
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
{{ server_widget() }}
</li>
<!-- Card End -->
</ul>
</section>

<img id="flutter" width="128" height="110" class="transparent no-hover" src="/home/sans.webp" alt="Sans El Esqueleto">
