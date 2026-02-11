+++
title = "Servidor de Discord"
description = "Únete a nuestro servidor de Discord."
[extra]
no_header = true
+++

{{ discord_server() }}

## Sobre

Este es un espacio donde personas con intereses similares se reúnen para discutir tecnología, compartir proyectos creativos, jugar juntos y simplemente pasar un buen rato.

**Lo que encontrarás aquí:**

- Una comunidad amigable de entusiastas de la tecnología y creadores
- Canales para programación, diseño, música y videojuegos
- Un lugar para mostrar tus proyectos y recibir feedback
- Eventos y actividades ocasionales
- Una atmósfera relajada donde todos son bienvenidos

<blockquote class="markdown-alert-note">
Este servidor está pensado para ser un lugar acogedor y amigable. Por favor, sé respetuoso con todos los miembros.
</blockquote>

## Reglas

Para mantener esta comunidad agradable para todos, por favor sigue estas pautas:

1. **Sé respetuoso** - Trata a todos con respeto. No se tolera el acoso, discurso de odio o comportamiento tóxico.

2. **No hagas spam** - Evita mensajes excesivos, spam de emojis o contenido repetitivo.

3. **Mantenlo SFW** - Este es un servidor seguro para el trabajo. Sin contenido NSFW.

4. **Usa los canales apropiados** - Publica el contenido en los canales relevantes.

5. **Sin autopromoción** - Evita la publicidad no solicitada o la autopromoción excesiva.

6. **Sigue los Términos de Servicio de Discord** - Todos los TOS de Discord aplican aquí.

7. **Escucha a los moderadores** - Las decisiones del staff son finales. Si tienes inquietudes, mándales un DM privado.

El incumplimiento de estas reglas puede resultar en advertencias, timeouts o baneos dependiendo de la gravedad.

<script>
// Discord Widget API integration
const INVITE_CODE = 'gHG9WHyNvH';

async function fetchDiscordData() {
  try {
    // Fetch invite data with counts
    const response = await fetch(`https://discord.com/api/invites/${INVITE_CODE}?with_counts=true`);
    if (response.ok) {
      const data = await response.json();
      
      // Update stats
      document.getElementById('online-count').textContent = `${data.approximate_presence_count || 0} En línea`;
      document.getElementById('member-count').textContent = `${data.approximate_member_count || 0} Miembros`;
      
      // Update invite link
      if (data.guild) {
        document.getElementById('guild-invite').href = `https://discord.com/invite/${INVITE_CODE}`;
      }
    }
  } catch (e) {
    // Silently fail - static values will remain
    console.log('Could not fetch Discord data');
  }
}

// Fetch on load
document.addEventListener('DOMContentLoaded', fetchDiscordData);
</script>
