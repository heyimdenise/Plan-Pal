let ideas = [];

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
    input.value = ""; // Clear input box for next user idea
    displayIdeas(); // Update the list on the page
}

// Function to display the user ideas to the page
function displayIdeas(filter = "all") {
    const list = document.getElementById("ideaList"); // Get the ul element
    list.innerHTML = ""; // Clear current list items 

    // Filter the ideas, if "all" is chosen then use the entire list or else use the list that matches the specific category
    const filtered = filter === "all" ? ideas : ideas.filter(idea => idea.category === filter);

    // Loop through each idea
    filtered.forEach((idea) => {
        const li = document.createElement("li"); // Create new li element
        li.textContent = `${idea.text} (${idea.category})`; // Add the new idea text and its category
        list.appendChild(li); // Push this into the list on the page
    });
}

// Function to choose a random idea from lsit
function shuffleIdea() {
    // Check if there are any ideas first, if not then send an alert
    if(ideas.length === 0) {
        return alert("No ideas yet!");
    }

    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)]; // Use Math randomw & floor to pick a random number for a random idea

    alert(`Try this: ${randomIdea.text} (${randomIdea.category})`); // Send an alert of the chosen random idea
}

// Function to filter specific category ideas
function filterIdeas() {
    const filter = document.getElementById("filterSelect").value;
    displayIdeas(filter);
}