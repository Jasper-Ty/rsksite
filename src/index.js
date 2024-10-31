const num_input = document.getElementById("num_input");

const Pdiv = document.getElementById("Pdiv");
const Qdiv = document.getElementById("Qdiv");

const word = []; 

const Pboxes = [[]];
const Qboxes = [[]];

class Box {
  constructor(val, pos) {
    this.val = val;
    this.pos = pos;
  }
}

function render_boxes() {
  for (let i = 0; i < Pboxes.length; i++) {
    for (let j = 0; j < Pboxes[i].length; j++) {
      const { div, val } = Pboxes[i][j];
      div.innerText = val;
      div.style.top = `${i*52}px`;
      div.style.left = `${j*52}px`;
    }
  }
  for (let i = 0; i < Qboxes.length; i++) {
    for (let j = 0; j < Qboxes[i].length; j++) {
      const { div, val } = Qboxes[i][j];
      div.innerText = val;
      div.style.top = `${i*52}px`;
      div.style.left = `${j*52}px`;
    }
  }
}

function insert_in_row(i, box) {
  console.log("Inserting", box);
  console.log("Row", i);
  if (Pboxes.length <= i) {
    // First box in row
    Pboxes[i] = [box];
    return null;
  }
  for (let j = 0; j < Pboxes[i].length; j++) {
    // If found bumpable element
    if (box.val < Pboxes[i][j].val) {
      old = Pboxes[i][j];
      Pboxes[i][j] = box;
      return old;
    }
  }
  // Otherwise, insert at the end
  Pboxes[i].push(box);
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
  Pdiv.appendChild(div);
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
