setTimeout(function() {
              document.getElementById('continueButton').style.display = 'block'; // Show the button
          }, 1750); // 1 second delay
          document.getElementById('continueButton').onclick = function() {
              const splashScreen = document.getElementById('splashScreen');
              splashScreen.style.opacity = '0'; // Start fading
              setTimeout(function() {
                splashScreen.style.display = 'none'; // Remove from view after fading
              }, 1000); // Wait for the transition duration before hiding
          };
        // Real-Time Timer
        let lastFormattedTime = "";
        // Load preferences on page load
        window.onload = () => {
            const savedTimezone = localStorage.getItem("selectedTimezone");
            const savedTimeFormat = localStorage.getItem("selectedTimeFormat");
            
            if (savedTimezone) {
                document.getElementById("timezone").value = savedTimezone;
            }
            
            if (savedTimeFormat) {
                document.getElementById("timeFormat").value = savedTimeFormat;
            }
        
            updateTimer(); // Update the timer with the loaded preferences
        }
        
        // Update timer function
        function updateTimer() {
            const now = new Date();
            const selectedTimeZone = document.getElementById("timezone").value;
            const selectedFormat = document.getElementById("timeFormat").value;
        
            const options = { 
                timeZone: selectedTimeZone, 
                hour: selectedFormat === "24" ? "numeric" : "2-digit", 
                minute: "2-digit", 
                second: "2-digit", 
                hour12: selectedFormat === "12" 
            };
        
            let formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);
        
            document.getElementById("timer").textContent = formattedTime;
        
            // Save user preferences
            localStorage.setItem("selectedTimezone", selectedTimeZone);
            localStorage.setItem("selectedTimeFormat", selectedFormat);
        }
        // Stopwatch Code
        let stopwatchTime = 0;
        let stopwatchInterval;
        let stopwatchRunning = false;
        let lastTime = performance.now();
        function startStopwatch() {
            if (!stopwatchRunning) {
                stopwatchRunning = true;
                lastTime = performance.now();
                document.getElementById("startStopwatch").textContent = "Pause";
                stopwatchInterval = setInterval(() => {
                    const currentTime = performance.now();
                    stopwatchTime += currentTime - lastTime;
                    lastTime = currentTime;
                    displayStopwatch();
                }, 10);
            } else {
                stopwatchRunning = false;
                document.getElementById("startStopwatch").textContent = "Resume";
                clearInterval(stopwatchInterval);
            }
        }
        function resetStopwatch() {
            stopwatchTime = 0;
            displayStopwatch();
            stopwatchRunning = false;
        }
        function displayStopwatch() {
            const hours = Math.floor(stopwatchTime / 3600000);
            const minutes = Math.floor(stopwatchTime / 60000) % 60;
            const seconds = Math.floor(stopwatchTime / 1000) % 60;           const milliseconds = Math.floor(stopwatchTime % 1000);
            document.getElementById("stopwatch").textContent =
                `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
        }
        function padZero(num, length = 2) {
            return num.toString().padStart(length, "0");
        }
        // Apply Image from File Function
        function applyImageFromFile() {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    // Set the image as background for .container and .sideMenu
                    document.querySelector('.containerANDsideMenu').style.backgroundImage = `url(${imageUrl})`;
                    // Additional styles to ensure continuous appearance
                    document.querySelector('.containerANDsideMenu').style.backgroundSize = 'cover';
                    document.querySelector('.containerANDsideMenu').style.backgroundRepeat = 'no-repeat';
                    document.querySelector('.containerANDsideMenu').style.backgroundPosition = 'center';
        
                    document.getElementById('resetBtn').style.display = 'inline-block'; // Show reset button if needed
                };
                reader.readAsDataURL(file);
            }
        }
        
        // Reset Image
        function resetImage() {
            document.querySelector('.container').style.backgroundImage = '';
            document.querySelector('.sideMenu').style.backgroundImage = '';
            document.querySelector('.containerANDsideMenu').style.backgroundImage = '';
            document.getElementById('resetBtn').style.display = 'none';
        }
        
        // Right menu functions
        function applyImageFromFileRightM() {
            const fileInput = document.getElementById('fileInputRightM');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.querySelector('body').style.backgroundImage = `url(${e.target.result})`;
                    document.getElementById('resetBtnRightM').style.display = 'inline-block';
                };
                reader.readAsDataURL(file);
            }
        }
        
        // Reset Image
        function resetImageRightM() {
            document.querySelector('body').style.backgroundImage = '';
            document.getElementById('resetBtnRightM').style.display = 'none';
        }
        // Initial setup for real-time timer update every second
        setInterval(updateTimer, 1000);
        
        function toggleFullscreen() {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
              console.log(`Error attempting to enable fullscreen: ${err.message}`);
              });
          } else {
              document.exitFullscreen();
          }
        }
        let timerTime = 0; // Time in seconds
        let timerInterval;
        let timerRunning = false;
        function setTimer() {
            const inputTime = document.getElementById("inputTime").value;
            timerTime = parseInt(inputTime, 10);
            if (isNaN(timerTime) || timerTime < 0) {
                alert("Please enter a valid number of seconds.");
                return;
            }
            displayTimer();
        }
        
        function startTimer() {
            if (!timerRunning && timerTime > 0) {
                timerRunning = true;
                document.getElementById("startTimer").textContent = "Pause";
        
                timerInterval = setInterval(() => {
                    if (timerTime > 0) {
                        timerTime--;
                        displayTimer();
                    } else {
                        clearInterval(timerInterval);
                        showAlert(); // Show on-screen alert
                        resetTimer();
                    }
                }, 1000);
            } else if (timerRunning) {
                timerRunning = false;
                document.getElementById("startTimer").textContent = "Resume";
                clearInterval(timerInterval);
            }
        }
        
        function showAlert() {
            const alertMessage = document.createElement("div");
            alertMessage.textContent = "Time's up!";
            alertMessage.style.position = "fixed";
            alertMessage.style.top = "50%";
            alertMessage.style.left = "50%";
            alertMessage.style.transform = "translate(-50%, -50%)";
            alertMessage.style.backgroundColor = "rgba(255, 0, 0, 1)";
            alertMessage.style.color = "white";
            alertMessage.style.padding = "75px";
            alertMessage.style.fontSize = "30px";
            alertMessage.style.borderRadius = "10px";
            alertMessage.style.zIndex = "1000";
            alertMessage.style.transition = "ease-in-out";
        
            document.body.appendChild(alertMessage);
        
            // Remove the alert message after 3 seconds
            setTimeout(() => {
                document.body.removeChild(alertMessage);
            }, 5000);
        }
        
        function resetTimer() {
            timerTime = 0;
            displayTimer();
            timerRunning = false;
            clearInterval(timerInterval);
            document.getElementById("startTimer").textContent = "Start";
        }
        
        function displayTimer() {
            const hours = Math.floor(timerTime / 3600);
            const minutes = Math.floor((timerTime % 3600) / 60);
            const seconds = timerTime % 60;
            document.getElementById("timerDisplay").textContent = 
                `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        }
        
        function padZero(num) {
            return num.toString().padStart(2, "0");
        }
        function saveNotes() {
            const notes = document.getElementById('notepad').value;
            localStorage.setItem('userNotes', notes);
            alert("Notes saved!");
        }
    
        // Load saved notes on page load
        window.onload = () => {
            const savedNotes = localStorage.getItem('userNotes');
            if (savedNotes) {
                document.getElementById('notepad').value = savedNotes;
            }
        }
        
        function showChangelog() {
            document.getElementById('changelogModal').style.display = 'flex';
        }
        
        function closeChangelog() {
            document.getElementById('changelogModal').style.display = 'none';
        }
        
        function showTodo() {
            document.getElementById('todoModal').style.display = 'flex';
        }
        
        function closeTodo() {
            document.getElementById('todoModal').style.display = 'none';
        }
        
        function showAbout() {
            document.getElementById('aboutModal').style.display = 'flex';
        }
        
        function closeAbout() {
            document.getElementById('aboutModal').style.display= 'none';
        }
        function toggleRightMenu() {
            const rightMenu = document.getElementById('rightSideMenu');
            const toggleButton = document.querySelector('.toggle-btn');
            
            if (rightMenu.style.display === "none" || rightMenu.style.display === "") {
                rightMenu.style.display = "block"; // Show the menu
                toggleButton.innerHTML = '&#x02192;'; // Change to left arrow
            } else {
                rightMenu.style.display = "none"; // Hide the menu
                toggleButton.innerHTML = '&#x02190;'; // Change to right arrow
            }
        }
        
        // Initialize the right menu to be hidden by default
        document.getElementById('rightSideMenu').style.display = 'none';
        
        function toggleLeftMenu() {
            const leftMenu = document.getElementById('leftSideMenu');
            const toggleButton = document.querySelector('.toggle-btn-left');
            
            if (leftMenu.style.display === "none" || leftMenu.style.display === "") {
                leftMenu.style.display = "block"; // Show the menu
                toggleButton.innerHTML = '&#x02190;'; // Change to left arrow
            } else {
                leftMenu.style.display = "none"; // Hide the menu
                toggleButton.innerHTML = '&#x02192;'; // Change to right arrow
            }
        }
        
        // Initialize the left menu to be hidden by default
        document.getElementById('leftSideMenu').style.display = 'none';
        
        function startTimer() {
            if (!timerRunning && timerTime > 0) {
                timerRunning = true;
                document.getElementById("startTimer").textContent = "Pause";
        
                // Calculate total time for progress bar
                const totalTime = timerTime;
        
                timerInterval = setInterval(() => {
                    if (timerTime > 0) {
                        timerTime--;
                        displayTimer();
        
                        // Update progress bar width
                        const progressPercentage = ((totalTime - timerTime) / totalTime) * 100;
                        document.getElementById("progressBar").style.width = `${progressPercentage}%`;
                    } else {
                        clearInterval(timerInterval);
                        showAlert(); // Show on-screen alert
                        resetTimer();
                    }
                }, 1000);
            } else if (timerRunning) {
                timerRunning = false;
                document.getElementById("startTimer").textContent = "Resume";
                clearInterval(timerInterval);
            }
        }
        function addChecklistItem() {
            const input = document.getElementById('checklistInput');
            const task = input.value.trim();
            if (task) {
                const li = document.createElement('li');
                li.textContent = task;
                
                // Mark as completed on click
                li.onclick = function() {
                    li.classList.toggle('completed');
                };
        
                // Add delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.onclick = function() {
                    li.remove();
                };
                
                li.appendChild(deleteBtn);
                document.getElementById('checklist').appendChild(li);
                input.value = ''; // Clear input
            } else {
                alert("Please enter a task.");
            }
        }
        function showProfile() {
            document.getElementById('profileModal').style.display = 'block';
        }
        
        function closeProfile() {
            document.getElementById('profileModal').style.display = 'none';
        }
        function updateProfileButton() {
            const username = document.getElementById('usernameInput').value;
            document.getElementById('profileButton').textContent = username ? username : 'Profile';
            saveProfile(); // Save the username and profile picture
        }
      
        function changeProfilePictureFromFile() {
          const fileInput = document.getElementById('fileInput');
          const file = fileInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              document.getElementById('profilePicture').src = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
      
        function changeProfilePictureFromUrl() {
          const imageUrl = document.getElementById('imageUrlInput').value;
          document.getElementById('profilePicture').src = imageUrl;
        }
      
        function showProfile() {
          document.getElementById('profileModal').style.display = 'block';
        }
      
        function closeProfile() {
          document.getElementById('profileModal').style.display = 'none';
        }
        function changeProfilePictureFromFile() {
            const fileInput = document.getElementById('fileInputProfilePicture');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profilePicture').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
        // Save username and profile picture to local storage
        function saveProfile() {
            const username = document.getElementById('usernameInput').value;
            const profilePictureUrl = document.getElementById('profilePicture').src;
        
            // Save to local storage
            localStorage.setItem('username', username);
            localStorage.setItem('profilePictureUrl', profilePictureUrl);
        }
        
        // Load profile from local storage on page load
        window.onload = () => {
            const savedUsername = localStorage.getItem('username');
            const savedProfilePictureUrl = localStorage.getItem('profilePictureUrl');
        
            if (savedUsername) {
                document.getElementById('usernameInput').value = savedUsername;
                document.getElementById('profileButton').textContent = savedUsername; // Update button text
            }
        
            if (savedProfilePictureUrl) {
                document.getElementById('profilePicture').src = savedProfilePictureUrl; // Update profile picture
            }
        };
        function updateChecklistProgress() {
            const checklistItems = document.querySelectorAll('#checklist li');
            const totalItems = checklistItems.length;
            const completedItems = Array.from(checklistItems).filter(item => item.classList.contains('completed')).length;
        
            const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        
            // Update the progress bar
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = `${progressPercentage}%`;
        
            // Optional: Update progress text
            const progressText = document.getElementById('progressText');
            if (progressText) {
                progressText.textContent = `Progress: ${Math.round(progressPercentage)}%`;
            }
        }
        
        // Call this function whenever a checklist item is added or marked as completed
        document.getElementById('checklist').addEventListener('click', updateChecklistProgress);
        
        let pomodoroTime = 1500; // 25 minutes in seconds
        let pomodoroInterval;
        let pomodoroRunning = false;
    
        function startPomodoro() {
            if (!pomodoroRunning) {
                pomodoroRunning = true;
                document.getElementById("startPomodoro").textContent = "Pause"; // Change button text to "Pause"
                pomodoroInterval = setInterval(() => {
                    if (pomodoroTime > 0) {
                        pomodoroTime--;
                        displayPomodoro();
                    } else {
                        clearInterval(pomodoroInterval);
                        alert("Pomodoro finished!");
                        resetPomodoro();
                    }
                }, 1000);
            } else {
                pomodoroRunning = false;
                document.getElementById("startPomodoro").textContent = "Resume"; // Change button text to "Resume"
                clearInterval(pomodoroInterval);
            }
        }
        
        function resetPomodoro() {
            clearInterval(pomodoroInterval);
            pomodoroTime = 1500; // Reset to 25 minutes
            pomodoroRunning = false;
            document.getElementById("startPomodoro").textContent = "Start"; // Reset button text to "Start"
            displayPomodoro();
        }
    
        function displayPomodoro() {
            const minutes = Math.floor(pomodoroTime / 60);
            const seconds = pomodoroTime % 60;
            document.getElementById("pomodoroDisplay").textContent = 
                `${padZero(minutes)}:${padZero(seconds)}`;
        }
    
        function padZero(num) {
            return num.toString().padStart(2, "0");
        }
        function showNewMenu() {
            document.getElementById('newMenuModal').style.display = 'flex';
        }
        
        function closeNewMenu() {
            document.getElementById('newMenuModal').style.display = 'none';
        }
        function changeTheme() {
            const theme = document.getElementById("theme").value;
            document.body.className = theme; // Change the body's class based on the selected theme
        
            // Set backgrounds based on the current theme
            if (theme === "default") {
                document.getElementById("timer").style.background = "rgba(255, 255, 255, 0.5)";
                document.getElementById("stopwatch").style.background = "rgba(255, 255, 255, 0.5)";
                document.getElementById("timerDisplay").style.background = "rgba(255, 255, 255, 0.5";
            } else {
                document.getElementById("timer").style.background = "rgba(255, 255, 255, 0.2)";
                document.getElementById("stopwatch").style.background = "rgba(255, 255, 255, 0.2)";
                document.getElementById("timerDisplay").style.background = "rgba(255, 255, 255, 0.2)";
            }
        }