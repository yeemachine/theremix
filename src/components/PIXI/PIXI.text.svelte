<script>
  import { tweened } from "svelte/motion";
  import { sineInOut } from "svelte/easing";
  import { oscillators, midiList } from "../../config.js";
  import {
    active,
    WIDTH,
    HEIGHT,
    thereminPos,
    thereminMobilePos,
    glide,
    oscillatorType,
    toneOutput,
    enableMIDI,
    MIDITextSprite,
    currentMIDITitle,
  } from "../../stores.js";
  export let stage = null;
  export let app = null;
  export let graphicsGroup = null;

  const sineInOut0_1 = tweened(0, {
    duration: 700,
    easing: sineInOut,
  });

  let maskGraphic = new PIXI.Graphics();
  maskGraphic.parentGroup = graphicsGroup;
  maskGraphic.lineStyle(0);

  let oscText, freqText, noteText, midiText;
  let marqueeTime = 0;

  document.fonts.load('10pt "Whirly Birdie Regular"').then(() => {
    oscText = new PIXI.Text($oscillatorType, {
      fontFamily: "Whirly Birdie Regular",
      fontSize: 40,
      fill: 0xe54646,
      align: "left",
    });
    oscText.alpha = 0;
    oscText.parentGroup = graphicsGroup;

    freqText = new PIXI.Text("0 Hz", {
      fontFamily: "Whirly Birdie Regular",
      fontSize: 40,
      fill: 0xe54646,
      align: "right",
    });
    freqText.alpha = 0;
    freqText.parentGroup = graphicsGroup;

    noteText = new PIXI.Text("G", {
      fontFamily:
        "Whirly Birdie Regular,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;",
      fontSize: 40,
      fill: 0xe54646,
      align: "right",
    });
    noteText.alpha = 0.15;
    noteText.parentGroup = graphicsGroup;

    stage.addChild(oscText, freqText, noteText, maskGraphic);

    midiText = new PIXI.Text("", {
      fontFamily: "Whirly Birdie Regular",
      fontSize: 40,
      fill: 0xe54646,
      align: "right",
    });
    midiText.alpha = 0.15;
    midiText.parentGroup = graphicsGroup;
    midiText.mask = maskGraphic;
    stage.addChild(midiText);

    MIDITextSprite.set(midiText);

    app.ticker.add(() => {
      if (!enableMIDI) {
        return;
      } else {
        if (midiText.text !== "Loading...") {
          marqueeTime = !$active
            ? marqueeTime + 0
            : marqueeTime <= 1
            ? marqueeTime + 0.001
            : 0;
        } else {
          marqueeTime = 0;
        }
      }
    });
  });

  $: {
    if (oscText) {
      oscText.text = $oscillatorType;
      oscText.style.fontSize =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      oscText.style.padding =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      oscText.x =
        $WIDTH > 600
          ? $thereminPos.x + $thereminPos.width * 0.387
          : $thereminMobilePos.x + $thereminMobilePos.width * 0.09;
      oscText.y =
        $WIDTH > 600
          ? $thereminPos.y + $thereminPos.height * 0.79
          : $thereminMobilePos.y + $thereminMobilePos.height * 0.52;
      oscText.alpha = 0.15 + 0.55 * $sineInOut0_1;
    }
    if (freqText) {
      freqText.text = !$enableMIDI
        ? Math.floor($toneOutput.freq) + " HZ"
        : Math.floor($toneOutput.freq) + " HZ";
      freqText.style.fontSize =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      freqText.style.padding =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      freqText.x =
        $WIDTH > 600
          ? $thereminPos.x + $thereminPos.width * 0.582 - freqText.width
          : $thereminMobilePos.x +
            $thereminMobilePos.width * 0.78 -
            freqText.width;
      freqText.y =
        $WIDTH > 600
          ? $thereminPos.y + $thereminPos.height * 0.79
          : $thereminMobilePos.y + $thereminMobilePos.height * 0.52;
      freqText.alpha = $toneOutput.glide
        ? 0.15 + 0.55 * $sineInOut0_1
        : 0.15 + 0.15 * $sineInOut0_1;
    }
    if (noteText) {
      noteText.text = !$enableMIDI ? $toneOutput.note : $toneOutput.note;
      noteText.style.fontSize =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      noteText.style.padding =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      noteText.x =
        $WIDTH > 600
          ? $thereminPos.x + $thereminPos.width * 0.622 - noteText.width
          : $thereminMobilePos.x +
            $thereminMobilePos.width * 0.91 -
            noteText.width;
      noteText.y =
        $WIDTH > 600
          ? $thereminPos.y + $thereminPos.height * 0.79
          : $thereminMobilePos.y + $thereminMobilePos.height * 0.52;
      noteText.alpha = $toneOutput.glide
        ? 0.15 + 0.15 * $sineInOut0_1
        : 0.15 + 0.55 * $sineInOut0_1;
    }
  }

  $: {
    if (midiText) {
      let text = $currentMIDITitle
        ? "♫ " + $currentMIDITitle + " / " + midiList[$currentMIDITitle].artist
        : null;
      midiText.text =
        $enableMIDI && !text
          ? "Loading..."
          : $enableMIDI
          ? "   " +
            text +
            "      " +
            text +
            "      " +
            text +
            "      " +
            text +
            "   "
          : "";
      midiText.style.fontSize =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      midiText.style.padding =
        $WIDTH > 600
          ? $thereminPos.width * 0.01
          : $thereminMobilePos.width * 0.035;
      midiText.y =
        $WIDTH > 600
          ? $thereminPos.y + $thereminPos.height * 0.888
          : $thereminMobilePos.y + $thereminMobilePos.height * 0.82;
      midiText.x =
        $WIDTH > 600
          ? $thereminPos.x +
            $thereminPos.width * 0.5 -
            (midiText.width * 2) / 4 -
            (marqueeTime * midiText.width * 1) / 4
          : $thereminMobilePos.x +
            $thereminMobilePos.width * 0.48 -
            (midiText.width * 2) / 4 -
            (marqueeTime * midiText.width) / 4;
      midiText.alpha = 0.15 + 0.55 * $sineInOut0_1;
    }
  }

  $: {
    if ($active && $sineInOut0_1 === 0) {
      sineInOut0_1.set(1);
    }
    if (!$active && $sineInOut0_1 === 1) {
      sineInOut0_1.set(0);
    }
  }

  $: {
    maskGraphic.clear();
    maskGraphic.beginFill(0xffffff, 1);
    if ($WIDTH > 600) {
      maskGraphic.drawRoundedRect(
        $thereminPos.x + $thereminPos.width * 0.379,
        $thereminPos.y + $thereminPos.height * 0.783,
        $thereminPos.width * 0.2495,
        $thereminPos.height * 0.139,
        $thereminPos.width * 0.014
      );
    } else {
      maskGraphic.drawRoundedRect(
        $thereminMobilePos.x + $thereminMobilePos.width * 0.06,
        $thereminMobilePos.y + $thereminMobilePos.height * 0.5,
        $thereminMobilePos.width * 0.88,
        $thereminMobilePos.height * 0.41,
        $thereminMobilePos.width * 0.058
      );
    }
  }
</script>

<div></div>

<style>
  div {
    font-family: "Whirly Birdie Narrow";
    display: none;
  }
</style>
