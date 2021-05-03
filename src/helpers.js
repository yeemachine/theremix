export const flyRotate = (node, {
	delay = 0,
	duration = 400,
	easing = null,
	x = 0,
	y = 0,
  r = 5
})=> {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: t => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px) rotate(${(1-t) * r}deg);
			opacity: ${t * opacity}`
	};
}

export const haptic = () => {
  if ("vibrate" in navigator) {
      navigator.vibrate(15);
    }
}
export const isImageVideo = (file) => {
   let type = null
   // alert(file.type)
    switch (file.type) {
        case 'video/mp4':
            type = "video";
            break;
        case 'video/quicktime':
            type = "video";
            break;
        case 'video/webm':
            type = "video";
            break;
        case 'image/jpeg':
            type = "img";
            break;
        case 'image/png':
            type = "img";
            break;
        case 'image/tif':
            type = "img";
            break;
        case 'image/apng':
            type = "img";
            break;
        case 'image/gif':
            type = "img";
            break;
        case 'image/svg+xml':
            type = "img";
            break;
        case 'image/webp':
            type = "img";
            break;
        case 'image/avif':
            type = "img";
            break;
        default:
            break;
    }
  return type
}

export function getTimeString() {
    var today = new Date();
    var y = today.getFullYear();
    // JavaScript months are 0-based.
    var m = ('0'+(today.getMonth() + 1)).slice(-2);
    var d = ('0'+today.getDate()).slice(-2);
    var h = today.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = ('0'+(h % 12)).slice(-2);
    var mi = ('0'+today.getMinutes()).slice(-2);
    var s = ('0'+today.getSeconds()).slice(-2);
    return y + "-" + m + "-" + d + " at " + h + "." + mi + "." + s + " " + ampm;
}

export function constrain(value, constraints) {
  return Math.max(Math.min(value, constraints.max), constraints.min);
}

export const getTween = (b,e,i) => {
  return b + (i * (e - b))
}

export function getDistance(a, b) {
  const distX = a.x - b.x;
  const distY = a.y - b.y;
  return Math.sqrt(distX ** 2 + distY ** 2);
}

export function getMidpoint(a, b, axis) {
  const x1 = a.position[axis];
  const x2 = b.position[axis];
  return (x1 + x2) / 2;
}

export const findNext = (item, arr, direction = "forward") => {
  const index = arr.indexOf(item);
  let nextItem;
  if (direction === "reverse") {
    nextItem = index > 0 ? arr[index - 1] : arr[arr.length - 1];
  } else {
    nextItem = index < arr.length - 1 ? arr[index + 1] : arr[0];
  }
  return nextItem;
};

export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export let rgbToHex = (string) => {
  if (string.includes("rgb")) {
    var a = string.split("(")[1].split(")")[0];
    a = a.split(",");
    var b = a.map(function (x) {
      //For each array element
      x = parseInt(x).toString(16); //Convert to a base16 string
      return x.length == 1 ? "0" + x : x; //Add zero if we get only one character
    });
    b = "#" + b.join("");
    return b;
  } else {
    return string;
  }
};

export const lerpColor = function (a, b, amount) {
  const ar = a >> 16,
    ag = (a >> 8) & 0xff,
    ab = a & 0xff,
    br = b >> 16,
    bg = (b >> 8) & 0xff,
    bb = b & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return (rr << 16) + (rg << 8) + (rb | 0);
};

function getKeypoint(pose, part) {
  return pose.keypoints.filter((keypoint) => keypoint.part === part)[0];
}

/* Returns a dictionary where keys = name of keypoint, value = keypoint object */
function getKeypoints(pose, parts) {
  const keypoints = {};
  if (parts) {
    parts.forEach((part) => {
      keypoints[part] = getKeypoint(pose, part);
    });
  } else {
    pose.keypoints.forEach((keypoint) => {
      keypoints[keypoint.part] = getKeypoint(pose, keypoint.part);
    });
  }
  return keypoints;
}

function getPoseFromKeypoints(keypoints) {
  const pose = { keypoints: [] };
  Object.keys(keypoints).forEach((part) => {
    pose.keypoints.push(keypoints[part]);
  });
  return pose;
}

let poseConfig = {
  smoothing: {
    jumpDetection: false,
    smoothing: 0.67,
    maxJumpRatio: 0.3,
    jumpResetTime: 1000,
    speedSmoothing: 0.8,
  },
};

const smoothing = poseConfig.smoothing.smoothing;
let smoothPrevPose;

export function smooth(pose, armspan) {
  // if (poseConfig.smoothing.jumpDetection) pose = unjump(pose, armspan);
  if (!smoothPrevPose) {
    smoothPrevPose = pose;
    return pose;
  }

  const keypoints = getKeypoints(pose);
  const prevKeypoints = getKeypoints(smoothPrevPose);
  const smoothKeypoints = keypoints;

  Object.keys(keypoints).forEach((part) => {
    const prevPos = prevKeypoints[part].position;
    const smoothPos = smoothKeypoints[part].position;
    const pos = keypoints[part].position;

    smoothPos.x = (prevPos.x - pos.x) * smoothing + pos.x;
    smoothPos.y = (prevPos.y - pos.y) * smoothing + pos.y;
  });

  const smoothPose = getPoseFromKeypoints(smoothKeypoints);
  smoothPose.score = pose.score;
  smoothPrevPose = smoothPose;
  return smoothPose;
}

/* If joints move too fast (they jump unrealistically) it's probably
     a glitch. So ignore those movements. */
let jumpPrevPose;
let jumpReset = [];
let jumpResetPose;
function unjump(pose, armspan) {
  if (!jumpPrevPose) {
    jumpPrevPose = pose;
    return pose;
  }

  // Maximum valid movement distance (smaller = more agressive smoothing)
  const maxDistance = poseConfig.smoothing.maxJumpRatio * armspan;
  const smoothedKeypoints = [];

  // Go over each keypoint, see if it's moved an unrealistic amount in one frame,
  // and if so revert to previous position
  pose.keypoints.forEach((keypoint) => {
    const prevKeypoint = getKeypoint(jumpPrevPose, keypoint.part);
    const distance = getDistance(keypoint.position, prevKeypoint.position);

    if (distance > maxDistance) {
      smoothedKeypoints.push(prevKeypoint);
    } else {
      smoothedKeypoints.push(keypoint);
    }
  });

  const originalPose = Object.assign({}, pose);
  pose.keypoints = smoothedKeypoints;

  // Reset any parts that have been stuck
  jumpReset.forEach((part) => {
    const prevKeypoint = getKeypoint(jumpPrevPose, part);
    pose.keypoints.forEach((keypoint) => {
      if (keypoint.part === part) {
        keypoint.position.x = getKeypoint(originalPose, part).position.x;
        keypoint.position.y = getKeypoint(originalPose, part).position.y;
      }
    });
    jumpReset.splice(jumpReset.indexOf(part), 1);
  });

  jumpPrevPose = pose;
  return pose;
}

/* Sometimes the joints get stuck (legitimate fast movements,
     or where joints get lost). Reset every x seconds in case of this. */
if (poseConfig.smoothing.jumpDetection) setUnjumpInterval();
function setUnjumpInterval() {
  setInterval(() => {
    const prevPose = jumpResetPose;
    const pose = jumpPrevPose;

    if (
      typeof prevPose != "undefined" &&
      prevPose.keypoints &&
      typeof pose != "undefined" &&
      pose.keypoints
    ) {
      pose.keypoints.forEach((keypoint) => {
        const prevKeypoint = getKeypoint(prevPose, keypoint.part);
        const distance = getDistance(keypoint.position, prevKeypoint.position);

        if (distance === 0) {
          jumpReset.push(keypoint.part);
        }
      });
    }

    jumpResetPose = Object.assign({}, jumpPrevPose);
  }, poseConfig.smoothing.jumpResetTime);
}

export function pointerEvents() {
  if (document && "ontouchstart" in document.documentElement) {
    return {
      start: "touchstart",
      move: "touchmove",
      end: "touchend",
    };
  }
  return {
    start: "mousedown",
    move: "mousemove",
    end: "mouseup",
  };
}

export function toPercent(n) {
  return n * 100;
}
