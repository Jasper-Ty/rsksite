const num_input = document.getElementById("num_input");
const ptxt = document.getElementById("ptxt");

const viewport = document.getElementById("viewport");

const word = []; 

const boxes = [[]];

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
      old = boxes[i][j];
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
  viewport.appendChild(div);
  render_boxes()
}

num_input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    if (this.value) {
      event.preventDefault();
      insert(parseInt(this.value))
      this.value = ""
    }
  }
}); 
