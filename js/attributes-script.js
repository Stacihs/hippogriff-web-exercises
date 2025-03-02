(function() {
 "use strict";

// VARIABLES
    const profilePic = document.querySelector('#profile-pic');
    const profileName = document.querySelector('#profile-name');
    const profileDesc = document.querySelector('#profile-desc');
    const profileCard = document.querySelector('#profile-card');

    const colorsArr = ["pink", "red", "orange", "yellow", "gray"];

    const picDelay = 2000;
    const nameDelay = 4000;
    const descDelay = 6000;
    const cardDelay = 2000;
    const nameChange = 7000;


//FUNCTIONS
    function cardDOMManipulation() {
        const intervalPicId = setTimeout(changeProfilePic, picDelay);
        const intervalNameId = setTimeout(changeProfileName, nameDelay);
        const timeOutID = setTimeout(changeDescription, descDelay);
        const intervalCardId = setInterval(randomBackgroundColors, cardDelay);
        setTimeout(userChangeName, nameChange);
    }

    function changeProfilePic() {
        profilePic.src = "https://images.pexels.com/photos/4668513/pexels-photo-4668513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    }

    function changeProfileName() {
        profileName.innerHTML = "Jane Doe";
    }

    function changeDescription() {
        profileDesc.classList.add('desc-style');
    }

    function changeCardBackground() {
        profileCard.classList.toggle('card-background');
    }

// BONUS
    function randomBackgroundColors() {
        profileCard.style.backgroundColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
    }

    function userChangeName() {
        profileName.innerHTML = prompt("Enter first and last name");
    }

    cardDOMManipulation();

})();