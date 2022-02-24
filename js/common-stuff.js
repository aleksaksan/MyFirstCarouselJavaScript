const burger = document.querySelector('.hamburger');
const navPanel = document.querySelector('.navigation-panel');
const header = document.querySelector('header');

function toggleBurger() {
    burger.classList.toggle('is-active');
    navPanel.classList.toggle('is-visible');
}

window.onscroll = function(e) {
    e.stopPropagation();
    if (window.scrollY > 650 - 90) {
        if (!header.classList.contains('altered')) {
            header.classList.add('altered');
        }
    } else {
        header.classList.remove('altered');
    }
    
    console.log('scrolling');
};

function modifyHeaderOnScroll(e) {
    if (window.scrollY > 650 - 90) {
        if (!header.classList.contains('altered')) {
            header.classList.add('altered');
        }
    } else {
        header.classList.remove('altered');
    }
    
    console.log('scrolling');
};

function toggleAccordionItem(accordionElem) {
    collapseActiveItem();
    
    const parentElem = accordionElem.parentElement;
    parentElem.onclick = modifyHeaderOnScroll;
    parentElem.addEventListener('click', modifyHeaderOnScroll);
    parentElem.addEventListener('click', (e) => { console.log(e); });
    parentElem.addEventListener('click', function(e) { console.log(e); });
    parentElem.removeEventListener('click', modifyHeaderOnScroll);
    parentElem.removeEventListener('click', function(e) { console.log(e); });
    const accordionItemBodyElem = parentElem.children[1];

    accordionItemBodyElem.style.height = calculateTextHeight(accordionItemBodyElem, 'invisible-div');
    parentElem.classList.add('active');
}

function collapseActiveItem() {
    const activeAccordionItem = document.querySelector('.accordion-item.active');
    if (activeAccordionItem) {
        activeAccordionItem.classList.remove('active');
        const activeAccordionItemBody = activeAccordionItem.children[1];
        activeAccordionItemBody.style.height = 0;
    }
}

function calculateTextHeight(accordionItemBodyElem, className) {
    const createdDiv = document.createElement('div');
    createdDiv.classList.add(className);
    createdDiv.innerText = accordionItemBodyElem.innerText;
    document.body.appendChild(createdDiv);

    const accordionItemBodyHeight = createdDiv.clientHeight;
    document.body.removeChild(createdDiv);

    return accordionItemBodyHeight;
}

////////////////////////////////////////////////////
var ofset = 0;
var step = 3;
var elementWidth = 300;
const carouselItemsContainer = document.querySelector('.carousel-items-container');
const carouselSwitcher = document.querySelector('.carousel-switcher');
var switcherCounter = 0;

function switchCarouselItemByButton(btn) {
    carouselSwitcher.children[switcherCounter].classList.remove('active');
    
    if (btn.classList.contains('left')) {
        ofset -= elementWidth * step;
        switcherCounter--;
        if (ofset < 0) {
            ofset = (carouselItemsContainer.children.length - step) * elementWidth;
            switcherCounter = carouselItemsContainer.children.length / step;
        }
    }
    else if (btn.classList.contains('right')) {
        ofset += elementWidth * step;
        switcherCounter++;
        if (ofset > (carouselItemsContainer.children.length - step) * elementWidth) {
            ofset = 0;
            switcherCounter = 0;
        }
    }
    carouselSwitcher.children[switcherCounter].classList.add('active');
    carouselItemsContainer.style.left = -ofset + 'px';
}

function switchCarouselItemBySwitcher(switcher) {
    for (var i = 0; i < carouselSwitcher.children.length; i++) {
        if (!switcher.classList.contains('active') && carouselSwitcher.children[i] == switcher) {
            
            carouselSwitcher.children[i].classList.add('active');
            ofset = elementWidth * step * i;
        }
        else {
            carouselSwitcher.children[i].classList.remove('active');
        }
    }
    carouselItemsContainer.style.left = -ofset + 'px';
}
