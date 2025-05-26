document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Initialize countdown timer
  initCountdown();

  // Product image zoom effect
  initImageZoom();

  // Product thumbnails gallery
  initThumbnailGallery();

  // Product color options
  initColorOptions();

  // Add to cart functionality
  initAddToCart();

  // Live chat functionality
  initLiveChat();

  // Form submissions
  initFormSubmissions();

  // Initialize animations
  initAnimations();
});

// Countdown timer function
function initCountdown() {
  // Set the countdown date (7 days from now)
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7);

  // Update the countdown every second
  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").innerText = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");

    // If the countdown is finished, clear the interval
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdown").innerHTML = "Offer Expired";
    }
  }, 1000);
}

// Image zoom functionality
function initImageZoom() {
  const mainImage = document.getElementById("main-product-image");
  const lens = document.getElementById("lens");
  const result = document.getElementById("zoom-result");

  if (!mainImage || !lens || !result) return;

  // Set default dimensions for the image
  const defaultWidth = 800;
  const defaultHeight = 600;

  // For SVG images that might not have natural dimensions
  mainImage.style.width = defaultWidth + "px";
  mainImage.style.height = "auto";

  let imageLoaded = true; // Set to true for SVG images

  // Mouse enter event
  mainImage.addEventListener("mouseenter", function () {
    lens.style.display = "block";
    result.style.display = "block";
  });

  // Mouse leave event
  mainImage.addEventListener("mouseleave", function () {
    lens.style.display = "none";
    result.style.display = "none";
  });

  // Mouse move event
  mainImage.addEventListener("mousemove", function (e) {
    e.preventDefault();

    // Get cursor position
    const pos = getCursorPos(e);

    // Get image dimensions (for SVG we'll use the element width/height)
    const imgWidth = mainImage.offsetWidth;
    const imgHeight = mainImage.offsetHeight;

    // Calculate position of lens
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    // Prevent lens from being positioned outside the image
    if (x > imgWidth - lens.offsetWidth) {
      x = imgWidth - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > imgHeight - lens.offsetHeight) {
      y = imgHeight - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    // Set the position of the lens
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    // Display what the lens "sees" in the result div
    result.style.backgroundImage = "url('" + mainImage.src + "')";

    // For SVG images, use a fixed ratio based on the element dimensions
    const ratio = 3;
    result.style.backgroundSize =
      imgWidth * ratio + "px " + imgHeight * ratio + "px";
    result.style.backgroundPosition =
      "-" + x * ratio + "px -" + y * ratio + "px";

    // Position the result div near the cursor
    result.style.left = e.pageX + 20 + "px";
    result.style.top = e.pageY - 150 + "px";
  });

  // Helper function to get cursor position
  function getCursorPos(e) {
    let bounds = mainImage.getBoundingClientRect();
    let x = e.pageX - bounds.left - window.scrollX;
    let y = e.pageY - bounds.top - window.scrollY;
    return { x: x, y: y };
  }
}

// Product thumbnails gallery
function initThumbnailGallery() {
  const mainImage = document.getElementById("main-product-image");
  const thumbnails = document.querySelectorAll(".product-thumbnail");

  if (!mainImage || thumbnails.length === 0) return;

  // Set up the first thumbnail's SVG as the main image if needed
  if (mainImage.src.includes("svg") && thumbnails[0].src.includes("svg")) {
    // Make sure main image is properly initialized
    mainImage.style.width = "100%";
    mainImage.style.height = "auto";
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image
      mainImage.src = this.src;

      // Fade effect
      mainImage.style.opacity = "0.5";
      setTimeout(() => {
        mainImage.style.opacity = "1";
      }, 200);
    });
  });
}

// Product color options
function initColorOptions() {
  const colorOptions = document.querySelectorAll(".color-option");

  if (colorOptions.length === 0) return;

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      colorOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // If we had product images for each color, we would update here
      const color = this.getAttribute("data-color");
    });
  });
}

// Add to cart functionality
function initAddToCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");

  if (addToCartButtons.length === 0 || !cartCount) return;

  let cartItems = 0;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add animation to button
      this.classList.add("add-to-cart-animation");
      setTimeout(() => {
        this.classList.remove("add-to-cart-animation");
      }, 500);

      // Update cart count
      cartItems++;
      cartCount.innerText = cartItems;

      // Show notification
      showNotification("Product added to cart!");
    });
  });
}

// Notification function
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");

  if (!notification || !notificationMessage) return;

  // Set notification message
  notificationMessage.innerText = message;

  // Show notification
  notification.classList.add("show");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Live chat functionality
function initLiveChat() {
  const chatButton = document.getElementById("chat-button");
  const chatBox = document.getElementById("chat-box");
  const closeChat = document.getElementById("close-chat");
  const sendMessage = document.getElementById("send-message");
  const chatInput = document.getElementById("chat-input-field");
  const chatMessages = document.getElementById("chat-messages");

  if (
    !chatButton ||
    !chatBox ||
    !closeChat ||
    !sendMessage ||
    !chatInput ||
    !chatMessages
  )
    return;

  // Open chat
  chatButton.addEventListener("click", function () {
    chatBox.classList.add("active");
  });

  // Close chat
  closeChat.addEventListener("click", function () {
    chatBox.classList.remove("active");
  });

  // Send message
  function sendUserMessage() {
    const message = chatInput.value.trim();

    if (message !== "") {
      // Add user message to chat
      addMessageToChat(message, "user");

      // Clear input
      chatInput.value = "";

      // Simulate support response after 1 second
      setTimeout(() => {
        addMessageToChat(
          "Thanks for your message! Our support team will get back to you shortly.",
          "support"
        );
      }, 1000);
    }
  }

  // Send message on button click
  sendMessage.addEventListener("click", sendUserMessage);

  // Send message on Enter key
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendUserMessage();
    }
  });

  // Helper function to add messages to chat
  function addMessageToChat(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

    chatMessages.appendChild(messageDiv);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Form submissions
function initFormSubmissions() {
  const newsletterForm = document.getElementById("newsletter-form");
  const contactForm = document.getElementById("contact-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showNotification("Thanks for subscribing to our newsletter!");
      this.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showNotification(
        "Your message has been sent. We'll get back to you soon!"
      );
      this.reset();
    });
  }
}

// Animations
function initAnimations() {
  // Add animations to elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".fade-in-stagger");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add("show");
      }
    });
  };

  // Run once on load
  setTimeout(animateOnScroll, 500);

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Add animation to CTA button
  const ctaButton = document.querySelector(".hero-cta .btn");
  if (ctaButton) {
    ctaButton.classList.add("pulse");
  }
}
