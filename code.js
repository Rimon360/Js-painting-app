/*************************** EDITOR CODE AND FUNTIONS ****************************/
/*****************************SELECT VALUE ***************************************/
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const shapes = document.querySelector('.shapes');
var undo = document.querySelector('.undo');
var redo = document.querySelector('.redo');
var undo_i = document.querySelector('.undo i');
var redo_i = document.querySelector('.redo i');
var deleteButton = document.querySelector('.delete');
var color = document.querySelector('.color');
var range = document.querySelector('.range');
var textBox = document.querySelector('#text');
var download = document.querySelector('#download-image');
var title = document.querySelector('.title');
var copyButton = document.querySelector('.copy-button');
var copyableText = document.querySelector('.image-link');
var rotate = document.querySelector('.rotate');
var highlighter = document.querySelector('.highlighter');
var img = document.querySelector('.i');
canvas.width = innerWidth - 285;
title.onkeydown = function () {
    title = this.value;
}
title = 'Untitle';
var shape = '';
var textX = 10;
var textY = 30;
context.fillStyle = '#fff';
context.fillRect(0, 0, canvas.width, canvas.height)
var storeData = [];
var index = -1;
shapes.onchange = function () {
    shape = this.value;
} // ON CHACNGE FUNCTION END...........................******
shapes.onclick = function () {
    shape = this.value;
}
var selectedColor = '#000';
color.onchange = function () {
    selectedColor = this.value;
}
var selectedRange = 10;
range.onchange = function () {
    selectedRange = this.value;
}

textBox.onclick = function () {
    textBox.style.color = selectedColor;
    textBox.style.fontSize = selectedRange + 'px';
}
canvas.addEventListener('mousedown', startPoint);
var mousedown = false;
var data = [];

function getImageData() {
    data = context.getImageData(0, 0, canvas.width, canvas.height);
}

function putImageData() {
    context.putImageData(data, 0, 0);
}

function storeDataInArray() {
    storeData.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
}

