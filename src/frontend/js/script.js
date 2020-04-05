"use strict";
import {figures} from './figures.js'; // модуль предоставляет объект, описывающи все фигуры
import {frontGrid} from './areaLogic.js'; //модуль формирует игровое поле и предоставляет массив ячеек frontGrid

var currentFigureWayX = 0; //переменные хранят текущее положение фигуры (первого куба)
var currentFigureWayY = 0;

var currentFigure;

function setCurrentFigure(figure,rotate){

    console.log('start set figure ' + figure.name);

    var namesOfRotates = [];

    for(let key in figure.rotates){
        namesOfRotates.push(key);
    }

    console.log('namesOfRotates is complete');
    console.log(namesOfRotates);



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
    var allX = []; //сгружаем координаты всех кубиков фигруы в массивы
    var allY = [];
    for(let key in currentFigure.cubes){
        allX.push(currentFigure.cubes[key].x + currentFigureWayX);
        allY.push(currentFigure.cubes[key].y) + currentFigureWayY;
    }


    switch(e.keyCode){
        case 38:{
            changeRotate();
        }
        break;
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

            if(!(allY.some(isMoreBottomCell))){
                console.log('start check place below figure...');

                let checkCubesResult = [];

                for(let key in currentFigure.cubes){

                    let currentY = (currentFigure.cubes[key].y + currentFigureWayY + 1); //запоминаем Y координату проверяемой ячейки
                    let currentX = (currentFigure.cubes[key].x + currentFigureWayX) //запоминаем X координату проверяемой ячейки
                    
                    let cellUnderCheck = frontGrid[currentY][currentX];

                    console.log('check cell by adress y' + currentY + ' x' + currentX);

                    if($(cellUnderCheck).hasClass('tetris-cell-yellow')){
                        console.log("cell to check is under suspicion","start compare cell with currentFigure's cubes...");
                        
                        function checkCubes(){
                            for(let key in currentFigure.cubes){
                                console.log('compare cube y' + (currentFigure.cubes[key].y + currentFigureWayY) + ' with cell y' + currentY);
                                if((currentFigure.cubes[key].y + currentFigureWayY) == currentY){
                                    console.log('cF y' + (currentFigure.cubes[key].y + currentFigureWayY) + ' is Equal current cell y' + currentY);
                                    if((currentFigure.cubes[key].x + + currentFigureWayX) == currentX){
                                        console.log('cF x' + (currentFigure.cubes[key].x + currentFigureWayX) + ' is Equal current cell x' + currentX);
                                        console.log('the cell to check is occupied by currentFigure cube');
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

                function isContainFalse(element,index,arr){
                    return element == false;
                }
                if(checkCubesResult.some(isContainFalse))
                {
                    generateNewFigure();
                }
                else
                {
                    moveCurrentFigure(1,0);
                }
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
    for (let key in currentFigure.cubes){
        if(currentFigure.cubes[key].y + currentFigureWayY == frontGrid.length - 1){
            console.log('position is bottom');
            return true;
        }
        //else{
            //if($(frontGrid[currentFigure[key].y+1][currentFigure[key].x]).hasClass('tetris-cell-yellow')){
             //   alert('a');
            //} возможная механика колизии
    }
}

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
    for(let key in currentFigure.cubes){
        try{
            let y = currentFigure.cubes[key].y + currentFigureWayY;
            let x = currentFigure.cubes[key].x + currentFigureWayX;

            console.log("draw cell in adress y" + y + '  x' + x);

            $(frontGrid[y][x]).toggleClass('tetris-cell-yellow');
        }
        catch{
            console.log("ERROR. Try paint cube is failed");
        };
    }
}

function generateNewFigure(){ // функция генерации новых фигур(собираем все имена фигур, генерируем рандомно индекс и генерируем фигуру)
    console.log('start generate new figure...');  //логирование
    
    let nameFigures = []; // сюда складываем все названия фигур 

    for(let key in figures){ //процесс складывания названий
        nameFigures.push(key);
    }

    console.log('figures array...'); //лолгируем получившийся массив
    console.log(nameFigures);

    console.log('generate index...');//запуск поиска рандомного числа
    let index = (Math.round(Math.random()*nameFigures.length))-1;
    if(index < 0 ){//проверяем индекс на корректность (должен находиться в пределах массива имен)
        index = 0;
    }
    else if(index > (figures.length - 1)){
        index = figures.length - 1;
    }
    console.log('index is ' + index); //логируем индекс и затем фигуру
    console.log('the name of current figure is' + nameFigures[index]);


    setCurrentFigure(figures[nameFigures[index]],0);//запускаем функцию смены текущей фигуры
    currentFigureWayX = 0; //обнуляем переменные движения текущей фигуры
    currentFigureWayY = 0;
    drawCurrentFigure();// запускаем функцию отрисовки фигуры
}


function changeRotate () { //функция поворота фигуры
    var countOFRotates = 0; //считаем количество возможных повортов у текущей фигуры

    console.log('count of possible rotates...')
    for(var key in figures[currentFigure.name].rotates){
        countOFRotates++;
    }
    console.log('possible rotates - ' + countOFRotates);
    
    if(countOFRotates > 1){ //если возможных поворотов больше одного, то запускаем процесс поворота
        console.log('start rotate process'); 
        if(((currentFigure.currentRotate + 1) < countOFRotates) || currentFigure.currentRotate + 1 == 1){  //если положение текущей фигуры в переделах допустимого диапазона
            console.log('current rotate within the allowable range');
            drawCurrentFigure(); //закрашиваем текущую фигуру
            setCurrentFigure(figures[currentFigure.name],currentFigure.currentRotate + 1); //переворачиваем фигуру
            drawCurrentFigure(); //красим на новом месте
        }
        else 
            if(currentFigure.currentRotate + 1 >= countOFRotates){
                console.log('the current rotate is more or equals max valuse. Set rotate to 0');
                drawCurrentFigure();
                setCurrentFigure(figures[currentFigure.name],0);
                drawCurrentFigure();
        }
    }
}


drawCurrentFigure();



