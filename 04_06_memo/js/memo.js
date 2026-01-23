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


// -------------------- Save --------------------
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

        const result = window.confirm("LocalStorageに「" + key + " : " + value + "」を保存しますか？");

        if (result) {
            localStorage.setItem(key, value);
            window.alert("LocalStorageに「" + key + " : " + value + "」保存しました！");
            viewStorage();
        }

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
    }, false);
}


// -------------------- Delete --------------------
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click", function (e) {
        e.preventDefault();

        let selected = selectRadioBtn();

        if (selected === "0") return;  // nothing selected

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        const result = window.confirm("LocalStorageから「" + key + " : " + value + "」を削除しますか？");

        if (result) {
            localStorage.removeItem(key);
            viewStorage();
            window.alert("LocalStorageから「" + key + " : " + value + "」削除しました！");
        }

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
    }, false);
}


// -------------------- All Clear --------------------
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


// -------------------- Select row --------------------
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectRadioBtn();
    }, false);
}


// -------------------- Get selected radio --------------------
function selectRadioBtn() {
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            document.getElementById("textKey").value =
                table1.rows[i + 1].cells[1].textContent;

            document.getElementById("textMemo").value =
                table1.rows[i + 1].cells[2].textContent;

            return "1";
        }
    }

    window.alert("1つ選択してください。");
    return "0";
}


// -------------------- Show table --------------------
function viewStorage() {
    const list = document.getElementById("list");

    while (list.rows.length > 0) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.textContent = w_key;
        td3.textContent = localStorage.getItem(w_key);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        list.appendChild(tr);
    }

    $("#table1").trigger("update");
}
