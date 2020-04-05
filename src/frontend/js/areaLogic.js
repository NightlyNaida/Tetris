export var frontGrid = []; //массив из div, которые служат ячейками

//переносим игровую арену на центр
function setGameAreaCenter(){
    var area = $('.tetris-area')[0];
    console.log(area);

    var center = document.body.clientWidth / 2 - area.getBoundingClientRect().width / 2;
    console.log('center is ' + center)

    $(area).css('left',center);
}

//добавление клеток в поле
function setCells(){
    var cell = '<div class="tetris-cell"></div>'
    var grid = $('.tetris-grid')[0];

    for(;($(grid).children('.tetris-cell').length < 150);)
        grid.innerHTML += cell;

}

function makeFrontGrid(){
    let row = [];//переменная для хранения формирующийся строки
    let logicRow =[];//переменная для хранения формирующийся строки для таблицы логических просчетов
    row.push($('.tetris-cell')[0]); //пушим первую ячейку в переменную хранения строк
    logicRow.push('0');

    for (let i = 1; i < $('.tetris-cell').length; i++){ // пробегаемся по всем ячейкам СТАРТУЕМ СО ВТОРОЙ

        if ($('.tetris-cell')[i].getBoundingClientRect().y == $('.tetris-cell')[i-1].getBoundingClientRect().y){
            row.push($('.tetris-cell')[i]);
            logicRow.push('0');
        }
        else{
            frontGrid.push(row);
            row = [];
            logicRow = [];
            row.push($('.tetris-cell')[i]);
            logicRow.push('0');
        }
    }
    frontGrid.push(row);
}

setCells();
makeFrontGrid();
setGameAreaCenter();
