document.addEventListener('DOMContentLoaded',()=>{
    const contform = document.getElementById('cont-form');
    const inp1 = document.getElementById('inp-1');
    const inp2 = document.getElementById('inp-2');
    const inp3 = document.getElementById('inp-3');
})

contform.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = inp1.value;
    const email = inp2.value;
    const phone = inp3.value;

    if (!name || !email || !phone) {
        alert('Please enter a value');
        return;
    }

    // Send a POST request to create a new task
    const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,phone}),
    });
    

    if (response.ok) {
        inp1.value = ''; // Clear the input field
        inp2.value = ''; // Clear the input field
        inp3.value = ''; // Clear the input field
        
    } else {
        alert('Failed to create a task.');
    }
});