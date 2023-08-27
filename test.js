
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
}
window.addEventListener('load', ()=>{
	reload();
	const createNewBlock = newBlock();
		arr[0] = createNewBlock[0];
		arr[1] = createNewBlock[1];
		arr[2] = createNewBlock[2];
})


const block1 = [
	[0,0,0,0,true,true,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
]

const block2 = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,true,true,true,true,0,0,0],
]

const block3 = [
	[0,0,0,true,true,true,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
	[0,0,0,0,true,0,0,0,0,0],
]
const block4 = [
	[0,0,0,true,true,true,0,0,0,0],
	[0,0,0,true,0,0,0,0,0,0],
	[0,0,0,true,0,0,0,0,0,0],
]


const blockMap = new Map();
blockMap.set(0, block1);
blockMap.set(1, block2);
blockMap.set(2, block3);
blockMap.set(3, block4);


// 블록 모양 - 0부터 3까지의 랜덤한 정수를 생성하는 함수
function getRandomBlock() {
  return Math.floor(Math.random() * 4); 
}

// 색깔 - 1부터 6까지의 랜덤한 정수를 생성하는 함수
function getRandomColor() {
  return Math.floor(Math.random() * 6) + 1;
}


function newBlock(){
	const block = blockMap.get(getRandomBlock());
	const color = getRandomColor();
	const newBlock = block.map(e=> e.map(elm => elm !== 0 ? {color,active:true} : {color:0,active:false}))
	return newBlock;
}

class NewBlock {
	constructor(){
		this.randomBlock = this.getRandomBlock();
		this.randomColor = this.getRandomColor();
		this.newBlock = this.randomBlock.map(e=> e.map(elm => elm !== 0 ? {color:this.randomColor,active:true} : {color:0,active:false}))
	}
	getRandomBlock() {
		return blockMap.get(Math.floor(Math.random() * 4));
	}
	getRandomColor() {
		return Math.floor(Math.random() * 6) + 1;
	}
}

function goDown(){
	let goNext = true;
	for(let i = 0;i<arr.length;i++) {
		for(let j = 0;j<arr[i].length;j++) {
			if((arr[i][j].active === true && i === arr.length-2) || (arr[i][j].active === true && arr[i+1][j].color !== 0)) {
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
		arr.forEach(e=> e.forEach(elm => {
			elm.active = false;
		}))
		clearInterval(Interval)
		newSessionGenerator();
	}
}

function newSessionGenerator(){
	console.log(arr)
	const createNewBlock = new NewBlock();
	console.log(createNewBlock.randomBlock)
	arr[0] = createNewBlock.randomBlock[0];
	arr[1] = createNewBlock.randomBlock[1];
	arr[2] = createNewBlock.randomBlock[2];
	if(Interval) clearInterval(Interval);
	Interval  = setInterval(goDown,500)
}

Interval = setInterval(goDown,500)













