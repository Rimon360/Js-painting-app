$(document).ready(function () {

    var getFile = $('#file');
    var save = $('.save-button');
    var browseP = $('.browse-image p');
    var browse = $('.browse-image');
    var newScreenshot = $('.new-screenshot');
    var dButton = $('.delete');
    newScreenshot.click(()=>{
        if(browse.css('display') == 'none') {
            browse.css({'display':'block'});
        }else
        {
            browse.css({'display':'none'});            
        }
    })
    getFile.change(function () {
        browseP.html(getFile[0].files[0]['name']);
        var fmData = new FormData();
        var file = getFile[0].files[0];
        fmData.append('file', file);
        $.ajax({
            url: "upload_file.php",
            type: "POST",
            dataType: 'JSON',
            data: fmData,
            processData: false,
            contentType: false,
            success: function (e) {
                var img = document.querySelector('.i');                   
                img.setAttribute('src', 'data/' + e[0]);
                $('.new-screenshot').html('Processing...');   
                function loadImage() {
                    // context.rotate(45 * Math.PI / 180);   
                    context.beginPath();
                    context.drawImage(img, 0, 0, canvas.width, canvas.height)
                    context.closePath();
                    storeData.push(context.getImageData(0, 0, canvas.width, canvas.height));
                    index += 1;
                    $('.new-screenshot').html('New Screenshot');
                    browse.css({'display':'none'})
                    var iname = img.getAttribute('src');
                    dButton.click(()=>{
                        $.post('delete.php',{'iname':iname},
                        function(e){})
                    })
                }
                setTimeout(loadImage, 2000);
            },
            error: function (e) {
                console.log(e);
            }
        });
    });
    /**********************************DOWNLOAD FUNCTION *****************************/
    var saveButton = $('.save-button');
    var imgData = $('.download-image');
    saveButton.click(() => {
        imgData.attr('download', 'downloadImage');
        imgData.attr('href', canvas.toDataURL());
        // console.log((canvas.toDataURL()).split(':'));
    })
    /**********************************DOWNLOAD FUNCTION END*****************************/
    /**********************************SAVE FUNCTION *****************************/
    save.click((e) => {
        var data = canvas.toDataURL('image/jpg');
        $.post('save.php', {
            'img': data
        }, function (e) {
            save.html('Saved!');
            $('.image-link').val((window.location.href).split('index').slice(0, -1) + 'data/' + e.slice(2, -2));
        });
    });
    /**********************************SAVE FUNCTION END*****************************/

});