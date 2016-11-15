$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this order?');
});

/* Removes default selection from drop down lists */
$(".dropDown").prop("selectedIndex", -1);