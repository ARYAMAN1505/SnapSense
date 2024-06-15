Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        
        const url = "/classify"; // Updated URL for Flask endpoint

        $.post(url, {
            image_data: file.dataURL
        }, function(data, status) {
            console.log(data);
            if (!data || data.error || data.length === 0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
                return;
            }

            // Process data as per your requirements
            // Update UI based on classification results
            
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log("ready!");
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});
