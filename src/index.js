import style from './style.css'

const title_text = document.createElement('h1');
title_text.innerText = 'Schensted insertion';
document.body.appendChild(title_text);

const num_input = document.createElement('input');
num_input.type = 'number';
num_input.min = '1';
num_input.max = '99';
num_input.style.width = '100px';
document.body.appendChild(num_input);

const word_div = document.createElement('div');
document.body.appendChild(word_div);
const word_title = document.createElement('h2');
const word_container = document.createElement('div');
word_div.appendChild(word_title);
word_div.appendChild(word_container);
word_title.innerText = 'Word';

const tableau_title = document.createElement('h2');
tableau_title.innerText = 'Insertion tableau';
const tableau_div = document.createElement('div');
tableau_div.classList.add('tableaucontainer');
document.body.appendChild(tableau_title);
document.body.appendChild(tableau_div);

const word = []; 

const boxes = [[]];

class Box {
  constructor(val, pos) {
    this.val = val;
    this.pos = pos;
  }
}

function render_boxes() {
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      const { div, val } = boxes[i][j];
      div.innerText = val;
      div.style.top = `${i*52}px`;
      div.style.left = `${j*52}px`;
    }
  }
}

function render_word() {
  const concat = word.join(', ');
  word_container.innerText = '[' + concat + ']';
}

function insert_in_row(i, box) {
  console.log("Inserting", box);
  console.log("Row", i);
  if (boxes.length <= i) {
    // First box in row
    boxes[i] = [box];
    return null;
  }
  for (let j = 0; j < boxes[i].length; j++) {
    // If found bumpable element
    if (box.val < boxes[i][j].val) {
      const old = boxes[i][j];
      boxes[i][j] = box;
      return old;
    }
  }
  // Otherwise, insert at the end
  boxes[i].push(box);
  return null
}

function insert(val) {
  const div = document.createElement("div");

  const box = {
    val: val,
    div: div
  };

  let to_insert = box;
  let i = 0;
  while (to_insert !== null) {
    to_insert = insert_in_row(i, to_insert);
    i++;
  }

  div.classList.add('box')
  tableau_div.appendChild(div);
  render_boxes()
}

num_input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    if (this.value) {
      event.preventDefault();
      insert(parseInt(this.value));
      word.push(this.value);
      render_word();
      this.value = "";
    }
  }
}); 
