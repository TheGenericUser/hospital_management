document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("tableSearch");
    const tableRows = document.querySelectorAll("#myTable tr");

    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();

        tableRows.forEach(function (row) {
            const rowText = Array.from(row.querySelectorAll('td')).map(td => {
                if (td.querySelector('select')) {
                    return td.querySelector('select').options[td.querySelector('select').selectedIndex].text.toLowerCase();
                }
                return td.textContent.toLowerCase();
            }).join(' ');

            row.style.display = rowText.includes(value) ? "" : "none";
        });
    });
});
