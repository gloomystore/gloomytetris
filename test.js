
let block = {
	color: 0,
	active: false,
}
let blockedBlock = {
	color: 100,
	active: false,
}

let Interval = false;
let score = 0;
let cleared = false;
let arr = [];
for(let i=0;i<15;i++) {
	const row = [];
	for(let j=0;j<10;j++) {
		row.push(block)
	}
	arr.push(row)
}
arr.push([blockedBlock,blockedBlock,blockedBlock,blockedBlock,blockedBlock,blockedBlock,blockedBlock,blockedBlock,blockedBlock,blockedBlock])

function reload(){
	let template = ``;
	arr.forEach((row,idx) => {
		let rowTemplate = `<tr>`
		row.forEach(blank => {
			let td;
			if(idx > 2) {
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
window.addEventListener('load', ()=>{
	reload();
	newSessionGenerator()
})


const block1 = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,true,true,true,true,0,0,0],
]

const block2 =[
	[0,0,0,0,true,true,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
]

const block3 = [
	[0,0,0,true,true,true,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
]
const block4 = [
	[0,0,0,true,true,true,0,0,0,0],
	[0,0,0,0,0,true,0,0,0,0],
	[0,0,0,0,0,true,0,0,0,0],
]


const blockMap = new Map();
blockMap.set(0, block1);
blockMap.set(1, block2);
blockMap.set(2, block3);
blockMap.set(3, block4);


class NewBlock {
	constructor(){
		this.randomBlock = blockMap.get(this.getRandomBlock());
		this.randomColor = this.getRandomColor();
		this.newBlock = this.randomBlock.map(e=> e.map(elm => elm !== 0 ? {color:this.randomColor,active:true} : {color:0,active:false}))
	}
	// 블록 모양 - 0부터 3까지의 랜덤한 정수를 생성하는 함수
	getRandomBlock() {
		return Math.floor(Math.random() * 4);
	}
	// 색깔 - 1부터 6까지의 랜덤한 정수를 생성하는 함수
	getRandomColor() {
		return Math.floor(Math.random() * 6) + 1;
	}
}

function dead(){
	if(Interval) clearInterval(Interval)
	alert('게임오버')
}

function goDown(){
	let goNext = true;
	for(let i = 0;i<arr.length;i++) {
		for(let j = 0;j<arr[i].length;j++) {
			if(arr[i][j].active === true && arr[3][j].color !== 0 && arr[3][j].active === false) {
				return dead()
			} else if((arr[i][j].active === true && i === arr.length-2) || (arr[i][j].active === true && arr[i+1][j].color !== 0 && arr[i+1][j].active === false)) {
				goNext = false
				break
			}
		}	
	}
	if(goNext) {
		for(let i = arr.length-1;i>0;i--) {
			for(let j = 0;j<arr[i].length;j++) {
				if(arr[i-1][j].active === true) {
					arr[i][j] = JSON.parse(JSON.stringify(arr[i-1][j]));
					arr[i-1][j] = {color:0,active:false};
				}
			}	
		}
		reload();
	} else {
		// 여기에 테트리스 한 칸 다됐을때 함수 추가
		fullChecker();
		arr.forEach(e=> e.forEach(elm => {
			elm.active = false;
		}))
		clearInterval(Interval)
		newSessionGenerator();
	}
}

function goLeft(){
	let goNext = true;
	for(let i = 0;i<arr.length;i++) {
		for(let j = 0;j<arr[i].length;j++) {
			if((arr[i][j].active === true && j === 0) || (arr[i][j].active === true && arr[i][j-1].color !== 0 && arr[i][j-1].active === false)) {
				goNext = false
				break
			}
		}	
	}
	if(goNext) {
		for(let i = arr.length-1;i>-1;i--) {
			for(let j = 0;j<arr[i].length-1;j++) {
				if(arr[i][j+1].active === true) {
					if(j === 9) {
						arr[i][j] = {color:0,active:false};
					} else {
						arr[i][j] = JSON.parse(JSON.stringify(arr[i][j+1]));
						arr[i][j+1] = {color:0,active:false};
					}
				}
			}	
		}
		reload();
	}
}

function goRight(){
	let goNext = true;
	for(let i = 0;i<arr.length;i++) {
		for(let j = 0;j<arr[i].length;j++) {
			if((arr[i][j].active === true && j === 9) || (arr[i][j].active === true && arr[i][j+1].color !== 0 && arr[i][j+1].active === false)) {
				goNext = false
				break
			}
		}	
	}
	if(goNext) {
		for(let i = arr.length-1;i>-1;i--) {
			for(let j = arr[i].length-1;j>0;j--) {
				if(arr[i][j-1].active === true) {
					if(j === 0) {
						arr[i][j] = {color:0,active:false};
					} else {
						arr[i][j] = JSON.parse(JSON.stringify(arr[i][j-1]));
						arr[i][j-1] = {color:0,active:false};
					}
				}
			}	
		}
		reload();
	}
}

function fullChecker(){
	for(let i=arr.length-2;i>-1;i--) {
		let isFull = true
		for(let j=0;j<arr[i].length;j++) {
			if(arr[i][j].color === 0) isFull = false
		}
		if(isFull) {
			score += 100;
			for(let k = i; i>2;i--){
				arr[i] = JSON.parse(JSON.stringify(arr[i-1]))
			}
			i=arr.length-2
		}
	}
}


function newSessionGenerator(){
	console.log(arr)
	const createNewBlock = new NewBlock();
	console.log(createNewBlock.getRandomBlock())
	const newBlockArray = createNewBlock.newBlock;
	console.log(newBlockArray)
	arr.splice(0, 3, ...newBlockArray);
	if(Interval) clearInterval(Interval);
	Interval  = setInterval(goDown,600)
}

Interval = setInterval(goDown,600)



window.addEventListener('keydown', function(e){
		if (e.key === 'ArrowDown') {
        // 아래쪽 방향키 처리
			goDown();
    } else if (e.key === 'ArrowLeft') {
        // 왼쪽 방향키 처리
			goLeft();
    } else if (e.key === 'ArrowRight') {
        // 오른쪽 방향키 처리
			goRight();
    } else if (e.key === 'Enter') {
        // 엔터 키 처리
        // 뒤집기
    }
})











