var clrBackground = '#283f3b';

var figures = {
    cube:{
        name: 'cube',
        rotates:{
            firstRotate:{
                firstCube: {
                    x:6,
                    y:0,
                },
                secondCube:{
                    x:7,
                    y:0
                },
                thirdCube:{
                    x:6,
                    y:1
                },
                fourthCube:{
                    x:7,
                    y:1
                }
            }
        }
    },
    line:{
        name: 'line',
        rotates:{
            firstRotate:{
                firstCube: {
                    x:6,
                    y:0,
                },
                secondCube:{
                    x:6,
                    y:1
                },
                thirdCube:{
                    x:6,
                    y:2
                },
                fourthCube:{
                    x:6,
                    y:3
                }
            },
            secondRotate:{
                firstCube: {
                    x:6,
                    y:0,
                },
                secondCube:{
                    x:7,
                    y:0
                },
                thirdCube:{
                    x:8,
                    y:0
                },
                fourthCube:{
                    x:9,
                    y:0
                }
            },
        },
    },
}

var frontGrid = []; //массив из div, которые служат ячейками
var backGrid = []; //массив, в котором просчитывается вся логика тетриса

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
            backGrid.push(logicRow);
            row = [];
            logicRow = [];
            row.push($('.tetris-cell')[i]);
            logicRow.push('0');
        }
    }
    frontGrid.push(row);
    backGrid.push(logicRow);
}

setCells();
makeFrontGrid();
setGameAreaCenter();

var currentFigure;

function setCurrentFigure(figure,rotate){

    console.log('start set figure ' + figure.name);

    var namesOfRotates = [];

    for(key in figure.rotates){
        namesOfRotates.push(key);
    }

    console.log('namesOfRotates is complete');
    console.log(namesOfRotates);



    currentFigure = {
        firstCube:{
            x: figure.rotates[namesOfRotates[rotate]].firstCube.x,
            y: figure.rotates[namesOfRotates[rotate]].firstCube.y
        },
        secondCube:{
            x: figure.rotates[namesOfRotates[rotate]].secondCube.x,
            y: figure.rotates[namesOfRotates[rotate]].secondCube.y
        },
        thirdCube:{
            x:figure.rotates[namesOfRotates[rotate]].thirdCube.x,
            y:figure.rotates[namesOfRotates[rotate]].thirdCube.y
        },
        fourthCube:{
            x:figure.rotates[namesOfRotates[rotate]].fourthCube.x,
            y:figure.rotates[namesOfRotates[rotate]].fourthCube.y
        }
    }
}

setCurrentFigure(figures['cube'],0);



$(window).keydown(function(e){
    var allX = []; //сгружаем координаты всех кубиков фигруы в массивы
    var allY = [];
    for(let key in currentFigure){
        allX.push(currentFigure[key].x + currentFigureWayX);
        allY.push(this.currentFigure[key].y) + currentFigureWayY;
    }


    switch(e.keyCode){
        case 37:{
            function isMoreZero(element,index,arr) { //коллбек для метода проверки массива
                return element < 1;                     //если хотя бы один кубик меньше единицы, то срабатывает
            }
            
            if(!(allX.some(isMoreZero))){   //если коллбек не сработал, то двигаем
                moveCurrentFigure(0,-1);
            }
        }
        break;
        case 40:{

            function isMoreBottomCell(element,index,arr) { //коллбек для метода проверки массива
                return element > frontGrid.length - 2; //если хотя бы один кубик равен нижней границе, то срабатывает
            }

            if(!(allY.some(isMoreBottomCell))){   //если коллбек не сработал, то двигаем
                moveCurrentFigure(1,0);
            }
        }
        break;
        case 39:{
            function isMoreZero(element,index,arr) { //коллбек для метода проверки массива
                return element > (frontGrid[0].length - 2);                     //если хотя бы один кубик меньше единицы, то срабатывает
            }
            
            if(!(allX.some(isMoreZero))){   //если коллбек не сработал, то двигаем
                moveCurrentFigure(0,1);
            }
        }
        break;
    }
})

function checkPosition(){ //пеоебираем кубики фигуры и проверяем их колизию
    console.log('check position');
    for (key in currentFigure){
        if(currentFigure[key].y + currentFigureWayY == frontGrid.length - 1){
            console.log('position is bottom');
            return true;
        }
        //else{
            //if($(frontGrid[currentFigure[key].y+1][currentFigure[key].x]).hasClass('tetris-cell-yellow')){
             //   alert('a');
            //} возможная механика колизии
    }
}


var currentFigureWayX = 0; //переменные хранят текущее положение фигуры (первого куба)
var currentFigureWayY = 0;

function moveCurrentFigure(directionY,directionX){
    drawCurrentFigure(); // закрашеваем старое положение фигуры   

    // for(let key in currentFigure){ //пробегаемся по кубикам
    //     currentFigure[key].x += directionX; 
    //     currentFigure[key].y += directionY;
    // }

    currentFigureWayX += directionX;
    currentFigureWayY += directionY; //корректируем текущие координаты

    drawCurrentFigure(); //отрисовываем фигуру на новом месте 


    if (checkPosition()){
        generateNewFigure();
    }
}

function drawCurrentFigure(){ //отрисовка фигуры
    for(let key in currentFigure){
        try{
            let y = currentFigure[key].y + currentFigureWayY;
            let x = currentFigure[key].x + currentFigureWayX;

            console.log("draw cell in adress y" + y + '  x' + x);

            $(frontGrid[y][x]).toggleClass('tetris-cell-yellow');
        }
        catch{
            console.log("ERROR. Try paint cube is failed");
        };
    }
}

function generateNewFigure(){
    console.log('start generate new figure...');
    
    let nameFigures = [];

    for(let key in figures){
        nameFigures.push(key);
    }

    console.log('figures array...');
    console.log(nameFigures);

    console.log('generate index...');
    let index = (Math.round(Math.random()*nameFigures.length))-1;
    if(index < 0 ){
        index = 0;
    }
    console.log('index is ' + index);
    console.log('the name of current figure is' + nameFigures[index]);
    setCurrentFigure(figures[nameFigures[index]],0);
    drawCurrentFigure();
    console.log(currentFigure);
}


drawCurrentFigure();



