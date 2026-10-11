#!/usr/bin/env python3
"""Copy the Gafar Fusion presets into DaVinci Resolve's template folders.

    python3 brand-kit/resolve/install.py            # install
    python3 brand-kit/resolve/install.py --dry-run  # show what would be copied
    python3 brand-kit/resolve/install.py --dest PATH  # custom Fusion folder

Quit Resolve first, reopen it afterwards. Presets show up in
Effects Library > Toolbox > Effects / Transitions > Gafar.
"""
import argparse
import os
import platform
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "Templates"


def fusion_dir() -> Path:
    system = platform.system()
    home = Path.home()
    if system == "Darwin":
        return home / "Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion"
    if system == "Windows":
        appdata = Path(os.environ.get("APPDATA", home / "AppData/Roaming"))
        return appdata / "Blackmagic Design/DaVinci Resolve/Support/Fusion"
    return home / ".local/share/DaVinciResolve/Fusion"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--dest", type=Path, help="Fusion folder (the one that contains Templates/)")
    args = ap.parse_args()

    dest = (args.dest or fusion_dir()) / "Templates"
    files = sorted(p for p in SRC.rglob("*.setting"))
    if not files:
        print(f"No .setting files found under {SRC}", file=sys.stderr)
        return 1

    print(f"Target: {dest}")
    for src in files:
        rel = src.relative_to(SRC)
        out = dest / rel
        print(f"  {rel}")
        if args.dry_run:
            continue
        out.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, out)

    print("\nDry run only, nothing copied." if args.dry_run else "\nDone. Reopen DaVinci Resolve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
