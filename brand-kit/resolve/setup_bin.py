"""Build the "Gafar Kit" bin in the current DaVinci Resolve project.

Run it three ways:
  * Resolve > Workspace > Console > Py3, then:  KIT_DIR = "/abs/path/to/brand-kit"; exec(open(KIT_DIR + "/resolve/setup_bin.py").read())
  * over MCP, with the davinci-resolve-mcp server's execute_python tool (set KIT_DIR first)
  * as a normal script (needs Resolve Studio with external scripting enabled)

KIT_DIR must point at the brand-kit folder. It defaults to this file's parent.
Everything is best-effort: each step prints OK or SKIP so you can see what the
installed Resolve version supported.
"""
import os

try:
    KIT_DIR  # noqa: F821  (may be predefined by the console / MCP caller)
except NameError:
    try:
        KIT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    except NameError:
        KIT_DIR = os.environ.get("GAFAR_KIT_DIR", "")

BINS = {
    "Brand": ["gafar-monogram.png", "index-card.png", "tape.png", "paperclip.png"],
    "Doodles": ["doodle-arrow-ink.png", "doodle-arrow-white.png"],
    "Backgrounds": ["graph-paper-green.png", "graph-paper-dark.png", "graph-paper-cinema.png"],
}


def get_resolve():
    try:
        return resolve  # noqa: F821  (predefined inside Resolve's console)
    except NameError:
        pass
    import DaVinciResolveScript as dvr  # needs the scripting modules on PYTHONPATH

    return dvr.scriptapp("Resolve")


def step(label, fn):
    try:
        result = fn()
        print("OK   ", label)
        return result
    except Exception as exc:  # noqa: BLE001
        print("SKIP ", label, "->", exc)
        return None


def find_or_make(media_pool, parent, name):
    for sub in parent.GetSubFolderList() or []:
        if sub.GetName() == name:
            return sub
    return media_pool.AddSubFolder(parent, name)


def main():
    if not KIT_DIR or not os.path.isdir(os.path.join(KIT_DIR, "png")):
        raise SystemExit("Set KIT_DIR to the brand-kit folder (the one that contains png/).")

    resolve_app = get_resolve()
    project = resolve_app.GetProjectManager().GetCurrentProject()
    if project is None:
        raise SystemExit("Open a project in Resolve first.")
    pool = project.GetMediaPool()
    root = pool.GetRootFolder()

    kit = step("bin: Gafar Kit", lambda: find_or_make(pool, root, "Gafar Kit"))
    if kit is None:
        raise SystemExit("Could not create the Gafar Kit bin.")

    imported = {}
    for name, files in BINS.items():
        sub = step("bin: Gafar Kit/" + name, lambda n=name: find_or_make(pool, kit, n))
        if sub is None:
            continue
        paths = [os.path.join(KIT_DIR, "png", f) for f in files if os.path.exists(os.path.join(KIT_DIR, "png", f))]
        pool.SetCurrentFolder(sub)
        clips = step("import %d file(s) into %s" % (len(paths), name), lambda p=paths: pool.ImportMedia(p)) or []
        imported[name] = clips

    pool.SetCurrentFolder(kit)
    backgrounds = imported.get("Backgrounds") or []
    timeline = step("timeline: Gafar Preset Tests", lambda: pool.CreateEmptyTimeline("Gafar Preset Tests"))
    if timeline is not None and backgrounds:
        step("append graph-paper clips to the test timeline", lambda: pool.AppendToTimeline(backgrounds[:1] * 3))

    print(
        "\nNext: drag Effects Library > Gafar presets onto the clips in 'Gafar Preset Tests'.\n"
        "Then right-click the 'Gafar Kit' bin > Add to Power Bin (the API cannot do that step)."
    )


main()
