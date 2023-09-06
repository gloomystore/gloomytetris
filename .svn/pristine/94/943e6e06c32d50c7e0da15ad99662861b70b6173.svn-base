'use Strict'
document.querySelectorAll('.accordion').forEach((e,i)=>{
	e.id = 'accordionParent'+i.toString()
	Array.from(e.children).forEach((elm,idx)=>{
		console
		elm.children[0].children[0].setAttribute('data-bs-target',`#collapse${i}_${idx}`)
		elm.children[0].children[0].setAttribute('aria-controls',`collapse${i}_${idx}`)
		elm.children[1].setAttribute('data-bs-parent',`accordionParent${i.toString()}`)
		elm.children[1].id = `collapse${i}_${idx}`
	})
})


document.querySelectorAll('.nav-link').forEach((e,i)=>{
	e.id = 'nav-button-tab_'+i.toString()
	e.setAttribute('data-bs-target','#nav-button_'+i.toString())
	e.setAttribute('aria-controls','nav-button_'+i.toString())
})

document.querySelectorAll('.tab-pane').forEach((e,i)=>{
	e.id = 'nav-button_'+i.toString()
	e.setAttribute('aria-labelledby','nav-button-tab_'+i.toString())
})

document.querySelectorAll('.tab-title').forEach((e,i)=>{
  document.querySelectorAll('.nav-link')[i].innerText = e.innerText;
})

import "./bootstrap.min.js";
import hljs from "./highlight.min.js";

window.addEventListener('load',function(){
  hljs.highlightAll();
})



HTMLElement.prototype.fadeIn = function(second) {
  if(this.classList.contains('changing')) return;
  this.classList.add('changing')
  const constInterval = second ? second/20 : 50
  console.log(this);
  let thisOpacity = Number(getComputedStyle(this).opacity)
  console.log(thisOpacity);
  if(thisOpacity === 1) return console.log('already 1')
  let maxOpacity = 1;
  const interval = (maxOpacity-thisOpacity)/constInterval
  const SetInterval = setInterval(()=>{
    if(thisOpacity >= 1){
      clearInterval(SetInterval);
      this.style.opacity = '1';
      this.style.visibility = 'visible'
      this.style.display = '';
      this.classList.remove('changing')
    }
    else {
      thisOpacity += interval
      this.style.opacity = thisOpacity.toString()
    }
  },20)
}
document.querySelector('div').fadeIn(1000)
console.log(
getComputedStyle(document.querySelector('div')).opacity
)








