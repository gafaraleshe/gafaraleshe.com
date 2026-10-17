#!/bin/bash
# Gafar Kit installer for DaVinci Resolve on macOS. Double-click to run.
#
# Copies the four Fusion presets into Resolve's template folder and puts the
# brand PNGs in ~/Movies/Gafar Kit. Safe to run again: it overwrites its own
# files and touches nothing else.
#
# Test overrides (not needed normally):
#   GAFAR_FUSION_DIR=/some/folder   install into that Fusion folder instead
#   GAFAR_ASSETS_DIR=/some/folder   put the PNGs there instead
#   GAFAR_NONINTERACTIVE=1          never prompt or wait for a key

set -eu

HERE="$(cd "$(dirname "$0")" && pwd)"
FUSION_DIR="${GAFAR_FUSION_DIR:-$HOME/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion}"
ASSETS_DIR="${GAFAR_ASSETS_DIR:-$HOME/Movies/Gafar Kit}"
INTERACTIVE=1
[ -n "${GAFAR_NONINTERACTIVE:-}" ] && INTERACTIVE=0

pause() {
  if [ "$INTERACTIVE" = 1 ]; then
    printf '\nPress any key to close this window. '
    read -r -n 1 -s || true
    echo
  fi
}

fail() {
  echo
  echo "Could not finish: $1"
  pause
  exit 1
}

# The kit sits next to this script in the zip, or one level up in the repo.
SRC=""
for candidate in "$HERE/Templates" "$HERE/resolve/Templates"; do
  [ -d "$candidate" ] && SRC="$candidate" && break
done
[ -n "$SRC" ] || fail "Templates folder not found next to this installer."

PNG=""
for candidate in "$HERE/png" "$HERE/../png"; do
  [ -d "$candidate" ] && PNG="$candidate" && break
done

echo "Gafar Kit for DaVinci Resolve"
echo "-----------------------------"

if [ "$INTERACTIVE" = 1 ] && pgrep -x "Resolve" >/dev/null 2>&1; then
  echo "DaVinci Resolve is open. It only reads new presets at launch."
  echo "Quit Resolve now (Cmd-Q), then press Return to continue."
  read -r _ || true
fi

if [ ! -d "$FUSION_DIR" ] && [ -z "${GAFAR_FUSION_DIR:-}" ]; then
  echo "Note: $FUSION_DIR does not exist yet."
  echo "It is created the first time Resolve runs; installing there anyway."
fi

echo
echo "Installing presets into:"
echo "  $FUSION_DIR/Templates"
mkdir -p "$FUSION_DIR/Templates" || fail "Could not create the Resolve Templates folder."
# Copy the contents of Templates/ (Edit/Effects/Gafar, Edit/Transitions/Gafar).
cp -R "$SRC/." "$FUSION_DIR/Templates/" || fail "Copy failed."

COUNT="$(find "$SRC" -name '*.setting' | wc -l | tr -d ' ')"
echo "  $COUNT presets installed"

if [ -n "$PNG" ]; then
  echo
  echo "Copying brand images to:"
  echo "  $ASSETS_DIR"
  mkdir -p "$ASSETS_DIR" || fail "Could not create the assets folder."
  cp -R "$PNG/." "$ASSETS_DIR/" || fail "Could not copy the images."
fi

echo
echo "Done. Open DaVinci Resolve, then go to the Edit page:"
echo "  Effects Library > Toolbox > Effects      > Gafar  (Camera Shake, Flash)"
echo "  Effects Library > Toolbox > Transitions  > Gafar  (Flash Cut, Shake Cut)"
echo
echo "If they are missing, quit Resolve fully (Cmd-Q) and reopen it."
pause
