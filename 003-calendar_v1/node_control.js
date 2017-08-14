/*
<table>
    <caption id="month">00</caption>
    <tbody>
        <tr id="week">
            <th>日</th>
            ~~~
        </tr>
        <tr id="day">
            <td></td>
            ~~~
        </tr>
        ~~~
    </tbody>
</table>
*/
// 每次直接插入一列(含資料)

var myCalendar = document.getElementById("myCalendar");
var tempNode, tempContent, container;

//init
function myCalendar_init() {
    tempNode = document.createElement("table");
    myCalendar.appendChild(tempNode);
    container = myCalendar.lastChild;

    // add <caption>
    tempNode = document.createElement("caption");
    tempContent = document.createTextNode("Hello World");
    tempNode.appendChild(tempContent);
    container.appendChild(tempNode);
}

//將陣列化的資料插入新列
function array2TableRow(parent_node, data, target_node) {
    console.log(data);

    // 在表格內插入一新列
    var tempNode = document.createElement("tr");
    parent_node.appendChild(tempNode);

    //插入第一格
    var tempRow = parent_node.lastChild;
    var tempContent = document.createTextNode(data[0]);
    tempNode = document.createElement(target_node);

    tempNode.appendChild(tempContent);
    tempRow.appendChild(tempNode);

    //插入剩餘資料
    for (var i = 1; i < data.length; i++) {
        var otherData = tempRow.lastChild.cloneNode();
        tempContent = document.createTextNode(data[i]);
        otherData.appendChild(tempContent);
        tempRow.appendChild(otherData);
    }

}

myCalendar_init();

var weekTitle = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
array2TableRow(container, weekTitle, "th");

var a2 = ["1", "2", "3", "4", "5", "6", "0"];
array2TableRow(container, a2, "td");

var a3 = ["a1", "a2", "a3", "a4", "a5", "a6", "a0"];
array2TableRow(container, a3, "td");
