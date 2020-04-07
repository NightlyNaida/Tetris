"use strict";
import {figures} from './figures.js'; // модуль предоставляет объект, описывающи все фигуры
import {frontGrid} from './areaLogic.js'; //модуль формирует игровое поле и предоставляет массив ячеек frontGrid

var currentFigureWayX = 0; //переменные хранят текущее положение фигуры (первого куба)
var currentFigureWayY = 0;

var currentFigure;

var gameDificult = 1000;

var allXCoordinates = [];
var allYCoordinates = [];

function fillallXallY(){
    for(let key in currentFigure.cubes){
        allXCoordinates.push(currentFigure.cubes[key].x + currentFigureWayX);
        allYCoordinates.push(currentFigure.cubes[key].y) + currentFigureWayY;
    }
}



function setCurrentFigure(figure,rotate){

    //console.log('start set figure ' + figure.name);

    var namesOfRotates = [];

    for(let key in figure.rotates){
        namesOfRotates.push(key);
    }

    //console.log('namesOfRotates is complete');
    //console.log(namesOfRotates);



    currentFigure = {
        name: figure.name,
        currentRotate: rotate,
        cubes:{
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
}

setCurrentFigure(figures['L_figure_flp'],3); //стартовая фигура



$(window).keydown(function(e){

    fillallXallY();

    switch(e.keyCode){
        case 13:{
            gameStart();
        }
        break;

        case 38:{
            changeRotate();
        }
        break;
        case 37:{
            moveFigureLeft();
        }
        break;
        case 40:{
            moveFigureDown();
        }
        break;
        case 39:{
            moveFigureRight();
        }
        break;
    }
})


function moveFigureRight(){
    function isMoreZero(element,index,arr) { //коллбек для метода проверки массива
        return element > (frontGrid[0].length - 2);
    }
    function isContainFalse(element,index,arr){
       return element == false;
    } 

    if(!(allXCoordinates.some(isMoreZero))){
        if(!figureIsCanMove(0,1).some(isContainFalse))
        {
            moveCurrentFigure(0,1);
        }
    }
}

function moveFigureDown(){
    function isMoreBottomCell(element,index,arr) { //коллбек для метода проверки массива
        return element > frontGrid.length - 2; //если хотя бы один кубик равен нижней границе, то срабатывает
    }

    if(!(allYCoordinates.some(isMoreBottomCell))){ //сначала проверяем ограничение по полю, а затем проверяем пространство ниже каждого
        //console.log('start check place below figure...');

        function isContainFalse(element,index,arr){
            return element == false;
        }

        if(figureIsCanMove(1,0).some(isContainFalse))
        {
            generateNewFigure();
        }
        else
        {
            moveCurrentFigure(1,0);
        }
    }
}

function moveFigureLeft(){

    function isMoreZero(element,index,arr) { //коллбек для метода проверки массива
        return element < 1;                     //если хотя бы один кубик меньше единицы, то срабатывает
    }
    function isContainFalse(element,index,arr){
        return element == false;
    } 
    
    if(!(allXCoordinates.some(isMoreZero))){   //если коллбек не сработал, то двигаем
        if(!figureIsCanMove(0,-1).some(isContainFalse))
        {
            moveCurrentFigure(0,-1);
        }
    }
}

function figureIsCanMove (directionY, directionX){

    let checkCubesResult = []; //так как проверяется каждый куб фигуры по отдельности, то результаты проверки складываются в массив

    for(let key in currentFigure.cubes){ //пробегаем по ЯЧЕЙКАМ, куда фигура хочет переместиться

        let currentY = (currentFigure.cubes[key].y + currentFigureWayY + directionY); //запоминаем Y координату проверяемой ячейки
        let currentX = (currentFigure.cubes[key].x + currentFigureWayX + directionX) //запоминаем X координату проверяемой ячейки
        
        let cellUnderCheck = frontGrid[currentY][currentX]; //в переменную запоминаем ЯЧЕЙКУ, которую будем проверять на заполнение

        //console.log('check cell by adress y' + currentY + ' x' + currentX);

        if($(cellUnderCheck).hasClass('tetris-cell-yellow')){ //если у ячейки есть класс, то она занята
            //console.log("cell to check is under suspicion","start compare cell with currentFigure's cubes...");
            
            function checkCubes(){ //сравние координат проверяемой ячейки с кубиками фигуры, которая сейчас активна
                for(let key in currentFigure.cubes){
                    //console.log('compare cube y' + (currentFigure.cubes[key].y + currentFigureWayY) + ' with cell y' + currentY);
                    if((currentFigure.cubes[key].y + currentFigureWayY) == currentY){
                        //console.log('cF y' + (currentFigure.cubes[key].y + currentFigureWayY) + ' is Equal current cell y' + currentY);
                        if((currentFigure.cubes[key].x + + currentFigureWayX) == currentX){
                            //console.log('cF x' + (currentFigure.cubes[key].x + currentFigureWayX) + ' is Equal current cell x' + currentX);
                            //console.log('the cell to check is occupied by currentFigure cube');
                            return true;
                        }
                    }
                }
            }

            if(checkCubes()){
                checkCubesResult.push(true);
            }
            else{
                checkCubesResult.push(false);
            }
        }
        else{
            checkCubesResult.push(true);
        }
    }

    return(checkCubesResult);
}

function checkPosition(){ //пеоебираем кубики фигуры и проверяем их колизию
    //console.log('check position');
    for (let key in currentFigure.cubes){
        if(currentFigure.cubes[key].y + currentFigureWayY == frontGrid.length - 1){
            //console.log('position is bottom');
            return true;
        }
    }
}

function moveCurrentFigure(directionY,directionX){
    drawCurrentFigure(); // закрашеваем старое положение фигуры   
    
    currentFigureWayX += directionX;
    currentFigureWayY += directionY; //корректируем текущие координаты

    drawCurrentFigure(); //отрисовываем фигуру на новом месте 


    if (checkPosition()){
        generateNewFigure();
    }
}

function drawCurrentFigure(){ //отрисовка фигуры
    for(let key in currentFigure.cubes){
        try{
            let y = currentFigure.cubes[key].y + currentFigureWayY;
            let x = currentFigure.cubes[key].x + currentFigureWayX;

            //console.log("draw cell in adress y" + y + '  x' + x);

            $(frontGrid[y][x]).toggleClass('tetris-cell-yellow');
        }
        catch{
            //console.log("ERROR. Try paint cube is failed");
        };
    }
}

function generateNewFigure(){ // функция генерации новых фигур(собираем все имена фигур, генерируем рандомно индекс и генерируем фигуру)
    //console.log('start generate new figure...');  //логирование
    checkRowsForFull();
    
    let nameFigures = []; // сюда складываем все названия фигур 

    for(let key in figures){ //процесс складывания названий
        nameFigures.push(key);
    }

    //console.log('figures array...'); //лолгируем получившийся массив
    //console.log(nameFigures);

    //console.log('generate index...');//запуск поиска рандомного числа
    let index = (Math.round(Math.random()*nameFigures.length))-1;
    if(index < 0 ){//проверяем индекс на корректность (должен находиться в пределах массива имен)
        index = 0;
    }
    else if(index > (figures.length - 1)){
        index = figures.length - 1;
    }
    //console.log('index is ' + index); //логируем индекс и затем фигуру
    //console.log('the name of current figure is' + nameFigures[index]);


    setCurrentFigure(figures[nameFigures[index]],0);//запускаем функцию смены текущей фигуры
    currentFigureWayX = 0; //обнуляем переменные движения текущей фигуры
    currentFigureWayY = 0;
    drawCurrentFigure();// запускаем функцию отрисовки фигуры
}


function changeRotate () { //функция поворота фигуры
    var countOFRotates = 0; //считаем количество возможных повортов у текущей фигуры

    //console.log('count of possible rotates...')
    for(var key in figures[currentFigure.name].rotates){
        countOFRotates++;
    }
    //console.log('possible rotates - ' + countOFRotates);
    
    if(countOFRotates > 1){ //если возможных поворотов больше одного, то запускаем процесс поворота
        //console.log('start rotate process'); 
        if(((currentFigure.currentRotate + 1) < countOFRotates) || currentFigure.currentRotate + 1 == 1){  //если положение текущей фигуры в переделах допустимого диапазона
            //console.log('current rotate within the allowable range');
            drawCurrentFigure(); //закрашиваем текущую фигуру
            setCurrentFigure(figures[currentFigure.name],currentFigure.currentRotate + 1); //переворачиваем фигуру
            drawCurrentFigure(); //красим на новом месте
        }
        else 
            if(currentFigure.currentRotate + 1 >= countOFRotates){
                //console.log('the current rotate is more or equals max valuse. Set rotate to 0');
                drawCurrentFigure();
                setCurrentFigure(figures[currentFigure.name],0);
                drawCurrentFigure();
        }
    }
}

function checkRowsForFull(){
    console.log('start check rows...');
    for(let i = 0; i < frontGrid.length; i++){
        //console.log('check row ' + i);
        for(let j = 0; j < frontGrid[i].length; j++){
                //console.log('check cell ' + j);
            if($(frontGrid[i][j]).hasClass('tetris-cell-yellow')){
                //console.log('cell is yellow');
                if(j == (frontGrid[i].length - 1)){
                    //console.log('row is yellow','start paint row into background color...');
                    for(let cell in frontGrid[i]){
                        $(frontGrid[i][cell]).toggleClass('tetris-cell-yellow');
                    }
                    dropDownCubes(i);
                }
            }
            else{
                //console.log('cell is background color. Break cycle...');
                break;  
            }
        }
    }
}

function dropDownCubes(index){
    index--;
    for(;index >= 0; index--){
        for(let cell in frontGrid[index]){
            if($(frontGrid[index][cell]).hasClass('tetris-cell-yellow')){
                $(frontGrid[index][cell]).toggleClass('tetris-cell-yellow');
                $(frontGrid[(index + 1)][cell]).toggleClass('tetris-cell-yellow');
            }
        }
    }
}

drawCurrentFigure();

function gameStart(){
    setInterval(moveFigureDown,gameDificult);
}


