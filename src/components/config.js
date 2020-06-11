export const oscillators = [
    "Oscillator Off",
    'Sine', 'FM Sine', 'AM Sine', 'Fat Sine',
    'Triangle', 'FM Triangle', 'AM Triangle', 'Fat Triangle',
    'Sawtooth','FM Sawtooth','AM Sawtooth','Fat Sawtooth',
    'Square', 'FM Square', 'AM Square', 'Fat Square',
    'PWM', 'Pulse'
]
export const scales = [
    'Major',
    'Minor',
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian',
    'Majorpentatonic',
    'Minorpentatonic',
    'Chromatic',
    'Harmonicchromatic',
    'Blues',
    'Doubleharmonic',
    'Flamenco',
    'Harmonicminor',
    'Melodicminor'
]

export const tonicOrder = [
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
    'A',
    'A#/Bb',
    'B'
]

export const maxOctaves = 8

export const posenetOptions = {
        architecture: "MobileNetV1",
        imageScaleFactor: 0.33,
        outputStride: 16,
        flipHorizontal: true,
        maxPoseDetections: 1,
        detectionType: "single",
        minPoseConfidence: 0.2,
        minPartConfidence: 0.1 
}

export const midiList =
    {
        "だから僕は音楽を辞めた":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FYorushika%20-%20Thats%20Why%20I%20Gave%20Up%20on%20Music-1.mid?v=1590458865992",
            artist:'ヨルシカ',
            offset:.35,
            tint:0xAFA69B
            //https://www.youtube.com/watch?v=AimJ-EWDK1I
        },
        '夜に駆ける':{
            url:'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FRacing%20Into%20The%20Night.mid?v=1590263481059',
            artist:'YOASOBI',
            offset:.5,
            tint:0xFFD4D4
            //https://www.youtube.com/watch?v=Rq60NW2TxbM
        },
        "金木犀":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKinmokusei.mid?v=1590264503440",
            artist:'くじら feat. Ado',
            offset:.5,
            tint:0xDBBF9F
            //https://www.youtube.com/watch?v=KdO8bM29Q8A
        },
        '快晴':{
            url:'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKaisei.mid?v=1590261521146',
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0xAFA69B
            //https://www.youtube.com/watch?v=UXxYtzUxRF4
        },
       
        'Alice in 冷凍庫':{
            url:'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAlice_in_Leng_Dong_Ku__Alice_in_the_Freezer.mid?v=1590183813087',
            artist:'Orangestar feat. IA',
            offset:.45,
            tint:0x89AEC3
            //https://musescore.com/user/7739981/scores/1793556
        },
        "DAYBREAK FRONTLINE":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FDAYBREAK_FRONTLINE__cover_piano_score.mid?v=1590264403702",
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0xAFA69B
            //https://musescore.com/user/31847617/scores/5660409
        },
        "シャルル":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FCharles.mid?v=1590467081432",
            artist:'バルーン',
            offset:.5,
            tint:0xC39E89
            //credits https://twitter.com/kakimuki2011?lang=en
        },
        '青春なんていらないわ':{
            url:'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FI_Dont_Need_Youth.mid?v=1591337846713',
            artist:'三月のパンタシア',
            offset:.5,
            tint:0x89C3C3
            //https://musescore.com/neko_rare/scores/5506440
        },
        'アスノヨゾラ哨戒班':{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAsu_no_Yozora_Shoukaihan_-_BanG_Dream_Afterglow_-_Orangestar_IA.mid?v=1590302769688",
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0x89AEC3
            //https://musescore.com/enochng/asu-no-yozora-shoukaihan
        },
        "眩しいDNAだけ":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FDNA.mid?v=1590788545461",
            artist:'ずっと真夜中でいいのに。',
            offset:.5,
            tint:0xC39E89
            //https://musescore.com/user/14598701/scores/5805051
        }
        ,
        "秒針を噛む":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2F%E7%A7%92%E9%87%9D%E3%82%92%E5%99%9B%E3%82%80guit.mid?v=1590789047130",
            artist:'ずっと真夜中でいいのに。',
            offset:.5,
            tint:0xC39E89
            //https://musescore.com/user/28172954/scores/5926366
        },
     
        '雨き声残響':{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FEcho_of_My_Voice_in_the_Rain__-_OrangestarIA_-_Ver._Wolpis_Kater.mid?v=1590264416383",
            artist:'Orangestar feat. IA',
            offset:.7,
            tint:0xAFA69B
            //https://musescore.com/user/4460506/scores/4906055
        },
        '濫觴生命':{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Flanshangshengming_Ranshou_Seimei.mid?v=1590264396535",
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0x89AEC3
            //https://musescore.com/user/7739981/scores/2450661
        },
        "脳裏上のクラッカー":{
            url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2F%5BNii%5D%20%E8%84%B3%E8%A3%8F%E4%B8%8A%E3%81%AE%E3%82%AF%E3%83%A9%E3%83%83%E3%82%AB%E3%83%BC%20MIDI.mid?v=1590783737877",
            artist:'ずっと真夜中でいいのに。',
            offset:.5,
            tint:0xC39E89
            //https://www.youtube.com/watch?v=F0xGjqhVglQ
        }
        
        
    }


    // 
    // "太陽になれるかな":{
    //     url:"https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FPerhaps%20I'll%20be%20able%20to%20become%20the%20sun.mid?v=1590263479994",
    //     artist:'ツユ',
    //     offset:.5,
    //     tint:0xAFA69B
    // },