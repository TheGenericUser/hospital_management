let currentPage = 1;
let isLoading = false;
let isSearchInitiated = false;

const pageName = (window.location.pathname).split('/')[2].slice(0, -1);

const throttledScrollHandler = throttle(handleScroll, 300);
window.addEventListener('scroll', throttledScrollHandler);

//search
document.getElementById(`${pageName}-search-form`).addEventListener('submit', function (e) {
    e.preventDefault();

    currentPage = 1;
    document.getElementById('getData').innerHTML = '';
    isSearchInitiated = true;

    showLoadingSpinner(true);

    searchAndDisplayData(this, currentPage)
});

async function searchAndDisplayData(form, page) {
    try {

        const formData = new FormData(form);
        const searchParams = new URLSearchParams();
    
        searchParams.append('page', page);
    
        formData.forEach((value, key) => {
            if (value) searchParams.append(key, value);
        });

        const response = await fetch(`/api/search${pageName}s?` + searchParams.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.text();

        const getDataElement = document.getElementById('getData');

        if (getDataElement.innerHTML.trim()) {
            const table = document.getElementById('myTable');
            table.innerHTML += data;
        } else {
            getDataElement.innerHTML = data;
        }

        if (data.trim().length === 0) {
            if(currentPage === 1){
                document.getElementById('getData').innerHTML = 'No data found';
            }
            window.removeEventListener('scroll', throttledScrollHandler);
        }
        isLoading = false;

    } catch (error) {
        console.error('Error:', error);
    } finally {
        showLoadingSpinner(false);
    }
}


function handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;

    if (scrollPosition >= bottomPosition - 200 && !isLoading && isSearchInitiated) {
        isLoading = true;
        currentPage++;

        searchAndDisplayData(document.getElementById(`${pageName}-search-form`), currentPage);
    }
}


function showLoadingSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    if (show) {
        spinner.style.display = 'block';
    } else {
        spinner.style.display = 'none';
    }
}

function throttle(func, delay) {
    let lastCall = 0;
    return function () {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, arguments);
        }
    };
}