<!DOCTYPE html>
<html lang="en">

<head>
    <!-- This application is made by Rimon on 2021/05/27 -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Screenshot</title>
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="assets/favicon.png" type="image/x-icon">
    <script src="https://kit.fontawesome.com/80dddeb10f.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body>
    <header class="header">
        <div class="logo">
           <a href="http://localhost/Editor/index"> <img id='logo' src="assets/logo.png" alt=""></a>
        </div>
        <div class="header-buttons">
            <a href=""><button class="new-note">New Note</button></a>
            <input type="file" style="display: none;" name="file" id="file">
            <button class="new-screenshot">New Screenshot</button>
            <a target='_blank' href="https://notepadlite.com/login/"><button class="login">Login</button></a>
            <a target='_blank' href="https://notepadlite.com/sign-up/"><button class="register">Register</button></a>
        </div>
    </header>
    <section class="canvas-section">
        <div class="title-div">
            Title <input class='title' type="text">
            <button class="save-button"><i class="fas fa-save"></i> Save</button>
            <button class="share-button"><i class="fas fa-share"></i> Share</button>
        </div>
        <!-- Canvas area with tools -->
        <div class="canvas-area">
            <!-- Tools div start -->
            <div class="tools">
                <select style="cursor:context-menu;" class="shapes">
                    <option style="background:black;color:white" value="Shapes"> Shapes</option>
                    <option value="line">Line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp; &#xf7a5;</option>
                    <option value="arrow">Arrow &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        &#xf360; </option>
                    <option id="rectangle" value="rectangle">Rectangle &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#xf151; </option>
                    <option value="circle"> Circle &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp; &#xf111; </option>
                    <option id="triangle" value="triangle">Triangle &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        &#xf0de;</option>
                </select>
                <button style="cursor: pointer;" onclick="toolsFunction('crop')" class="tools-buttons crop "><i
                        class="fas fa-crop-alt"></i></button>
                <button style="cursor: pointer;" onclick="toolsFunction('blur')" class="tools-buttons blur"><i
                        class="fas fa-burn"></i></button>
                <button style="cursor: pointer;" onclick="toolsFunction('pen')" class="tools-buttons pen "><i
                        class="fas fa-pen"></i></button>
                <button style="cursor: text;" onclick="toolsFunction('text')" class="tools-buttons text "><i
                        class="fas fa-text-height"></i></button>
                <button style="cursor: pointer;" onclick="toolsFunction('highlighter')"  class="tools-buttons highlighter "><i
                        class="fas fa-highlighter"></i></button>
                <!-- <button style="cursor: pointer;" class="tools-buttons rotate "><i class="fas fa-redo-alt"></i></button> -->
                <a id='download-image'> <button style="cursor: pointer;" class="tools-buttons download "><i
                            class="fas fa-download"></i></button> </a>
                <button style='cursor:not-allowed;' class="tools-buttons undo "><i style="color: gray"
                        class="fas fa-undo"></i></button>
                <button style='cursor:not-allowed;' class="tools-buttons redo "><i style="color: gray"
                        class="fas fa-redo"></i></button>
                <button onclick='printCanvas()' class="tools-buttons print "><i class="fas fa-print"></i></button>
                <button class="tools-buttons delete "><i class="far fa-trash-alt"></i></button>
                <a href=""><button class="tools-buttons reset ">RESET</button></a>


                <div class="color-choice-button">
                    <input class='color' type="color">
                    <input class='range' type="range" max='50' min='2' value='10'>
                </div>

            </div>
            <img src='assets/favicon.png' style='display:none' class='i' alt="">
            <div class="canvas">
                <canvas width="952" height="1133" id="canvas">
                    Your browser is not support this function!
                </canvas>
            </div>
        </div>
        <!--TOOLS DIV END-->
        <!-- Tools div end -->

        <div class="permision-button">
            <h3>Crop?</h3>
            <button class="yes">Yes</button>
            <button class="no">No</button>
        </div>

        <div class="text">
            <textarea name="" id="text"></textarea>
            <div class="add-text">
                    <i class="fas fa-check"></i>
                    <!-- If want or not -->
            </div>
        </div>

        <div class="browse-image">
            <label for="file" class="browes-label">Browes...</label>
            <h1>Choose File</h1> 
            <br>
            <p>Select an image</p>
        </div>


    </section>
    <section class='share-section'>
        <div class="share-link">
            <input class='image-link' type="text" value='Please, save first!'>
            <button class='copy-button'>Copy</button>
        </div>
    </section>
</body>
<footer>
    <a target='_blank' href="https://www.fiverr.com/rimon_islam2003?up_rollout=true">
        All rights reserved by Rimon ©2021
    </a>
</footer>
<script type="text/javascript" src="ajax.js"></script>
<script type="text/javascript" src="code.js"></script>

</html>