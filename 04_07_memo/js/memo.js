"use strict";

window.addEventListener("DOMContentLoaded", function () {

    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storage機能は実装されていません");
        return;
    }

    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    viewStorage();
    saveLocalStorage();
    delLocalStorage();
    allClearLocalStorage();
    selectTable();
});


// ------------------- SAVE -------------------
function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            window.alert("Key,Memoはいずれも必須です。");
            return;
        }

        const result = window.confirm(`LocalStorageに「${key} : ${value}」を保存しますか？`);

        if (result) {
            localStorage.setItem(key, value);
            window.alert(`LocalStorageに「${key} : ${value}」保存しました！`);
            viewStorage();
        }

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
    }, false);
}



// ------------------- DELETE -------------------
function delLocalStorage() {
    const del = document.getElementById("del");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");

        let selectedIndexes = [];

        // チェックされた項目の index を集める
        for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
                selectedIndexes.push(i);
            }
        }

        // 0件
        if (selectedIndexes.length === 0) {
            window.alert("1つ選択(select)してください。");
            return;
        }

        // 2件以上
        if (selectedIndexes.length > 1) {
            window.alert("1つ選択(select)してください。");
            return;
        }

        // 1件 → 削除確認
        const idx = selectedIndexes[0];
        const key = table1.rows[idx + 1].cells[1].textContent;
        const memo = table1.rows[idx + 1].cells[2].textContent;

        const result = window.confirm(
            `LocalStorageから「${key} : ${memo}」を削除(delete)しますか？`
        );

        if (result) {
            localStorage.removeItem(key);
            viewStorage();
            window.alert(`LocalStorageから「${key} : ${memo}」を削除(delete)しました。`);
        }

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";

    }, false);
}



// ------------------- DELETE ALL -------------------
function allClearLocalStorage() {
    const del = document.getElementById("allClear");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        let w_confirm = window.confirm("LocalStorageをすべて削除します。よろしいでしょうか?");

        if (w_confirm) {
            localStorage.clear();
            viewStorage();
            window.alert("すべて削除しました！");

            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
    }, false);
}



// ------------------- SELECT -------------------
function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBtn();
    }, false);
}



// ------------------- SELECT CHECK -------------------
function selectCheckBtn() {
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    let selectedIndexes = [];

    // 選択された index を集める
    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            selectedIndexes.push(i);
        }
    }

    // 0件
    if (selectedIndexes.length === 0) {
        window.alert("1つ選択(select)してください。");
        return "0";
    }

    // 2件以上
    if (selectedIndexes.length > 1) {
        window.alert("1つ選択(select)してください。");
        return "0";
    }

    // 1件 → 値をセット
    const idx = selectedIndexes[0];

    document.getElementById("textKey").value =
        table1.rows[idx + 1].cells[1].textContent;

    document.getElementById("textMemo").value =
        table1.rows[idx + 1].cells[2].textContent;

    return "1";
}



// ------------------- VIEW -------------------
function viewStorage() {
    const list = document.getElementById("list");

    // 表の中身をリセット
    while (list.rows.length > 0) list.deleteRow(0);

    // localStorage の内容を表示
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.textContent = key;
        td3.textContent = value;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        list.appendChild(tr);
    }

    $("#table1").trigger("update");
}
