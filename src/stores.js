import { writable } from "svelte/store";
export const pwa = writable(false);
export const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
export const update = writable(false);
export const updateNow = writable(false);
export const hasHover = writable(false);

export const version = writable(null);

export const darkMode = writable(false);
export const active = writable(false);
export const loaded = writable(false);
export const coverLoaded = writable(false);
export const toneLoaded = writable(false);
export const hasMediaRecording = writable(false);
export const recording = writable(false);
export const recordingTime = writable(null);

export const manual = writable(false);
export const camera = writable(false);
export const videoReady = writable(null);
export const posenetLoaded = writable(null);
export const mediapipeHandsLoaded = writable(null);
export const modelLoaded = writable(null);

export const WIDTH = writable(2400 / 2);
export const HEIGHT = writable(1350 / 2);
export const SCALE = writable(1);
export const CANVASWIDTH = writable(2400 / 2);
export const CANVASHEIGHT = writable(1350 / 2);
export const globalPointerUp = writable(true);
export const mousePos = writable({ x: 0, y: 0 });
export const gestures = writable(false);
export const showGuides = writable(true);
export const canvasMousePos = writable({ x: 0, y: 0 });
export const keydown_O = writable(false);
export const keydown_K = writable(false);
export const keydown_S = writable(false);
export const keydown_G = writable(false);
export const keydown_M = writable(false);

export const keydown_left = writable(false);
export const keydown_right = writable(false);

export const mouseOverride = writable(0);
export const audioControls = writable({ x: 0, y: 0 });
export const thereminPos = writable({ x: 0, y: 0 });
export const bgPos = writable({ x: 0, y: 0 });
export const thereminMobilePos = writable({ x: 0, y: 0 });
export const tablePos = writable({ x: 0, y: 0 });
export const videoPos = writable({ x: 0, y: 0 });
export const videoMask = writable(null);

export const expandSettings = writable(false);
export const FFT = writable([]);
export const analyser = writable(null);
export const toneOutput = writable({
  glide: true,
  freq: 0,
  note: "G4",
  attack:0,
  decay:0
});

let storedVol = -15
let storedGlide = true
let storedOsc = "Sine"
let storedTonic = "G"
let storedScale = "Major"
let storedStartOctave = 2
let storedEndOctave = 5
let storedFTUE = true
let storedPoseFTUE = true
let storedAllowHolistic = !isSafari && window.innerWidth>600//if safari,block holistic model
let storedShowVideo = true

const returnBoolean = string => {
return (string === 'true' ? true : string==="false" ? false : string);
  
}
export const getLocalStorage = ()=>{
  if (typeof Storage !== "undefined") {
    storedVol = localStorage.getItem("volumeVal") || -15;
    storedGlide =
      localStorage.getItem("glide") === null
        ? true
        : returnBoolean(localStorage.getItem("glide"));
    storedOsc = localStorage.getItem("oscillator") || "Sine";
    storedTonic = localStorage.getItem("tonic") || "G";
    storedScale = localStorage.getItem("scaleType") || "Major";
    storedStartOctave = localStorage.getItem("startOctave") || 2;
    storedEndOctave = localStorage.getItem("endOctave") || 5;
    storedFTUE = 
      localStorage.getItem("FTUE") === null
      ? true
      : returnBoolean(localStorage.getItem("FTUE"));
    storedPoseFTUE = 
      localStorage.getItem("PoseFTUE") === null
      ? true
      : returnBoolean(localStorage.getItem("PoseFTUE"));
    storedAllowHolistic = 
      isSafari ? false
      : localStorage.getItem("allowHolistic") === null
      ? storedAllowHolistic
      : returnBoolean(localStorage.getItem("allowHolistic"));
    storedShowVideo = 
      localStorage.getItem("showVideo") === null
      ? true
      : returnBoolean(localStorage.getItem("showVideo"));
    
  }
}


getLocalStorage()

