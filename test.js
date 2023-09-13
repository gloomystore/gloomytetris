let block = {
  color: 0,
  active: false,
}
let blockedBlock = {
  color: 100,
  active: false,
}
function getBlock(){
  return JSON.parse(JSON.stringify(block))
}
function getBlockedBlock(){
  return JSON.parse(JSON.stringify(blockedBlock))
}
let thisBlockType = 0;
let Interval = false;
let score = 0;
let cleared = false;
let arr = [];
for (let i = 0; i < 20; i++) {
  const row = [];
  for (let j = 0; j < 10; j++) {
    row.push(block)
  }
  arr.push(row)
}
arr.push([getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock(), getBlockedBlock()])

function reload() {
  let template = ``;
  console.log(arr)
  arr.forEach((row, idx) => {
    let rowTemplate = `<tr>`
    row.forEach(blank => {
      let td;
      if (idx > 2) {
        td = `<td class="${'color'+blank.color}"></td>`
      } else {
        td = `<td class="transparent"></td>`
      }
      rowTemplate += td;
    })
    rowTemplate += `</tr>`;
    template += rowTemplate;
  })

  document.querySelector('.table>tbody').innerHTML = template
  document.querySelector('.score').innerHTML = score;

}
window.addEventListener('load', () => {
  reload();
  newSessionGenerator()
})


const block1 = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, true, true, true, true, 0, 0, 0],
]

const block2 = [
	[0, 0, 0, 0, true, true, 0, 0, 0, 0],
	[0, 0, 0, true, true, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, true, 0, 0, 0, 0, 0],
]

const block3 = [
	[0, 0, 0, true, true, true, 0, 0, 0, 0],
	[0, 0, 0, 0, true, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, true, 0, 0, 0, 0, 0],
]
const block4 = [
	[0, 0, 0, true, true, true, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, true, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, true, 0, 0, 0, 0],
]



const blockMap = new Map();
blockMap.set(0, block1);
blockMap.set(1, block2);
blockMap.set(2, block3);
blockMap.set(3, block4);

function getBlockMap(num){
  thisBlockType = num;
  return blockMap.get(num)
}

class NewBlock {
  constructor() {
    this.randomBlock = getBlockMap(this.getRandomBlock());
    this.randomColor = this.getRandomColor();
    this.newBlock = this.randomBlock.map(e => e.map(elm => elm !== 0 ? {
      color: this.randomColor,
      active: true
    } : {
      color: 0,
      active: false
    }))
  }
  // 블록 모양 - 0부터 3까지의 랜덤한 정수를 생성하는 함수
  getRandomBlock() {
    const ranNum = Math.floor(Math.random() * 4);
    return ranNum;
  }
  // 색깔 - 1부터 6까지의 랜덤한 정수를 생성하는 함수
  getRandomColor() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

function dead() {
  if (Interval) clearInterval(Interval)
  alert('게임오버')
}

function goDown() {
  let goNext = true;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].active === true && arr[3][j].color !== 0 && arr[3][j].active === false) {
        return dead()
      } else if ((arr[i][j].active === true && i === arr.length - 2) || (arr[i][j].active === true && arr[i + 1][j].color !== 0 && arr[i + 1][j].active === false)) {
        goNext = false
        break
      }
    }
  }
  if (goNext) {
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i - 1][j].active === true) {
          arr[i][j] = getJson(arr[i - 1][j]);
          arr[i - 1][j] = {
            color: 0,
            active: false
          };
        }
      }
    }
    reload();
  } else {
    // 여기에 테트리스 한 칸 다됐을때 함수 추가
    fullChecker();
    arr.forEach(e => e.forEach(elm => {
      elm.active = false;
    }))
    clearInterval(Interval)
    newSessionGenerator();
  }
}

function goLeft() {
  let goNext = true;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if ((arr[i][j].active === true && j === 0) || (arr[i][j].active === true && arr[i][j - 1].color !== 0 && arr[i][j - 1].active === false)) {
        goNext = false
        break
      }
    }
  }
  if (goNext) {
    for (let i = arr.length - 1; i > -1; i--) {
      for (let j = 0; j < arr[i].length - 1; j++) {
        if (arr[i][j + 1].active === true) {
          if (j === 9) {
            arr[i][j] = {
              color: 0,
              active: false
            };
          } else {
            arr[i][j] = getJson(arr[i][j + 1]);
            arr[i][j + 1] = {
              color: 0,
              active: false
            };
          }
        }
      }
    }
    reload();
  }
}

function goRight() {
  let goNext = true;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if ((arr[i][j].active === true && j === 9) || (arr[i][j].active === true && arr[i][j + 1].color !== 0 && arr[i][j + 1].active === false)) {
        goNext = false
        break
      }
    }
  }
  if (goNext) {
    for (let i = arr.length - 1; i > -1; i--) {
      for (let j = arr[i].length - 1; j > 0; j--) {
        if (arr[i][j - 1].active === true) {
          if (j === 0) {
            arr[i][j] = {
              color: 0,
              active: false
            };
          } else {
            arr[i][j] = getJson(arr[i][j - 1]);
            arr[i][j - 1] = {
              color: 0,
              active: false
            };
          }
        }
      }
    }
    reload();
  }
}

