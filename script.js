/* =================================
   CONFIGURATION
================================= */


const weddingDate = new Date(
    "2026-09-11T08:00:00+07:00"
).getTime();

let invitationOpened = false;



/* =================================
   1. OPEN INVITATION
================================= */


function openInvitation(){


    if(invitationOpened) return;


    invitationOpened = true;



    const cover =
    document.getElementById("cover");


    const invitation =
    document.getElementById("invitation");



    const music =
    document.getElementById("music");



    cover.style.opacity="0";



    setTimeout(()=>{


        cover.style.display="none";


        invitation.style.display="flex";


        window.scrollTo(0,0);



        // Play music

        if(music){

            music.play()
            .catch(()=>{});

        }



    },700);



}






/* =================================
   2. GUEST NAME FROM URL
================================= */


function loadGuestName(){


    const params =
    new URLSearchParams(
        window.location.search
    );


    const guest =
    params.get("to");



    if(guest){


        const name =
        decodeURIComponent(guest);



        const guest1 =
        document.getElementById(
            "guest-name"
        );


        const guest2 =
        document.getElementById(
            "guest-left"
        );



        if(guest1){

            guest1.innerText=name;

        }



        if(guest2){

            guest2.innerText=name;

        }


    }


}



loadGuestName();







/* =================================
   3. SCROLL ANIMATION
================================= */


const sections =
document.querySelectorAll(
".phone-wrapper section"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add(
            "show"
        );


    }



});


},
{

threshold:0.2

}

);




sections.forEach(section=>{


    observer.observe(section);


});








/* =================================
   4. COUNTDOWN
================================= */


function updateCountdown(){



const now =
new Date().getTime();



const distance =
weddingDate - now;



if(distance < 0){


    document.getElementById(
        "days"
    ).innerHTML="00";


    document.getElementById(
        "hours"
    ).innerHTML="00";


    document.getElementById(
        "minutes"
    ).innerHTML="00";


    document.getElementById(
        "seconds"
    ).innerHTML="00";


    return;


}




const days =
Math.floor(
distance /
(1000*60*60*24)
);



const hours =
Math.floor(
(distance %
(1000*60*60*24))
/
(1000*60*60)
);



const minutes =
Math.floor(
(distance %
(1000*60*60))
/
(1000*60)
);



const seconds =
Math.floor(
(distance %
(1000*60))
/
1000
);





document.getElementById(
"days"
).innerHTML = days;



document.getElementById(
"hours"
).innerHTML = hours;



document.getElementById(
"minutes"
).innerHTML = minutes;



document.getElementById(
"seconds"
).innerHTML = seconds;



}



setInterval(
updateCountdown,
1000
);


updateCountdown();








/* =================================
   5. WEDDING WISH LOCAL STORAGE
================================= */


const scriptURL =
"https://script.google.com/macros/s/AKfycbxktVr1WHYAg6Uz6FBdw4sWgwRBbUzwaLwEjVoo3UIBUiWcy6CxmgxaPUKj9jjbk4HIgA/exec";



const form =
document.getElementById("wish-form");



form.addEventListener(
"submit",
e=>{


e.preventDefault();



const data={


name:
document.getElementById("name").value,


attendance:
document.getElementById("attendance").value,


message:
document.getElementById("message").value


};



fetch(
scriptURL,
{


method:"POST",


body:
JSON.stringify(data)


}

)



.then(()=>{


alert(
"Terima kasih atas ucapan Anda 🤍"
);



form.reset();


loadWish();


});



});


function loadWish(){


fetch(scriptURL)

.then(res=>res.json())

.then(data=>{


const list =
document.getElementById(
"wish-list"
);



list.innerHTML="";



data
.slice(1)
.reverse()
.forEach(item=>{


list.innerHTML += `

<div class="wish-card">


<strong>
${item[0]}
</strong>


<p>
${item[1]}
</p>


<span>
${item[2]}
</span>


</div>


`;


});


});


}



loadWish();




/* =================================
   6. COPY REKENING
================================= */
function copyRekening(number){


navigator.clipboard.writeText(number);


alert(
"Nomor rekening berhasil disalin 🤍"
);


}
/* =================================
   AUTO GUEST NAME
================================= */


function loadGuestName(){


    const urlParams =
    new URLSearchParams(
        window.location.search
    );


    const guest =
    urlParams.get("to");



    if(guest){


        const guestName =
        decodeURIComponent(
            guest.replace(/\+/g, " ")
        );



        const coverGuest =
        document.getElementById(
            "guest-name"
        );


        const leftGuest =
        document.getElementById(
            "guest-left"
        );



        if(coverGuest){

            coverGuest.innerText =
            guestName;

        }



        if(leftGuest){

            leftGuest.innerText =
            guestName;

        }


    }


}


loadGuestName();