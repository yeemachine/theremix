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
            url:"https://theremin.app/assets/midi/Thats_Why_I_Gave_Up_on_Music.mid",
            artist:'ヨルシカ',
            offset:.35,
            tint:0xAFA69B
            //https://www.youtube.com/watch?v=AimJ-EWDK1I
        },
        '夜に駆ける':{
            url:'https://theremin.app/assets/midi/Racing_Into_The_Night.mid',
            artist:'YOASOBI',
            offset:.5,
            tint:0xFFD4D4
            //https://www.youtube.com/watch?v=Rq60NW2TxbM
        },
        "秒針を噛む":{
            url:"https://theremin.app/assets/midi/Byoushinwo_Kamu.mid",
            artist:'ずっと真夜中でいいのに。',
            offset:.5,
            tint:0xC39E89
            //https://musescore.com/user/28172954/scores/5926366
        },
        "シャルル":{
            url:"https://theremin.app/assets/midi/Charles.mid",
            artist:'バルーン',
            offset:.5,
            tint:0xC39E89
            //credits https://twitter.com/kakimuki2011?lang=en
        },
        "金木犀":{
            url:"https://theremin.app/assets/midi/Kinmokusei.mid",
            artist:'くじら feat. Ado',
            offset:.5,
            tint:0xDBBF9F
            //https://www.youtube.com/watch?v=KdO8bM29Q8A
        },
        '快晴':{
            url:'https://theremin.app/assets/midi/Kaisei.mid',
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0xAFA69B
            //https://www.youtube.com/watch?v=UXxYtzUxRF4
        },
       
        'Alice in 冷凍庫':{
            url:'https://theremin.app/assets/midi/Alice_in_Leng_Dong_Ku__Alice_in_the_Freezer.mid',
            artist:'Orangestar feat. IA',
            offset:.45,
            tint:0x89AEC3
            //https://musescore.com/user/7739981/scores/1793556
        },
        "DAYBREAK FRONTLINE":{
            url:"https://theremin.app/assets/midi/DAYBREAK_FRONTLINE__cover_piano_score.mid",
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0xAFA69B
            //https://musescore.com/user/31847617/scores/5660409
        },
        '青春なんていらないわ':{
            url:'https://theremin.app/assets/midi/I_Dont_Need_Youth.mid',
            artist:'三月のパンタシア',
            offset:.5,
            tint:0x89C3C3
            //https://musescore.com/neko_rare/scores/5506440
        },
        'アスノヨゾラ哨戒班':{
            url:"https://theremin.app/assets/midi/Orangestar_-_Asu_no_yozora_shoukaihan_feat.IA.mid",
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0x89AEC3
            //https://musescore.com/enochng/asu-no-yozora-shoukaihan
        },
        "眩しいDNAだけ":{
            url:"https://theremin.app/assets/midi/DNA.mid",
            artist:'ずっと真夜中でいいのに。',
            offset:.5,
            tint:0xC39E89
            //https://musescore.com/user/14598701/scores/5805051
        }
        ,
        '雨き声残響':{
            url:"https://theremin.app/assets/midi/Echo_of_My_Voice_in_the_Rain__-_OrangestarIA_-_Ver._Wolpis_Kater.mid",
            artist:'Orangestar feat. IA',
            offset:.7,
            tint:0xAFA69B
            //https://musescore.com/user/4460506/scores/4906055
        },
        '濫觴生命':{
            url:"https://theremin.app/assets/midi/lanshangshengming_Ranshou_Seimei.mid",
            artist:'Orangestar feat. IA',
            offset:.5,
            tint:0x89AEC3
            //https://musescore.com/user/7739981/scores/2450661
        },
        "脳裏上のクラッカー":{
            url:"https://theremin.app/assets/midi/Nouriueno_Cracker.mid",
            artist:'ずっと真夜中でいいのに。',
            offset:.5,
            tint:0xC39E89
            //https://www.youtube.com/watch?v=F0xGjqhVglQ
        }
        
        
    }
