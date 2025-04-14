let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // true for "O", false for "X"
let count = 0; // For draw detection

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Reset function
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            // Winner found
            showWinner(boxes[a].innerText, pattern);
            return true;
        }
    }

    // Draw condition
    if (count === 9) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        return true;
    }

    return false;
};

// Show winner
const showWinner = (winner, pattern) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    pattern.forEach(index => {
        boxes[index].classList.add("winner");
    });
    disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("winner");
    });
};

// Game logic
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turn0 ? "O" : "X";
            box.style.color = turn0 ? "blue" : "red";
            turn0 = !turn0;
            count++;
            checkWinner();
        }
    });
});

resetBtn.addEventListener("click", resetGame);
