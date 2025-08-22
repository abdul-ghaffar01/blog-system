import uniqueId from "../uniqueId";

export default function handleTable(val, editor) {
    // val = { rows: number, cols: number, headers?: [..], data?: [ [..], [..] ] }

    const tableId = uniqueId();

    let headerRow = "";
    if (val.headers && val.headers.length) {
        headerRow =
            "<tr>" +
            val.headers
                .map((header) => `<th id="${uniqueId()}">${header}</th>`)
                .join("") +
            "</tr>";
    }

    let bodyRows = "";
    for (let r = 0; r < val.rows; r++) {
        bodyRows +=
            "<tr>" +
            Array.from({ length: val.cols })
                .map((_, c) => {
                    const content = val.data?.[r]?.[c] || "";
                    return `<td id="${uniqueId()}">${content}</td>`;
                })
                .join("") +
            "</tr>";
    }

    const tag = `<table id="${tableId}" border="1" cellspacing="0" cellpadding="4">${headerRow}${bodyRows}</table>`;

    console.log(tag);
    editor.innerHTML += tag;
}