export const volumeVal = writable(storedVol);
export const glide = writable(storedGlide);
export const oscillatorType = writable(storedOsc);
export const tonic = writable(storedTonic);
export const scaleType = writable(storedScale);
export const startOctave = writable(storedStartOctave);
export const endOctave = writable(storedEndOctave);
export const FTUE = writable(storedFTUE);
export const PoseFTUE = writable(storedPoseFTUE)

export const allowHolistic = writable(storedAllowHolistic);
export const showVideo = writable(storedShowVideo)

export const subLocalStorage = ()=>{
  if (typeof Storage !== "undefined") {
    FTUE.subscribe(value=>{
      localStorage.setItem("FTUE",value)
    })
    // PoseFTUE.subscribe(value=>{
    //   localStorage.setItem("PoseFTUE",value)
    // })
    
    volumeVal.subscribe((value) => {
      localStorage.setItem("volumeVal", value ? value : -15);
    });
    
    glide.subscribe((value) => {
      localStorage.setItem("glide", value);
    });
    
    oscillatorType.subscribe((value) => {
      localStorage.setItem("oscillator", value ? value : "Sine");
    });
    
    tonic.subscribe((value) => {
      localStorage.setItem("tonic", value ? value : "G");
    });
    
    scaleType.subscribe((value) => {
      localStorage.setItem("scaleType", value ? value : "Major");
    });
    
    startOctave.subscribe((value) => {
      localStorage.setItem("startOctave", value ? value : 2);
    });
    
    endOctave.subscribe((value) => {
      localStorage.setItem("endOctave", value ? value : 5);
    });
    
    allowHolistic.subscribe((value) => {
      localStorage.setItem("allowHolistic", value);
    });
    showVideo.subscribe((value) => {
      localStorage.setItem("showVideo", value);
    });
  }
}

subLocalStorage()

export const theatreMode = writable(false);
export const scaleNotes = writable([]);

export const enableMIDI = writable(false);
export const currentMIDITitle = writable(null);
export const currentMIDIOffset = writable(0.5);
export const currentMIDI = writable("怪物");
export const MIDI_tint = writable(null);
export const MIDITextSprite = writable(null);
export const poseNetRes = writable(null);
export const handPoseRes = writable(null);

export const dragged = writable(null);
export const hovered = writable(null);

