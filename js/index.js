let prevPageNumber,
    prevCategory,
    prevSearch;

getData();

$('form').submit(function (e) {
    e.preventDefault();

    paginate(1);
});
