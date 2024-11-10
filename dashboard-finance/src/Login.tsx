const validUsername: string = "admin";
const validPassword: string = "password123";

// Get the form elements by ID
const loginForm: HTMLFormElement = document.getElementById("loginForm") as HTMLFormElement;
const usernameInput: HTMLInputElement = document.getElementById("username") as HTMLInputElement;
const passwordInput: HTMLInputElement = document.getElementById("password") as HTMLInputElement;
const errorMessage: HTMLElement = document.getElementById("error-message") as HTMLElement;
const adminSection: HTMLElement = document.getElementById("adminSection") as HTMLElement;

// Event listener for form submission
loginForm.addEventListener("submit", handleLogin);

function Login (event: Event): void {
    event.preventDefault();  // Prevent default form submission behavior

    const username: string = usernameInput.value;
    const password: string = passwordInput.value;

    // Validate the login credentials
    if (username === validUsername && password === validPassword) {
        // Show the admin section and hide the error message
        adminSection.style.display = "block";
        errorMessage.style.display = "none";
    } else {
        // Show error message and hide the admin section
        errorMessage.textContent = "Invalid username or password. Please try again.";
        errorMessage.style.display = "block";
        adminSection.style.display = "none";
    }

    // Clear the input fields after submission
    usernameInput.value = "";
    passwordInput.value = "";
}


export default Login;