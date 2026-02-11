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
I'm <mark>Adriano Tisera</mark>, known on the Internet as <mark>Axenide</mark>. Future computer engineer, technologist, and scientist. I'm a programmer, I make videos, music, animation, and video games... Among other things.
</p>
</div>
    
{{ retro_avatar(src="/images/avatar.jpg", alt="Axenide") }}
</div>
<div id="scroll-target" style="position: absolute; bottom: 110px; left: 50%; width: 1px; height: 1px; z-index: -1;"></div>

<a class="scroll-indicator" href="#about" style="position: absolute; bottom: 120px; left: 50%; margin-left: -120px; display: flex; align-items: flex-end; gap: 76px; pointer-events: auto; cursor: pointer; z-index: 10; text-decoration: none;">
<div style="width: 96px; height: 96px; z-index: 0; animation: svg-boil 0.3s infinite steps(1); flex-shrink: 0;">
<div class="axie-icon" style="width: 96px; height: 96px; background-color: var(--accent-color); -webkit-mask: url('/images/axie.svg') no-repeat center / contain; mask: url('/images/axie.svg') no-repeat center / contain; transition: background-color 0.3s ease;"></div>
</div>
<div style="margin-bottom: 28px; min-width: max-content;">
<div style="transform: rotate(5deg); display: inline-block; text-align: center;">
{{ arrow_note(text="Pssst...<br>There's more.", target="scroll-target", start_dir="left", end_dir="top", color="accent", font_size="1rem", amplitude="30", spacing="10", stroke_width="2") }}
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

## About

<ul class="masonry">
<!-- Card Start: Intro -->
<li>
<article>

<img src="/images/space.gif" style="height:128px; width:100%; object-fit:cover; object-position:center;">

**⚡ I am a [polymath](https://en.wikipedia.org/wiki/Polymath).**

I'm from Mendoza, Argentina. I’ve always been drawn to technology and science, and I love making things like code, music, animations, videos, and games. ᕙ(͡°‿ ͡°)ᕗ

**I’m {{ age() }} years old.**

2001, what a year. June 12th, it was a Tuesday. A really cold night in Mendoza...

I was extracted successfully, with my eyes wide open, and my first thought was "general relativity and quantum mechanics haven't been unified yet, what a shame". Then I cried a lot. Wouldn't you? u_u

</article>

<article class="fancy-list">

**✨ Hyperfixations:**
- Red
- Open Source
- Astronomy
- Cartoons
- Frutiger Aero
- Pixel Art
- <button id="shy">Sans</button> (literally me)

</article>

<article class="fancy-list">

{{ piano_embed() }}

**🎶 I play some instruments:**
- Piano
- Guitar
- Flute
- Peruvian cajón
- My dad has a violin, so maybe someday.

</article>
</li>

<!-- Card Start: Tile Embed -->
<li>
<article>
{{ tile_embed() }}

**👾 I study computer science engineering.**

My curiosity about computers led me into this field, where I get to merge creativity with tech.

</article>

<article>

{{ github_grid(color="#40c463") }}

I honestly enjoy coding and problem-solving. It’s like a puzzle that I get to solve every day, and I love the satisfaction of seeing my ideas come to life through code. :)

</article>

<article>

<img src="/images/computer.gif" style="width:100%;">

**🔧 I like tinkering and building custom tools.**

I’m obsessed with building my own tools and workflows. People say not to reinvent the wheel, but I think custom tools can unlock freedom and innovation. Just like every person is unique, the tools they use can be too. :D

</article>

<article class="fancy-list games">

**🕹️ Procrastination Kit:**

{{ games() }}
</article>
</li>
</ul>

## IndieWeb

Simply put, IndieWeb is anything on the web that is hand-crafted, feels personal and gives a retro feel.

Cozy and nostalgic, like the early days of the internet. Since I became an adult, I felt this strong urge to recreate that feeling of wonder and excitement I had when I first explored the web as a kid.

Also, I had a lot of fun making my own 88x31 button, and you should make one too! :)

{{ badges(note_text="My 88x31 here") }}

</div>

## Online

Where and when to find me online.

<ul class="masonry">
<!-- Card Start -->
<li>
{{ now_playing() }}
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
<article class="online fancy-list">
<strong id="socials" class="title">Socials</strong>

{{ online(type="socials") }}

</article>
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
<article class="online fancy-list">
<strong id="forges" class="title">Code</strong>

{{ online(type="forges") }}

</article>
</li>
<!-- Card End -->

<!-- Card Start -->
<li>
<article class="online fancy-list">
<strong id="contacts" class="title">Contacts</strong>

For me it's currently <time id="clock">00:00</time> <small>(UTC-3)</small> and I'm <span id="online-indicator"><i class="icon"></i><span id="online-indicator-text">Offline</span></span>.

Feel free to reach me out on any of these!

{{ online(type="contacts") }}

</article>
</li>
<!-- Card End -->
</ul>
</section>

<img id="flutter" width="128" height="110" class="transparent no-hover" src="/home/sans.webp" alt="Sans The Skeleton">
