/**
 * Created by Ivan on 18/09/2017.
 */
$(document).ready(function(){

    var fileLocation;

    $("#selectFile").click(function(){

        async.series(

            [

                function(callback){

                    fileLocation = dialog.showOpenDialog({

                        properties: ['openFile'],
                        title: "Seleccione archivo a importar",
                        buttonLabel: "Importar",
                        filters: [
                            {name: "json", extensions: ['json']}
                        ]
                    });

                    callback();
                },

                function(callback){

                    if(typeof(fileLocation) === "undefined"){

                        dialog.showMessageBox({
                            type: "error",
                            message: "No se seleccionó ningún archivo, intente nuevamente."

                        });
                    }else {
                        //console.log(fileLocation)
                        readJson(fileLocation[0]);
                    }

                    callback();
                }


            ]

        );
    });


    function readJson(location){

        var jsonfile = require('jsonfile');
        var readedObject;

        try{

            readedObject = jsonfile.readFileSync(location);

            openEditor(readedObject);

        }catch(err){
            
            console.dir(err)
/*
            dialog.showMessageBox({
                type: "error",
                message: "El archivo que trata de importar no tiene el formato correcto."

            });*/
        }

    }


    function openEditor(data) {


        const remote = require('electron').remote;
        const path = require('path')
        const BrowserWindow = remote.BrowserWindow;
        const url = require('url')


        var mainWindow = remote.getCurrentWindow()
        
        //mainWindow.hide();

        var editorWindow = new BrowserWindow({parent: mainWindow})

        editorWindow.webContents.on('did-finish-load', function(){
            editorWindow.webContents.send('sendedData', data)
        });

        editorWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'editor.html'),
            protocol: 'file:',
            slashes: true
        }));


    }

});