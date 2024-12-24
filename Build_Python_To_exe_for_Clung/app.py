import eel
import subprocess
import os
from Build_Python_To_exe_for_Clung.python_files.file_dialog import dialog as fd

@eel.expose
def open_file_dialog():
    file_type = ("Python Files", "*.py")
    file_path = fd(file_type)
    return file_path


@eel.expose
def open_ico_file_dialog():
    file_type = ("Icon Files", "*.ico")
    file_path = fd(file_type)
    return file_path

@eel.expose
def receive_data_from_js(content):
    try:
        process = subprocess.Popen(
            content,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )

        for line in process.stdout:
            eel.update_text_area(line.strip())
        for line in process.stderr:
            eel.update_text_area(f"ERROR: {line.strip()}")

        process.wait()
        eel.update_text_area("Command execution completed.")
    except Exception as e:
        eel.update_text_area(f"Command execution failed: {str(e)}")


def main():
    eel.init(os.path.join(os.path.dirname(__file__), "web"))
    eel.start("main.html", size=(1024, 768))

if __name__ == "__main__":
    main()
