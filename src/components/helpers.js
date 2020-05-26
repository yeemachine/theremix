let config = {
    "smoothing": {
        "jumpDetection": false,
        "smoothing": 0.67,
        "maxJumpRatio": 0.3,
        "jumpResetTime": 1000,
        "speedSmoothing": 0.8
    }
}
  
export function constrain(value, constraints) {
    return Math.max(Math.min(value, constraints.max), constraints.min);
  }
  
export function getDistance(a, b) {
    const distX = a.x - b.x;
    const distY = a.y - b.y;
    return Math.sqrt(distX**2 + distY**2);
  }
  
export function getMidpoint(a, b, axis) {
    const x1 = a.position[axis];
    const x2 = b.position[axis];
    return (x1 + x2) / 2;
  }

export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
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

export function jsUcfirst(string) 
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
function getKeypoint(pose, part) {
    return pose.keypoints.filter((keypoint) => keypoint.part === part )[0];
  }
  
  /* Returns a dictionary where keys = name of keypoint, value = keypoint object */
function getKeypoints(pose, parts) {
    const keypoints = {};
    if (parts) {
      parts.forEach((part) => {
        keypoints[part] = getKeypoint(pose, part);
      })
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


  const smoothing = config.smoothing.smoothing;
  let smoothPrevPose;  

export function smooth(pose, armspan) {
    if (config.smoothing.jumpDetection) pose = unjump(pose, armspan);
    if (!smoothPrevPose) { smoothPrevPose = pose; return pose; }
    
    const keypoints = getKeypoints(pose);
    const prevKeypoints = getKeypoints(smoothPrevPose);
    const smoothKeypoints = keypoints;
  
    Object.keys(keypoints).forEach((part) => {
      const prevPos = prevKeypoints[part].position;
      const smoothPos = smoothKeypoints[part].position;
      const pos = keypoints[part].position;
      
      smoothPos.x = (prevPos.x - pos.x) * (smoothing) + pos.x;
      smoothPos.y = (prevPos.y - pos.y) * (smoothing) + pos.y;
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
    const maxDistance = config.smoothing.maxJumpRatio * armspan;
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
  if (config.smoothing.jumpDetection) setUnjumpInterval();
  function setUnjumpInterval() {
    setInterval(() => {
      const prevPose = jumpResetPose;
      const pose = jumpPrevPose;
  
      if (typeof prevPose != 'undefined' && prevPose.keypoints && typeof pose != 'undefined' && pose.keypoints) {
        pose.keypoints.forEach((keypoint) => {
          const prevKeypoint = getKeypoint(prevPose, keypoint.part)
          const distance = getDistance(keypoint.position, prevKeypoint.position);
  
          if (distance === 0) {
            jumpReset.push(keypoint.part);
          }
        });
      }
  
      jumpResetPose = Object.assign({}, jumpPrevPose);
    }, config.smoothing.jumpResetTime)
  }

  export function pointerEvents() {
    if (document && 'ontouchstart' in document.documentElement) {
      return {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
      };
    }
    return {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
    };
  }
  
  export function toPercent(n) {
    return n * 100;
  }