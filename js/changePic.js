const camera = document.getElementById("camera");
const modal = document.getElementById("modal");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");
const placeholder = document.getElementById("placeholder");
const modalImg = document.getElementsByClassName("modal-img");
let profileImgSrc;

// set profile pic if it's already saved
const imageUrl = localStorage.getItem('imageUrl');
let url = imageUrl ? `url(${imageUrl})` : 'url("../assets/placeholder.jpg")';
placeholder.style.backgroundImage = url;

// open modal when thee camera is clicked
camera.onclick = () => {
    modal.style.display = 'block';
}

placeholder.onmouseover = (e) => {
    camera.style.opacity = '1';
}

placeholder.onmouseleave = (e) => {
    camera.style.opacity = '0';
}


// close the modal when the user clicks outside it
document.onclick = (e) => {
    if (modal.style.opacity === 1 && (e.target !== modal || e.target.hasParent(modal))) {
        modal.style.display = 'none';
    }
}


for (let i in modalImg) {
    modalImg[i].onclick = (e) => {
        for (let j = 0; j < modalImg.length; j++) {
            modalImg[j].style.border = 'none';
        }

        e.target.style.border = "1px solid #fff";
        const temp = e.target.src.split('/');
        profileImgSrc = '../' + temp[temp.length - 2] + '/' + temp[temp.length - 1];
        localStorage.setItem('imageUrl', profileImgSrc);
    }
}

// close modal when cancel is clicked
cancelBtn.onclick = () => {
    modal.style.display = 'none';
}

confirmBtn.onclick = () => {
    modal.style.display = 'none';
    placeholder.style.backgroundImage = `url(${profileImgSrc})`;
}