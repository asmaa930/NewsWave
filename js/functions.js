//! _________________________________________________
async function getData(category = 'business', search = '', page = 1) {
    // let date = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let formattedDate = date.toISOString().split('T')[0];

    let parameters = new URLSearchParams({
        category: category,
        q: search,
        page: page,
        pageSize: NEWS_NUMBER,
        from: formattedDate,
        sortBy: 'publishedAt',

        // apiKey: 'f8ade926474c4e0bac0da3d3eefd885d',
    });

    openPopup('load-news');

    let response;

    try {
        response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`, {
            headers: {
                'X-Api-Key': 'f8ade926474c4e0bac0da3d3eefd885d'
            }
        });
        
    }
    catch (error) {
        openPopup('fail-request');
        return;
    }

    if (!response.ok) {
        openPopup('lock-page');
        return;
    }

    let data = await response.json();

    showData(data, page);

    setTimeout(function () {
        closePopup('load-news');
    }, 500);

}

//! _________________________________________________

function openPopup(popupName) {

    if (popupName == 'load-news') {
        $('body').css('overflow-y', 'hidden');
    }

    $(`.popup[popup-name="${popupName}"]`).fadeIn(200);
}

//! _________________________________________________

function closePopup(popupName) {

    $(`.popup[popup-name="${popupName}"]`).fadeOut(200, function () {
        if (popupName == 'load-news') {
            $('body').css('overflow-y', 'auto');
        }
    });

}

//! _________________________________________________

function preparePagination(currentPage, totalPages) {
    let lis = `<li class="page-item ${(currentPage == 1) ? 'disabled' : ''}"><a class="page-link" onclick="paginate(${(currentPage > 1) ? (currentPage - 1) : 1})">Previous</a></li>`;

    for (let i = 1; i <= totalPages; i++) {
        lis += `<li class="page-item ${(currentPage == i) ? 'active' : ''}" data-page="${i}"><a class="page-link rounded-circle m-0 p-0" onclick="paginate(${i})">${i}</a></li>`;
    }

    lis += `<li class="page-item ${(currentPage == totalPages) ? 'disabled' : ''}"><a class="page-link" onclick="paginate(${(currentPage < totalPages) ? (currentPage + 1) : totalPages})">Next</a></li>`;

    return lis;
}

//! _________________________________________________

function showData(data, currentPage) {
    let numOfPages = Math.ceil(data.totalResults / NEWS_NUMBER),
        news = data.articles,
        $dataContainer = $('#Data .row');

    $dataContainer.html('');

    if (news.length) {

        for (let item of news) {
            $dataContainer.append(cardComponent(item));
        }

        $('nav .pagination').html(preparePagination(currentPage, numOfPages));

        prevPageNumber = $('.page-item.active')[0].dataset.page;
        prevCategory = $('#Category').val();
        prevSearch = $('#Search').val();


    } else {
        $dataContainer.html(`
            <div class="no-news-found text-center">
                <img src="images/no-news.jpg" class="img-fluid mb-4" alt="No News">
                <h6>No News Found! Please try a different search.</h6>
            </div>
        `);

        $('nav .pagination').html('');
    }

}

//! _________________________________________________

function cardComponent(item) {

    return `
            <div class="s-card col-md-6 col-lg-4">
                <div class="item h-100 rounded-4 text-light">
                    <div class="image">
                        <img src="${item.urlToImage ?? 'images/default.png'}" onerror="this.src='images/default.png'" class="rounded-top img-fluid" alt="...">
                    </div>
                    <div class="caption p-3 p-lg-4">
                        <div class="details mb-4">
                            <h5 class="mb-3">${item.title?.slice(0, 20) ?? "No title available"}...</h5>
                            <p>${item.description?.slice(0, 90) ?? "Read the full article to learn more"}...</p>
                        </div>
                        <div class="link text-center">
                            <a href=${item.url} target="_blank" class="btn w-100 rounded-pill">See More</a>
                        </div>
                    </div>
                </div>
            </div>
    `;
}


//! _________________________________________________


function paginate(pageNumber) {
    let category = $('#Category').val(),
        search = $('#Search').val();


    if (pageNumber != prevPageNumber || category != prevCategory || search != prevSearch) {
        getData(category, search, pageNumber);

        prevPageNumber = pageNumber;
        prevCategory = category;
        prevSearch = search;
    }

}