export const midiList = writable({
  custom: {
    url: null,
    name:null,
    artist: null,
    original: null,
    midi: null,
    offset: 0.5,
    tint: 0xffd4d4,
    imgNow:0,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FGettyImages-1200719536.jpg?v=1619297710790",
    type:"img"
  },
  "怪物": {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMonsterYOASOBI.mid?v=1619394550242",
    artist: "YOASOBI",
    alt:{
      title:"Monster"
    },
    original: "https://www.youtube.com/watch?v=x8VYWazR5mE",
    midi: "https://www.youtube.com/watch?v=Rq60NW2TxbM",
    offset: 0.35,
    tint: 0xffd4d4,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM15.jpg?v=1619760752726",
    type:"img"
  },
  お勉強しといてよ: {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSTUDY_ME.mid?v=1619407961738",
    artist: "ずっと真夜中でいいのに。",
    alt:{
      title:"Study Me",
      artist:"Zutomayo"
    },
    original: "https://www.youtube.com/watch?v=3iAXclHlTTg",
    midi: "https://www.youtube.com/watch?v=F0xGjqhVglQ",
    offset: 0.5,
    tint: 0xc39e89,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fstudyme.jpg?v=1619416139077",
    type:"img"
  },
   思想犯: {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FThoughtcrime.mid?v=1619161572955",
    artist: "ヨルシカ",
    alt:{
      artist:"Yorushika",
      title:"Thought Crime"
    },
    original: "https://www.youtube.com/watch?v=KTZ-y85Erus",
    midi: "https://www.youtube.com/watch?v=AimJ-EWDK1I",
    offset: 0.5,
    tint: 0xafa69b,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM18.jpg?v=1619305532298",
     type:"img"
  },
   GHOST: {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FGHOST__Hoshimachi_Suisei.mid?v=1619407621024",
    artist: "星街すいせい",
    alt:{
      artist:"Hoshimachi Suisei"
    },
    original: "https://www.youtube.com/watch?v=KTZ-y85Erus",
    midi: "https://www.youtube.com/watch?v=AimJ-EWDK1I",
    offset: 0.5,
    tint: 0xafa69b,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM21.jpg?v=1619407596110",
     type:"img"
  },
  "群青": {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FGunjouYOASOBI.mid?v=1619159506804",
    artist: "YOASOBI",
    alt:{
      title:"Gunjou"
    },
    original: "https://www.youtube.com/watch?v=x8VYWazR5mE",
    midi: "https://www.youtube.com/watch?v=Rq60NW2TxbM",
    offset: 0.35,
    tint: 0xffd4d4,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM20.jpg?v=1619407008143",
    type:"img"
  },
  春を告げる: {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FHaru_Wo_Tsugeru.mid?v=1619159509296",
    artist: "yama",
    alt:{
      title:"Haru wo Tsugeru"
    },
    original: "https://www.youtube.com/watch?v=x8VYWazR5mE",
    midi: "https://www.youtube.com/watch?v=Rq60NW2TxbM",
    offset: 0.55,
    tint: 0xffd4d4,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM17.jpg?v=1619760752800",
    type:"img"
  },
  命に嫌われている: {
    url: "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fhated_by_life.mid?v=1619411523366",
    artist: "カンザキイオリ",
    alt:{
      artist:"Kanzaki Iori",
      title:"Hated by Life Itself"
    },
    original: "https://www.youtube.com/watch?v=x8VYWazR5mE",
    midi: "https://www.youtube.com/watch?v=Rq60NW2TxbM",
    offset: 0.5,
    tint: 0xffd4d4,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm22.jpg?v=1619410239302",
    type:"img"
  },
  だから僕は音楽を辞めた: {
    url: "https://theremin.app/assets/midi/Thats_Why_I_Gave_Up_on_Music.mid",
    artist: "ヨルシカ",
    alt:{
      artist:"Yorushika",
      title:"That's Why I Gave Up on Music"
    },
    original: "https://www.youtube.com/watch?v=KTZ-y85Erus",
    midi: "https://www.youtube.com/watch?v=AimJ-EWDK1I",
    offset: 0.35,
    tint: 0xafa69b,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM8.jpg?v=1593790573806",
    type:"img"
  },
  夜に駆ける: {
    url: "https://theremin.app/assets/midi/Racing_Into_The_Night.mid",
    artist: "YOASOBI",
    alt:{
      title:"Racing into the Night"
    },
    original: "https://www.youtube.com/watch?v=x8VYWazR5mE",
    midi: "https://www.youtube.com/watch?v=Rq60NW2TxbM",
    offset: 0.5,
    tint: 0xffd4d4,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM5.jpg?v=1593790575857",
    type:"img"
  },
  秒針を噛む: {
    url: "https://theremin.app/assets/midi/Byoushinwo_Kamu.mid",
    artist: "ずっと真夜中でいいのに。",
    alt:{
      title:"Byoushin wo Kamu",
      artist:"Zutomayo"
    },
    original: "https://www.youtube.com/watch?v=GJI4Gv7NbmE",
    midi: "https://musescore.com/user/28172954/scores/5926366",
    offset: 0.5,
    tint: 0xc39e89,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM12.jpg?v=1593790573705",
    type:"img"
  },
  シャルル: {
    url: "https://theremin.app/assets/midi/Charles.mid",
    artist: "バルーン",
    alt:{
      title:"Charles",
      artist:"Balloon"
    },
    original: "https://www.youtube.com/watch?v=TA5OFS_xX0c",
    midi: "https://twitter.com/kakimuki2011?lang=en",
    offset: 0.5,
    tint: 0xc39e89,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM1.jpg?v=1593790573277",
    type:"img"
  },
  金木犀: {
    url: "https://theremin.app/assets/midi/Kinmokusei.mid",
    artist: "くじら feat. Ado",
    alt:{
      title:"Kinmokusei"
    },
    original: "https://www.youtube.com/watch?v=Baw-cAvS5xc",
    midi: "https://www.youtube.com/watch?v=KdO8bM29Q8A",
    offset: 0.5,
    tint: 0xdbbf9f,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM11.jpg?v=1593790575215",
    type:"img"
  },
  快晴: {
    url: "https://theremin.app/assets/midi/Kaisei.mid",
    artist: "Orangestar feat. IA",
    alt:{
      title:"Kaisei"
    },
    original: "https://www.youtube.com/watch?v=BwGpXK3W6tE",
    midi: "https://www.youtube.com/watch?v=UXxYtzUxRF4",
    offset: 0.5,
    tint: 0xafa69b,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM6.jpg?v=1593790576148",
    type:"img"
  },

  "Alice in 冷凍庫": {
    url:
      "https://theremin.app/assets/midi/Alice_in_Leng_Dong_Ku__Alice_in_the_Freezer.mid",
    artist: "Orangestar feat. IA",
    alt:{
      title:"Freezing Nonsense Theater"
    },
    original: "https://www.youtube.com/watch?v=jQmYZWjLwzw",
    midi: "https://musescore.com/user/7739981/scores/1793556",
    offset: 0.45,
    tint: 0x89aec3,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM2.jpg?v=1593790576044",
    type:"img"
  },
  "DAYBREAK FRONTLINE": {
    url:
      "https://theremin.app/assets/midi/DAYBREAK_FRONTLINE__cover_piano_score.mid",
    artist: "Orangestar feat. IA",
    original: "https://www.youtube.com/watch?v=emrt46SRyYs",
    midi: "https://musescore.com/user/31847617/scores/5660409",
    offset: 0.5,
    tint: 0xafa69b,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM3.jpg?v=1593790571119",
    type:"img"
  },
  青春なんていらないわ: {
    url: "https://theremin.app/assets/midi/I_Dont_Need_Youth.mid",
    artist: "三月のパンタシア",
    alt:{
      title:"Seishunnante Iranaiwa",
      artist:"Sangatsu no Phantasia"
    },
    original: "https://www.youtube.com/watch?v=Uhjws9V9PMo",
    midi: "https://musescore.com/neko_rare/scores/5506440",
    offset: 0.5,
    tint: 0x89c3c3,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM16.jpg?v=1593790570801",
    type:"img"
  },
  眩しいDNAだけ: {
    url: "https://theremin.app/assets/midi/DNA.mid",
    artist: "ずっと真夜中でいいのに。",
    alt:{
      title:"Mabushii DNA Dake",
      artist:"Zutomayo"
    },
    original: "https://www.youtube.com/watch?v=VJy8qZ77bpE",
    midi: "https://musescore.com/user/14598701/scores/5805051",
    offset: 0.45,
    tint: 0xc39e89,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM19.jpg?v=1619369649540",
    type:"img"
  },
  脳裏上のクラッカー: {
    url: "https://theremin.app/assets/midi/Nouriueno_Cracker.mid",
    artist: "ずっと真夜中でいいのに。",
    alt:{
      title:"Nouriueno Cracker",
      artist:"Zutomayo"
    },
    original: "https://www.youtube.com/watch?v=3iAXclHlTTg",
    midi: "https://www.youtube.com/watch?v=F0xGjqhVglQ",
    offset: 0.5,
    tint: 0xc39e89,
    img:
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM14.jpg?v=1593790573512",
    type:"img"
  }
});
