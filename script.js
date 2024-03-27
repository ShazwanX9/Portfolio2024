window.onload = function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === "1") {
            scrollToSection(0);
        }
        if (event.key === "2") {
            scrollToSection(1);
        }
        if (event.key === "3") {
            scrollToSection(2);
        }
        if (event.key === "4") {
            scrollToSection(3);
        }
    });
};

function scrollToSection(sectionIndex) {
    // const windowHeight = window.innerHeight;
    // const currentScroll = window.scrollY;
    // const nextScroll = Math.ceil((currentScroll + 1) / windowHeight) * windowHeight;

    var scrollPosition = window.scrollY || window.pageYOffset;
    const nextScroll = sectionIndex * window.innerHeight;
    var scrollTo = (nextScroll - scrollPosition < 1 && nextScroll - scrollPosition >= -1) ? 0 : nextScroll
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        toDoEverytime();
    });
    window.addEventListener('resize', function () {
        toDoEverytime();
    });
    window.addEventListener('scroll', function () {
        // Get current scroll position
        var scrollPosition = window.scrollY || window.pageYOffset;
        var pageNum = Math.round(scrollPosition / window.innerHeight);

        var kivy = document.getElementById('kivy-icon')
        var blender = document.getElementById('blender-icon')
        var drawing = document.getElementById('drawing-icon')

        kivy.src = "./asset/icon/kivy.svg";
        blender.src = "./asset/icon/blender.svg";
        drawing.src = "./asset/icon/drawing.svg";

        switch (pageNum) {
            case 1:
                kivy.src = "./asset/icon/home.svg";
                break;
            case 2:
                blender.src = "./asset/icon/home.svg";
                break;
            case 3:
                drawing.src = "./asset/icon/home.svg";
                break;
        }
    });

    setupImagesSelection();
    setupGallery();
});

function toDoEverytime() {
    toggleContent();
    animateSkew();
    setupDefaultTextsize();
}

function setupImagesSelection() {
    const kivyImages = document.querySelectorAll('#kivy-image-list img');
    var kivyVideo = document.getElementById('kivy-video');
    kivyImages.forEach(image => {imageTriggerVideo(kivyVideo, image, kivyImages)});

    const blenderImages = document.querySelectorAll('#blender-image-list img');
    var blenderVideo = document.getElementById('blender-video');
    blenderImages.forEach(image => {imageTriggerVideo(blenderVideo, image, blenderImages)});

    kivyVideo.pause();
    blenderVideo.pause();
}

function setupGallery() {
    document.getElementById('gallery1').style.setProperty('--s', '100px');
    document.getElementById('gallery2').style.setProperty('--s', '150px');
}

// Function to toggle content based on window size
function toggleContent() {
    var contents = document.querySelectorAll('.mobile-content');

    contents.forEach(function (content) {
        if (window.innerHeight > window.innerWidth) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });

    var content = document.querySelector('.desktop-content');
    if (window.innerHeight <= window.innerWidth) {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}

function animateSkew() {
    var windowWidth = window.innerWidth;
    var skewAngle = Math.max(-75 * (windowWidth / 1000), -75);
    var parallelogram = document.querySelector('.parallelogram');
    parallelogram.style.transform = 'skewX(' + skewAngle + 'deg)';
}

function setupDefaultTextsize() {
    document.documentElement.style.fontSize = (window.innerHeight > window.innerWidth) ? "32px" : "16px";
}

function redirectTo(link) {
    // window.location.href = link;
    window.open(link, "_blank");
}

function whenImageClick(img) {
    if (img.classList.contains('selected-image')) {
        img.style.border = '2px solid #F5F5DC'; // Change border color as desired
    }
    else {
        img.style.border = "none";
    }
}

function imageTriggerVideo(video, image, imagelist) {
    image.addEventListener('click', function (event) {
        imagelist.forEach(img => img.classList.remove('selected-image'));
        event.target.classList.add('selected-image');
        imagelist.forEach(img => whenImageClick(img));

        if (event.target.tagName === 'IMG') {
            const videoSrc = event.target.getAttribute('data-video');
            video.src = videoSrc;
            video.play();
        }
    });
}