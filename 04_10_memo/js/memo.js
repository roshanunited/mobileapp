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
            Swal.fire("Memo app", "Key,Memoはいずれも必須です。", "error");
            return;
        }

        Swal.fire({
            title: "Memo app",
            html: `LocalStorage に「${key} : ${value}」を保存しますか？`,
            icon: "question",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem(key, value);
                viewStorage();

                Swal.fire(
                    "Memo app",
                    `LocalStorage に「${key} : ${value}」を保存しました。`,
                    "success"
                );

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    });
}

/* ---------------- TRASH DELETE (ICON) ---------------- */
function deleteByTrash(key, memo) {
    Swal.fire({
        title: "Memo app",
        html: `LocalStorage から「${key} : ${memo}」を削除しますか？`,
        icon: "warning",
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem(key);
            viewStorage();

            Swal.fire(
                "Memo app",
                `LocalStorage から「${key} : ${memo}」を削除しました。`,
                "success"
            );
        }
    });
}

/* ---------------- DELETE (BUTTON) ---------------- */
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
                html: `LocalStorage から ${selectedIndexes.length} 件を削除しますか？`,
                icon: "question",
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    selectedIndexes.forEach(idx => {
                        const key = table1.rows[idx + 1].cells[1].textContent;
                        localStorage.removeItem(key);
                    });
                    viewStorage();

                    Swal.fire(
                        "Memo app",
                        `LocalStorage から ${selectedIndexes.length} 件を削除しました。`,
                        "success"
                    );
                }
            });
            return;
        }

        const idx = selectedIndexes[0];
        const key = table1.rows[idx + 1].cells[1].textContent;
        const memo = table1.rows[idx + 1].cells[2].textContent;

        deleteByTrash(key, memo);
    });
}

/* ---------------- ALL CLEAR ---------------- */
function allClearLocalStorage() {
    const del = document.getElementById("allClear");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        Swal.fire({
            title: "Memo app",
            html: "LocalStorage からすべて削除します。よろしいでしょうか？",
            icon: "warning",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                viewStorage();

                Swal.fire(
                    "Memo app",
                    "LocalStorage からすべて削除しました。",
                    "success"
                );
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
    const key = table1.rows[idx + 1].cells[1].textContent;
    const memo = table1.rows[idx + 1].cells[2].textContent;

    document.getElementById("textKey").value = key;
    document.getElementById("textMemo").value = memo;

    Swal.fire(
        "Memo app",
        `選択中：<br>「${key} : ${memo}」`,
        "info"
    );
}

/* ---------------- VIEW ---------------- */
function viewStorage() {
    const list = document.getElementById("list");

    while (list.rows.length > 0) {
        list.deleteRow(0);
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input name="chkbox1" type="checkbox"></td>
            <td>${key}</td>
            <td>${value}</td>
            <td>
                <img src="img/trash_icon.png"
                     class="trash"
                     style="cursor:pointer"
                     onclick="deleteByTrash('${key}','${value}')">
            </td>
        `;

        list.appendChild(tr);
    }

    $("#table1").trigger("update");
}
