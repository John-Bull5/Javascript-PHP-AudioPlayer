import AudioPlayer from './AudioPlayer.js';


const localSongArray = [
    {
        songPath: '/src/songs/backstreet boys.mp3',
        songName: 'backstreet boys',
        songPic: '/src/img/music.jpg'
    },
    {
        songPath: '/src/songs/beautiful people.mp3',
        songName: 'beautiful people',
        songPic: '/src/img/music.jpg'
    },
    {
        songPath: '/src/songs/beyonce - broken.mp3',
        songName: 'beyonce - broken',
        songPic: '/src/img/music.jpg'
    },
    {
        songPath: '/src/songs/boyz_ii_men.mp3',
        songName: 'boyz_ii_men',
        songPic: '/src/img/music.jpg'
    },
    {
        songPath: '/src/songs/I swear.mp3',
        songName: 'I swear',
        songPic: '/src/img/music.jpg'
    }

];

$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: 'json', //text
        async: true,
        url: "/songs.php",
        success: function (songArray) {
           if (songArray.length < 1) {
                const audioPlayer = new AudioPlayer('.audioPlayer', localSongArray)
           } else {
                const audioPlayer = new AudioPlayer('.audioPlayer', songArray)
           } 
            const toggleBtn = document.querySelector('.toggleBtn');
            const ImgContainer = document.querySelector('.imgContainer');
            const playerElem = document.querySelector('.audioPlayer')
            const canvas = document.querySelector('canvas');
            toggleBtn.addEventListener('click', toggleView);

            function toggleView() {
                if (playerElem.contains(canvas)) {
                    playerElem.removeChild(canvas);
                    playerElem.appendChild(ImgContainer)
                    ImgContainer.style.display = 'flex'
                } else {
                    playerElem.appendChild(canvas);
                    playerElem.removeChild(ImgContainer)

                }
            }
        }
    })
});




