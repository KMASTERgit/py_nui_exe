from setuptools import setup, find_packages

setup(
    name="py_nui_exe",  # パッケージ名
    version="0.1.0",
    author="CKM",
    description="python→exe setup build support tool",
    long_description=open("README.md",encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/KMASTERgit/py_nui_exe",
    packages=[
        "Build_Python_To_exe_for_Clung",
        "Build_Python_To_exe_for_Clung.python_files"
    ],  # サブパッケージを含める
    include_package_data=True,
    install_requires=[
        "eel>=0.18.1",
        "nuitka>=2.5.7",
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
