"use strict";

window.addEventListener("DOMContentLoaded", function () {

    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storage機能は実装されていません");
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();      // ← FIX: call delete function
        selectTable();
    }
});


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

        localStorage.setItem(key, value);

        window.alert("LocalStorageに「" + key + " : " + value + "」を保存しました。");

        viewStorage();
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
    }, false);
}


function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click", function (e) {
        e.preventDefault();

        let w_sel = selectRadioBtn();    // returns "1" or "0"

        if (w_sel === "1") {
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            localStorage.removeItem(key);
            viewStorage();

            window.alert("LocalStorageから「" + key + " : " + value + "」を削除しました。");

            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
    }, false);
}


function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectRadioBtn();
    }, false);
}


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
    return "0";  // ← FIX
}


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
}
