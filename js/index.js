let prevPageNumber,
    prevCategory,
    prevSearch;

const NEWS_NUMBER = 9;

getData();

$('form').submit(function (e) {
    e.preventDefault();

    paginate(1);
});
