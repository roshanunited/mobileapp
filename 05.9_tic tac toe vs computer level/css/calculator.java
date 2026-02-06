import java.awt.*;
import java.awt.event.*;

public class calculator extends Frame implements ActionListener {
    // 表示用のテキストフィールド
    TextField display = new TextField();
    
    public calculator() {
        // タイトルを設定
        setTitle("計算機");
        
        // レイアウトを設定（6行4列）
        setLayout(new GridLayout(6, 4));
        
        // 表示エリアを追加
        display.setEditable(false);
        add(display);
        
        // ボタンの文字列
        String[] buttons = {
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+",
            "C", "", "", ""
        };
        
        // ボタンを作成して追加
        for (String text : buttons) {
            Button btn = new Button(text);
            btn.addActionListener(this);
            add(btn);
        }
        
        // ウィンドウのサイズと表示
        setSize(300, 400);
        setVisible(true);
    }
    
    // ボタンがクリックされた時の処理
    public void actionPerformed(ActionEvent e) {
        String cmd = e.getActionCommand();
        
        if (cmd.equals("C")) {
            // 表示をクリア（消去）
            display.setText("");
        } else if (cmd.equals("=")) {
            // 計算を実行
            // （実際の計算ロジックはここに追加）
        } else {
            // 数字や演算子を表示に追加
            display.setText(display.getText() + cmd);
        }
    }
    
    public static void main(String[] args) {
        new calculator();
    }
}