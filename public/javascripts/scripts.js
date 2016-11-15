/* Confirms deletion of order */
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