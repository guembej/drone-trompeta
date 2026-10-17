# Pistón

App web instalable (PWA) para estudiar trompeta: drone, afinador, metrónomo y calentamiento de pregunta y respuesta. Funciona sin conexión en Android y en Windows.

- **Drone**: 12 notas, octava grave/media/aguda, quinta justa y octava opcionales, y timbres puro, órgano y trompeta. La trompeta usa grabaciones reales.
- **Afinador**: aguja clásica (−50 a +50 cents, verde ±5 c, ámbar ±15 c) con movimiento amortiguado, nota y desviación en cents. Mide contra el temperamento igual o contra la afinación justa respecto al drone.
- **Notación**: Si♭ (escrita para trompeta) o Do (sonido real).
- **Diapasón**: ajustable de 415 a 460 Hz (442 por defecto) desde el botón de la cabecera. En notación Si♭ se muestra como Si4 (el La4 real escrito para trompeta) y en Do como La4.
- **Filtro anti-drone**: quita del micrófono la frecuencia del drone y sus armónicos para que el afinador detecte tu nota. Con auriculares puedes desactivarlo.
- **Metrónomo**: de 30 a 250 bpm, con − / + (mantén pulsado), deslizador y tap tempo. Compases 2/4, 3/4, 4/4 y 6/8, subdivisiones y acento en el primer tiempo. Puede **subir el tempo solo** (+N bpm cada M compases hasta un tope; al parar vuelve al tempo inicial y te dice a cuánto llegaste) y dejar **compases mudos** para entrenar el pulso interno.
- **Calentamiento**: la app toca la frase con trompeta real y tú la repites en los compases siguientes. Después se transporta medio tono (bajando, subiendo o igual). El pentagrama muestra la frase con clave de sol, armadura y alteraciones. En tu turno, la aguja mide respecto a la nota que toca. El drone puede seguir la tónica. Tempo, transposición, número de tonalidades y drone se ajustan en vivo; el tempo nuevo entra en la siguiente repetición para que no se descuadre la frase.
- **En el PC**: el afinador queda fijo a la derecha y cada pestaña aprovecha el ancho (el pentagrama del calentamiento ocupa toda la línea).
- **Editor de ejercicios**: escribe tus frases en texto (`Do4 Sol4 Do5:2 | Mi5:4`) con vista previa en el pentagrama.
- **Barra de transporte**: drone, metrónomo y afinador se encienden y apagan desde cualquier pestaña. El botón del afinador se colorea con tu afinación.
- **Interfaz minimalista**: tres pestañas (Drone · Afinador con metrónomo · Calentar). Cada una muestra solo lo que se usa al tocar; el resto está detrás de ⚙, y abajo solo aparece lo que no es lo habitual (por ejemplo «Justo»). Notación y diapasón están en el ⚙ de la cabecera. En el móvil se cambia de pestaña deslizando el dedo.
- **Teclado** (ordenador): C–B notas, Mayús = ♯, Espacio drone, ↑↓ octava, M metrónomo, ←→ tempo, T afinador.
- **Afinador ajustable**: tolerancia ±10 / ±5 / ±3 cents y respuesta lenta, media o rápida. El panel se tiñe de verde al estar afinado y dice «afinado», «alto» o «bajo».
- **Tiempo de labio**: con el afinador activo cuenta el tiempo que suena la trompeta («Labio hoy», en las opciones del afinador).
- La pantalla no se apaga mientras suena el drone o está activo el afinador.

## Archivos

```
index.html          app completa (HTML + CSS + JS)
manifest.json       nombre, iconos, modo standalone y vertical
service-worker.js   caché para usarla sin conexión
icons/              icon.svg, icon-192.png, icon-512.png
audio/              trompeta real: ataque + bucle sostenido (7 notas, Mi3–Si♭5)
```

---

## 1. Probar en local en el PC

El micrófono solo funciona en HTTPS o en `localhost`, así que no basta con abrir `index.html` con doble clic.

1. Abre una terminal en la carpeta del proyecto.
2. Arranca un servidor (necesitas Python, que ya tienes instalado):
   ```
   python -m http.server 8000
   ```
   Si prefieres Node: `npx serve -l 8000`
3. Abre `http://localhost:8000` en Chrome o Edge y acepta el permiso de micrófono.
4. Para pararlo, pulsa `Ctrl + C` en la terminal.

