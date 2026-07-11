// GENERATED FILE — computed by build/lib/search-index.js from content/data/*.js.
// Do not hand-edit; run `node build/build.js` after changing any content data file.
// The manual's full text is intentionally NOT included here — see assets/js/search.js.
const SEARCH_INDEX = [
 {
  "id": "sos-exposure-wrong",
  "type": "sos",
  "title": "Shot is too dark or too bright",
  "target": "sos.html#exposure-wrong",
  "text": "Check exposure correction: look for the ±0.0 value on the display. Does it say e.g. −2? Turn it back with the rear command dial . (C2 is deliberately set to +1!) Backlight (subject in front of a bright window/the sun)? Push correction to +1/+2, or change your position. Note: because of Auto Update, a changed correction stays saved in the preset — reset it yourself."
 },
 {
  "id": "sos-viewfinder-blurry",
  "type": "sos",
  "title": "Everything looks blurry in the viewfinder",
  "target": "sos.html#viewfinder-blurry",
  "text": "If photos look sharp on the rear screen but the viewfinder itself looks mushy: turn the diopter wheel to the left of the viewfinder until the overlaid text is tack-sharp. It tends to get bumped while being carried."
 },
 {
  "id": "sos-focus-off",
  "type": "sos",
  "title": "Focus is off / the wrong spot is sharp",
  "target": "sos.html#focus-off",
  "text": "Check the focus-mode switch on the front of the camera: is it on M ? Then nothing focuses automatically → switch to S (still) or C (moving). Nudge the focus point onto the subject with the joystick . Press the joystick in to snap the point back to center. For people/animals: is a detection box visible? If not: Fn2 toggles eye/face detection, Fn1 toggles animal detection. The subject type (animal/bird/…) is set in the Q menu. Too close? Every lens has a minimum focus distance — take a step back."
 },
 {
  "id": "sos-wont-fire",
  "type": "sos",
  "title": "Camera won't take the shot",
  "target": "sos.html#wont-fire",
  "text": "Any message on the display? CARD FULL / NO CARD → see the memory-card entries below. AF-C may still be waiting for focus lock: reposition briefly, half-press, then press fully. Battery nearly empty? Swap or charge it. Nothing helps: turn the camera OFF → wait 10 seconds → ON."
 },
 {
  "id": "sos-card-full",
  "type": "sos",
  "title": "“CARD FULL” — memory card is full",
  "target": "sos.html#card-full",
  "text": "Insert a spare card (door on the right) — the simplest fix. Good to know: photos are written as a backup to both cards (CFexpress + SD) — both fill up in parallel, and the full one stops shooting. So swap/clear specifically the full card. Videos live only on the CFexpress card. Or sort through and delete: playback → trash button → IMAGE → delete individual images. FORMAT erases EVERYTHING irreversibly — only use it once your images are backed up."
 },
 {
  "id": "sos-card-error",
  "type": "sos",
  "title": "“CARD ERROR” / card not recognized",
  "target": "sos.html#card-error",
  "text": "Turn the camera off, remove the card, check the contacts (clean? dry?), reinsert until it clicks. Try a second card — if the camera reads that one fine, the first card is the problem: stop writing to it, recover the images on a computer later. Is the write-protect switch on the SD card set to “unlocked”?"
 },
 {
  "id": "sos-battery-dead",
  "type": "sos",
  "title": "Battery dead / won't charge",
  "target": "sos.html#battery-dead",
  "text": "Charging works directly over USB-C in the camera — a power bank works too (ideally one with USB-PD). A light on the camera shows charging is active. Cold drains batteries fast: keep a spare battery warm against your body (an inside jacket pocket). The viewfinder/screen use the most power — turn the camera off during breaks."
 },
 {
  "id": "sos-settings-off",
  "type": "sos",
  "title": "Something's off / the camera is behaving oddly",
  "target": "sos.html#settings-off",
  "text": "Press the Q button and scan the tiles — what looks unusual? Fix it right there. Careful: turning the dial away and back does NOT help — this camera saves changes into the preset automatically (Auto Update). Reset the values you want yourself. Lost in the menu? Press DISP/BACK a few times. Bigger mess? The intended preset values are on the “My Setup” page; restore a settings backup via the XApp (“Connection” page). Last resort: turn the camera off, pull the battery for 10 seconds, put it back in."
 },
 {
  "id": "sos-photo-or-video",
  "type": "sos",
  "title": "I'm recording video but wanted a photo (or the other way round)",
  "target": "sos.html#photo-or-video",
  "text": "The STILL/MOVIE switch sits top left, under the mode dial. STILL = photo, MOVIE = video. Both worlds have their own menus and their own C presets — which is why “everything suddenly looks different”."
 },
 {
  "id": "sos-black-and-white",
  "type": "sos",
  "title": "Shots have suddenly turned black & white",
  "target": "sos.html#black-and-white",
  "text": "The dial is on C1 (Acros = the black & white preset), or the film simulation got changed (check the Q menu — it stays changed because of Auto Update!). Turn the dial to C2/C3, or reset the simulation. RAW files, by the way, always keep all the colors — here's how to bring them back in-camera afterwards ."
 },
 {
  "id": "sos-screen-black",
  "type": "sos",
  "title": "Screen is black / viewfinder stays off",
  "target": "sos.html#screen-black",
  "text": "The eye sensor at the viewfinder switches the screen off as soon as something gets close (a finger, a strap, a rain jacket!). Give it some room. Press the VIEW MODE button at the viewfinder until “EVF/LCD Auto” or similar is selected. DISP/BACK cycles the display variants — maybe “screen off” is simply the active one."
 },
 {
  "id": "sos-overheating",
  "type": "sos",
  "title": "Overheating icon while filming (yellow/red)",
  "target": "sos.html#overheating",
  "text": "Can happen during long 4K recordings (especially 100p) in the sun. Yellow = early warning, red = shutdown coming soon. Pause recording, move the camera into the shade, turn it off. Flip the screen away from the body (better cooling), shoot shorter clips."
 },
 {
  "id": "sos-timezone",
  "type": "sos",
  "title": "Date/time is wrong (travel time zone)",
  "target": "sos.html#timezone",
  "text": "MENU/OK → wrench icon → USER SETTING → TIME DIFFERENCE → choose LOCAL TIME and set the destination zone. Switch back to HOME TIME once you're back. (With the XApp paired, your phone can set the time too.)"
 },
 {
  "id": "sos-phone-transfer",
  "type": "sos",
  "title": "Photos won't transfer to my phone / no geo-tagging",
  "target": "sos.html#phone-transfer",
  "text": "Both run through the FUJIFILM XApp — see the “Connection” page → “Phone setup” for how to set it up. Short version: Transfer: select and send images from playback, or turn on automatic transfer in the app. Geo-tagging: enable location sync in the XApp + on the camera GEOTAGGING → ON (in the Network/USB menu). Leave Bluetooth on on your phone."
 },
 {
  "id": "sos-weather",
  "type": "sos",
  "title": "Rain, spray, dust",
  "target": "sos.html#weather",
  "text": "The body is weather-sealed — light rain is fine, as long as the lens is also WR-sealed (does “WR” appear in the lens name?). Wipe drops off promptly with a microfiber cloth, only swap lenses somewhere dry, and never zip a wet camera into a closed bag."
 },
 {
  "id": "preset-C1",
  "type": "preset",
  "title": "C1 · Bold black & white",
  "target": "presets.html?preset=C1",
  "text": "ACROS · black & white Architecture, street scenes, expressive portraits, dramatic light. Don't worry — the viewfinder image is deliberately black & white on purpose. The RAW file keeps all the colors — bring them back in-camera afterwards ."
 },
 {
  "id": "preset-C2",
  "type": "preset",
  "title": "C2 · “Cuban” — warm analog look",
  "target": "presets.html?preset=C2",
  "text": "CLASSIC NEG. · warm · +1 EV Vacation mood, streets, cafés, golden-hour light. Deliberately exposed +1 brighter. If a shot looks TOO bright, dial the correction back toward 0 (and remember to set it back to +1 afterwards — Auto Update keeps whatever you last dialed in)."
 },
 {
  "id": "preset-C3",
  "type": "preset",
  "title": "C3 · Portraits &amp; all-rounder",
  "target": "presets.html?preset=C3",
  "text": "PRO NEG. HI · neutral People, groups — and the safe default whenever you're not sure what to pick. Natural skin tones. Nudge the focus point onto the face with the joystick."
 },
 {
  "id": "preset-C4",
  "type": "preset",
  "title": "C4 · Animals, birds &amp; action",
  "target": "presets.html?preset=C4",
  "text": "ASTIA · ~30 fps burst · pre-shot · animal/bird AF Wildlife, birds in flight, kids playing, sports. Half-press and track the subject — the camera buffers frames BEFORE you fully press the shutter. This produces a lot of photos, so keep an eye on your card. Fn1 toggles animal detection on/off; pick the subject type (animal/bird) in the Q menu."
 },
 {
  "id": "preset-C5",
  "type": "preset",
  "title": "C5 · Animals &amp; action (second variant)",
  "target": "presets.html?preset=C5",
  "text": "likely similar to C4 · animal/bird AF A second action slot — often a variant of C4 (e.g. a different burst speed or shutter speed), though the factory default isn't consistent across cameras. This camera often ships C4 and C5 with similar, complementary settings. Turn the dial to C5, press Q and check the real settings — then note them down on the “My Setup” page."
 },
 {
  "id": "preset-C6",
  "type": "preset",
  "title": "C6 · Slow motion (4×)",
  "target": "presets.html?preset=C6",
  "text": "4K 100p · ETERNA Water, animals in motion, sports — anything that turns magical in slow motion. MOVIE mode only. Needs plenty of light, storage and battery — take breaks if the camera gets hot."
 },
 {
  "id": "preset-C7",
  "type": "preset",
  "title": "C7 · Video for motion",
  "target": "presets.html?preset=C7",
  "text": "4K 50p · ETERNA Scenes with motion; can be slowed to half speed in editing. MOVIE mode only."
 },
 {
  "id": "preset-VID",
  "type": "preset",
  "title": "Video default · Standard video",
  "target": "presets.html?preset=VID",
  "text": "4K 25p · ETERNA Calm scenes, pans, narrative shots — the everyday cinematic look. Slow, steady camera movement looks best."
 },
 {
  "id": "ex-0",
  "type": "exercise",
  "title": "1 · Preset walkthrough",
  "target": "exercises.html#ex-0",
  "text": "Switch to STILL. Slowly turn the dial through C1–C7 and look at the display at each stop: what changes? Press Q once at each preset and scan the tiles. Repeat the same with the switch on MOVIE. Note what you found on the “My Setup” page — then make a settings backup with the XApp. Goal: you know without thinking which dial position does what — and you have a safety net."
 },
 {
  "id": "ex-1",
  "type": "exercise",
  "title": "2 · Film-simulation comparison",
  "target": "exercises.html#ex-1",
  "text": "Find a scene with color (a balcony, a street, a bowl of fruit). Photograph the same scene with C1, C2 and C3 — hold the camera as steady as you can between shots. Flip through them in playback and compare: which look do you like for what? Goal: you develop a feel for the looks — the basis for every preset choice."
 },
 {
  "id": "ex-2",
  "type": "exercise",
  "title": "3 · Focus training",
  "target": "exercises.html#ex-2",
  "text": "C3: put a person/figure off to the side of the frame, nudge the focus point onto it with the joystick, shoot. Press the joystick → the point snaps back to center. C4: aim at a bird in the garden/park or a pet — watch the detection box. Track it half-pressed, then press fully at the exciting moment (pre-shot!). Goal: moving the focus point becomes second nature."
 },
 {
  "id": "ex-3",
  "type": "exercise",
  "title": "4 · Exposure-correction bracket",
  "target": "exercises.html#ex-3",
  "text": "Pick a bright scene (sky, beach, a bright facade). Take five shots: correction −2, −1, 0, +1, +2 (rear command dial). Compare: where do you lose detail in the highlights, and where in the shadows? Afterwards reset the correction to the preset's intended value (Auto Update!). Goal: ± becomes your reflex whenever a shot isn't quite right."
 },
 {
  "id": "ex-4",
  "type": "exercise",
  "title": "5 · Slow-motion clip",
  "target": "exercises.html#ex-4",
  "text": "Switch to MOVIE, dial to C6. Find something moving: a fountain, waves, birds, a flag in the wind. Shoot 3 short 10-second clips — hold steady or brace the camera. Goal: you see how effortlessly this camera does “cinematic”."
 },
 {
  "id": "ex-5",
  "type": "exercise",
  "title": "6 · Golden hour + histogram",
  "target": "exercises.html#ex-5",
  "text": "Head out an hour before sunset with C2. Press DISP/BACK until the histogram is showing. While shooting, watch for this: the “mountain” can lean against the right edge, but shouldn't spill over it. Bonus: shoot the same scene in mode A once at f/2.8 and once at f/8 — compare the background. Goal: your first deliberate exposure and aperture decisions — enthusiast level within reach."
 },
 {
  "id": "ex-6",
  "type": "exercise",
  "title": "7 · Practice RAW conversion",
  "target": "exercises.html#ex-6",
  "text": "Select a RAW image in playback (RAW+HEIF must have been active while shooting). Open MENU/OK → RAW CONVERSION — or faster: press the Q button (works directly whenever a RAW image is shown). Set FILE FORMAT to HEIF first — always the first step! Try one more setting, e.g. switch FILM SIMULATION or use PUSH/PULL PROCESSING for exposure. Check the preview with Q, save with MENU/OK. Compare the original and the new copy in playback — the RAW file stays unchanged. Goal: you're comfortable “developing” a RAW file right in the camera — including the important first step, FILE FORMAT → HEIF — and you know that only original RAW files can be converted, not copies you've already created. Every setting explained: “Reference” page ."
 },
 {
  "id": "ex-7",
  "type": "exercise",
  "title": "8 · Combine editing &amp; cropping",
  "target": "exercises.html#ex-7",
  "text": "Like in exercise 7, edit a RAW image via RAW conversion (e.g. a different film simulation or exposure) and save it as a copy. Navigate to the newly created copy in playback. Open MENU/OK → CROP — zoom with the rear command dial, nudge the framing with the focus lever. Press MENU/OK twice to save the cropped frame as another, separate copy. Compare the original RAW, the edited copy, and the cropped copy in playback. Goal: you can deliberately combine editing and reframing in two steps, no computer needed — and know that cropping is its own step after RAW conversion. Details: “Reference” page ."
 },
 {
  "id": "tutorial-tut1",
  "type": "tutorial",
  "title": "Tutorial 1 · Get the camera ready",
  "target": "index.html#tut1",
  "text": "Battery: flip open the door on the bottom, slide the battery in contacts-first until it clicks. It also charges directly over USB-C in the camera (a power bank works fine). Memory card: door on the right. Two slots — SD is plenty for photos; CFexpress is for high-speed video. Power on: turn the ring around the shutter button to ON. Format a new card: MENU → wrench icon → USER SETTING → FORMAT (erases everything!) Focus the viewfinder: turn the diopter wheel to the left of the viewfinder until the overlaid text is tack-sharp."
 },
 {
  "id": "tutorial-tut2",
  "type": "tutorial",
  "title": "Tutorial 2 · Your first photo & video",
  "target": "index.html#tut2",
  "text": "Photo: switch to STILL → dial to C3 → half-press the shutter (green box = in focus) → press all the way. View it: playback button; back out: tap the shutter. Video: switch to MOVIE → the red REC button starts and stops it. The default is 4K 25p with the cinematic Eterna look. Deliberately practice the two-stage press — it's THE most important motion on this camera."
 },
 {
  "id": "tutorial-tut3",
  "type": "tutorial",
  "title": "Tutorial 3 · The key controls",
  "target": "index.html#tut3",
  "text": "Mode dial (top left): P/A/S/M plus your presets C1–C7. While traveling you'll live on C1–C7. Front + rear command dials: adjust aperture, shutter speed or exposure correction, depending on the mode. Focus lever (joystick): nudges the focus point — e.g. onto a face near the edge of the frame. Press it in to snap back to center. Q button: a quick menu with the 16 most important settings. MENU/OK opens/confirms · DISP/BACK cancels and cycles the display views. AF-ON: focuses without taking the shot (“back-button focus” — for later). Viewfinder/screen: the eye sensor switches between them automatically; the screen flips out to the side. Top display: battery, shots remaining, and core settings at a glance."
 },
 {
  "id": "tutorial-tut4",
  "type": "tutorial",
  "title": "Tutorial 4 · Understanding exposure",
  "target": "index.html#tut4",
  "text": "Three values, one picture: Aperture (f-number): small number = lots of light + blurry background (portraits) · large number = everything sharp (landscapes). Shutter speed: fast (1/1000) freezes motion · slow (1/15) blurs it (water!). ISO: light sensitivity. Higher = brighter but grainier. The X-H2S stays well-behaved up to about 6400. The modes: P = auto with some control · A = you choose the aperture (the best first step away from the presets!) · S = you choose the shutter speed · M = you set both yourself (workable day-to-day with Auto ISO). Exposure correction (±): shot too dark/bright? Turn the rear command dial. +1 = twice as bright. That's exactly how C2 is built. You see the result in the viewfinder BEFORE you shoot. Histogram (toggle with DISP/BACK): a mountain pressed against the right edge = highlights are blown out, against the left = shadows are crushed. Touching the edge is fine, spilling over it isn't."
 },
 {
  "id": "tutorial-tut5",
  "type": "tutorial",
  "title": "Tutorial 5 · Mastering autofocus",
  "target": "index.html#tut5",
  "text": "Focus-mode switch on the front of the camera: S = focus once (still subjects) · C = track continuously (moving subjects) · M = manual on the ring (with focus peaking). WHERE it focuses: nudge the focus point with the joystick; point size: single point = full control, zone = movement, wide = the camera decides. Subject detection: the camera recognizes faces/eyes, animals, birds and vehicles and sticks to the subject. Already on in C4/C5. Your shortcut buttons: Fn2 = eye/face detection (people) on/off · Fn1 = animal detection on/off. Which kind of subject gets detected (animal, bird, car, …) is chosen in the matching tile of the Q menu. Pre-shot (in C4/C5): with the shutter half-pressed, the camera is already buffering frames — fully pressing it also keeps the moments BEFORE that. The bird takes off and is already in the bag before you could react."
 },
 {
  "id": "tutorial-tut6",
  "type": "tutorial",
  "title": "Tutorial 6 · Film simulations — the image looks",
  "target": "index.html#tut6",
  "text": "Digital recreations of legendary Fuji films — finished looks with no editing needed: Provia neutral · Velvia punchy (landscapes) · Astia gentle (your C4/C5) Classic Chrome documentary · Classic Negative characterful analog look (your C2) Pro Neg. Hi portrait specialist (your C3) · Acros refined black & white (your C1) Eterna flat cinema look (your default video preset) · Nostalgic Neg. 70s photo-album look You can season these further with grain, Color Chrome, dynamic range, white balance — that's what the famous “film recipes” are built from (fujixweekly.com)."
 },
 {
  "id": "tutorial-tut7",
  "type": "tutorial",
  "title": "Tutorial 7 · Video basics",
  "target": "index.html#tut7",
  "text": "Frame rate: 25p = normal/cinematic · 50p = smoother, can be halved · 100p = 4× slow motion. Your presets already take care of the matching shutter speed. Stabilization: IBIS plus digital IS keep handheld shots steady — even so, move slowly and smoothly. Audio: the built-in mic is fine, but wind is its enemy — get close to the subject. In practice: start rolling 3 seconds before the action and keep going 3 seconds after — editing needs that room. Plan breaks in heat/at 100p."
 },
 {
  "id": "tutorial-tut8",
  "type": "tutorial",
  "title": "Tutorial 8 · Your path to enthusiast level",
  "target": "index.html#tut8",
  "text": "Phase 1 — before the trip: tutorial chapters 1–3 + verify your presets and note them on the “My Setup” page + pair the XApp & back up on the “Connection” page + exercises 1–3. Phase 2 — on the trip: shoot freely 80% of the time, shape it deliberately 20% of the time (± correction, moving the focus point, mode A once a day) + exercises 4–6. Phase 3 — afterwards: review your shots, check the EXIF data on your favorites, re-read chapters 4–6, subscribe to pal2tech. The checkable exercises live on the “Exercises” page."
 },
 {
  "id": "menupath-Q",
  "type": "menupath",
  "title": "Q",
  "target": "reference.html",
  "text": "Q Quick menu: the 16 most important settings at a glance"
 },
 {
  "id": "menupath-AUTO UPDATE",
  "type": "menupath",
  "title": "AUTO UPDATE",
  "target": "reference.html",
  "text": "AUTO UPDATE MENU → IQ → AUTO UPDATE CUSTOM SETTING — ON: presets remember changes · OFF: presets snap back"
 },
 {
  "id": "menupath-FORMAT",
  "type": "menupath",
  "title": "FORMAT",
  "target": "reference.html",
  "text": "FORMAT MENU → wrench icon → USER SETTING → FORMAT (erases everything!)"
 },
 {
  "id": "menupath-FILM SIMULATION",
  "type": "menupath",
  "title": "FILM SIMULATION",
  "target": "reference.html",
  "text": "FILM SIMULATION MENU → IQ (camera 1) → FILM SIMULATION — or in the Q menu"
 },
 {
  "id": "menupath-SUBJECT DETECTION",
  "type": "menupath",
  "title": "SUBJECT DETECTION",
  "target": "reference.html",
  "text": "SUBJECT DETECTION MENU → AF/MF → SUBJECT DETECTION SETTING (animal, bird, …)"
 },
 {
  "id": "menupath-Fn BUTTONS",
  "type": "menupath",
  "title": "Fn BUTTONS",
  "target": "reference.html",
  "text": "Fn BUTTONS Long-press DISP/BACK — or MENU → wrench icon → BUTTON/DIAL SETTING"
 },
 {
  "id": "menupath-JPEG/HEIF",
  "type": "menupath",
  "title": "JPEG/HEIF",
  "target": "reference.html",
  "text": "JPEG/HEIF MENU → IQ → JPEG/HEIF SETTING — recommendation: HEIF (better quality, smaller file)"
 },
 {
  "id": "menupath-RAW CONVERSION",
  "type": "menupath",
  "title": "RAW CONVERSION",
  "target": "reference.html",
  "text": "RAW CONVERSION Playback → Q button (with a RAW image shown) or MENU → RAW CONVERSION — develop RAW files right in the camera (p. 220)"
 },
 {
  "id": "menupath-CROP",
  "type": "menupath",
  "title": "CROP",
  "target": "reference.html",
  "text": "CROP Playback → MENU → CROP — reframe a shot, also works on copies you've already created (p. 225)"
 },
 {
  "id": "menupath-CARD BACKUP",
  "type": "menupath",
  "title": "CARD BACKUP",
  "target": "reference.html",
  "text": "CARD BACKUP MENU → wrench icon → DATA STORAGE SETTING — photos written to both cards (p. 281)"
 },
 {
  "id": "menupath-GEOTAGGING",
  "type": "menupath",
  "title": "GEOTAGGING",
  "target": "reference.html",
  "text": "GEOTAGGING MENU → Network/USB → GEOTAGGING → ON (XApp paired)"
 },
 {
  "id": "menupath-TIME DIFFERENCE",
  "type": "menupath",
  "title": "TIME DIFFERENCE",
  "target": "reference.html",
  "text": "TIME DIFFERENCE MENU → wrench icon → USER SETTING → TIME DIFFERENCE"
 },
 {
  "id": "raw-REFLECT SHOOTING CONDITIONS",
  "type": "raw-setting",
  "title": "REFLECT SHOOTING CONDITIONS",
  "target": "reference.html#raw-conversion",
  "text": "REFLECT SHOOTING CONDITIONS Creates a copy using exactly the settings from when you shot it — the fast way back to the original state."
 },
 {
  "id": "raw-FILE FORMAT",
  "type": "raw-setting",
  "title": "FILE FORMAT",
  "target": "reference.html#raw-conversion",
  "text": "FILE FORMAT Always set this to HEIF first. The copy's output format — HEIF gives better quality (10-bit) at a smaller file size, JPEG is only for old devices/web services."
 },
 {
  "id": "raw-IMAGE SIZE",
  "type": "raw-setting",
  "title": "IMAGE SIZE",
  "target": "reference.html#raw-conversion",
  "text": "IMAGE SIZE The copy's resolution (L/M/S) — smaller for quick sharing on the road, L for keeping/printing."
 },
 {
  "id": "raw-IMAGE QUALITY",
  "type": "raw-setting",
  "title": "IMAGE QUALITY",
  "target": "reference.html#raw-conversion",
  "text": "IMAGE QUALITY Compression level (Fine/Normal) — pick Fine for images that matter."
 },
 {
  "id": "raw-PUSH/PULL PROCESSING",
  "type": "raw-setting",
  "title": "PUSH/PULL PROCESSING",
  "target": "reference.html#raw-conversion",
  "text": "PUSH/PULL PROCESSING Pull exposure brighter/darker after the fact. Work in small steps — big jumps produce visible noise."
 },
 {
  "id": "raw-DYNAMIC RANGE",
  "type": "raw-setting",
  "title": "DYNAMIC RANGE",
  "target": "reference.html#raw-conversion",
  "text": "DYNAMIC RANGE Recovers more detail in bright areas of the image — helpful in high-contrast light (sky, beach)."
 },
 {
  "id": "raw-D RANGE PRIORITY",
  "type": "raw-setting",
  "title": "D RANGE PRIORITY",
  "target": "reference.html#raw-conversion",
  "text": "D RANGE PRIORITY Reduces lost detail in highlights and shadows at the same time — the stronger option for harsh contrast."
 },
 {
  "id": "raw-FILM SIMULATION",
  "type": "raw-setting",
  "title": "FILM SIMULATION",
  "target": "reference.html#raw-conversion",
  "text": "FILM SIMULATION Change the image look after the fact — e.g. turn a C1 black & white RAW into a color image with PROVIA."
 },
 {
  "id": "raw-MONOCHROMATIC COLOR",
  "type": "raw-setting",
  "title": "MONOCHROMATIC COLOR",
  "target": "reference.html#raw-conversion",
  "text": "MONOCHROMATIC COLOR A color tint for black & white images (ACROS/MONOCHROME only) — e.g. a slightly warm or cool cast."
 },
 {
  "id": "raw-GRAIN EFFECT",
  "type": "raw-setting",
  "title": "GRAIN EFFECT",
  "target": "reference.html#raw-conversion",
  "text": "GRAIN EFFECT Adds film grain after the fact — an analog look."
 },
 {
  "id": "raw-COLOR CHROME EFFECT",
  "type": "raw-setting",
  "title": "COLOR CHROME EFFECT",
  "target": "reference.html#raw-conversion",
  "text": "COLOR CHROME EFFECT More detail in strongly saturated reds, yellows and greens."
 },
 {
  "id": "raw-COLOR CHROME FX BLUE",
  "type": "raw-setting",
  "title": "COLOR CHROME FX BLUE",
  "target": "reference.html#raw-conversion",
  "text": "COLOR CHROME FX BLUE The same, for blue tones — e.g. sky and water."
 },
 {
  "id": "raw-WHITE BALANCE",
  "type": "raw-setting",
  "title": "WHITE BALANCE",
  "target": "reference.html#raw-conversion",
  "text": "WHITE BALANCE Correct a color cast if it was set wrong while shooting."
 },
 {
  "id": "raw-WHITE BALANCE SHIFT",
  "type": "raw-setting",
  "title": "WHITE BALANCE SHIFT",
  "target": "reference.html#raw-conversion",
  "text": "WHITE BALANCE SHIFT Fine-tune white balance (toward amber/blue or green/magenta)."
 },
 {
  "id": "raw-TONE CURVE",
  "type": "raw-setting",
  "title": "TONE CURVE",
  "target": "reference.html#raw-conversion",
  "text": "TONE CURVE Adjust contrast in highlights and shadows separately."
 },
 {
  "id": "raw-COLOR",
  "type": "raw-setting",
  "title": "COLOR",
  "target": "reference.html#raw-conversion",
  "text": "COLOR Increase or decrease color saturation."
 },
 {
  "id": "raw-SHARPNESS",
  "type": "raw-setting",
  "title": "SHARPNESS",
  "target": "reference.html#raw-conversion",
  "text": "SHARPNESS Sharpen edges, or render them softer."
 },
 {
  "id": "raw-HIGH ISO NR",
  "type": "raw-setting",
  "title": "HIGH ISO NR",
  "target": "reference.html#raw-conversion",
  "text": "HIGH ISO NR Reduces image noise — useful for night/indoor shots at high ISO."
 },
 {
  "id": "raw-CLARITY",
  "type": "raw-setting",
  "title": "CLARITY",
  "target": "reference.html#raw-conversion",
  "text": "CLARITY Boosts fine contrast without harsh re-sharpening."
 },
 {
  "id": "raw-LENS MODULATION OPTIMIZER",
  "type": "raw-setting",
  "title": "LENS MODULATION OPTIMIZER",
  "target": "reference.html#raw-conversion",
  "text": "LENS MODULATION OPTIMIZER Corrects lens diffraction and edge softness — best left ON."
 },
 {
  "id": "raw-COLOR SPACE",
  "type": "raw-setting",
  "title": "COLOR SPACE",
  "target": "reference.html#raw-conversion",
  "text": "COLOR SPACE Choose the color space — sRGB for web/sharing (recommended while traveling), Adobe RGB for professional printing."
 },
 {
  "id": "raw-HDR MODE",
  "type": "raw-setting",
  "title": "HDR MODE",
  "target": "reference.html#raw-conversion",
  "text": "HDR MODE Reduces lost detail in highlights and shadows at once, similar to D Range Priority."
 }
];