function startPoint(fe) { // MOUSE DOWN EVENT....................................****** 
    // fe = first event....
    var data = [];
    mousedown = true;
    var undoData = false;
    var previousStored = false;
    var drawedLine = false;

    function storeDataAndEndDrawFunction() {
        canvas.onmouseup = function () {
            drawedLine = false;
            storeDataInArray()
            undo.style.cursor = 'pointer';
            undo_i.style.color = 'rgb(59, 59, 59)';
            deleteButton.style.color = 'rgb(59, 59, 59)';
            previousStored = true;
            if (shape === 'line') {
                canvas.removeEventListener('mousemove', drawLine);
            }
            if (shape === 'arrow') {
                canvas.removeEventListener('mousemove', drawArrow);
            }
            if (shape === 'rectangle') {
                canvas.removeEventListener('mousemove', drawRectangle);
            }
            if (shape === 'triangle') {
                canvas.removeEventListener('mousemove', drawTrianlge);
            }
            if (shape === 'circle') {
                canvas.removeEventListener('mousemove', drawCircle);
            }

        }
        canvas.onmouseout = function () {
            drawedLine = false;
            if (!previousStored) {
                storeDataInArray()
            }
            if (shape === 'line') {
                canvas.removeEventListener('mousemove', drawLine);
            }
            if (shape === 'arrow') {
                canvas.removeEventListener('mousemove', drawArrow);
            }
            if (shape === 'rectangle') {
                canvas.removeEventListener('mousemove', drawRectangle);
            }
            if (shape === 'triangle') {
                canvas.removeEventListener('mousemove', drawTrianlge);
            }
            if (shape === 'circle') {
                canvas.removeEventListener('mousemove', drawCircle);
            }

        }
        canvas.onmouseleave = function () {
            drawedLine = false;
            if (!previousStored) {
                storeDataInArray()
            }
            if (shape === 'line') {
                canvas.removeEventListener('mousemove', drawLine);
            }
            if (shape === 'arrow') {
                canvas.removeEventListener('mousemove', drawArrow);
            }
            if (shape === 'rectangle') {
                canvas.removeEventListener('mousemove', drawRectangle);
            }
            if (shape === 'triangle') {
                canvas.removeEventListener('mousemove', drawTrianlge);
            }
            if (shape === 'circle') {
                canvas.removeEventListener('mousemove', drawCircle)
            }
        }
    }
    if (shape === 'line') {
        getImageData()
        drawedLine = true;
        canvas.addEventListener('mousemove', drawLine);

        function drawLine(lineLen) {
            if (shape === 'line' && drawedLine) {
                putImageData()
                var xe = lineLen.offsetX; // xe = x end;
                var ye = lineLen.offsetY; // ye = y end;
                var x = fe.offsetX;
                var y = fe.offsetY;
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(xe, ye);
                context.strokeStyle = selectedColor;
                context.lineCap = 'round';
                context.lineWidth = selectedRange;
                context.stroke();
                context.closePath();
                storeDataAndEndDrawFunction()
            };
        }; // MOUSE UP FUNCTION...........................******   
    }; // STATEMENT END;;;;;;;

    /******************************** ARROW FUNCTIN IS START FROM HERE ********************************/
    if (shape == 'arrow') {
        getImageData()
        canvas.addEventListener('mousemove', drawArrow);
        function drawArrow(se) {
            if (shape === 'arrow') {
                putImageData();
                var ctx = context,
                    fx = fe.offsetX,
                    fy = fe.offsetY;
                context.beginPath();
                ctx.moveTo(fx, fy);
                ctx.lineWidth = selectedRange
                undo.style.cursor = 'pointer';
                undo_i.style.color = 'rgb(59, 59, 59)';
                deleteButton.style.color = 'rgb(59, 59, 59)';
                var tx = se.offsetX,
                    ty = se.offsetY;
                var angle = Math.atan2(ty - fy, tx - fx);
                ctx.lineTo(tx, ty);
                var w = 20; //width of arrow to one side. 7 pixels wide arrow is pretty
                ctx.strokeStyle = selectedColor;
                ctx.fillStyle = selectedColor;
                angle = angle + Math.PI / 2;
                tx = tx + w * Math.cos(angle);
                ty = ty + w * Math.sin(angle);
                ctx.lineTo(tx, ty);
                //Drawing an isosceles triangle of sides proportional to 2:7:2
                angle = angle - 1.849096;
                tx = tx + w * 3.5 * Math.cos(angle);
                ty = ty + w * 3.5 * Math.sin(angle);
                ctx.lineTo(tx, ty);
                angle = angle - 2.584993;
                tx = tx + w * 3.5 * Math.cos(angle);
                ty = ty + w * 3.5 * Math.sin(angle);
                ctx.lineTo(tx, ty);
                angle = angle - 1.849096;
                tx = tx + w * Math.cos(angle);
                ty = ty + w * Math.sin(angle);
                ctx.lineTo(tx, ty);
                ctx.stroke();
                ctx.fill();

                storeDataAndEndDrawFunction();
            };
        };
    }; // ARROW STATEMENT END....................................******
    /******************************** ARROW FUNCTIN IS START FROM HERE ********************************/

    /*************************** RECTANGLE FUNCTION IS START FROM  ***************************/
    if (shape === 'rectangle') {
        canvas.addEventListener('mousemove', drawRectangle);
        getImageData();

        function drawRectangle(e) {
            putImageData();
            var fx = fe.offsetX;
            var fy = fe.offsetY;
            var tx = e.offsetX;
            var ty = e.offsetY;
            var x, y;
            if (fx > tx) {
                x = tx
            } else {
                x = fx
            };
            if (fy > ty) {
                y = ty
            } else {
                y = fy
            };
            context.beginPath();
            context.strokeRect(Math.abs(x), Math.abs(y), Math.abs(fx - tx), Math.abs(fy - ty));
            context.strokeStyle = selectedColor;
            context.lineWidth = selectedRange;
            context.stroke();
            context.closePath();
            storeDataAndEndDrawFunction();

        }

    }
    /*************************** RECTANGLE FUNCTION IS END ***************************/
    /*************************** CIRCLE FUNCTION IS START ***************************/
    if (shape === 'circle') {
        canvas.addEventListener('mousemove', drawCircle);
        getImageData();

        function drawCircle(e) {
            putImageData();
            var bx = fe.offsetX;
            var by = fe.offsetY;
            var x = e.offsetX;
            var y = e.offsetY;
            var circleSize = (bx + by) - (x + y);
            context.beginPath();
            context.arc(bx, by, Math.abs(circleSize), 0, Math.PI * 2);
            context.strokeStyle = selectedColor;
            context.lineWidth = selectedRange;
            context.stroke();
            context.closePath();
            storeDataAndEndDrawFunction()
        }
    }
    /*************************** CIRCLE FUNCTION IS END ***************************/
    /***************************  TRIANGLE FUNCTION IS START ***************************/
    if (shape === 'triangle') {
        canvas.addEventListener('mousemove', drawTrianlge);
        getImageData()

        function drawTrianlge(e) {
            putImageData()
            var bx = fe.offsetX;
            var by = fe.offsetY;
            var x = e.offsetX;
            var y = e.offsetY;
            var takeLineLen = Math.abs((bx + by) - (x + y));
            context.beginPath();
            context.lineWidth = selectedRange;
            context.strokeStyle = selectedColor;
            context.moveTo(bx, y);
            context.lineTo(x, y);
            context.lineTo(x, by);
            context.closePath();
            context.stroke();
            storeDataAndEndDrawFunction();
        }
    }
    /*************************** TRIANGLE FUNCTION IS END ***************************/
}; // MOUSE DOWN EVENT END....................................******
// STATEMENT END..............................................******

