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
    'Melodicminor',
    'Wholetone'
]

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