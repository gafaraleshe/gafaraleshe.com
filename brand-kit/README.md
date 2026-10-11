# Gafar brand & motion kit

Everything from the site that defines the look, packaged for YouTube videos and DaVinci Resolve.
Source of truth stays in `app/globals.css`, `app/layout.tsx` and `components/motion.tsx`; this folder is a snapshot of them.

```
brand-kit/
  tokens/   brand.css · brand.json · motion.json   colours, fonts, easing, springs, preset defaults
  svg/      monogram, doodle arrow (ink/white), tape, paperclip, index card, 3 graph-paper backgrounds
  png/      the same, rendered transparent (backgrounds at 3840x2160) for Resolve
  resolve/  install.py · setup_bin.py · Templates/ (4 Fusion presets)
```

## Fusion presets

| Preset | Type | Where it appears (after install) |
| --- | --- | --- |
| Gafar Camera Shake | Effect | Effects Library → Toolbox → Effects → Gafar |
| Gafar Flash | Effect | Effects Library → Toolbox → Effects → Gafar |
| Gafar Flash Cut | Transition | Effects Library → Toolbox → Transitions → Gafar |
| Gafar Shake Cut | Transition | Effects Library → Toolbox → Transitions → Gafar |

**Status: not yet loaded in Resolve.** They were written from Blackmagic's documented template format and the public scripting API. The `.setting` files parse as valid Lua tables with no dangling tool links, and the shake and flash expressions were evaluated numerically, but Resolve itself was not available to test. Treat the first import as a test. The transition templates are the least documented part of the format.

### Install

Quit Resolve, then:

```sh
python3 brand-kit/resolve/install.py            # copies into Resolve's Fusion/Templates folder
python3 brand-kit/resolve/install.py --dry-run  # shows the destination first
```

Destinations: macOS `~/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion`, Windows `%APPDATA%\Blackmagic Design\DaVinci Resolve\Support\Fusion`, Linux `~/.local/share/DaVinciResolve/Fusion`. Reopen Resolve afterwards.

### Controls

- **Camera Shake**: Intensity (% of frame), Speed, Rotation, Zoom punch, Seed, plus an **Envelope** curve. The shake is a sum of sines, so it is deterministic: the same Seed always gives the same shake.
- **Flash**: Flash amount, flash colour (R/G/B), plus an **Envelope** curve.
- **Flash Cut / Shake Cut**: hard cut at the midpoint of the transition. Sharpness shapes the peak (`pow(1 - |2p - 1|, Sharpness)`). Shake Cut adds the shake controls and a lighter flash.

### The graph

Camera Shake and Flash carry their envelope as a **BezierSpline** (`Curve`). On the Fusion page, open the Spline panel and drag its two keys and handles. The Motion artboard in the design canvas draws the same curve and prints the `KeyFrames` text to paste. Keys are in clip-relative frames (default 12 for shake, 8 for flash), so lengthen the curve for a longer effect.

Transitions use the Sharpness exponent instead of a spline, because a transition's length changes per use and a spline's keys would not stretch with it.

## Bin over MCP

1. Resolve **Studio** only: Preferences → System → General → External scripting using → **Local**.
2. Add a Resolve MCP server to Claude. For example `apvlv/davinci-resolve-mcp`:
   ```json
   { "mcpServers": { "davinci-resolve": { "command": "uv", "args": ["run", "davinci-resolve-mcp"] } } }
   ```
   (`samuelgursky/davinci-resolve-mcp` is another option; both expose Resolve's scripting API. Check each README for current install steps.)
3. Ask Claude to run `resolve/setup_bin.py` with `KIT_DIR` set to the absolute path of this folder. It creates **Gafar Kit** (Brand, Doodles, Backgrounds), imports the PNGs, and makes a **Gafar Preset Tests** timeline.
4. In Resolve, right-click **Gafar Kit** → **Add to Power Bin** so it is available in every project. The API can't do this.

The presets live in the Effects Library, not the Media Pool; Resolve has no API to put an effect template in a bin. The bin holds the brand assets and the test timeline.

The free version of Resolve has no external scripting. There, open Workspace → Console → Py3 and run `KIT_DIR = "/abs/path/to/brand-kit"; exec(open(KIT_DIR + "/resolve/setup_bin.py").read())`.

## Fonts

DM Serif Display, Archivo, Geist, Geist Mono, Caveat and Bebas Neue, all on Google Fonts. Install them on the machine that runs Resolve so Text+ and Fusion titles match the site.