/*************************** CROP FUNCTION START FROM HERE *************************/
var drawCrop = true;
var toolName = '';

function toolsFunction(toolNames) {
    toolName = toolNames
    shape = '';
    canvas.addEventListener('mousedown', cropStart);
    var tx, ty, fx, fy;

    function cropStart(fe) {
        if (toolName == 'crop') {
            tx = 0;
            ty = 0;
            fx = 0;
            fy = 0;
            if (drawCrop && shape !== 'line' && shape !== 'arrow' && shape !== 'circle' && shape !== 'triangle' && shape !== 'rectangle') {
                drawCrop = true;
                window.addEventListener('mouseup', cropEnd);
                canvas.addEventListener('mousemove', takeSizeForCrop);
                getImageData();

                function takeSizeForCrop(e) {
                    putImageData();
                    fx = fe.offsetX;
                    fy = fe.offsetY;
                    tx = e.offsetX;
                    ty = e.offsetY;
                    var x, y;
                    if (fx > tx) {
                        x = tx
                    } else {
                        x = fx
                    };
                    if (fy > ty) {
                        y = ty
                    } else {
                        y = fy
                    };
                    context.beginPath();
                    context.lineWidth = 2;
                    context.strokeRect(Math.abs(x), Math.abs(y), Math.abs(fx - tx), Math.abs(fy - ty));
                    context.strokeStyle = '#' + Math.floor(Math.random() * 19777215).toString(16);
                    context.stroke();
                    context.closePath();
                    // ALLOW CROP FUNCTION............................****
                    document.querySelector('.yes').onclick = function () {
                        putImageData()
                        context.beginPath();
                        context.fillStyle = 'white';
                        context.fillRect(0, 0, canvas.width, fy);
                        context.fillRect(0, 0, fx, canvas.height);
                        context.fillRect(0, ty, canvas.width, canvas.height);
                        context.fillRect(tx, 0, canvas.width, canvas.height);
                        document.querySelector('.permision-button').style.marginLeft = '-300px';
                        document.body.style.overflowX = 'auto';
                        document.body.style.overflowY = 'auto';
                        window.removeEventListener('mouseup', cropEnd);
                        drawCrop = true;
                        tx = 0;
                        ty = 0;
                        fx = 0;
                        fy = 0;
                    };
                    // CANCEL CROPING FUNCTION..........................****
                    document.querySelector('.no').onclick = function () {
                        document.querySelector('.permision-button').style.marginLeft = '-300px';
                        document.body.style.overflowX = 'auto';
                        document.body.style.overflowY = 'auto';
                        window.removeEventListener('mouseup', cropEnd);
                        drawCrop = true;
                        putImageData();
                        tx = 0;
                        ty = 0;
                        fx = 0;
                        fy = 0;
                    };

                }; // MOVE FUNCTION END;
                function cropEnd(e) {
                    if (Math.abs((tx + ty) - (fx + fy)) > 0 || Math.abs((fx + fy) - (tx + ty)) > 0) {
                        document.querySelector('.permision-button').style.marginLeft = '0px';
                        document.body.style.overflowX = 'hidden';
                        document.body.style.overflowY = 'hidden';
                        drawCrop = false;
                        window.removeEventListener('mouseup', cropEnd)
                        canvas.removeEventListener('mousemove', takeSizeForCrop);
                    };
                    canvas.removeEventListener('mousemove', takeSizeForCrop);
                    window.removeEventListener('mouseup', cropEnd)
                    document.querySelector('.crop i').style.color = 'rgb(59, 59, 59)';
                    document.querySelector('.crop i').style.cursor = 'pointer';
                };

            } else {
                document.querySelector('.crop i').style.color = 'gray';
                document.querySelector('.crop i').style.cursor = 'not-allowed';
            };
        } else {
            canvas.removeEventListener('mousedown', cropStart);
        }
    };
    /**********************BLUR FUNCTION *********************/
    shape = '';
    canvas.addEventListener('mousedown', startBlur);

    function startBlur(fe) {
        if (toolName == 'blur') {
            canvas.addEventListener('mousemove', blur);
            getImageData();

            function blur(e) {
                if (drawCrop && shape !== 'line' && shape !== 'arrow' && shape !== 'circle' && shape !== 'triangle' && shape !== 'rectangle') {
                    putImageData();
                    var fx = fe.offsetX;
                    var fy = fe.offsetY;
                    var tx = e.offsetX;
                    var ty = e.offsetY;
                    var x, y;
                    if (fx > tx) {
                        x = tx
                    } else {
                        x = fx
                    };
                    if (fy > ty) {
                        y = ty
                    } else {
                        y = fy
                    };

                    context.beginPath();
                    context.filter = 'blur(10px)';
                    context.fillStyle = 'rgba(68, 68, 68, 0.541)';
                    context.fillRect(Math.abs(x), Math.abs(y), Math.abs(fx - tx), Math.abs(fy - ty));
                    context.fill();
                    context.closePath();

                };
            };
            canvas.addEventListener('mouseup', blurEnd);

            function blurEnd(e) {
                undo.style.cursor = 'pointer';
                undo_i.style.color = 'rgb(59, 59, 59)';
                deleteButton.style.color = 'rgb(59, 59, 59)';
                storeData.push(context.getImageData(0, 0, canvas.width, canvas.height));
                index = storeData.length - 1;
                canvas.removeEventListener('mousemove', blur);
                canvas.removeEventListener('mouseup', blurEnd);
            };
        } else {
            canvas.removeEventListener('mousedown', startBlur);
        }
    };
    /************************************* ROLLER FUNCTION *****************************/
    shape = '';
    canvas.addEventListener('mousedown', startDraw);

    function startDraw(fe) {
        if (drawCrop && shape !== 'line' && shape !== 'arrow' && shape !== 'circle' && shape !== 'triangle' && shape !== 'rectangle') {
            if (toolName == 'pen') {

                var x = fe.offsetX;
                var y = fe.offsetY;
                canvas.addEventListener('mousemove', startDrawingLine);
                function startDrawingLine(e) {
                    draw(e.offsetX, e.offsetY);
                }
                function draw(x2, y2) {

                    drawLine(x, y, x2, y2);
                    x = x2;
                    y = y2;

                }
                function drawLine(x, y, x2, y2) {

                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineCap = 'round';
                    context.lineJoin = 'round';
                    context.lineWidth = selectedRange;
                    context.strokeStyle = selectedColor;
                    context.lineTo(x2, y2);
                    context.stroke();
                }
                canvas.addEventListener('mouseup', drawEnd);

                function drawEnd() {
                    storeData.push(context.getImageData(0, 0, canvas.width, canvas.height));
                    index = storeData.length - 1;
                    canvas.removeEventListener('mousemove', startDrawingLine);
                    canvas.removeEventListener('mouseup', drawEnd);
                }
            } else {
                canvas.removeEventListener('mousedown', startDraw);
            }
            window.addEventListener('mouseup', endDrawingFromWindow);

            function endDrawingFromWindow(e) {
                canvas.removeEventListener('mousemove', startDrawingLine);
                window.removeEventListener('mouseup', endDrawingFromWindow);
            };
        };
    };
    /*************************** ADD TEXT *************************/

    if (toolName == 'text') {
        textBox.style.display = 'block';
        document.querySelector('.add-text').style.color = 'rgb(0, 195, 255)';
        document.querySelector('.add-text').style.cursor = 'pointer';
    } else {

        // textBox.style.left = 6+'%';
        // textBox.style.top = 12+'%';
        document.querySelector('.add-text').style.color = 'gray';
        document.querySelector('.add-text').style.cursor = 'not-allowed';
    };
    canvas.addEventListener('mousedown', writeText);

    function writeText(f) {
        if (toolName == 'text') {
            document.querySelector('.add-text').style.display = 'block';            
            window.addEventListener('mousemove', moveTextBox);
            function moveTextBox(t) {

                if (toolName == 'text') {

                    var box = textBox.getBoundingClientRect();
                    canvas.style.cursor = 'move';
                    var x = t.clientX;
                    var y = t.clientY;
                    textBox.style.left =  x - box.width / 2 + 'px';
                    textBox.style.top =   y - box.height - 30 + 'px';
                }
            }
            window.addEventListener('mouseup', textMoveEnd);

            function textMoveEnd() {
                textBox.style.cursor = 'text';
                canvas.style.cursor = 'initial';
                window.removeEventListener('mousemove', moveTextBox);
                window.removeEventListener('mouseup', textMoveEnd);
            };
        } else {
            canvas.removeEventListener('mousedown', writeText);
        };
    };
    document.querySelector('.add-text').addEventListener('click', addText);

    function addText() {
        if (toolName == 'text') {

            var box = textBox.getBoundingClientRect();
            var canvasP = canvas.getBoundingClientRect();
            textX = parseInt(box.left - 4 - canvasP.left);
            textY = parseInt(box.top - 4 - canvasP.top);
            textBox.style.display = 'none';
            document.querySelector('.add-text').style.display = 'none';    
            document.querySelector('.add-text').style.color = 'gray';
            document.querySelector('.add-text').style.cursor = 'not-allowed';
            var txt = (textBox.value).split('\n');
            context.beginPath();
            for (var i = 0; i < txt.length; i++) {
                context.font = (selectedRange) + 'px sans-serif ';
                context.fillStyle = selectedColor;
                context.fillText(txt[i], textX + 5, textY += (selectedRange > 20) ? 30 : 20);
                context.fill();
                undo.style.cursor = 'pointer';
                undo_i.style.color = 'rgb(59, 59, 59)';
                deleteButton.style.color = 'rgb(59, 59, 59)';
                document.querySelector('.add-text').removeEventListener('click', addText);
            };
            context.closePath();
            window.addEventListener('mouseup', endText);

            function endText() {
                storeData.push(context.getImageData(0, 0, canvas.width, canvas.height));
                index = storeData.length - 1;            
                window.removeEventListener('mouseup', endText);
 
            }
        } else {
            document.querySelector('.add-text').removeEventListener('click', addText);
        }
    };

// HIGHTLIGHT FUNCTION START FROM HERE;
    canvas.addEventListener('mousedown', startLight);
    function startLight(fe) {
        if (toolName == 'highlighter') {
            canvas.addEventListener('mousemove', lighter);
            getImageData();
            function lighter(e) {
                if (drawCrop && shape !== 'line' && shape !== 'arrow' && shape !== 'circle' && shape !== 'triangle' && shape !== 'rectangle') {
                    putImageData();
                    var fx = fe.offsetX;
                    var fy = fe.offsetY;
                    var tx = e.offsetX;
                    var ty = e.offsetY;
                    var x, y;
                    if (fx > tx) {
                        x = tx
                    } else {
                        x = fx
                    };
                    if (fy > ty) {
                        y = ty
                    } else {
                        y = fy
                    };
                    context.beginPath();
                    context.filter = 'blur(0px)';
                    context.fillStyle = 'rgba(255, 217, 0, 0.577)';
                    context.fillRect(Math.abs(x), Math.abs(y), Math.abs(fx - tx), Math.abs(fy - ty));
                    context.fill();
                    context.closePath();

                };
            };
            canvas.addEventListener('mouseup', lightEnd);

            function lightEnd(e) {
                undo.style.cursor = 'pointer';
                undo_i.style.color = 'rgb(59, 59, 59)';
                deleteButton.style.color = 'rgb(59, 59, 59)';
                storeData.push(context.getImageData(0, 0, canvas.width, canvas.height));
                index = storeData.length - 1;
                canvas.removeEventListener('mousemove', lighter);
                canvas.removeEventListener('mouseup', lightEnd);
            };
        } else {
            canvas.removeEventListener('mousedown', startLight);
        }
    };
    






};



















