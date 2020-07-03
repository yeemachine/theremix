import { writable } from 'svelte/store';
export const pwa = writable(false);
export const update = writable(false);
export const updateNow = writable(false);

export const version = writable(null);

export const darkMode = writable(false);
export const active = writable(false);
export const loaded = writable(false);
export const coverLoaded = writable(false);
export const toneLoaded = writable(false);
export const manual = writable(false);
export const camera = writable(false);
export const videoReady = writable(null);
export const WIDTH = writable(2400/2);
export const HEIGHT = writable(1350/2);
export const SCALE = writable(1)
export const CANVASWIDTH = writable(2400/2);
export const CANVASHEIGHT = writable(1350/2);
export const globalPointerUp = writable(true);
export const mousePos = writable({x:0,y:0})
export const gestures = writable(false)
export const showGuides = writable(true)
export const canvasMousePos = writable({x:0,y:0})
export const keydown_O = writable(false)
export const keydown_K = writable(false)
export const keydown_S = writable(false)
export const keydown_G = writable(false)
export const keydown_M = writable(false)

export const keydown_left = writable(false)
export const keydown_right = writable(false)
export const keydown_up = writable(false)
export const keydown_down = writable(false)

export const mouseOverride = writable(0)
export const audioControls = writable({x:0,y:0})
export const thereminPos = writable({x:0,y:0})
export const bgPos = writable({x:0,y:0})
export const thereminMobilePos = writable({x:0,y:0})
export const tablePos = writable({x:0,y:0})
export const videoPos = writable({x:0,y:0})

export const expandSettings = writable(false)
export const FFT = writable([])
export const analyser = writable(null)
export const toneOutput = writable({
    glide:true,
    freq:0,
    note:'G4'
})

const storedVol = localStorage.getItem("volumeVal") || -15;
export const volumeVal = writable(storedVol)


const storedGlide = localStorage.getItem("glide") || true;
export const glide = writable(storedGlide)


const storedOsc = localStorage.getItem("oscillator") || 'Sine';
export const oscillatorType = writable(storedOsc)


const storedTonic = localStorage.getItem("tonic") || 'G';
export const tonic = writable(storedTonic)


const storedScale = localStorage.getItem("scaleType") || 'Major';
export const scaleType = writable(storedScale)


const storedStartOctave = localStorage.getItem("startOctave") || 2;
export const startOctave = writable(storedStartOctave)


const storedEndOctave = localStorage.getItem("endOctave") || 5;
export const endOctave = writable(storedEndOctave)

if (typeof(Storage) !== "undefined") {
    volumeVal.subscribe(value => {
        localStorage.setItem("volumeVal", value ? value : -15);
    });
    glide.subscribe(value => {
        localStorage.setItem("glide", value ? value : true);
    });
    oscillatorType.subscribe(value => {
        localStorage.setItem("oscillator", value ? value : 'Sine');
    });
    tonic.subscribe(value => {
        localStorage.setItem("tonic", value ? value : 'G');
    });
    scaleType.subscribe(value => {
        localStorage.setItem("scaleType", value ? value : 'Major');
    });
    startOctave.subscribe(value => {
        localStorage.setItem("startOctave", value ? value : 2);
    });
    endOctave.subscribe(value => {
        localStorage.setItem("endOctave", value ? value : 5);
    });
}

export const scaleNotes = writable([])


export const enableMIDI = writable(false);
export const currentMIDITitle = writable(null);
export const currentMIDIOffset = writable(.5);
export const currentMIDI = writable('だから僕は音楽を辞めた');
export const MIDI_tint = writable(null);
export const MIDITextSprite = writable(null);
export const poseNetRes = writable(null);

export const dragged = writable(null)
export const hovered = writable(null)

