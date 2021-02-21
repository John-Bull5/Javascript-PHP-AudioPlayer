export default class AudioPlayer{
    constructor(selector = '.audioPlayer', audio = []) {
        this.PlayerElem = document.querySelector(selector);
        this.audio = audio;
        this.currentAudio = null;
        this.createPlayerElements();
        this.audiContext = null
    }

    createVisulizer() {
        this.audiContext = new AudioContext();
        const src = this.audiContext.createMediaElementSource(this.audioElem);
        const analyzer = this.audiContext.createAnalyser();
        const canvas = this.visualizerElem;
        const ctx = canvas.getContext('2d');
        src.connect(analyzer);
        analyzer.connect(this.audiContext.destination);
        analyzer.fftSize = 256;
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = (canvas.width / bufferLength) * 2.5;

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            let bar = 0;
            analyzer.getByteFrequencyData(dataArray);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] - 75;
                const r = barHeight + (25 * (i / bufferLength));
                ctx.fillStyle = `rgb(${r},0,210)`;
                ctx.fillRect(bar, canvas.height - barHeight, barWidth, barHeight);
                bar += barWidth + 2;
                
            }
        }
        renderFrame()
    }

    createPlayerElements() {
        this.audioElem = document.createElement('audio');
        const playListElem = document.createElement('div');
        playListElem.classList.add('playlist');
        this.visualizerElem = document.createElement('canvas');
        const imgContainer = document.createElement('div');
        const round = document.createElement('div');
        imgContainer.classList.add('imgContainer');
        imgContainer.style.display = 'none'
        this.songImage = document.createElement('img');
        //this.songImage.style.display = 'block'

        round.appendChild(this.songImage);
        imgContainer.appendChild(round);
        this.PlayerElem.appendChild(this.audioElem);
        this.PlayerElem.appendChild(playListElem);
        this.PlayerElem.appendChild(this.visualizerElem);
        this.PlayerElem.appendChild(imgContainer)
        
        this.createPlayListElements(playListElem);
        //console.log(this.PlayerElem.lastChild == this.visualizerElem);
        //console.log(this.audio);
    }

    createPlayListElements(playListElem) {
        this.audio.forEach(audio => {
            
            const audioItemDiv = document.createElement('div');

            const editBtn = document.createElement('a');
            editBtn.style.display = 'inline-block';
            if (!audio.id) {
                editBtn.style.display = 'none';
            }
            editBtn.classList.add('btn', 'btn-neutral' ,'editBtn','p-10');
            editBtn.href = `edit.php?id=${audio.id}`;
            editBtn.innerHTML = `<i style="font-size:1rem;" class="fas fa-edit"></i>`;

            const audioItem = document.createElement('a');
            audioItem.href = `${audio.songPath}`;
            audioItem.innerHTML = `<i class="fas fa-play"></i>${audio.songName}`;

            audioItemDiv.appendChild(editBtn);
            audioItemDiv.appendChild(audioItem);

            if (!audio.songPic) {
                this.songImage.src = '/src/img/music.jpg';
            } else {
                this.songImage.src = audio.songPic;
            }
            
            this.setUpEventListener(audioItem);
            playListElem.appendChild(audioItemDiv);
        });
    }

    setUpEventListener(audioItem) {
        audioItem.addEventListener('click', (e) => {
            e.preventDefault();
            if (!this.currentAudio) {
                this.createVisulizer();
            }
            const isCurrentAudio = audioItem.getAttribute('href') === (this.currentAudio && this.currentAudio.getAttribute('href'));
            
            if (isCurrentAudio && !this.audioElem.paused) {
                this.setPlayIcon(this.currentAudio);
                this.audioElem.pause();
                this.songImage.classList.remove('rotate');
            } else if (isCurrentAudio && this.audioElem.paused) {
                this.setPauseIcon(this.currentAudio);
                this.audioElem.play();
                this.songImage.classList.add('rotate');
            } else {
                if (this.currentAudio) {
                    this.setPlayIcon(this.currentAudio);
                }
                this.currentAudio = audioItem;
                this.setPauseIcon(this.currentAudio)
                this.audioElem.src = this.currentAudio.getAttribute('href');
                this.audioElem.play();
                this.songImage.classList.add('rotate');
            }
        });
    }

    setPlayIcon(elem) {
        const icon = elem.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }

    setPauseIcon(elem) {
        const icon = elem.querySelector('i');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }

}