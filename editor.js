/**
 * Created by Ivan on 20/09/2017.
 */

const remote = require('electron').remote;

var $        = require( 'jquery' );

require( 'jquery' );
require( 'datatables.net-bs4' )();
require( 'datatables.net-responsive-bs4' )();


$(function(){
    
    var table = $('#dataTable').DataTable({
        paging: false,
        searching: false,
        columns: [
            { title: "Nombre" },
            { title: "DNI" }
        ]
    });

    require('electron').ipcRenderer.on('sendedData', function(event, message){
        fillTable(message,table);
    });


});

function fillTable(data, table){

    for(var index in data){

        table.row.add([data[index].PN,data[index].DP]).draw();
    }


}