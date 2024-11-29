function addHoverEffect(selector, enterClass, leaveClass) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.classList.remove(enterClass);
        });

        element.addEventListener('mouseleave', function () {
            this.classList.add(leaveClass);
        });
    });
}

addHoverEffect('.fa-pen', 'fa-bounce', 'fa-bounce');
addHoverEffect('.fa-check', 'fa-beat', 'fa-beat');

const xmarkElements = document.querySelectorAll('.faa-xmark');
xmarkElements.forEach(element => {
    element.addEventListener('mouseleave', function () {
        this.classList.remove('fa-shake');
    });

    element.addEventListener('mouseenter', function () {
        this.classList.add('fa-shake');
    });
});

const faceLaughElements = document.querySelectorAll('.fa-face-laugh');

faceLaughElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.classList.remove('fa-spin');
        this.classList.add('fast-spin');
    });

    element.addEventListener('mouseleave', function () {
        this.classList.add('fa-spin');
        this.classList.remove('fast-spin');
    });
});
