/* Confirms that user wishes to delete selected order*/
$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this order?');
});

/* Removes default selection from drop down lists */
$(".dropDown").prop("selectedIndex", -1);

/* Validates register passwords */
var validator = $('#registerForm').validate({
    rules: {
        confirm: {
            required: true,
            equalTo: '#password'
        }
    },
    messages: {
        confirm: {
            equalTo: 'Your passwords do not match'
        }
    }
});

/* Search Bar - compare the input sting and the first row of the table (firstName + lastName)  */
$("#search").on("keyup", function() {
    var value = $(this).val().toUpperCase();

    $("table tr").each(function(index) {
        if (index !== 0) {

            $row = $(this);
            var id = $row.find("td:first").text().toUpperCase();

            if (id.indexOf(value) !== 0) {
                $row.hide();
            }
            else {
                $row.show();
            }
        }
    });
});