> El service worker guarda la app en caché. Si cambias algo y no lo ves, recarga con `Ctrl + Shift + R` o abre DevTools → Application → Service workers → *Update on reload*.

---

## 2. Publicarla gratis en GitHub Pages

GitHub Pages sirve la web por HTTPS, que es obligatorio para usar el micrófono en el móvil.

### Opción A: desde la web, sin comandos

1. Crea una cuenta en <https://github.com> si no tienes.
2. Arriba a la derecha, pulsa **+ → New repository**.
   - Nombre: `drone-trompeta`
   - Visibilidad: **Public** (Pages es gratis en repositorios públicos)
   - Pulsa **Create repository**.
3. En el repositorio vacío, pulsa **uploading an existing file**.
4. Arrastra `index.html`, `manifest.json`, `service-worker.js`, `README.md` y la carpeta `icons` entera. No hace falta subir la carpeta `.claude`.
5. Pulsa **Commit changes**.
6. Ve a **Settings → Pages** y, en *Build and deployment*:
   - Source: **Deploy from a branch**
   - Branch: **main** y carpeta **/ (root)** → **Save**
7. Espera uno o dos minutos y recarga. Aparecerá la dirección:
   `https://TU-USUARIO.github.io/drone-trompeta/`

### Opción B: con git (tienes `git` y `gh` instalados)

```
cd C:\Users\javie\Documents\AI\DRONE
git init -b main
git add index.html manifest.json service-worker.js README.md icons
git commit -m "Drone Trompeta"
gh auth login
gh repo create drone-trompeta --public --source . --push
```

Después activa Pages como en el paso 6 de la opción A, o con este comando:

```
gh api -X POST repos/{owner}/drone-trompeta/pages -f "source[branch]=main" -f "source[path]=/"
```

### Publicar cambios más adelante

1. Sube un número la versión en `service-worker.js` (`drone-trompeta-v1` → `v2`). Si no lo haces, los móviles seguirán usando la versión guardada en caché.
2. Sube los archivos de nuevo (opción A) o haz `git commit` y `git push` (opción B).
3. En el móvil, cierra la app y ábrela otra vez. Puede que tengas que hacerlo dos veces: la primera descarga la versión nueva y la segunda la usa.

---

## 3. Instalarla

### Android (Chrome)

1. Abre `https://TU-USUARIO.github.io/drone-trompeta/` en Chrome.
2. Pulsa el menú **⋮ → Añadir a pantalla de inicio → Instalar**. En algunas versiones aparece directamente **Instalar aplicación**.
3. Ábrela desde el icono. Se abre a pantalla completa, sin barra del navegador.
4. La primera vez que pulses **Afinador**, acepta el permiso de micrófono.
5. Para el drone, conecta **auriculares** (de cable o Bluetooth). El Bluetooth tiene algo de retardo, pero a un drone no le afecta.

### Windows (Chrome o Edge)

- **Chrome**: abre la dirección y pulsa el icono de instalar (un monitor con una flecha) a la derecha de la barra de direcciones. También puedes ir a **⋮ → Transmitir, guardar y compartir → Instalar página como aplicación**.
- **Edge**: **… → Aplicaciones → Instalar este sitio como aplicación**.

La app aparece en el menú Inicio y puedes anclarla a la barra de tareas.

---

## Consejos de uso

- **En el móvil sobre el atril**: el micrófono está en la parte de abajo del teléfono. No lo tapes y apunta la campana hacia él desde un metro o más.
- **Sin auriculares**: deja activado *Filtrar el drone del micro*. Es fiable, pero los auriculares lo son todavía más.
- **Modo justo**: en este modo la 3ª mayor queda en 0 cuando está unos 14 cents más baja que en el temperado, y la 3ª menor cuando está unos 16 cents más alta. Es la referencia que quieres al afinar contra el drone.
- Si el afinador se queda en «–» mientras tocas, toca más fuerte o acércate. La puerta de nivel aprende el ruido de fondo durante los silencios.

## Créditos

Las grabaciones de trompeta son de los [University of Iowa Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html) (Lawrence Fritts, Electronic Music Studios). Se usó la trompeta en Si♭ sin vibrato, en mf. Son de uso libre en cualquier proyecto. De cada nota se recortó un bucle de la parte sostenida, y la app lo ajusta a la frecuencia exacta de cada nota con La4 = 442 Hz.
