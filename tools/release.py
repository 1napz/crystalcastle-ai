# tools/release.py
from pathlib import Path
import subprocess

def bump_version(file: Path, new_version: str) -> None:
    content = file.read_text()
    file.write_text(content.replace("__version__ = ", f"__version__ = '{new_version}'"))

def build_package() -> None:
    subprocess.run(["python", "-m", "build"], check=True)

if __name__ == "__main__":
    bump_version(Path("src/__init__.py"), "1.2.0")
    build_package()
