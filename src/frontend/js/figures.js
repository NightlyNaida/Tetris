'use strict';

export var figures = {
    cube:{
        name: 'cube',
        rotates:{
            firstRotate:{
                firstCube:{x:4,y:0,},secondCube:{x:5,y:0},thirdCube:{x:4,y:1},fourthCube:{x:5,y:1}
            }
        }
    },
    line:{
        name: 'line',
        rotates:{
            firstRotate:{
                firstCube:{x:5,y:0,},secondCube:{x:5,y:1},thirdCube:{x:5,y:2},fourthCube:{x:5,y:3}
            },
            secondRotate:{
                firstCube:{x:3,y:0,},secondCube:{x:4,y:0},thirdCube:{x:5,y:0},fourthCube:{x:6,y:0}
            },
        },
    },
    S_figure:{
        name:'S_figure',
        rotates:{
            firstRotate:{
                firstCube:{x:5,y:0},secondCube:{x:5,y:1},thirdCube:{x:6,y:1},fourthCube:{x:6,y:2}
            },
            secondRotate:{
                firstCube:{x:4,y:1},secondCube:{x:5,y:1},thirdCube:{x:5,y:0},fourthCube:{x:6,y:0}
            }
        }
    },
    S_figure_flp:{
        name:"S_figure_flp",
        rotates:{
            firstRotate:{
                firstCube:{x:5,y:0},secondCube:{x:5,y:1},thirdCube:{x:4,y:1},fourthCube:{x:4,y:2}
            },
            secondRotate:{
                firstCube:{x:4,y:0},secondCube:{x:5,y:0},thirdCube:{x:5,y:1},fourthCube:{x:6,y:1}
            }
        }
    },
    L_figure:{
        name:"L_figure",
        rotates:{
            firstRotate:{
                firstCube:{x:4,y:0},secondCube:{x:4,y:1},thirdCube:{x:4,y:2},fourthCube:{x:5,y:2}
            },
            secondRotate:{
                firstCube:{x:3,y:2},secondCube:{x:3,y:1},thirdCube:{x:4,y:1},fourthCube:{x:5,y:1}
            },
            thirdRotate:{
                firstCube:{x:4,y:0},secondCube:{x:5,y:0},thirdCube:{x:5,y:1},fourthCube:{x:5,y:2}
            },
            fourthRotate:{
                firstCube:{x:3,y:1},secondCube:{x:4,y:1},thirdCube:{x:5,y:1},fourthCube:{x:5,y:0}
            }
        }
    },
    L_figure_flp:{
        name:"L_figure_flp",
        rotates:{
            firstRotate:{
                firstCube:{x:5,y:0},secondCube:{x:5,y:1},thirdCube:{x:5,y:2},fourthCube:{x:4,y:2}
            },
            secondRotate:{
                firstCube:{x:4,y:0},secondCube:{x:4,y:1},thirdCube:{x:5,y:1},fourthCube:{x:6,y:1}
            },
            thirdRotate:{
                firstCube:{x:5,y:0},secondCube:{x:4,y:0},thirdCube:{x:4,y:1},fourthCube:{x:4,y:2}
            },
            fourthRotate:{
                firstCube:{x:4,y:0},secondCube:{x:5,y:0},thirdCube:{x:6,y:0},fourthCube:{x:6,y:1}
            }
        }
    }
}