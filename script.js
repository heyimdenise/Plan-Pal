const savedIdeas = localStorage.getItem("PlanPalIdeas")
let ideas = savedIdeas ? JSON.parse(savedIdeas) : [];

// Function to add an idea to the page
function addIdea() {
    const input = document.getElementById("ideaInput"); // Get the input from user
    const category = document.getElementById("categorySelect").value; // Get the category of the input from user
    const text = input.value.trim(); // Remove any extra spaces from the input

    // Do nothing if the input was not given or category was not chosen
    if(text === "" || category === "any") {
        return;
    }

    ideas.push({ text, category }); // Add input and its category to ideas list
    localStorage.setItem("PlanPalIdeas", JSON.stringify(ideas)); // Save updated ideas list to localStorage (convert array to string)
    input.value = ""; // Clear input box for next user idea
    displayIdeas(); // Update the list on the page
}

// Function to display the user ideas to the page. Added: each idea has a delete button
function displayIdeas(filter = "all") {
    const list = document.getElementById("ideaList"); // Get the ul element
    list.innerHTML = ""; // Clear current list items 

    // Filter the ideas, if "all" is chosen then use the entire list or else use the list that matches the specific category
    const filtered = filter === "all" ? ideas : ideas.filter(idea => idea.category === filter);

    // Loop through each idea
    filtered.forEach((idea) => {
        const li = document.createElement("li"); // Create new li element

        // Create span for the idea text
        const textSpan = document.createElement("span");
        textSpan.textContent = `${idea.text} (${idea.category})`;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.className = "delete-btn";

        // Find the original idea in main ideas array
        const orginalIndex = ideas.findIndex(obj => obj.text === idea.text && obj.category === idea.category);

        // Delete the idea when delete button is clicked
        deleteBtn.onclick = () => {
            ideas.splice(orginalIndex, 1); // Remove chosen idea from array
            localStorage.setItem("PlanPalIdeas", JSON.stringify(ideas)); // Save updated list (after idea was deleted) to localStorage
            displayIdeas(filter);          // Show updated list
        }

        // Add to list item with most recent idea at the top of the list
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        list.prepend(li);
    });
}

// Function to choose a random idea from list, avoiding repeats of the same idea twice in a row
let lastShuffledIndex = -1;

function shuffleIdea() {
    // Check if there are any ideas first, if not then send an alert
    if(ideas.length === 0) {
        return alert("Error: No ideas yet! Please try again.");
    }

    let randomIndex;

    // Keep picking until it is different from the last index
    do {
        randomIndex = Math.floor(Math.random() * ideas.length);
    } while (randomIndex === lastShuffledIndex && ideas.length > 1);

    lastShuffledIndex = randomIndex;

    const randomIdea = ideas[randomIndex];

    alert(`You should try: ${randomIdea.text}!`); // Send an alert of the chosen random idea
}

// Function to filter specific category ideas
function filterIdeas() {
    const filter = document.getElementById("filterSelect").value;
    displayIdeas(filter);
}

// On page load, restore ideas from localStorage
window.onload = () => {
    const stored = localStorage.getItem("PlanPalIdeas");
    
    if(stored) {
        ideas = JSON.parse(stored);
        displayIdeas(); // Show ideas right away
    }
};