/*********************************** ROTATE IMAGE ************************************/

// function drawImage(ctx, img, x, y, angle = 0, scale = 1) {

//     ctx.save();
//     ctx.translate(x + img.width * scale / 2, y + img.height * scale / 2);
//     ctx.rotate(angle);
//     ctx.translate(-x - img.width * scale / 2, -y - img.height * scale / 2);
//     ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//     ctx.restore();

// }

/******************************** DOWNLOAD IMAGE FUNCTION *****************************/
download.onclick = function (e) {
    this.setAttribute('download', 'image.png');
    this.setAttribute('href', canvas.toDataURL());
}
/****************DELETE FUNCTION *******************/
var deleteButton = document.querySelector('.delete');
deleteButton.onclick = function () {
    this.style.color = 'gray';
    this.style.cursor = 'not-allowed';
    undo_i.style.color = 'gray';
    undo.style.cursor = 'not-allowed'
    redo.style.cursor = 'not-allowed';
    redo_i.style.color = 'gray';
    context.clearRect(0, 0, canvas.width, canvas.height);
    storeData = [];
    index = -1;
}
deleteButton.style.color = 'gray';
deleteButton.style.cursor = 'not-allowed';
/****************DELETE FUNCTION END *******************/

/****************UONDO REDO FUNCTION *******************/
var redoArray = [];
var redoIndex = -1;
undo.onclick = function () {

    if (index === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        if (storeData[0] != null || storeData[0] != undefined || storeData[0] !== 0) {
            undo_i.style.color = 'gray';
            this.style.cursor = 'not-allowed'
            redo.style.cursor = 'pointer';
            redo_i.style.color = 'rgb(59, 59, 59)'
            index = -1;
            var removed = storeData.pop();
            redoArray.push(removed);
            redoIndex = redoArray.length;
        }
    } else {
        if (index > 0) {

            if (storeData[0] != null || storeData[0] != undefined || storeData[0] !== 0) {
                redo.style.cursor = 'pointer';
                redo_i.style.color = 'rgb(59, 59, 59)'
                index -= 1;
                var removed = storeData.pop();
                context.putImageData(storeData[index], 0, 0);
                redoArray.push(removed);
                redoIndex = redoArray.length;

            }
        }
    }
}
redo.onclick = function () {

    if (redoIndex !== 0) {
        if (redoIndex >= 0) {
            if (redoArray[0] != null || storeData[0] != undefined || storeData[0] !== 0) {
                this.style.cursor = 'pointer'
                redo_i.style.color = 'rgb(59, 59, 59)'
                undo.style.cursor = 'pointer';
                undo_i.style.color = 'rgb(59, 59, 59)'
                index += 1;
                redoIndex -= 1;
                var movedArray = redoArray[redoIndex]
                redoArray.pop();
                storeData.push(movedArray);
                context.putImageData(movedArray, 0, 0)
            }
        } else {
            redo_i.style.color = 'gray'
            undo.style.cursor = 'not-allowed';
            undo_i.style.color = 'gray'
        }
        redo_i.style.color = 'gray'
    } else {
        redo.style.cursor = 'not-allowed'
    }

}
/****************UONDO REDO FUNCTION *******************/
function printCanvas() {
    var dataUrl = canvas.toDataURL(); //attempt to save base64 string to server using this var  
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>' + title + '</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('', '', 'width=1197,height=793');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
}
/**********************************PRINT FUNCTION END*****************************/
// COPY LINK;;;;;;;;;;;;;
copyButton.onclick = function () {
    copyableText.select();
    copyableText.setSelectionRange(0, 99999999);
    document.execCommand('copy');
    this.innerHTML = 'Copied!'
    setTimeout(() => {
        document.querySelector('.share-section').style.visibility = 'hidden';
        document.body.style.overflowY = 'auto';
    }, 100)
}
document.querySelector('.share-button').onclick = function () {
    document.body.style.overflowY = 'hidden';
    document.querySelector('.share-section').style.visibility = 'visible';
}



