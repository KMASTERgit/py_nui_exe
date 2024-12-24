const app = Vue.createApp({
  data() {
    return {
      fileName: '', // Pythonファイル名
      icoFileName: '', // ICOファイル名
      toggle1: false, // onefile
      toggle2: false, // standalone
      toggle3: false, // windows-console-mode
      textAreaContent: '', // プロンプト状態を表示
      newTextAreaContent: '', // 新しいテキストボックス用
      checkboxItems: [ // チェックボックスの名前を配列で管理
        "anti-bloat",
        "data-files",
        "dill-compat",
        "enum-compat",
        "eventlet",
        "gevent",
        "glfw",
        "implicit-imports",
        "multiprocessing",
        "numpy",
        "pbr-compat",
        "pkg-resources",
        "pmw-freezer",
        "pylint-warnings",
        "pyqt5",
        "pyside2",
        "pyside6",
        "pyzmq",
        "tensorflow",
        "tk-inter",
        "torch"
      ],
      selectedCheckboxes: [] // 選択されたチェックボックス
    };
  },
  watch: {
    // 各状態の変更を監視して内容を更新
    fileName() {
      this.updateContent();
    },
    icoFileName() {
      this.updateContent();
    },
    toggle1() {
      this.updateContent();
    },
    toggle2() {
      this.updateContent();
    },
    toggle3() {
      this.updateContent();
    },
    selectedCheckboxes() {
      this.updateContent();
    }
  },
  methods: {
    async triggerFileDialog() {
        const fullPath = await eel.open_file_dialog()(); // Pythonでダイアログを開く
        console.log("DEBUG: 選択されたファイルパス:", fullPath); // デバッグログ
        if (fullPath && fullPath !== "" && fullPath !== undefined) {
            this.fileName = fullPath; // ファイル名を更新
            this.updateContent(); // テキストボックスを更新
        } else {
            alert("ファイルが選択されませんでした");
        }
    },
    async triggerIcoFileDialog() {
        const fullPath = await eel.open_ico_file_dialog()(); // Pythonでダイアログを開く
        console.log("DEBUG: 選択されたicoファイルパス:", fullPath); // デバッグログ
        if (fullPath && fullPath !== "" && fullPath !== undefined) {
            this.icoFileName = fullPath; // ファイル名を更新
            this.updateContent(); // テキストボックスを更新
        } else {
            alert("ファイルが選択されませんでした");
        }
    },
    updateContent() {
      if (!this.fileName) {
        // ファイル名がない場合は内容をクリア
        this.newTextAreaContent = '';
        return;
      }

      // 基本構造を構築
      this.newTextAreaContent = `nuitka ${this.fileName}`;

      if (this.icoFileName) {
        this.newTextAreaContent += ` --windows-icon-from-ico=${this.icoFileName}`;
      }

      // トグルの状態に応じてオプションを追加
      if (this.toggle1) {
        this.newTextAreaContent += ` --onefile`;
      }
      if (this.toggle2) {
        this.newTextAreaContent += ` --standalone`;
      }
      if (this.toggle3) {
        this.newTextAreaContent += ` --windows-console-mode=disable`;
      }

      // チェックリストの選択を追加
      if (this.selectedCheckboxes.length > 0) {
        this.newTextAreaContent += ` --plugin-enable=`;
        this.newTextAreaContent += this.selectedCheckboxes
          .map(index => this.checkboxItems[index])
          .join(',');
      }
    },
    async plonpt() {
      this.textAreaContent = '';
      await eel.receive_data_from_js(this.newTextAreaContent);
    },
    resetState() {
      // 状態をリセット
      this.fileName = '';
      this.icoFileName = '';
      this.toggle1 = false;
      this.toggle2 = false;
      this.toggle3 = false;
      this.selectedCheckboxes = [];
      this.newTextAreaContent = '';
      this.textAreaContent = '';
    }
  }
});

const vueInstance = app.mount('#app');

// Pythonから呼び出される関数を登録
eel.expose(update_text_area);
function update_text_area(line) {
  vueInstance.textAreaContent += line + "\n"; // Vueインスタンスの`textAreaContent`を更新
}
