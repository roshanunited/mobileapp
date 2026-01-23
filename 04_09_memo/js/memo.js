"use strict";

window.addEventListener("DOMContentLoaded", function () {

    if (typeof localStorage === "undefined") {
        alert("このブラウザはLocal Storage機能は実装されていません");
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

/* ---------------- SAVE ---------------- */
function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            Swal.fire({
                title: "Memo app",
                html: "Key,Memoはいずれも必須です。",
                icon: "error",
                allowOutsideClick: false
            });
            return;
        }

        let w_msg = "LocalStorageに<br>「" + key + " " + value + "」<br>を保存しますか？";

        Swal.fire({
            title: "Memo app",
            html: w_msg,
            icon: "question",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem(key, value);
                viewStorage();

                Swal.fire({
                    title: "Memo app",
                    html: "LocalStorageに保存しました。",
                    icon: "success",
                    allowOutsideClick: false
                });

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    });
}

/* ---------------- DELETE ---------------- */
function delLocalStorage() {
    const del = document.getElementById("del");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");

        let selectedIndexes = [];

        for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
                selectedIndexes.push(i);
            }
        }

        if (selectedIndexes.length === 0) {
            Swal.fire("Memo app", "1つ以上選択してください。", "warning");
            return;
        }

        if (selectedIndexes.length > 1) {
            Swal.fire({
                title: "Memo app",
                html: `選択されている${selectedIndexes.length}件を削除しますか？`,
                icon: "question",
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    selectedIndexes.forEach(idx => {
                        const key = table1.rows[idx + 1].cells[1].textContent;
                        localStorage.removeItem(key);
                    });
                    viewStorage();
                    Swal.fire("Memo app", "削除しました。", "success");
                }
            });
            return;
        }

        const idx = selectedIndexes[0];
        const key = table1.rows[idx + 1].cells[1].textContent;
        const memo = table1.rows[idx + 1].cells[2].textContent;

        Swal.fire({
            title: "Memo app",
            html: `「${key} : ${memo}」を削除しますか？`,
            icon: "question",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem(key);
                viewStorage();
                Swal.fire("Memo app", "削除しました。", "success");
            }
        });

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
    });
}

/* ---------------- ALL CLEAR ---------------- */
function allClearLocalStorage() {
    const del = document.getElementById("allClear");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        Swal.fire({
            title: "Memo app",
            html: "LocalStorageをすべて削除します。よろしいでしょうか？",
            icon: "warning",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                viewStorage();
                Swal.fire("Memo app", "すべて削除しました！", "success");

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    });
}

/* ---------------- SELECT ---------------- */
function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBtn();
    });
}

/* ---------------- SELECT CHECK ---------------- */
function selectCheckBtn() {
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    let selectedIndexes = [];

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            selectedIndexes.push(i);
        }
    }

    if (selectedIndexes.length !== 1) {
        Swal.fire("Memo app", "1つだけ選択してください。", "warning");
        return;
    }

    const idx = selectedIndexes[0];

    document.getElementById("textKey").value =
        table1.rows[idx + 1].cells[1].textContent;

    document.getElementById("textMemo").value =
        table1.rows[idx + 1].cells[2].textContent;
}

/* ---------------- VIEW ---------------- */
function viewStorage() {
    const list = document.getElementById("list");

    while (list.rows.length > 0) list.deleteRow(0);

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