export const midiList = writable({
        "だから僕は音楽を辞めた":{
            url:"https://theremin.app/assets/midi/Thats_Why_I_Gave_Up_on_Music.mid",
            artist:'ヨルシカ',
            original:'https://www.youtube.com/watch?v=KTZ-y85Erus',
            midi:'https://www.youtube.com/watch?v=AimJ-EWDK1I',
            offset:.35,
            tint:0xAFA69B
        },
        '夜に駆ける':{
            url:'https://theremin.app/assets/midi/Racing_Into_The_Night.mid',
            artist:'YOASOBI',
            original:'https://www.youtube.com/watch?v=x8VYWazR5mE',
            midi:'https://www.youtube.com/watch?v=Rq60NW2TxbM',
            offset:.5,
            tint:0xFFD4D4
        },
        "秒針を噛む":{
            url:"https://theremin.app/assets/midi/Byoushinwo_Kamu.mid",
            artist:'ずっと真夜中でいいのに。',
            original:'https://www.youtube.com/watch?v=GJI4Gv7NbmE',
            midi:'https://musescore.com/user/28172954/scores/5926366',
            offset:.5,
            tint:0xC39E89
        },
        "シャルル":{
            url:"https://theremin.app/assets/midi/Charles.mid",
            artist:'バルーン',
            original:'https://www.youtube.com/watch?v=TA5OFS_xX0c',
            midi:'https://twitter.com/kakimuki2011?lang=en',
            offset:.5,
            tint:0xC39E89
        },
        "金木犀":{
            url:"https://theremin.app/assets/midi/Kinmokusei.mid",
            artist:'くじら feat. Ado',
            original:'https://www.youtube.com/watch?v=Baw-cAvS5xc',
            midi:'https://www.youtube.com/watch?v=KdO8bM29Q8A',
            offset:.5,
            tint:0xDBBF9F
        },
        '快晴':{
            url:'https://theremin.app/assets/midi/Kaisei.mid',
            artist:'Orangestar feat. IA',
            original:'https://www.youtube.com/watch?v=BwGpXK3W6tE',
            midi:'https://www.youtube.com/watch?v=UXxYtzUxRF4',
            offset:.5,
            tint:0xAFA69B
        },
       
        'Alice in 冷凍庫':{
            url:'https://theremin.app/assets/midi/Alice_in_Leng_Dong_Ku__Alice_in_the_Freezer.mid',
            artist:'Orangestar feat. IA',
            original:'https://www.youtube.com/watch?v=jQmYZWjLwzw',
            midi:'https://musescore.com/user/7739981/scores/1793556',
            offset:.45,
            tint:0x89AEC3
        },
        "DAYBREAK FRONTLINE":{
            url:"https://theremin.app/assets/midi/DAYBREAK_FRONTLINE__cover_piano_score.mid",
            artist:'Orangestar feat. IA',
            original:'https://www.youtube.com/watch?v=emrt46SRyYs',
            midi:'https://musescore.com/user/31847617/scores/5660409',
            offset:.5,
            tint:0xAFA69B
        },
        '青春なんていらないわ':{
            url:'https://theremin.app/assets/midi/I_Dont_Need_Youth.mid',
            artist:'三月のパンタシア',
            original:'https://www.youtube.com/watch?v=Uhjws9V9PMo',
            midi:'https://musescore.com/neko_rare/scores/5506440',
            offset:.5,
            tint:0x89C3C3
        },
        'アスノヨゾラ哨戒班':{
            url:"https://theremin.app/assets/midi/Orangestar_-_Asu_no_yozora_shoukaihan_feat.IA.mid",
            artist:'Orangestar feat. IA',
            original:'https://www.youtube.com/watch?v=XogSflwXgpw',
            midi:'https://musescore.com/enochng/asu-no-yozora-shoukaihan',
            offset:.5,
            tint:0x89AEC3
        },
        "眩しいDNAだけ":{
            url:"https://theremin.app/assets/midi/DNA.mid",
            artist:'ずっと真夜中でいいのに。',
            original:'https://www.youtube.com/watch?v=VJy8qZ77bpE',
            midi:'https://musescore.com/user/14598701/scores/5805051',
            offset:.5,
            tint:0xC39E89
        }
        ,
        '雨き声残響':{
            url:"https://theremin.app/assets/midi/Echo_of_My_Voice_in_the_Rain__-_OrangestarIA_-_Ver._Wolpis_Kater.mid",
            artist:'Orangestar feat. IA',
            original:'https://www.youtube.com/watch?v=0KK5vQlCVYo',
            midi:'https://musescore.com/user/4460506/scores/4906055',
            offset:.7,
            tint:0xAFA69B
        },
        '濫觴生命':{
            url:"https://theremin.app/assets/midi/lanshangshengming_Ranshou_Seimei.mid",
            artist:'Orangestar feat. IA',
            original:'https://www.youtube.com/watch?v=rc8vrHd0T_4',
            midi:'https://musescore.com/user/7739981/scores/2450661',
            offset:.5,
            tint:0x89AEC3
        },
        "脳裏上のクラッカー":{
            url:"https://theremin.app/assets/midi/Nouriueno_Cracker.mid",
            artist:'ずっと真夜中でいいのに。',
            original:'https://www.youtube.com/watch?v=3iAXclHlTTg',
            midi:'https://www.youtube.com/watch?v=F0xGjqhVglQ',
            offset:.5,
            tint:0xC39E89
        }
})

