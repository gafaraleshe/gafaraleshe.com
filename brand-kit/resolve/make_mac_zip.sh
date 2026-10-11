#!/bin/bash
# Build Gafar-Kit-Mac.zip: the presets, brand PNGs and the double-click
# installer in one folder, ready to send to a Mac.
#
#   bash brand-kit/resolve/make_mac_zip.sh [output-dir]
#
# Works on Linux or macOS (needs `zip`). It does not make a signed .pkg:
# that needs Apple's pkgbuild and a Developer ID, and an unsigned .pkg gets
# the same Gatekeeper prompt as this script.

set -eu

HERE="$(cd "$(dirname "$0")" && pwd)"
KIT="$(cd "$HERE/.." && pwd)"
OUT="${1:-$PWD}"
NAME="Gafar Kit"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/$NAME" "$OUT"
cp "$HERE/Install Gafar Kit.command" "$STAGE/$NAME/"
chmod +x "$STAGE/$NAME/Install Gafar Kit.command"
cp -R "$HERE/Templates" "$STAGE/$NAME/Templates"
cp -R "$KIT/png" "$STAGE/$NAME/png"
cp "$HERE/setup_bin.py" "$STAGE/$NAME/"

cat > "$STAGE/$NAME/READ ME FIRST.txt" <<'TXT'
Gafar Kit for DaVinci Resolve

1. Quit DaVinci Resolve.
2. Right-click "Install Gafar Kit.command" and choose Open, then Open again.
   (A normal double-click is blocked the first time because the script is
   not signed by Apple. Right-click > Open is the one-time way around it.)
3. Reopen Resolve. On the Edit page: Effects Library > Toolbox >
   Effects / Transitions > Gafar.

Brand images are copied to ~/Movies/Gafar Kit.
setup_bin.py builds a "Gafar Kit" bin in Resolve; see brand-kit/README.md in the repo.
TXT

rm -f "$OUT/Gafar-Kit-Mac.zip"
(cd "$STAGE" && zip -qr -X "$OUT/Gafar-Kit-Mac.zip" "$NAME")
echo "Wrote $OUT/Gafar-Kit-Mac.zip"