function fullChecker() {
  let destroyed = false;
  for (let i = arr.length - 2; i > -1; i--) {
    let isFull = true
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].color === 0) isFull = false
    }
    if (isFull) {
      destroyed = true
      score += 100;
      for (let k = i; i > 2; i--) {
        arr[i] = getJson(arr[i - 1])
      }
      i = arr.length - 2
    }
  }
  if(destroyed) {
    // 한개라도 부서진 적이 있다면 아래로 밀어내기 발동
    for(let i=arr.length-2;i>2;i--) {
      for(let j=0;j<arr[i].length-1;j++) {
        let count = 0
        while(true) {
          count++
          if(count > 15) break
          else if(arr[i][j].active === false && arr[i][j].color === 0) {
            arr[i][j] = getJson(arr[i-1][j])
          } else {
            break
          }
        }
      }
    }
  }
}

function getJson(obj){
  return JSON.parse(JSON.stringify(obj))
}

function newSessionGenerator() {
  const createNewBlock = new NewBlock();
  const newBlockArray = createNewBlock.newBlock;
  arr.splice(0, 3, ...newBlockArray);
  if (Interval) clearInterval(Interval);
  Interval = setInterval(goDown, 600)
}

Interval = setInterval(goDown, 600)


function rotateBlock(){
  let goNext = true;
  let mostTop = null;
  let mostLeft = null;
  let mostRight = null;
  let mostBottom = null;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if ((mostBottom === null && arr[i][j].active === true) || (arr[i][j].active === true && mostBottom < i)) {
        mostBottom = i
      }
      if ((mostTop === null && arr[i][j].active === true) || (arr[i][j].active === true && mostTop > i)) {
        mostTop = i
      }
      if ((mostLeft === null && arr[i][j].active === true) || (arr[i][j].active === true && mostLeft > j)) {
        mostLeft = j
      }
      if ((mostRight === null && arr[i][j].active === true) || (arr[i][j].active === true && mostRight < j)) {
        mostRight = j
      }
    }
  }
  console.log('thisBlockType',thisBlockType);
  // 일자 타입
  if(thisBlockType === 0) {
    //가로 타입
    if(arr[mostTop][mostLeft+1].active === true) {
      for (let i = mostTop; i < mostTop + 4; i++) {
        if(arr[i][mostLeft].active === false && arr[i][mostLeft].color !== 0) return
      }
      for (let j = mostLeft+1; j < mostLeft + 4; j++) {
        arr[mostTop][j] = getBlock();
      }
      for (let i = mostTop+1; i < mostTop + 4; i++) {
        arr[i][mostLeft] = getJson(arr[mostTop][mostLeft])
      }
      return reload();
    } else {
      //세로 타입
      for (let i = mostLeft; i < mostLeft + 4; i++) {
        if(arr[mostTop][i].active === false && arr[mostTop][i].color !== 0) return
        else if(mostLeft > 6) return
      }
      for (let j = mostTop+1; j < mostTop + 4; j++) {
        arr[j][mostLeft] = getBlock();
      }
      for (let i = mostLeft; i < mostLeft + 4; i++) {
        arr[mostTop][i] = getJson(arr[mostTop][mostLeft])
      }
      return reload();
    }
  } else {
    //기타 타입
    for (let i = mostTop; i < mostBottom+1; i++) {
      for (let j = mostLeft; j < mostRight; j++) {
        if(arr[i][j].active === false && arr[i][j].color !== 0) {
          goNext = false
          break
        }
      }
    }
  }
  console.log('goNext',goNext)
  if (goNext) {
    const newArr = [
      [arr[mostBottom][mostLeft],arr[mostTop+1][mostLeft],arr[mostTop][mostLeft]],
      [arr[mostBottom][mostLeft+1],arr[mostTop+1][mostLeft+1],arr[mostTop][mostLeft+1]],
      [arr[mostBottom][mostLeft+2],arr[mostTop+1][mostLeft+2],arr[mostTop][mostRight]],
    ]
    const deepNewArr = JSON.parse(JSON.stringify(newArr))
    console.log('deepNewArr',deepNewArr)
    arr[mostTop][mostLeft] = deepNewArr[0][0];
    arr[mostTop][mostLeft+1] = deepNewArr[0][1];
    arr[mostTop][mostLeft+2] = deepNewArr[0][2];
    arr[mostTop+1][mostLeft] = deepNewArr[1][0];
    arr[mostTop+1][mostLeft+1] = deepNewArr[1][1];
    arr[mostTop+1][mostLeft+2] = deepNewArr[1][2];
    arr[mostTop+2][mostLeft] = deepNewArr[2][0];
    arr[mostTop+2][mostLeft+1] = deepNewArr[2][1];
    arr[mostTop+2][mostLeft+2] = deepNewArr[2][2];
    reload();
  }
}

window.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown') {
    // 아래쪽 방향키 처리
    goDown();
  } else if (e.key === 'ArrowLeft') {
    // 왼쪽 방향키 처리
    goLeft();
  } else if (e.key === 'ArrowRight') {
    // 오른쪽 방향키 처리
    goRight();
  } else if (e.key === 'Enter' || e.key === 'ArrowUp') {
    // 엔터 키 처리
    // 뒤집기
    rotateBlock();
  }
})
