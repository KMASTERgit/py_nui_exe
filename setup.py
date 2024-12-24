from setuptools import setup, find_packages

setup(
    name="py_nui_exe",  # パッケージ名
    version="0.1.0",
    packages=[
        "Build_Python_To_exe_for_Clung",
        "Build_Python_To_exe_for_Clung.python_files"
    ],  # サブパッケージを含める
    include_package_data=True,
    install_requires=[
        "eel==0.18.1",
        "nuitka"
    ],
    entry_points={
        "console_scripts": [
            "py-nui-exe=Build_Python_To_exe_for_Clung.app:main",  # コマンド設定
        ],
    },
    package_data={
        "Build_Python_To_exe_for_Clung": [
            "Web/**/*",  # Web配下の静的ファイル
            "python_files/*.py",  # python_files配下のPythonファイル
        ],
    },
)
