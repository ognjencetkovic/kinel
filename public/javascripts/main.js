$(document).ready(function() {

    // timepicker init
    $.timepicker.regional['rs'] = {
        timeOnlyTitle: 'Izaberite vrijeme',
        timeText: 'Vrijeme',
        hourText: 'Sati',
        minuteText: 'Minute',
        currentText: 'Trenutno',
        closeText: 'Izaberi',
        timeFormat: 'HH:mm',
        isRTL: false
    };

    $('#numberOfHours').timepicker(
        $.timepicker.regional['rs']
    );


    // table init
    $('.table').DataTable({
        "order": [[0, "asc"]],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Serbian.json"
        }
    });


    // delete confirmation
    $('body').on('click', 'a[data-role="delete"]', function(e){
        e.preventDefault();
        $toDelete = $(this);
        var conf = bootbox.confirm("Are you sure?", function(result){
            if(result == true){
                $.ajax({
                    url: $toDelete.attr("href"),
                    type: "delete"
                }).then(function(response){
                    $toDelete.parents($toDelete.attr("data-delete-parent")).remove();
                });
            }
        });
    });


    // sidebar

    $('#sidebar-open').on('click', function(){
        document.getElementById("main").style.marginLeft = "25%";
        document.getElementById("mySidebar").style.width = "25%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("sidebar-open").style.display = 'none';
    });
    $('#sidebar-close').on('click', function(){
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("sidebar-open").style.display = "inline-block";
    });

});